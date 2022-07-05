// src/store/index.ts
import Vuex from "vuex";
import moduleA from "./modules/ModuleA";
import moduleB from "./modules/ModuleB";
const store = {
    state: { data: "root" },
    modules: { moduleA, moduleB },
    mutations: {
        setData(state, data) {
            // -> commit('setData')
            state.data = data;
        },
    },
    actions: {
        setRootData({ commit }, data) {
            // -> dispatch('setRootData')
            console.log("RootState set Root Data");
            commit("setData", data);
        },
    },
    getters: {
        data: (state) => state.data, // -> getters['data']
    },
};
export default new Vuex.Store(store);
