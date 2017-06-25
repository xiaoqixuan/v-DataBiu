export default {
    userInfo(state) {
        return state._userInfo || (window.sessionStorage.userInfo ? JSON.parse(window.sessionStorage.userInfo) : {});
    }
}