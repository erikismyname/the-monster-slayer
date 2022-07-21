<template>
    <section class="container relative">
        <span 
            v-if="isContenderSecondWindActivated" class="second-wind-badge"
        >
            Second Wind
        </span>

        <slot></slot>

        <base-image
            v-if="isContenderMonster"
            :src="monsterImagePath"
            alt="Monster's avatar"
        />
        <div v-else class="player-icons relative">
            <base-image 
                :src="playerImagePath" 
                alt="Player's avatar" 
            />
            <base-image 
                :src="healthPotionImagePath" 
                alt="A health potion" 
            />
            <span id="health-potions-counter">
                {{ contenderHealthPotions }}
            </span>
        </div>

        <health-dashboard-healthbar :contenderHealth="contenderHealth" />
    </section>
</template>

<script>
    import BaseImage from "./BaseImage.vue";
    import HealthDashboardHealthbar from "./HealthDashboardHealthbar.vue";

    export default {
        components: {
            BaseImage,
            HealthDashboardHealthbar,
        },
        props: {
            contenderHealth: {
                type: Number,
                required: true,
            },
            contenderHealthPotions: {
                type: Number,
                required: false,
            },
            hasContenderSecondWind: {
                type: Boolean,
                required: true,
            },
        },
        computed: {
            isContenderSecondWindActivated() {
                return this.hasContenderSecondWind;
            },
            isContenderMonster() {
                return !this.contenderHealthPotions;
            },
            monsterImagePath() {
                return require("../assets/monster.jpg");
            },
            playerImagePath() {
                return require("../assets/player.jpg");
            },
            healthPotionImagePath() {
                return require("../assets/health-potion.jpg");
            },
        },
    };
</script>

<style scoped>
    .relative {
        position: relative;
    }

    .second-wind-badge,
    #health-potions-counter {
        position: absolute;
    }

    .second-wind-badge {
        top: 0;
        right: 0;
        transform: rotateZ(45deg) translateX(2.2rem) translateY(-0.3rem);
        width: 8rem;
        padding: 0.1rem;
    }

    h2,
    .player-icons {
        display: inline-block;
    }

    h2 {
        vertical-align: middle;
        margin-right: 0.3rem;
    }

    #health-potions-counter {
        right: .3rem;
        top: -.2rem;
        border-radius: 50%;
        width: 1rem;
        font-size: 0.6rem;
    }
</style>