const axios = require('axios')
const secrets = require('./../secrets')

const getFollowers = (req) => {
	const processFollowers = followers => ({ followerCount: followers.length })

	return axios.get(`https://api.github.com/users/${req.params.username}/followers?access_token=${secrets.gitHubKey}`)
		.then(response => {
			const followerInfo = processFollowers(response.data)
			return followerInfo
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getFollowers