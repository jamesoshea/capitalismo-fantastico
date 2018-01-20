<template>
  <div id="app">
    <header>
      <h1>search for a user on github</h1>
      <input type="text" v-model="userName" @keydown="sendQuery"> 
    </header>
    <UserMain
      v-if="queryData"
      :avatarUrl="queryData.photoUrl"
      :userName="queryData.login"
      :score="queryData.repoScore"
    />
    <UserInfo
      v-if="queryData"
      :hireable="queryData.hireable"
      :location="queryData.location"
    />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserMain from './components/UserMain.vue'
import UserInfo from './components/UserInfo.vue'

export default {
  name: 'app',
  components: {
    UserMain,
    UserInfo
  },
  computed: {
    linkRepresentation() {
      return `https://github.com/${this.queryData.login}`
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      queryData: null,
      userName: ''
    }
  },
  mounted() {

  },
  methods: {
    sendQuery(e) {
      if(e.keyCode === 13) {
        axios.get(`http://localhost:3000/user/${this.userName}`)
          .then(queryData => {
            this.queryData = queryData.data
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
*, html {
    margin:0;
    padding:0;  
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  padding: 5vh 0 5vh 0;
  color: #FFF;
  background-color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

input {
  margin-top: 2vh;
  text-align: center;
  color: #FFF;
  background-color: #2c3e50;
  font-size: 4vh;
  border: 0
}

a {
  color: #42b983;
}
</style>
