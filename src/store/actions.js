export default {
    setUserInfo({
        commit
    }, info) {
        commit('setUserInfo', info || {});
    },
}