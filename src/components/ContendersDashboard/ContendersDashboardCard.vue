<template>
    <section 
        :class="theme" 
        class="container relative"
    >
        <contenders-dashboard-card-second-wind-badge
            :has-contender-second-wind="hasContenderSecondWind"
        />

        <slot></slot>

        <base-image
            v-if="isContenderMonster"
            :src="monsterImagePath"
            alt="Monster's avatar"
        />
        <div v-else class="player-icons relative">
            <base-image 
                :src="playerImagePath"
                class="player-avatar" 
                alt="Player's avatar" 
            />
            <base-image 
                :src="healthPotionImagePath" 
                alt="A health potion" 
            />
            <span class="health-potions-counter">
                {{ playerHealthPotions }}
            </span>
        </div>

        <contenders-dashboard-card-healthbar :contenderHealth="contenderHealth" />
    </section>
</template>

<script>
    // use createNamespacedHelpers insead?
    import { mapGetters } from "vuex";

    import BaseImage from "../common/BaseImage.vue";
    import ContendersDashboardCardHealthbar from "./ContendersDashboardCardHealthbar.vue";
    import ContendersDashboardCardSecondWindBadge from "./ContendersDashboardCardSecondWindBadge.vue";

    export default {
        components: {
            BaseImage,
            ContendersDashboardCardHealthbar,
            ContendersDashboardCardSecondWindBadge,
        },
        props: {
            contender: {
                type: String,
                required: true,
            },
        },
        computed: {
            ...mapGetters("monster", {
                hasMonsterSecondWind: "hasSecondWind",
                monsterHealth: "health",
            }),
            ...mapGetters("player", {
                hasPlayerSecondWind: "hasSecondWind",
                playerHealthPotions: "healthPotions",
                playerHealth: "health",
            }),
            ...mapGetters('game', ['theme']),
            isContenderMonster() {
                return this.contender === "monster";
            },
            monsterImagePath() {
                return require("@/assets/monster.jpg");
            },
            playerImagePath() {
                return require("@/assets/player.jpg");
            },
            healthPotionImagePath() {
                return require("@/assets/health-potion.jpg");
            },
            hasContenderSecondWind() {
                return this.isContenderMonster
                    ? this.hasMonsterSecondWind
                    : this.hasPlayerSecondWind;
            },
            contenderHealth() {
                return this.isContenderMonster
                    ? this.monsterHealth
                    : this.playerHealth;
            },
        },
    };
</script>

<style scoped>
    section {
        overflow: hidden;
    }

    .relative {
        position: relative;
    }

    .player-icons {
        display: inline-block;
        vertical-align: middle;
    }

    .health-potions-counter {
        position: absolute;
    }

    .health-potions-counter {
        right: 0.3rem;
        top: -0.05rem;
        border-radius: 50%;
        width: 1rem;
        font-size: 0.6rem;
    }
</style>