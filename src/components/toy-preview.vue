<template>
    <li class="toy-preview">
        <custom-card>
            <template #header>
                <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
                <p>
                    <span class="fw-bold">Price:</span>
                    {{ $filters.currencyUSD(toy.price) }}
                </p>
            </template>
            <div class="toy-labels flex gap-1">
                <span v-for="label in toy.labels" :key="label">
                    <!-- #{{ label }} -->
                    <el-tag class="ml-2" size="small" type="warning">{{ label }}</el-tag>
                </span>
            </div>
            <template #footer>
                <div class="flex">
                    <!-- <button @click="goToEdit" class="btn btn-primary">
                        edit
                    </button>
                    <button @click="goToDetail" class="btn btn-info">
                        details
                    </button>
                    <button @click="removeToy(toy._id)" class="btn btn-danger">
                        delete
                    </button> -->
                    <el-button type="primary" @click="goToEdit">Edit</el-button>
                    <el-button type="success" @click="goToDetail">Details</el-button>
                    <el-button type="danger" @click="removeToy(toy._id)">Delete</el-button>
                </div>
            </template>
        </custom-card>
    </li>
</template>

<script>
import customCard from './custom-card.vue'

export default {
    name: 'toy-preview',
    props: {
        toy: Object,
    },
    components: {
        customCard,
    },
    methods: {
        goToDetail() {
            this.$router.push(`/toy/${this.toy._id}`)
        },
        goToEdit() {
            this.$router.push(`/toy/edit/${this.toy._id}`)
        },
        removeToy(toyId) {
            this.$emit('removeToy', toyId)
        },
    },
}
</script>
