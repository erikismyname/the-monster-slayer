<template>
    <section :class="classes">
        <contenders-dashboard-card-second-wind-badge
            :has-contender-second-wind="hasContenderSecondWind"
        />

        <base-h2 
            class="contender"
            data-testid="contender"    
        >
            {{ contenderName }}
        </base-h2>

        <base-image
            v-if="isContenderMonster"
            :src="monsterImagePath"
            alt="Monster's avatar"
            data-testid="monster-avatar"
        />
        <div 
            v-else 
            class="player-icons relative" 
            data-testid="player-icons"
        >
            <base-image
                :src="playerImagePath"
                class="player-avatar"
                alt="Player's avatar"
            />
            <base-image 
                :src="healthPotionImagePath" 
                alt="A health potion" 
            />

            <base-span
                class="health-potions-counter"
                data-testid="health-potions-counter"
            >
                {{ playerHealthPotions }}
            </base-span>
        </div>

        <contenders-dashboard-card-healthbar
            :contenderHealth="contenderHealth"
        />
    </section>
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseH2 from "@/components/common/BaseH2";
    import BaseImage from "@/components/common/BaseImage";
    import BaseSpan from "@/components/common/BaseSpan";
    import ContendersDashboardCardHealthbar from "@/components/ContendersDashboard/ContendersDashboardCardHealthbar";
    import ContendersDashboardCardSecondWindBadge from "@/components/ContendersDashboard/ContendersDashboardCardSecondWindBadge";

    export default {
        components: {
            BaseH2,
            BaseImage,
            BaseSpan,
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
                playerHealth: "health",
                playerHealthPotions: "healthPotions",
                playerName: "name",
            }),
            ...mapGetters("game", ["isDarkModeOn"]),
            classes() {
                return {
                    container: true,
                    relative: true,
                    dark: this.isDarkModeOn,
                };
            },
            isContenderMonster() {
                return this.contender === "monster";
            },
            contenderName() {
                return this.isContenderMonster ? "Monster" : this.playerName;
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
</style>