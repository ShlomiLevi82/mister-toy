<template>
    <section v-if="loggedinUser" class="user-page">

        <h1> usr page</h1>
        hello {{ }}
        <button @click="onLogout()">Logout</button>
    </section>
</template>

<script>

export default {
    name: 'UserPage',

    data() {
        return {
            user: null,
        }
    },
    methods: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        onLogout() {
            userService.logout()
            this.$router.push("/")
            setTimeout(() => {
                location.reload()
            }, 100)
        },
    }
}
</script>

<style lang="scss" scoped>
.user-page {
    grid-column: 2;
}
</style>
