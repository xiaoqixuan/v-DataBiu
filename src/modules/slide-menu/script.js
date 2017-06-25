import {
	mapGetters
} from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo']),
		reportId() {
			return this.$route.params.reportId
		},
		reportType() {
			return this.$route.params.reportType
		},
		urlPath() {
			let arrPath = this.$route.path.split('/');
			let urlPath = arrPath.length > 2 ? '/' + arrPath[1] + '/' + arrPath[2] : this.$route.path.replace(/\/\d+$/, '');
			// console.log(urlPath);
			return urlPath;

		}
	}
}