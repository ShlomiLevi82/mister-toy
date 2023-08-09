<template>
    <section v-if="activitys" class="dashboard">
        <h3>Average Price by type</h3>
        <chart :data="pricesData" />
        <h3>Stock by type</h3>
        <chart :data="stockData" />
    </section>
</template>

<script>
import chart from '@/components/chart.vue'
export default {
    components: {
        chart,
    },
    async created() {
        await this.$store.dispatch({ type: 'loadActivitys' })
    },
    computed: {
        activitys() {
            return this.$store.getters.activitys
        },
        labels() {
            return this.$store.getters.labels
        },
        titles() {
            return this.labels.map(label => label.title)
        },
        colors() {
            return this.labels.map(label => label.color)
        },
        pricesData() {
            const data = this.labels.map(label => {
                const filteredActivitys = this.activitys.filter(activity =>
                    activity.labels.map(label => label.title).includes(label.title)
                )
                return filteredActivitys.reduce(
                    (avgPrice, activity) => avgPrice + activity.price / filteredActivitys.length,
                    0
                )
            })

            return {
                labels: this.titles,
                datasets: [
                    {
                        label: 'Price Avg',
                        borderRadius: 6,
                        data,
                        backgroundColor: this.colors,
                    },
                ],
            }
        },
        stockData() {
            const data = this.labels.map(label => {
                return this.activitys.reduce(
                    (acc, activity) =>
                        activity.labels.map(label => label.title).includes(label.title) &&
                            activity.inStock
                            ? acc + 1
                            : acc,
                    0
                )
            })
            return {
                labels: this.titles,
                datasets: [
                    {
                        label: 'Stock Data',
                        borderRadius: 6,
                        data,
                        backgroundColor: this.colors,
                    },
                ],
            }
        },
    },
}
</script>

<style></style>
