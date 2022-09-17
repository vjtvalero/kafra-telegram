const moment = require('moment');
const { db } = require('../config/db');

const Reminder = {
  create: async function ({ telegram, senderId, date, time, activity } = {}) {
    const query = `INSERT INTO reminder (chat_id, date, time, activity) VALUES(?, ?, ?, ?)`;
    const args = [senderId, moment(date).format('YYYY-MM-DD'), moment(time).format('HH:mm:ss'), activity];
    const row = await db.query(query, args);
    const result = JSON.parse(JSON.stringify(row[0]));
    if (Boolean(result.affectedRows === 1)) {
      await telegram.reply(`Got it!`);
    }
  },
};

module.exports = Reminder;
