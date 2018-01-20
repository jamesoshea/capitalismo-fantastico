const axios = require('axios')
const secrets = require('./../secrets')

const getPhoto = (req) => {
	const processPhoto = user => user.avatar_url
	
	return axios.get(`https://api.github.com/users/${req.params.username}?access_token=${secrets.gitHubKey}`)
		.then(response => {
			return processPhoto(response.data)
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getPhoto