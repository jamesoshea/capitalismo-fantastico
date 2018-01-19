const axios = require('axios')
const secrets = require('./../secrets')

const getOrgs = (req) => {
	const processOrgs = orgs => ({ orgCount: orgs.length })

	return axios.get(`https://api.github.com/users/${req.params.username}/orgs?access_token=${secrets.gitHubKey}`)
		.then(response => {
			const orgInfo = processOrgs(response.data)
			return orgInfo
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getOrgs