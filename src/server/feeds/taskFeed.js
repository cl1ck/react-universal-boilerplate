export default async rethinkdb => {
  const cursor = await rethinkdb
    .table('tasks')
    .changes({includeTypes: true})
    .run({cursor: true})
  cursor.each(console.log) // eslint-disable-line no-console
}
