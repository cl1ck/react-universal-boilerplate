exports.up = function (r, connection) {
  r.tableCreate('users').run(connection);
};

exports.down = function (r, connection) {
  r.tableDrop('users').run(connection);
};
