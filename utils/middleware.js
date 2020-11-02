const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = morgan((tokens, req, res) => {
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
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
