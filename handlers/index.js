const startMessage = (name) => {
    const message = `
Hi ${name}! I'm Kafra.
I can help you remember stuff.
Give it a try by typing your first reminder:
_Stand up and get a snack in 5mins_`
    return message
}

const defaultReplies = {
    unknownReminder: `Sorry. I don't understand this reminder.`
}

module.exports = {
    startMessage,
    defaultReplies
}