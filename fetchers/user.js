const axios = require('axios')
const secrets = require('./../secrets')

const getUser = (req) => {
	const processUser = user => {
		const plan = user.plan ? user.plan.name : ''
		return ({
			hireable: user.hireable,
			bio: user.bio,
			plan,
			company: user.company,
		})
	}
	
	return axios.get(`https://api.github.com/users/${req.params.username}?access_token=${secrets.gitHubKey}`)
		.then(response => {
			const userInfo = processUser(response.data)
			return userInfo
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getUser