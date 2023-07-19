<template>
    <section v-if="toyToEdit" class="toy-edit">
        <h1>Edit</h1>
        <form class="form">
            <div class="form-control">
                <label for="txt" class="form-label">Toy Name</label>
                <input required v-model="toyToEdit.name" id="txt" type="text" class="form-input"
                    placeholder="Enter toy name..." />
            </div>
            <div class="form-control">
                <label for="price" class="form-label">Toy Price</label>
                <input required v-model.number="toyToEdit.price" id="price" type="number" class="form-input" />
            </div>
            <div class="select-labels">
                <el-select v-model="toyToEdit.labels" multiple collapse-tags placeholder="Choose labels">
                    <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
                </el-select>
            </div>
            <div class="btn-group">
                <button @click="saveToy" class="btn btn-info">save</button>
                <button @click="goBack" class="btn btn-danger-text">
                    go back
                </button>
            </div>
        </form>
    </section>
</template>

<script>
import { toyService } from '../services/toy-service'

export default {
    name: 'toy-edit',
    data() {
        return {
            toyToEdit: null,
        }
    },
    created() {
        const { id } = this.$route.params
        if (id) {
            toyService.getById(id).then(toy => {
                this.toyToEdit = toy
            })
        } else this.toyToEdit = toyService.getEmptyToy()
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
        saveToy() {
            console.log(this.toyToEdit)
            this.$store
                .dispatch({ type: 'saveToy', toy: this.toyToEdit })
                .then(() => {
                    this.$router.push('/toy')
                })
        },
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },
    },
}
</script>
