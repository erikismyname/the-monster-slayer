Vue.component('health-status', {
    props: {
        id: {
            type: String,
            required: true
        },
        health: {
            type: Number,
            required: true
        },
    },
    computed: {
        healthbarWidth() {
            return { width: (this.health > 0 ? this.health : 0) + '%' };
        },
    },
    template: `
        <section :id="id" class="container">
            <slot></slot>
            <div class="healthbar">
                <div class="healthbar-status" :style="healthbarWidth"></div>
            </div>
        </section>
    `
});

new Vue({
    el: 'main',
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentGameRound: 0
        };
    },
    computed: {
        isCurrentGameRoundNotDivisibleByThree() {
            return this.currentGameRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster(isSpecial) {
            this.monsterHealth -= isSpecial ? getRandomValueBetween(9, 14) : getRandomValueBetween(5, 10);
            this.attackPlayer();
        },
        attackPlayer() {
            this.playerHealth -= getRandomValueBetween(7, 12);
            this.currentGameRound++;
        },
        healPlayer() {
            const healValue = getRandomValueBetween(8, 11);

            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }

            this.playerHealth += healValue;
            this.attackPlayer();
        }
    }
});

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}