export default {
    setUserInfo(state, info) {
        state._userInfo = info;
        window.sessionStorage.userInfo = JSON.stringify(info);
    }
}