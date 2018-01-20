const axios = require('axios')
const secrets = require('./../secrets')

const getUser = (req) => {
	const processUser = user => {
		const plan = user.plan ? user.plan.name : ''
		const hireable = Boolean(user.hireable)
		return ({
			login: user.login,
			hireable,
			bio: user.bio,
			plan,
			company: user.company,
			photoUrl: user.avatar_url,
			location: user.location
		})
	}

	return axios.get(`https://api.github.com/users/${req.params.username}?access_token=${secrets.gitHubKey}`)
		.then(response => {
			const userInfo = processUser(response.data)
			return userInfo
		})
		.then(userInfo => {
			return axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${userInfo.location}&key=${secrets.mapsKey}`)
				.then((response) => {
					const location = response.data.results.length ? {
						lat: response.data.results[0].geometry.location.lat,
						lng: response.data.results[0].geometry.location.lng
					} : null
					console.log(location)
					userInfo.location = location
					return userInfo	
				})
				.catch((err) => {
					console.log(err)
				})
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = getUser