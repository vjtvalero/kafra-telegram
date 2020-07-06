/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('reminder', {
        id: { type: 'bigserial', primaryKey: true },
        chatId: { type: 'varchar(255)', default: '' },
        date: { type: 'date', default: pgm.func('current_date') },
        time: { type: 'time', default: pgm.func('current_time') },
        activity: { type: 'text', default: '' },
        frequency: { type: 'varchar(255)', default: '' },
        createdAt: { type: 'timestamp', default: pgm.func('current_timestamp') },
    })
};

exports.down = pgm => {
    pgm.dropTable('reminder', { ifExists: true })
};
