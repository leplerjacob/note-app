const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

const requestInfo = morgan((tokens, req, res) => {
  return [
    '---\nMethod: ' + tokens.method(req, res),
    '\nUrl: ' + tokens.url(req, res),
    '\nRequest Status: ' + tokens.status(req, res),
    '\nLength: ' + tokens.res(req, res, 'content-length'),
    '\nResponse Time: ' + tokens['response-time'](req, res),
    'ms',
  ].join(' ')
})

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  // console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'Validation Error' })
  }
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestInfo)


app.use(unknownEndpoint)
app.use(errorHandler)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
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

app.post('/api/notes', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.result(204).end()
    })
    .catch((error) => next(error))

  response.status(204).end()
})

app.put('/api/notes/:id', (request, response, next) => {
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

logger.info(`Server running on port ${config.PORT}`)
