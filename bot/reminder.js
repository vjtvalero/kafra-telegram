const moment = require('moment')
const { Client } = require('pg')
const config = {
    connectionString: process.env.DATABASE_URL
}

const Reminder = {
    create: function ({ telegram, senderId, date, time, activity } = {}) {
        const client = new Client(config)
        client.connect()
        client.query(
            'INSERT INTO reminder ("chatId", date, time, activity) VALUES($1, $2, $3, $4)',
            [
                senderId,
                moment(date).format('YYYY-MM-DD'),
                moment(time).format('HH:mm:ss'),
                activity
            ]
        )
            .then(result => {
                if (result.rowCount === 1) {
                    telegram.reply(`Got it!`)
                } else {
                    telegram.reply(`Insert failed.`)
                }
            })
            .catch(error => telegram.reply(error.message))
            .then(() => client.end())
    }
}

module.exports = Reminder