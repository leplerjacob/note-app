const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})
// Removed because of installed express-async-errors package
// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id)
//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end()
//       next(note)
//     }
//   } catch (exception) {
//     next(exception)
//   }
// })
notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
    next(note)
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  const savedNote = await note.save()
  response.json(savedNote)
})

// OLD POST
// notesRouter.post('/', (request, response, next) => {
//   const body = request.body

//   if (body.content.length === 0) {
//     return response.status(400).json({ error: 'Note must not be blank' })
//   } else if (body.content.length < 7) {
//     return response
//       .status(400)
//       .json({ error: 'Note must have at least 7 characters' })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   note
//     .save()
//     .then((savedNote) => savedNote.toJSON())
//     .then((savedAndFormattedNote) => response.json(savedAndFormattedNote))
//     .catch((error) => next(error))
// })

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

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
