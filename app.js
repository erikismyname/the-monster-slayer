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
            winner: null,
            battleLog: []
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

            this.checkGameStatus();
            this.currentGameRound++; // to move to checkGameStatus
        },
        healPlayer() {
            const playerHealPoints = getRandomValueBetween(8, 11);

            if (this.playerHealth + playerHealPoints > 100) {
                this.playerHealth = 100;
            }
            this.playerHealth += playerHealPoints;
            this.addToBattleLog({ target: 'Player', action: 'heal', points: playerHealPoints });

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
            this.battleLog = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addToBattleLog(entry) {
            this.battleLog.unshift(`${entry.target} ${entry.action}s for ${entry.points} points.`);
        }
    },
});

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}