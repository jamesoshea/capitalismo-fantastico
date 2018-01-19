const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

const secrets = require('./secrets')

app.use(bodyParser.json())

const baseEndpoint = 'https://api.github.com' 

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/user/:username', (req, res) => {
	const stats = []
	stats.push(
		axios.get(`${baseEndpoint}/users/${req.params.username}`)
			.then(response => {
				const key = secrets.mapsKey
				stats.push(
					axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${response.data.location}&key=${key}`)
					.then((response) => {
						console.log(response.data)
						return response.data.results[0].formatted_address
					})
					.catch((err) => {
						console.log(err)
					})
				)
				const userInfo = processUser(response.data)
				return userInfo
			})
			.catch((err) => {
				console.error(err)
			})
	)
	stats.push(
		axios.get(`${baseEndpoint}/users/${req.params.username}/followers`)
			.then(response => {
				const followerInfo = processFollowers(response.data)
				return followerInfo
			})
			.catch((err) => {
				console.error(err)
			})
	)

	Promise.all(stats)
		.then(data => {
			console.log(data)
			res.json(data)
		})
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})

const processUser = (user) => {
	if(user.hireable) {
		return ({
			bio: user.bio,
			repoCount: user.public_repos,
		})
	}
	return false
}

const processFollowers = (followers) => {
	return followers.length
}

const processLocation = (location, stats) => {
}
