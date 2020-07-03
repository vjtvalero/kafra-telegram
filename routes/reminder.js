const schemas = require('../schemas/reminder')
const handlers = require('../handlers/reminder')

module.exports = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/remind',
        schema: schemas.newReminder,
        handler: handlers.newReminder
    })
}