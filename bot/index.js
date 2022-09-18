const { Telegraf } = require('telegraf');
const { startMessage } = require('../handlers/index');
const { setReminder } = require('../handlers/reminder');
const app = process.env.APP_ENV || 'local';

const start = () => {
  let args = {
    telegram: {
      apiRoot: `${process.env.WEBHOOK_URL}`,
    },
  };
  if (app === 'local') {
    args = {};
  }
  const bot = new Telegraf(process.env.BOT_TOKEN, args);

  // logic
  bot.start(async (context) => {
    await context.reply(startMessage(context.from.first_name), { parse_mode: 'Markdown' });
  });
  bot.on('text', (context) => setReminder(context));

  // webhook
  if (app === 'local') {
    const cron = require('node-cron');
    const { getAndSendPendingReminders } = require('../jobs/sender');
    cron.schedule('* * * * *', function () {
      getAndSendPendingReminders();
    });
    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  }
};

module.exports = { start };
