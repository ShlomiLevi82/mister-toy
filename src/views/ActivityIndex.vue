<template>
    <section class="activity-app ">
        <button @click="goToEdit" class="btn">Creat activity</button>
        <!-- <el-button @click="goToEdit" >Add a new activity</el-button> -->
        <activity-filter @setFilter="setFilter" />
        <activity-list v-if="activitys" :activitys="activitys" @removeActivity="removeActivity" />
    </section>
</template>

<script>
import ActivityFilter from '../components/ActivityFilter.vue'
import ActivityList from '../components/ActivityList.vue'

export default {
    name: 'ActivityIndex',
    methods: {
        removeActivity(carId) {
            this.$store.dispatch({ type: 'removeActivity', id: carId })
        },
        goToEdit() {
            this.$router.push(`/activity/edit`)
        },
        setFilter(filterBy) {
            console.log(filterBy)
            this.$store.commit({ type: 'setFilter', filterBy })
            this.$store.dispatch({ type: 'setFilter', filterBy })
        },
    },
    computed: {
        activitys() {
            console.log("🚀 ~ file: ActivityIndex.vue:32 ~ activitys ~ this.$store.getters.filteredActivitys:", this.$store.getters.filteredActivitys)
            return this.$store.getters.filteredActivitys
        },
    },
    components: {
        ActivityList,
        ActivityFilter,
    },
}
</script>

<style lang="scss" scoped>
.activity-app {
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    grid-column: 1/-1;
    margin-inline: auto;

    &>* {
        grid-column: 2;
    }

    & .btn {
        font-size: 2rem;
        margin-block: 1rem;
        border: none;
        color: #fff;
        background-color: #007bff;
        border-radius: 200px;
        padding-inline: 1rem;
        padding-block: 0.5rem;
        cursor: pointer;
        transition: 0.1s linear;
        width: 15rem;

        &:hover {
            box-shadow: 2px 4px 2px 0 #797d81;
            background-color: #007bffd6;

        }
    }
}
</style>