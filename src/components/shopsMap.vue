<template>
    <GMapMap
        :center="center"
        :zoom="10"
        map-type-id="terrain"
        style="width: 100%; height: 600px"
    >
        <GMapCluster>
            <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
            />
        </GMapCluster>
    </GMapMap>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            center: { lat: 31.771959, lng: 35.217018 },
            markers: [
                {
                    position: {
                        lat: 31.771959,
                        lng: 35.217018,
                    },
                },
                {
                    position: {
                        lat: 31.801447,
                        lng: 34.643497,
                    },
                },
                {
                    position: {
                        lat: 32.093869,
                        lng: 34.882401,
                    },
                },
            ],
        }
    },
}
</script>
