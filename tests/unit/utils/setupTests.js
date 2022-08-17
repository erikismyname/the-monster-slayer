import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

export default function createWrapper(component, modules = {}, options = {}) {
    return mount(component, {
        localVue: setupLocalVue(),
        store: setupStore(modules),
        ...options
    });
}

function setupLocalVue() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    return localVue;
}

function setupStore(modules) {
    return new Vuex.Store({ modules });
}