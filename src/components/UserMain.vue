<template>
	<div class="container">
		<div class="avatar">
			<img class="avatar__img":src="avatarUrl" :alt="userName">
		</div>
		<div class="user-information">
			<div class="user-information__name" v-text="userName" />
			<div class="user-information__score" v-text="score" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserMain',
	props: {
		userName: {
			type: String,
			required: true
		},
		score: {
			type: Number,
			required: true
		},
		avatarUrl: {
			type: String,
			required: true
		},
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
