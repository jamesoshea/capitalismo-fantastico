<template>
  <div id="app">
    <h1>search for a user on github</h1>
    <input type="text" v-model="userName" @keydown="sendQuery">
    <div v-if="response">
      <h4>username</h4>
      <a :href="linkRepresentation">
        <p v-text="response.login" />
      </a>
      <h4>repositories</h4>
      <p v-text="response.repoCount" />
      <h4>followers</h4>
      <p v-text="response.followerCount" />
      <h4>repositories</h4>
      <p v-text="response.repoCount" />
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  computed: {
    linkRepresentation() {
      return `https://github.com/${this.response.login}`
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      response: null,
      userName: ''
    }
  },
  mounted() {

  },
  methods: {
    sendQuery(e) {
      if(e.keyCode === 13) {
        console.log('hello')
        axios.get(`http://localhost:3000/user/${this.userName}`)
          .then(response => {
            this.response = response.data
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
