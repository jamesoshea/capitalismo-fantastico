const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

const fetchers = require('./fetchers')
const secrets = require('./secrets')
const weights = require('./weights')

app.use(bodyParser.json())

const baseEndpoint = 'https://api.github.com' 

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/user/:username', (req, res) => {

	const getFollowers = () => {
		return axios.get(`${baseEndpoint}/users/${req.params.username}/followers?access_token=${secrets.gitHubKey}`)
			.then(response => {
				const followerInfo = processFollowers(response.data)
				return followerInfo
			})
			.catch(err => {
				res.send(err)
			})
	}

	const getRepos = () => {
		return axios.get(`${baseEndpoint}/users/${req.params.username}/repos?access_token=${secrets.gitHubKey}`)
			.then(response => {
				const repoInfo = processRepos(response.data)
				return repoInfo
			})
			.catch(err => {
				res.send(err)
			})
	}

	const getOrgs = () => {
		return axios.get(`${baseEndpoint}/users/${req.params.username}/orgs?access_token=${secrets.gitHubKey}`)
			.then(response => {
				const orgInfo = processOrgs(response.data)
				return orgInfo
			})
			.catch(err => {
				res.send(err)
			})
	}

	const stats = []
	stats.push(fetchers.getUser(req))
	stats.push(getFollowers())
	stats.push(getRepos())
	stats.push(getOrgs())

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

const processFollowers = followers => ({ followerCount: followers.length })

const processRepos = (repos) => {
	const repoScore = repos.reduce((accumulator, repo) => {
		return (
			accumulator +
			(repo.stargazers_count * weights.stars) +
			(repo.watchers * weights.watchers) +
			(repo.forks * weights.forks)
		)}, 0)
	return ({ repoCount: repos.length, repoScore })
}

const processOrgs = orgs => ({ orgCount: orgs.length })