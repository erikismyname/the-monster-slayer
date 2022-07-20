<template>
    <section class="container">
        <base-image
            v-if="isContenderMonster"
            :src="monsterImagePath"
            :alt="monsterImageAlt"
            class="avatar monster"
        />
        <div v-else>
            <base-image
                :src="playerImagePath"
                :alt="playerImageAlt"
                class="avatar player"
            />
            <base-image
                :src="healthPotionImagePath"
                :alt="healthPotionImageAlt"
                id="health-potion"
            />
            <span id="health-potion-counter">
                {{ contenderHealthPotions }}
            </span>
        </div>

        <span v-if="isContenderSecondWindActivated" class="second-wind">
            Second Wind
        </span>

        <slot></slot>

        <div class="healthbar">
            <div
                class="healthbar-status"
                :class="contenderHealthbarLevelClass"
                :style="contenderHealthbarWidthStyle"
            ></div>
            <span class="healthbar-percentage">{{ contenderHealth }}%</span>
        </div>
    </section>
</template>

<script>
    import BaseImage from "./BaseImage.vue";

    export default {
        components: {
            BaseImage,
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
            isContenderMonster() {
                return !this.contenderHealthPotions;
            },
            monsterImagePath() {
                return require("../assets/monster.jpg");
            },
            monsterImageAlt() {
                return "Monster's avatar";
            },
            playerImagePath() {
                return require("../assets/player.jpg");
            },
            playerImageAlt() {
                return "Player's avatar";
            },
            healthPotionImagePath() {
                return require("../assets/health-potion.jpg");
            },
            healthPotionImageAlt() {
                return "A health potion";
            },
            isContenderSecondWindActivated() {
                return this.hasContenderSecondWind;
            },
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
                        (this.contenderHealth > 0 ? this.contenderHealth : 0) + "%",
                };
            },
        },
    };
</script>

<style>
</style>