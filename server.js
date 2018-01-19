const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

const fetchers = require('./fetchers')
const secrets = require('./secrets')

app.use(bodyParser.json())

const baseEndpoint = 'https://api.github.com' 

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/user/:username', (req, res) => {
	const stats = []
	stats.push(fetchers.getUser(req))
	stats.push(fetchers.getFollowers(req))
	stats.push(fetchers.getRepos(req))
	stats.push(fetchers.getOrgs(req))

	Promise.all(stats)
		.then(data => {
			const result = data.reduce((obj, stats) => {
				return Object.assign(obj, stats)
			}, {})
			res.json(result)
		})
		.catch((err) => {
			res.send(err)
		})
})

app.listen(3000, () => {
	console.log('wow')	
})