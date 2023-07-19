<template>
    <section class="flex flex-col gap-2 justify-center">
        <h2>My dashboard</h2>
        <chart />
    </section>
</template>

<script>
import chart from '../components/chart.vue'

export default {
    name: 'dashboard',
    data() {
        return {}
    },
    computed: {
        toys() {
            return this.$store.getters.filteredToys
        },
        labels() {
            return this.$store.getters.labels
        },
    },
    components: {
        chart,
    },
}
</script>

<style></style>
