<template>
  <section class="main-container">
    <section class="main-home">
      <img src="../assets/imgs/children-playing-outside-vector.jpg" alt="">
    </section>
    <section class="login">
      <form @submit.prevent="doLogin">
        <h1>Busy Todlers</h1>
        <div>
          <input type="string" placeholder="User name" v-model="loginCred.username">
        </div>
        <div>
          <input type="password" placeholder="Password" v-model="loginCred.password">
        </div>
        <button>Log in</button>

        <div class="signup">
          <p>Don't have an account? <router-link class="link" to="/join">Sign up</router-link></p>
        </div>
        <div v-if="error">
          {{ error }}
        </div>
        <div v-if="success" id="success">
          Logged in Successfully
        </div>
      </form>
    </section>
  </section>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      loginCred: {
        username: 'shlomi',
        password: '123'
      },
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/activity')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  margin-block-start: 5rem;
  margin-inline: auto;
  grid-column: 2;
  gap: 1rem;

  & .main-home {
    @media(max-width:800px) {
      display: none;
    }

    & img {
      max-width: 700px;
    }
  }

  & .login {
    min-width: 490px;
    border: 1px solid #dbdbdb;
    border-radius: 2px;
    height: fit-content;
    font-family: Arial, Helvetica, sans-serif;


    @media(max-width:800px) {
      margin-inline: auto;
      margin-block: auto;
    }

    & form {
      display: grid;
      justify-items: center;
      gap: 1rem;
      padding: 2.5rem;

      & h1 {
        font-size: 4rem;
        margin-block-end: 4rem;
        font-weight: 400;
      }

      & input {
        height: 36px;
        width: 250px;
        padding-inline: 8px;
      }

      & button {
        height: 2rem;
        width: 250px;
        border: none;
        color: #fff;
        background-color: #007bff;
        border-radius: 2px;
      }

      & p {
        font-size: 1rem;
        font-family: Arial, Helvetica, sans-serif;

        & .link {
          text-decoration: none;
          color: #007bff;
        }
      }
    }
  }


}
</style>