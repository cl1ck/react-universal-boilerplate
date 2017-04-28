import rethinkdbdash from 'rethinkdbdash'
import rethinkdbConfig from 'config/rethinkdb'
import {rethinkdb as log} from 'common/log'
import shutdownHandler from 'common/process/shutdownHandler'

const rethinkdb = rethinkdbdash(rethinkdbConfig)
rethinkdb.getPoolMaster().on('log', log.info)

shutdownHandler(() => {
  rethinkdb.getPool().drain()
})

export default rethinkdb
