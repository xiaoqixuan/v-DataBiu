import {
	mapGetters
} from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo']),
		reportType() {
			return this.$route.params.reportType;
		}
	}
}