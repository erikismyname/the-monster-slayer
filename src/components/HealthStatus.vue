<template>
    <section :id="id" class="container">
        <img
            v-if="isMonsterAvatar"
            src="./assets/monster.jpg"
            alt="Monster's avatar"
            class="avatar monster"
        />
        <div v-else>
            <img
                src="./assets/player.jpg"
                alt="Player's avatar"
                class="avatar player"
            />
            <img
                src="./assets/health-potion.jpg"
                alt="A health potion"
                id="health-potion"
            />
            <span id="health-potion-counter">{{ playerHealthPotions }}</span>
        </div>

        <span v-if="isSecondWindActivated" class="second-wind"
            >Second Wind</span
        >

        <slot></slot>

        <div class="healthbar">
            <div
                class="healthbar-status"
                :class="healthbarLevelClass"
                :style="healthbarWidthStyle"
            ></div>
            <span class="healthbar-percentage">{{ health }}%</span>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            health: {
                type: Number,
                required: true,
            },
            playerHealthPotions: {
                type: Number,
            },
            secondWind: {
                type: Boolean,
                required: true,
            },
        },
        computed: {
            isMonsterAvatar() {
                return this.id === "monster";
            },
            healthbarLevelClass() {
                return {
                    high: this.health > 50,
                    medium: this.health > 25 && this.health <= 50,
                    low: this.health <= 25,
                };
            },
            healthbarWidthStyle() {
                return { width: (this.health > 0 ? this.health : 0) + "%" };
            },
            isSecondWindActivated() {
                return this.secondWind;
            },
        },
    };
</script>

<style>
</style>