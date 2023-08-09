<template>
  <section class="main-container">
    <section class="main-home">
      <img src="../assets/imgs/children-playing-outside-vector.jpg" alt="">
    </section>
    <section class="login">
      <form @submit.prevent="login">
        <h1>Busy Todlers</h1>
        <div>
          <input type="string" placeholder="Username" v-model="credentials.username">
        </div>
        <div>
          <input type="password" placeholder="Password" v-model="credentials.password">
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
import { userService } from '../services/user.service'

export default {
  name: 'Home',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  created() {
    const user = userService.getLoggedinUser()
    console.log("🚀 ~ file: home.vue:46 ~ created ~ user:", user)
    if (user) {
      this.$store.commit({ type: 'login', user })
      this.$router.push('/activity')
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({
          type: 'login',
          credentials: this.credentials,
        })
        this.$router.push('/activity')
      } catch (err) {
        console.log('Something went wrong')
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