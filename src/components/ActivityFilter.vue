<template>
    <section class="activity-filter ">
        <el-input v-model="filterBy.title" placeholder="Search activity..." @input="setFilter" />

        <el-button round @click="isActiveFilter">
            <span v-if="!filterBy.isActive">Show only activitys </span>
            <span v-else>Show all activitys</span>
        </el-button>

        <el-select v-model="filterBy.labels" @change="setFilter" multiple collapse-tags placeholder="Filter labels">
            <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
        </el-select>
        <div class="sort-activitys">

            <el-select v-model="filterBy.sortBy" clearable placeholder="Sort" @change="setFilter">
                <el-option v-for="item in sortOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </section>
</template>

<script>

export default {
    name: 'ActivityFilter',
    created() {
        // this.filter = utilService.debounce(this.filter)
    },
    data() {
        return {
            filterBy: {
                title: '',
                isActive: true,
                labels: [],
                sortBy: '',
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)))
        },
        isActiveFilter() {
            this.filterBy.isActive = !this.filterBy.isActive
            this.setFilter()
        },
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },
        sortOpts() {
            return [
                {
                    value: 'date -1',
                    label: 'Nirest avent',
                },
                {
                    value: 'name 1',
                    label: 'Name (A - Z)',
                },
                {
                    value: 'name -1',
                    label: 'Name (Z - A)',
                },
            ]
        },
    },
}
</script>

<style lang="scss" scoped>
.activity-filter {
    margin-inline: auto;
    margin-block-end: 1rem;
    max-width: 1020px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

}
</style>