const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    // console.log(...params)
    console.log('Running test database server')
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
}

module.exports = {
  info,
  error,
}

// Logging services: Greylog, papertrail
