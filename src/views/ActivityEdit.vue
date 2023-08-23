<template>
    <section class="activity-edit">
        <h1>Activity</h1>
        <form class="form">
            <div class="form-control">
                <label for="txt" class="form-label">What ?</label>
                <input required v-model="activityToEdit.title" id="txt" type="text" class="form-input"
                    placeholder="Enter activity name..." />

                <label for="date" class="form-label">When ?</label>
                <input required v-model="activityToEdit.date" id="date" type="date" class="form-input" />

                <label for="time" class="form-label">In with time ? ?</label>
                <el-time-picker v-model="activityToEdit.time" arrow-control id="time" placeholder="pik a time" />
                <br>
                <label for="location" class="form-label">Let as know were ?</label>
                <input required v-model="activityToEdit.location" id="location" type="text" class="form-input"
                    placeholder="location..." />
                <label for="ditails" class="form-label">More ditails ?</label>
                <input required v-model="activityToEdit.ditails" id="ditails" type="text" class="form-input"
                    placeholder="Ditails..." />
            </div>
            <div class="select-labels">
                <el-select v-model="activityToEdit.labels" multiple collapse-tags placeholder="Choose labels">
                    <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
                </el-select>
            </div>
            <div class="btn-group">
                <button @click="saveActivity" class="btn btn-info">save</button>
                <button @click="goBack" class="btn btn-danger-text">
                    go back
                </button>
            </div>
        </form>
    </section>
</template>

<script>
import { activityService } from '../services/activity-service'

export default {
    name: 'ActivityEdit',
    data() {
        return {
            activityToEdit: null,
        }
    },
    created() {
        const { id } = this.$route.params
        if (id) {
            activityService.getById(id).then(activity => {
                this.activityToEdit = activity
            })
        } else this.activityToEdit = activityService.getEmptyActivity()
    },
    methods: {
        goBack() {
            this.$router.push('/activity')
        },
        saveActivity() {
            console.log('activityToEdit line 60', this.activityToEdit)
            this.$store
                .dispatch({ type: 'saveActivity', activity: this.activityToEdit })
                .then(() => {
                    this.$router.push('/activity')
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

<style lang="scss" scoped>
.activity-edit {
    margin-block: 1rem;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        font-size: 2rem;
    }

    & .form {
        font-size: 1.5rem;

        & .form-control {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        & input {
            height: 2rem;
            padding: 5px;
            margin: 5px;
            width: 100%;
        }

        & .select-labels {
            margin-block: 0.8rem;
        }

        & button {
            margin-inline: 5px;
            height: 2rem;
            width: 250px;
            border: none;
            color: #fff;
            background-color: #007bff;
            border-radius: 2px;

        }
    }

}
</style>
