const dotenv = require('dotenv');
dotenv.config();
const { Telegraf } = require('telegraf');
const { db } = require('../config/db');

const getAndSendPendingReminders = async function () {
  const query = `SELECT id, chat_id, activity FROM reminder WHERE CONCAT(DATE, ' ', TIME) <= CONVERT_TZ(CURRENT_TIMESTAMP, '+01:00', 'Asia/Manila') ORDER BY created_at`;
  const [rows] = await db.query(query);
  const result = JSON.parse(JSON.stringify(rows));
  if (result.length > 0) {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    for (const row of result) {
      await bot.telegram.sendMessage(row.chat_id, `⏱ ${row.activity}`, {
        parse_mode: 'Markdown',
      });
      await deleteReminderById(row.id);
    }
  }
};

async function deleteReminderById(id) {
  const query = `DELETE FROM reminder WHERE id = ?`;
  const row = await db.query(query, [id]);
  const result = JSON.parse(JSON.stringify(row[0]));
  if (result.affectedRows === 1) {
    console.log(`Sent and deleted reminder with id: ${id}`);
  }
}

getAndSendPendingReminders();

module.exports = { getAndSendPendingReminders };
