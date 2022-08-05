<template>
    <div class="healthbar">
        <div
            class="healthbar-status"
            :class="contenderHealthbarStatusClass"
            :style="contenderHealthbarWidthStyle"
            data-testid="healthbar-status"
        ></div>
        <base-span
            class="healthbar-percentage"
            data-testid="healthbar-percentage"
        >
            {{ contenderHealth }}%
        </base-span>
    </div>
</template>

<script>
    import BaseSpan from "@/components/common/BaseSpan";

    export default {
        components: {
            BaseSpan,
        },
        props: {
            contenderHealth: {
                type: Number,
                required: true,
            },
        },
        computed: {
            contenderHealthbarStatusClass() {
                return {
                    high: this.contenderHealth > 50,
                    medium: this.contenderHealth > 25 && this.contenderHealth <= 50,
                    low: this.contenderHealth <= 25,
                };
            },
            contenderHealthbarWidthStyle() {
                return {
                    width:
                        (this.contenderHealth >= 0 ? this.contenderHealth : 0) +
                        "%",
                };
            },
        },
    };
</script>

<style scoped>
    .healthbar {
        position: relative;
        height: 2rem;
        margin-top: 1rem;
        border: 0.1rem solid black;
    }

    .healthbar-status {
        height: 100%;
        transition: width 500ms ease-out;
    }

    .high {
        background-color: #006400;
    }

    .medium {
        background-color: #ff8c00;
    }

    .low {
        background-color: #880808;
    }
</style>