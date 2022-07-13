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
            currentGameRound: 0,
            winner: null
        };
    },
    computed: {
        isCurrentGameRoundNotDivisibleByThree() {
            return this.currentGameRound % 3 !== 0;
        },
        isGameOver() {
            return this.winner !== null;
        },
        hasPlayerWon() {
            return this.winner === 'player';
        },
        hasMonsterWon() {
            return this.winner === 'monster';
        }
    },
    methods: {
        attackMonster(isSpecial) {
            this.monsterHealth -= isSpecial ? getRandomValueBetween(9, 14) : getRandomValueBetween(5, 10);
            this.attackPlayer();
        },
        attackPlayer() {
            this.playerHealth -= getRandomValueBetween(7, 12);
            this.checkGameStatus();
            this.currentGameRound++;
        },
        healPlayer() {
            const healValue = getRandomValueBetween(8, 11);

            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }

            this.playerHealth += healValue;
            this.attackPlayer();
        },
        checkGameStatus() {
            if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (this.playerHealth <= 0) {
                this.winner = 'monster';
            } else if (this.monsterHealth <= 0) {
                this.winner = 'player';
            }
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentGameRound = 0;
            this.winner = null;
        }
    },
});

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}