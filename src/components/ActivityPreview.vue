<template>
    <li class="activity-preview">
        <custom-card>
            <template #header>
                <!-- <div class="user-img"> -->
                <!-- <img src="../assets/imgs/User-Profile-PNG.png" alt=""> -->
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <!-- </div> -->
                <p><span class="fw-bold">What ?</span> {{ activity.title }}</p>
                <p>
                    <span class="fw-bold">When ?</span>
                    {{ activity.date }} @ {{ activity.time }}
                </p>
            </template>
            <p> Where ? {{ activity.location }}</p>
            <div class="activity-labels flex gap-1">
                <span v-for="label in activity.labels" :key="label">
                    <el-tag class="ml-2" size="small" type="warning">{{ label }}</el-tag>
                </span>
            </div>
            <template #footer>
                <div class="flex">
                    <el-button type="primary" @click="goToEdit">Edit</el-button>
                    <el-button type="success" @click="goToDetail">Details</el-button>
                    <el-button type="danger" @click="removeActivity(activity._id)">Delete</el-button>
                </div>
            </template>
        </custom-card>
    </li>
</template>

<script>
import customCard from './custom-card.vue'

export default {
    name: 'ActivityPreview',
    props: {
        activity: Object,
    },
    components: {
        customCard,
    },
    methods: {

        goToDetail() {
            this.$router.push(`/activity/${this.activity._id}`)
        },
        goToEdit() {
            this.$router.push(`/activity/edit/${this.activity._id}`)
        },
        removeActivity(activityId) {
            this.$emit('removeActivity', activityId)
        },
    },
}
</script>

<style lang="scss" scoped>
.activity-preview {
    min-width: fit-content;
    max-width: 900px;
    margin: auto;
    list-style-type: none;
    margin-block-end: 1rem;
    box-shadow: 2px 3px 5px 2px #c7c5f2;
    transition: 0.3s ease-in-out;

    &:hover {
        scale: 1.1;
    }
}
</style>
