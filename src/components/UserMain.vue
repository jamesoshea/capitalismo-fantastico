<template>
	<div class="container">
		<div class="avatar">
			<img class="avatar__img":src="profile.photoUrl" :alt="profile.login">
		</div>
		<div class="user-information">
			<div class="user-information__name" v-text="profile.login" />
			<div class="user-information__score" v-text="scoreRepresentation" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserMain',
	props: {
		profile: {
			type: Object,
			required: true
		}
	},
	computed: {
		scoreRepresentation() {
			return `score: ${this.profile.repoScore}`
		}
	}
}
</script>

<style lang="scss" scoped>

.container {
	display: flex;
	flex-direction: horizontal;
}

.avatar {
	text-align: center;
	flex-basis: 40vw;
}

.avatar__img {
	margin-top: 5vw;
	margin-bottom: 5vw;
	height: 20vw;
	border-radius: 15vw;
}

.user-information {
	text-align: center;
	width: 60vw;
}

.user-information__name {
	margin-top: 5vw;
	font-size: 5vw;
}

.user-information__score {
	margin-top: 5vw;
	font-size: 10vw;
}

</style>
