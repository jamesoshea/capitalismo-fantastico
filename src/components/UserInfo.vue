<template>
	<div class="container">
		<p 
			class="hireablity-message"
			v-text="representationRepresentation"
		/>
		<p class="hireablity-message">
			
		</p>
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

.container {
	min-height: 20vh;
	color: #FFF;
  background-color: #2c3e50;
}

.hireablity-message {
	padding-top: 5vw;
}

</style>
