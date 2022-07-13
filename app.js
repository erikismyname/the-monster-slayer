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
    }
});