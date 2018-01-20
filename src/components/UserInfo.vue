<template>
	<div class="main">
		<p 
			class="hireablity-message"
			v-text="representationRepresentation"
		/>
		<div class="container">
			<div v-for="stat in profileStats" :key="stat">
				<div class="column">
					<div class="" v-text="stat.text" />
					<div class="stat-value" v-text="stat.value" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import distanceUtil from '../util/distanceUtil'

export default {
	props: {
		profile: {
			type: Object,
			required: true
		}
	},
	computed: {
		distanceRepresentation() {
			const distance = distanceUtil.getDistanceFromLatLonInKm(
				this.profile.location.lat,
				this.profile.location.lng,
				this.userLocation.lat,
				this.userLocation.lng
			).toFixed(1)
			return `This superb candidate is located ${distance}km away. `
		},
		hireabilityRepresentation() {
			return this.profile.hireable ?
				`${this.profile.login} is hireable, according to GitHub.` :
				`${this.profile.login} is not hireable, accoring to GitHub.`
		},
		representationRepresentation() {
			return this.locationAvailable ?
				`${this.distanceRepresentation}${this.hireabilityRepresentation}` :
				this.hireabilityRepresentation
		},
		locationAvailable() {
			return (
				this.userLocation !== null &&
				this.profile.location !== null
			)
		},
		profileStats() {
			return [
				{ text: 'Repositories', value: this.profile.repoCount },
				{ text: 'Followers', value: this.profile.followerCount },
				{ text: 'Organisations', value: this.profile.orgCount }
			]
		}
	},
	data() {
		return {
			userLocation: null,
		}
	},
	mounted() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.main {
	color: #FFF;
  background-color: #2c3e50;
}

.table--full-width {
	margin-top: 4vh;
	width: 100%;
}

.container {
	display: flex;
	flex-direction: horizontal;
	flex-wrap: wrap;
	margin-top: 5vw;
	padding-bottom: 5vw;
	justify-content: space-around;
}

.column {
	text-align: center;
}

.stat-value {
	flex-basis: 1;
	padding-top: 1vw;
	font-size: 5vw;
}

.hireablity-message {
	padding-top: 5vw;
}

</style>
