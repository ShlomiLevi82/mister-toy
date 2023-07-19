<template>
    <section class="toy-app container flex flex-col gap-1">
        <button @click="goToEdit" class="btn">Add a new toy</button>
        <!-- <el-button @click="goToEdit" >Add a new toy</el-button> -->
        <toy-filter @setFilter="setFilter"/>
        <toy-list v-if="toys" :toys="toys" @removeToy="removeToy" />
    </section>
</template>

<script>
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'

export default {
    name: 'toy-app',
    methods: {
        removeToy(carId) {
            this.$store.dispatch({ type: 'removeToy', id: carId })
        },
        goToEdit() {
            this.$router.push(`/toy/edit`)
        },
        setFilter(filterBy) {
            console.log(filterBy)
            // this.$store.commit({ type: 'setFilter', filterBy })
            this.$store.dispatch({ type: 'setFilter', filterBy })
        },
    },
    computed: {
        toys() {
            return this.$store.getters.filteredToys
        },
    },
    components: {
        toyList,
        toyFilter,
    },
}
</script>
