<template>
  <div class="home">
    <div class="content">
      <h1>Hai...there</h1>
      <p>
        Welcome to our application! Our mission is to provide the best user
        experience. We are constantly improving and updating our services to
        meet the needs of our users.
      </p>
      <p>
        This app is built using the latest web technologies including
        <b>Vue.js, Vue Router, Vuex, and Axios</b>.
      </p>
      <p>
        We hope you enjoy using our application. If you have any feedback, feel
        free to reach out to us.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh
}

.content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
}

div.content {
  margin: -120px 0 0 120px;
}

img {
  width: 150px;
  margin-bottom: 20px;
}

h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
  line-height: 1.5;
}
</style>