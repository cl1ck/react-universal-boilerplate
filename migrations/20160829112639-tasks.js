exports.up = function (r, connection) {
  r.tableCreate('tasks').run(connection);
};

exports.down = function (r, connection) {
  r.tableDrop('tasks').run(connection);
};
