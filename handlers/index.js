const startMessage = (name) => {
    const message = `
Hi ${name}! I'm Kafra .
I can help you remember stuff.
\r
Give it a try by typing your first reminder:
\`Get a snack in 5mins\`
`
    return message
}

const defaultReplies = {
    unknownReminder: `Sorry. I don't understand this reminder.`
}

module.exports = {
    startMessage,
    defaultReplies
}