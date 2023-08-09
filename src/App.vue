<template>
    <section class="app-container ">
        <app-header />
        <router-view />
        <app-footer />
    </section>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import UserMsg from "./components/UserMsg.vue";

import { store } from './store/index'
export default {
    name: 'App',
    created() {
        console.log('Vue App created')
        const user = userService.getLoggedinUser()
        if (user) store.commit({ type: 'setLoggedinUser', user })
        this.$store.dispatch({ type: 'loadActivitys' })
    },
    components: {
        AppHeader,
        AppFooter,
        UserMsg
    },
}
</script>
<style lang="scss" >
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.app-container {
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    grid-template-rows: auto 1fr auto;
    grid-column: 2;
    min-height: 100vh;

}
</style>