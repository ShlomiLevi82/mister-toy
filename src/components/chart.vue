<template>
    <DoughnutChart :chartData="testData" />
</template>

<script lang="ts">
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
    name: 'Home',
    components: { DoughnutChart },
    data() {
        return {
            testData: {
                labels: ['Doll', 'Baby', 'Puzzle', 'Art', 'Outdoor',],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: [
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
                    },
                ],
            },
        }
    },
}
</script>
