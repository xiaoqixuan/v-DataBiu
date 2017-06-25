import {
    mapGetters,
    mapMutations
} from 'vuex';

window.DataInfo = {};

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    beforeMount() {
        this.checkUserAgent();
        
        if (!/^\/login|\/404$/.test(this.$route.path)) {
            // debugger
            if (!this.userInfo.userId) {
                this.$router.push("/login")                
            }
        }
    },
    methods: {
        checkUserAgent() {
            const userAgentInfo = navigator.userAgent;
            const Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];
            let flag = true;
            
            for (let v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }

            window.localStorage.userAgent = JSON.stringify(flag);
        }
    }
}