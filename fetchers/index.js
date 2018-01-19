const getUser = require('./user')
const getFollowers = require('./followers')
const getRepos = require('./repos')
const getOrgs = require('./orgs')

const fetchers = {
	getUser,
	getFollowers,
	getRepos,
	getOrgs
}

module.exports = fetchers