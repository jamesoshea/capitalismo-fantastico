<template>
	<div class="container">
		<p 
			class="hireablity-message"
			v-if="locationAvailable" v-text="representationRepresentation"
		/>
		<p class="hireablity-message">
			more info
		</p>
	</div>
</template>

<script>
import distanceUtil from '../util/distanceUtil'

export default {
	props: {
		hireable: {
			type: Boolean,
			required: true
		},
		location: {
			type: Object,
			required: true
		}
	},
	computed: {
		distanceRepresentation() {
			const distance = distanceUtil.getDistanceFromLatLonInKm(
				this.location.lat,
				this.location.lng,
				this.userLocation.lat,
				this.userLocation.lng
			).toFixed(1)
			return `This person is located ${distance}km away`
		},
		hireabilityRepresentation() {
			return this.hireable ?
				', and they are hireable, according to GitHub.' :
				', but they are not hireable, accoring to GitHub.'
		},
		representationRepresentation() {
			return `${this.distanceRepresentation}${this.hireabilityRepresentation}`
		},
		locationAvailable() {
			return Boolean(Object.keys(this.location).length !== 0 && Object.keys(this.userLocation).length !== 0)
		}
	},
	data() {
		return {
			userLocation: {},
		}
	},
	mounted() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.userLocation.lat = position.coords.latitude
				this.userLocation.lng = position.coords.longitude
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
