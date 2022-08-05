<template>
    <base-span
        v-if="hasContenderSecondWind"
        class="second-wind-badge"
        data-testid="second-wind-badge"
    >
        Second Wind
    </base-span>
</template>

<script>
    import BaseSpan from "@/components/common/BaseSpan";

    export default {
        components: {
            BaseSpan,
        },
        props: {
            hasContenderSecondWind: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>