const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = morgan((tokens, req, res) => {
  // Will only show logs of request if the request does not respond with 200 status
  if (tokens.status(req, res) !== '200') {
    return [
      '---\nMethod: ' + tokens.method(req, res),
      '\nUrl: ' + tokens.url(req, res),
      '\nRequest Status: ' + tokens.status(req, res),
      '\nLength: ' + tokens.res(req, res, 'content-length'),
      '\nResponse Time: ' + tokens['response-time'](req, res),
      'ms',
    ].join(' ')
  }
})

const unknownEndpoint = (error, request, response) => {
  if (error) {
    return response.status(400).send({ error: 'unknown endpoint' })
  }
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
