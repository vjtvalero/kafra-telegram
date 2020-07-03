const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000
const telegram = require('./bot')

fastify.get('/', async () => {
    return { hello: 'Hello! I am Kafra.' }
})
fastify.register(require('./routes/reminder'))
telegram.start()
fastify.listen(PORT, err => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})