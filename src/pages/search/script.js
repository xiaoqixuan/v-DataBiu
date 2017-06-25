import md5 from 'md5';
import {
	mapState,
	mapMutations
} from 'vuex'

export default {
	route: {
		path: "/search",
		meta: {
			title: "搜索"
		}
	},
	data() {
		return {
			user: {
				name: {
					value: '',
					label: '登录名',
					tooltip: ''
				},
				password: {
					value: '',
					label: '密码',
					tooltip: ''
				},
				remember: {
					value: false,
					label: '记住密码',
					tooltip: ''
				}
			},
		}
	},
	mounted() {
		let str = window.localStorage.getItem("user"); // 获取user的值
		if (str) {
			let user = JSON.parse(str);
			this.user.name.value = user.name;
			this.user.password.value = user.value;
		}
	},
	methods: {
		...mapMutations(['setUserInfo']),
		login(e) {
			var _self = this;

			//_self.user.name.value = "mepadmin";
			//_self.user.password.value = "aa";

			var passed = _self.user.name.value.replace(/\s+/g, '') && _self.user.password.value.replace(/\s+/g, '');
			if (passed) {

				_self.getData('/UserService/user/login.html', {
					userAccount: _self.user.name.value,
					md5timeCode: md5(_self.user.password.value)
				}).then(_data => {
					if (_self.user.remember.value) { // 用户记住密码
						var user = {
							name: _self.user.name.value,
							value: md5(_self.user.password.value)
						};
						window.localStorage.user = JSON.stringify(user);
					}
					delete _data.code;
					delete _data.sessionId;
					delete _data.remark;

					_self.getData('/PermitService/permit/baseinfo/company/v1/querydetail', {
						permitId: _data.permitId
					}).then(_data2 => {
						_data.companyInfo = _data2.company_info;
						_self.setUserInfo(_data);
						this.$router.push(`/month/report-list`);
					})
				}).catch(err => {
					this.$Modal.error({
						content: err
					});
				});

			} else { // 验证不通过

				if (!_self.user.name.value.replace(/\s+/g, '')) {
					_self.user.name.tooltip = '手机号不能为空';
				}
				if (!_self.user.password.value.replace(/\s+/g, '')) {
					_self.user.password.tooltip = '密码不能为空';
				}
			}
		},
		passwordFocus(e) {
			if (this.user.password.tooltip) {
				this.user.password.tooltip = '';
			} else {
				this.user.password.value = '';
			}
		}
	}
}