import Vue from 'vue';
import Vuex from 'vuex';

import battleLog from '@/store/modules/battleLog';
import game from '@/store/modules/game';
import monster from '@/store/modules/monster';
import player from '@/store/modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        battleLog,
        game,
        monster,
        player
    }
});