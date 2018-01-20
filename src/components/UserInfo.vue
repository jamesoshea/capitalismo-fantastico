<template>
	<div class="container">
		<p v-if="locationAvailable" v-text="distanceRepresentation" />
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
			return `This person is located ${distance}km away.`
		}
	},
	data() {
		return {
			locationAvailable: false,
			userLocation: {},
		}
	},
	mounted() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.userLocation.lat = position.coords.latitude
				this.userLocation.lng = position.coords.longitude
				this.locationAvailable = true
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

</style>
