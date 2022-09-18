const { Telegraf } = require('telegraf');
const { startMessage } = require('../handlers/index');
const { setReminder } = require('../handlers/reminder');
const app = process.env.APP_ENV;

const start = () => {
  /** bot logic */
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start(async (context) => {
    await context.reply(startMessage(context.from.first_name), { parse_mode: 'Markdown' });
  });
  bot.on('text', (context) => setReminder(context));

  /** cron job */
  const cron = require('node-cron');
  const { getAndSendPendingReminders } = require('../jobs/sender');
  cron.schedule('* * * * *', function () {
    getAndSendPendingReminders();
  });

  /** webhook */
  let options = {};
  if (app === 'prod') {
    options = {
      webhook: {
        domain: process.env.WEBHOOK_URL,
        port: process.env.PORT,
      },
    };
  }

  bot.launch(options);

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

module.exports = { start };
