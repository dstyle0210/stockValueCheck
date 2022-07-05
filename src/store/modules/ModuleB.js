const module = {
    namespaced: true,
    state: { data: "ModuleB Data" },
    mutations: {
        setData(state, data) {
            // -> commit('moduleB/setData')
            state.data = data;
        },
    },
    actions: {
        setRootData({ commit }, data) {
            // -> dispatch('moduleB/setRootData')
            console.log("module B set Root Data");
            commit("setData", data);
        },
    },
    getters: { data: (state) => state.data }, // -> getters['moduleB/data']
};
export default module;
