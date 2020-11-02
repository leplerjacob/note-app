const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.content.length === 0) {
    return response.status(400).json({ error: 'Note must not be blank' })
  } else if (body.content.length < 7) {
    return response
      .status(400)
      .json({ error: 'Note must have at least 7 characters' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => response.json(savedAndFormattedNote))
    .catch((error) => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  console.log('request.body: ', request.body)
  const note = {
    content: body.content,
    important: body.important,
  }
  console.log('note: ', note)

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.result(204).end()
    })
    .catch((error) => next(error))

  response.status(204).end()
})

module.exports = notesRouter