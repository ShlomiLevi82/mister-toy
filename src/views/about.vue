<template>
    <section class="flex flex-col gap-2 justify-center">
        <h2>Our stores</h2>
        <shopsMap class="shops-map" />
    </section>
</template>

<script>

import shopsMap from '../components/shopsMap.vue'

export default {
    name: 'about',
    data() {
        return {}
    },
    components: {
        shopsMap,
    },
}
</script>

<style lang="scss" scoped>
section {
    grid-column: 2;
}
</style>
