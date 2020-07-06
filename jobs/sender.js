const dotenv = require('dotenv')
dotenv.config()
const { Client } = require('pg')
const { Telegraf } = require('telegraf')
const config = {
    connectionString: process.env.DATABASE_URL
}

function getAndSendPendingReminders() {
    const client = new Client(config)
    client.connect()
    client.query("SELECT id, \"chatId\", activity FROM reminder WHERE TO_TIMESTAMP(CONCAT(date, ' ', time), 'YYYY-MM-DD HH24:MI:SS') <= CURRENT_TIMESTAMP ORDER BY \"createdAt\"")
        .then(result => {
            if (result.rowCount > 0) {
                const bot = new Telegraf(process.env.BOT_TOKEN)
                for (const row of result.rows) {
                    bot.telegram.sendMessage(row.chatId, `It's time to _${row.activity}_.`, {
                        parse_mode: 'Markdown'
                    })
                        .then(() => {
                            deleteReminderById(row.id)
                        })
                        .catch(error => console.error(error))
                }
            }
        })
        .catch(error => console.error(error))
        .then(() => {
            client.end()
        })
}

function deleteReminderById(id) {
    const client = new Client(config)
    client.connect()
    client.query("DELETE FROM reminder WHERE id = $1", [id]).then(() => console.log(`Sent and deleted reminder with id: ${id}`))
        .catch(error => console.error(error))
        .then(() => {
            client.end()
        })
}

getAndSendPendingReminders()