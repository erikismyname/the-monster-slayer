<template>
    <span v-if="hasContenderSecondWind" class="second-wind-badge">
        Second Wind
    </span>
</template>

<script>
    export default {
        props: {
            hasContenderSecondWind: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>

<style scoped>
    .second-wind-badge {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotateZ(45deg) translateX(2.2rem) translateY(-0.3rem);
        width: 8rem;
        padding: 0.1rem;
    }
</style>