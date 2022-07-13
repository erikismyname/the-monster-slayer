Vue.component('health-status', {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    template: `
        <section :id="id" class="container">
            <slot></slot>
            <div class="healthbar">
                <div class="healthbar-status"></div>
            </div>
        </section>
    `
});

new Vue({
    el: 'main',
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    methods: {
        attackMonster() {
            this.monsterHealth -= getRandomValueBetween(5, 10);
            this.attackPlayer();
        },
        attackPlayer() {
            this.playerHealth -= getRandomValueBetween(7, 12);
        }
    }
});

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}