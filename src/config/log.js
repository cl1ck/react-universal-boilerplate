export default {
  dateTimeFormat: 'hh:mm:ss',
  productionLogLevel: 'warn',
  developmentLogLevel: 'debug',
  serverRequests: process.env.NODE_ENV === 'development',
  serverResponses: false,
  devRequests: process.env.NODE_ENV === 'development',
  devResponses: false,
  filterRequests: [
    /.*\.hot-update\.js.*/,
    /.*\/__hot.*/,
    /.*\/stream.*/,
    /\/socket.io\/.*/,
    /\/static\/.*/,
    /\/browser-sync\/.*/
  ]
}
