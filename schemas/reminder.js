const newReminder = {
    body: {
        type: 'object',
        required: ['reminder'],
        properties: {
            reminder: { type: 'string' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                answer: { type: 'string' }
            }
        }
    }
}

module.exports = { newReminder }