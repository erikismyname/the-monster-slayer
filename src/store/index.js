import Vue from 'vue';
import Vuex from 'vuex';

import battleLog from './modules/battleLog.js';
import game from './modules/game.js';
import monster from './modules/monster.js';
import player from './modules/player.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        battleLog,
        game,
        monster,
        player
    }
});