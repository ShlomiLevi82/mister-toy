<template>
    <section v-if="activity" class="activity-details flex flex-col items-center gap-2">
        <article>
            <p><span class="fw-bold">Event </span> {{ activity.title }}</p>
            <p>
                <span class="fw-bold">Date </span>
                {{ activity.date }}
            </p>
            <p>Ditails</p>
            <div class="activity-labels">
                <span v-for="label in activity.labels" :key="label">
                    #{{ label }}
                </span>
            </div>
        </article>
        <article class="reviews">
            <h3>Comment:</h3>
            <div class="review" v-for="review in activity.reviews" :key="review + activity._id">{{ review }}</div>
        </article>
        <button @click="goBack" class="btn go-back">go back</button>
    </section>
</template>
<script>
import { activityService } from '../services/activity-service.js'

export default {
    name: 'ActivityDetails',
    data() {
        return {
            activity: null,
        }
    },
    created() {
        const { id } = this.$route.params
        activityService.getById(id).then(activity => {
            this.activity = activity
        })
    },
    methods: {
        goBack() {
            this.$router.push('/activity')
        },
    },
}
</script>
<style></style>
