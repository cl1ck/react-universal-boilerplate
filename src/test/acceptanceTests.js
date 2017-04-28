const acceptanceContext = require.context('./acceptance/', true, /\.jsx?$/)
acceptanceContext.keys().forEach(acceptanceContext)
