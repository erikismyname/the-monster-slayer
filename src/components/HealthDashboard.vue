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

<style scoped>
    .avatar,
    #health-potion {
        position: absolute;
        height: 2.5rem;
    }

    .avatar.monster {
        right: 13rem;
        top: 1.9rem;
    }

    .avatar.player {
        right: 13.6rem;
        top: 2rem;
    }

    #health-potion {
        right: 11rem;
    }

    #health-potion-counter {
        position: absolute;
        right: 11.5rem;
        top: 1.5rem;
        color: white;
        background-color: black;
        border-radius: 50%;
        width: 1rem;
        font-size: 0.6rem;
    }

    .second-wind {
        position: absolute;
        top: 0;
        right: 0px;
        background-color: black;
        color: white;
        padding: 0.1rem;
        transform: rotateZ(45deg) translateX(2.2rem) translateY(-0.3rem);
        width: 8rem;
    }

    .healthbar {
        height: 2rem;
        border: 0.1rem solid black;
        position: relative;
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