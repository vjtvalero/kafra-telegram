'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('reminder', {
    id: { type: 'bigint', primaryKey: true, autoIncrement: true },
    chat_id: { type: 'string', length: 255 },
    date: 'date',
    time: 'time',
    activity: 'text',
    frequency: { type: 'string', length: 255 },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP' },
  });
};

exports.down = function (db) {
  return db.dropTable('reminder');
};

exports._meta = {
  version: 1,
};
