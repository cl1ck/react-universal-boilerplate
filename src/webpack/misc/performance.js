export default {
  hints: process.env.NODE_ENV !== 'production' ? false : 'warning',
  assetFilter: (assetFilename) =>
    !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename))
}
