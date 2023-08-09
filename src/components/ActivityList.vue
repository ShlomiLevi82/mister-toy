<template>
    <ul class="activity-list ">
        <activity-preview @removeActivity="removeActivity" v-for="activity in activitys" :activity="activity"
            :key="activity._id" />
    </ul>
    <!-- <pre>{{ activitys }}</pre> -->
</template>

<script>
import ActivityPreview from './ActivityPreview.vue'

export default {
    props: {
        activitys: {
            type: Array,
            required: true,
        },
    },
    components: {
        ActivityPreview,
    },
    methods: {
        removeActivity(activityId) {
            this.$emit('removeActivity', activityId)
        },
    },
}
</script>
