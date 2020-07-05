const Telegraf = require('telegraf')
const { startMessage } = require('../handlers/index')
const { setReminder } = require('../handlers/reminder')
const app = process.env.APP_ENV || 'local'

const start = () => {
    const bot = new Telegraf(process.env.BOT_TOKEN)

    // logic
    bot.start((context) => context.reply(startMessage(context.from.first_name)))
    bot.on('text', (context) => setReminder(context))

    // webhook
    bot.telegram.deleteWebhook()
        .then(() => {
            if (app === 'local') {
                bot.launch()
            } else {
                bot.startWebhook(`/${process.env.SECRET}`, null, process.env.PORT)
                bot.telegram.setWebhook(`${process.env.WEBHOOK}/${process.env.SECRET}`)
            }
        })
        .catch(console.error)
}

module.exports = { start }