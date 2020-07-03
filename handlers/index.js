const startMessage = async (context) => {
    const message = `
Hi ${context.from.first_name}! I'm Kafra.
I can integrate your organization to my reminders.
Give it a try by typing your first reminder.
Ex.: Get lunch in 20mins
    `
    context.reply(message)
}

const defaultReplies = {
    unknownReminder: `Sorry. I don't understand this reminder.`
}

module.exports = {
    startMessage,
    defaultReplies
}