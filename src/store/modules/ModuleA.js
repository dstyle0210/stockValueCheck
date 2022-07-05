const module = {
    namespaced: true,
    state: { data: "ModuleA Data" },
    mutations: {
        setData(state, data) {
            // -> commit('moduleA/setData')
            state.data = data;
        },
    },
    actions: {
        setRootData({ commit }, data) {
            // -> dispatch('moduleA/setRootData')
            console.log("module A set Root Data");
            commit("setData", data);
        },
    },
    getters: { data: (state) => state.data }, // -> getters['moduleA/data']
};
export default module;
