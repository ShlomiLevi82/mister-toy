<template>
    <section class="toy-filter flex gap-2">
        <el-input v-model="filterBy.name" placeholder="Search toy..." @input="setFilter" />

        <el-button round @click="inStockFilter">
            <span v-if="!filterBy.inStock">Show only toys in stock</span>
            <span v-else>Show all toys</span>
        </el-button>

        <el-select v-model="filterBy.labels" @change="setFilter" multiple collapse-tags placeholder="Filter labels">
            <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
        </el-select>
        <div class="sort-toys">

            <el-select v-model="filterBy.sortBy" clearable placeholder="Sort" @change="setFilter">
                <el-option v-for="item in sortOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </section>
</template>

<script>
export default {
    name: 'toy-filter',
    created() {
        // this.filter = utilService.debounce(this.filter)
    },
    data() {
        return {
            filterBy: {
                name: '',
                inStock: false,
                labels: [],
                sortBy: '',
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)))
        },
        inStockFilter() {
            this.filterBy.inStock = !this.filterBy.inStock
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
                    value: 'createdAt -1',
                    label: 'Newest Arrivals',
                },
                {
                    value: 'price 1',
                    label: 'Price: Low to high',
                },
                {
                    value: 'price -1',
                    label: 'Price: High to low',
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
