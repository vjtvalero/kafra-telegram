const { Wit } = require('node-wit')
const witClient = new Wit({
    accessToken: process.env.WIT_TOKEN,
})
const Reminder = require('../bot/reminder')
const { defaultReplies } = require('./index')
const witDateTimeKey = 'wit$datetime:datetime'
const witActivityKey = 'wit$reminder:reminder'

const setReminder = async (context) => {
    const message = context.message.text
    const senderId = context.message.from.id.toString()
    let date = ''
    let time = ''
    let activity = ''
    witClient.message(message, {})
        .then(data => {
            let isValid = false
            if (data.entities) {
                if (data.entities[witDateTimeKey] && data.entities[witDateTimeKey].length > 0) {
                    date = data.entities[witDateTimeKey][0].value
                    time = data.entities[witDateTimeKey][0].value
                }
                if (data.entities[witActivityKey] && data.entities[witActivityKey].length > 0) {
                    activity = data.entities[witActivityKey][0].value
                }

                if (senderId && date && time && activity) {
                    isValid = true
                    Reminder.create({
                        telegram: context,
                        senderId,
                        date,
                        time,
                        activity
                    })
                }
            }
            if (!isValid) {
                context.reply(defaultReplies.unknownReminder)
            }
        })
        .catch(console.error)
}

module.exports = {
    setReminder
}