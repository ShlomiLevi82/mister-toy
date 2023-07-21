<template>
  <section class="main-home">
    <h1>Welcom</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti id dolorum, illo nesciunt totam suscipit eveniet
      tempora velit recusandae repudiandae quae, impedit distinctio accusamus ducimus?
    </p>
  </section>
  <section class="login">
    <form @submit="login()">
      <h1>Login</h1>
      <div>
        <input type="string" placeholder="Username" v-model="username">
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div v-if="error">
        {{ error }}
      </div>
      <div v-if="success" id="success">
        Logged in Successfully
      </div>
      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      username: "",
      password: "",
      error: null,
      success: false
    };
  },
  methods: {
    login() {
      const auth = { username: this.username, password: this.password };
      this.error = null;
      try {
        console.log('auth', auth);
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>
