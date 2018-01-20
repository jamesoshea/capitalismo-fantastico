<template>
	<div class="container">
		<div class="avatar">
			<img class="avatar__img":src="profile.photoUrl" :alt="profile.login">
		</div>
		<div class="user-information">
			<a :href="linkRepresentation" target="blank">
				<p class="user-information__name" v-text="profile.login" />
			</a>
			<a href="#how-calculated" class="unstyled-link">
				<p class="user-information__score" v-text="scoreRepresentation" />
			</a>
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
		},
		linkRepresentation() {
			return `https://github.com/${this.profile.login}`
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

.unstyled-link {
	text-decoration: none;
	color: inherit;
}

</style>
