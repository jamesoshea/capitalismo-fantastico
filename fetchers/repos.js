const axios = require('axios')

const secrets = require('./../secrets')
const weights = require('./../weights')

const getRepos = (req) => {
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

	return axios.get(`https://api.github.com/users/${req.params.username}/repos?access_token=${secrets.gitHubKey}`)
		.then(response => {
			const repoInfo = processRepos(response.data)
			return repoInfo
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getRepos