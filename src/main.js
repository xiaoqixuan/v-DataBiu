import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store';
import App from './app';
import pages from './pages';
import Request from './utils/request';
import Components from 'components';
import Modules from 'modules';
// import Filter from './filter';

Vue.use(VueRouter);
Vue.use(Request);
// Vue.use(Components);
// Filter(Vue);

// 引入模块
Object.keys(Components).map(_key => {
    Vue.component(_key, Components[_key]);
});
Object.keys(Modules).map(_key => {
    Vue.component(_key, Modules[_key]);
});

// 引入页面
const routes = [{
        path: '/',
        redirect: '/login',
    },
    ...eachRoutes(pages), {
        path: '*',
        redirect: '/404',
    }
]
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})

/*function eachRoutes(_routeList) {
    let _routes = [];
    debugger
    for (let key in _routeList) {
        let _one = _routeList[key];
        if (_one.route) {
            if (!/^\/login|\/404$/.test(_one.route.path)) {
                _one.route.path = '/:reportType' + _one.route.path;
            }
            _routes.push({
                ..._one.route,
                component: _one
            });
        } else {
            Object.keys(_one).map(_key => {
                _one[_key].route.path = '/:reportType' + _one[_key].route.path;
                _routes.push({
                    ..._one[_key].route,
                    component: _one[_key]
                });
            })
        }
    }
    return _routes;
}*/
function eachRoutes(_routeList) {
    let _routes = [];
    for (let key in _routeList) {
        _routes.push({
            ..._routeList[key].route,
            component: _routeList[key]
        });
    }
    return _routes;
}

new Vue({
    el: '#app',
    ...App,
    router,
    store
})

console.log(VERSION);