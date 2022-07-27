import Vue from 'vue';
import Vuex from 'vuex';
// order below
import player from './modules/player.js';
import monster from './modules/monster.js';
import battleLog from './modules/battleLog.js';
import game from './modules/game.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        player,
        monster,
        battleLog,
        game
    }
})
