const startMessage = (name) => {
    const message = `
Hi ${name}! I'm Kafra.
I can integrate your organization to my reminders.
Give it a try by typing your first reminder.
Ex.: Get lunch in 20mins`
    return message
}

const defaultReplies = {
    unknownReminder: `Sorry. I don't understand this reminder.`
}

module.exports = {
    startMessage,
    defaultReplies
}