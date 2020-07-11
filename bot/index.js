const Telegraf = require('telegraf')
const { startMessage } = require('../handlers/index')
const { setReminder } = require('../handlers/reminder')
const app = process.env.APP_ENV || 'local'

const start = () => {
    const config = {
        telegram: { webhookReply: false }
    }
    const bot = new Telegraf(process.env.BOT_TOKEN, config)

    // logic
    bot.start(async context => {
        await context.reply(startMessage(context.from.first_name))
    })
    bot.on('text', (context) => setReminder(context))

    // webhook
    bot.telegram.deleteWebhook()
        .then(() => {
            if (app === 'local') {
                const cron = require('node-cron')
                const { getAndSendPendingReminders } = require('../jobs/sender')
                cron.schedule("* * * * *", function () {
                    getAndSendPendingReminders()
                });
                bot.startPolling()
            } else {
                bot.telegram.setWebhook(`${process.env.WEBHOOK}/${process.env.SECRET}`)
                    .catch(console.error)
                require('http')
                    .createServer(bot.webhookCallback(`/${process.env.SECRET}`))
                    .listen(process.env.PORT)
            }
        })
        .catch(console.error)
}

module.exports = { start }