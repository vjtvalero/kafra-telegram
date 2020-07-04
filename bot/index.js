const Telegraf = require('telegraf')
const { startMessage } = require('../handlers/index')
const { setReminder } = require('../handlers/reminder')

const start = () => {
    const bot = new Telegraf(process.env.BOT_TOKEN)
    bot.start((context) => startMessage(context))
    bot.on('text', (context) => setReminder(context))
    
    if (process.env.APP_ENV === 'local') {
        bot.telegram.deleteWebhook()
        bot.startPolling()
    } else {
        bot.telegram.setWebhook(`${process.env.WEBHOOK}/${process.env.SECRET}`)
        bot.startWebhook(`/${process.env.SECRET}`)
    }
}

module.exports = { start }