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
        healthbarClass() {
            return {
                low: this.health <= 25,
                medium: this.health > 25 && this.health <= 50,
                high: this.health > 50,
            }
        },
        isMonster() {
            return this.id === 'monster';
        }
    },
    template: `
        <section :id="id" class="container">
            <img
                v-if="isMonster" 
                src="./assets/monster.jpg"
                class="avatar monster"
                alt="Monster"
            />
            <img 
                v-else 
                src="./assets/warrior.jpg"
                class="avatar player"
                alt="Warrior" 
            />

            <slot></slot>

            <div class="healthbar">
                <div 
                    class="healthbar-status"
                    :class="healthbarClass"
                    :style="healthbarWidth"
                ></div>
                <span class="healthbar-percentage">{{ health }}%</span>
            </div>
        </section>
    `
});

new Vue({
    el: 'main',
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            battleLog: []
        };
    },
    computed: {
        isCurrentRoundNotDivisibleByThree() {
            return this.currentRound % 3 !== 0;
        },
        isPlayerHealthFull() {
            return this.playerHealth === 100;
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
        attackMonster(isSpecialAttack) {
            const playerAttackPoints = isSpecialAttack ? getRandomValueBetween(9, 14) : getRandomValueBetween(5, 10);
            this.monsterHealth -= playerAttackPoints;
            this.addToBattleLog({ target: 'Player', action: 'attack', points: playerAttackPoints });

            this.attackPlayer();
        },
        attackPlayer() {
            const monsterAttackPoints = getRandomValueBetween(7, 12);
            this.playerHealth -= monsterAttackPoints;
            this.addToBattleLog({ target: 'Monster', action: 'attack', points: monsterAttackPoints });

            this.endCurrentRound();
        },
        healPlayer() {
            const playerHealPoints = getRandomValueBetween(8, 11);
            this.playerHealth += playerHealPoints;

            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }

            this.addToBattleLog({ target: 'Player', action: 'heal', points: playerHealPoints });

            this.attackPlayer();
        },
        endCurrentRound() {
            if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (this.playerHealth <= 0) {
                this.winner = 'monster';
            } else if (this.monsterHealth <= 0) {
                this.winner = 'player';
            }

            this.currentRound++;
        },
        startNewGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLog = [];
        },
        surrenderToMonster() {
            this.winner = 'monster';
        },
        addToBattleLog(entry) {
            this.battleLog.unshift(`${entry.target} ${entry.action}s for ${entry.points} points.`);
        }
    },
    watch: {
        monsterHealth(newHealth) {
            if (newHealth < 0) {
                this.monsterHealth = 0;
            }
        },
        playerHealth(newHealth) {
            if (newHealth < 0) {
                this.playerHealth = 0;
            }
        }
    }
});

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}