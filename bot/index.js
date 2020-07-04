const Telegraf = require('telegraf')
const { startMessage } = require('../handlers/index')
const { setReminder } = require('../handlers/reminder')
const app = 'prod' || 'local'
const fastify = require('fastify')()

const start = () => {
    const bot = new Telegraf(process.env.BOT_TOKEN)
    bot.start((context) => startMessage(context))
    bot.on('text', (context) => setReminder(context))
    bot.telegram.deleteWebhook()
        .then(() => {
            if (app === 'local') {
                bot.startPolling()
            } else {
                fastify.use(bot.webhookCallback(`/${process.env.SECRET}`))
                bot.telegram.setWebhook(`${process.env.WEBHOOK}/${process.env.SECRET}`)
                // bot.startWebhook(`/${process.env.SECRET}`, null, process.env.PORT)
            }
        })
        .catch(console.error)
}

module.exports = { start }