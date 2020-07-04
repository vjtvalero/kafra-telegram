const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000
const host = process.env.APP_ENV === 'local' ? 'localhost' : 'localhost'
const telegram = require('./bot')

fastify.get('/', async () => {
    return { hello: 'Hello! I am Kafra.' }
})
fastify.register(require('./routes/reminder'))
telegram.start(fastify)
fastify.listen(PORT, host, err => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})