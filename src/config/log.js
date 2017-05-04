export default {
  dateTimeFormat: 'hh:mm:ss',
  productionLogLevel: 'warn',
  developmentLogLevel: 'debug',
  serverRequests: false,
  serverResponses: false,
  devRequests: false,
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
