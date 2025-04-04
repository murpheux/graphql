#!/Users/murpheux/.nvm/versions/node/v23.8.0/bin/node

'use strict'

import Fastify from 'fastify'

const app = Fastify({ logger: true })
const port = process.env.PORT || 5000

app.get('/', (_, res) => {
    res.send('Hello World!')
})

console.log(`worker pid=${process.pid}`)

app.get('/heavy', (_, res) => {
    let total = 0
    for (let i = 0; i < 5_000_000; i++) {
        total++
    }
    res.send(`The result of the CPU intensive task is ${total}\n`)
})

// Start Server
const start = async () => {
    try {
        await app.listen({ port: port })
        console.log('🚀 Server running on http://localhost:5000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
