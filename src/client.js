#!/Users/murpheux/.nvm/versions/node/v23.8.0/bin/node

'use strict'

import { Agent } from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const url = 'https://localhost:3000/graphql'
const query = `
    query {
        book (id:7){
            title
            id
            author
        }
    }`

const response = await fetch(url, {
    agent: new Agent({
        rejectUnauthorized: false,
    }),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    },
    body: JSON.stringify({ query }),
})

const responseData = await response.json()
console.log(responseData)
