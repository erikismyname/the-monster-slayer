<template>
    <div class="healthbar">
        <div
            class="healthbar-status"
            :class="contenderHealthbarLevelClass"
            :style="contenderHealthbarWidthStyle"
        ></div>
        <span class="healthbar-percentage">{{ contenderHealth }}%</span>
    </div>
</template>

<script>
    export default {
        props: {
            contenderHealth: {
                type: Number,
                required: true,
            },
        },
        computed: {
            contenderHealthbarLevelClass() {
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

    .healthbar-percentage {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
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