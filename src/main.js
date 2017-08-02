requirejs.config({
    baseUrl: './js',
    paths: {
        vue: 'lib/vue',
        vueResource: 'lib/vue-resource',
        vueRouter: 'lib/vue-router',
        base: 'common/base'
    },
    shim: {
        'vueResource': {
            deps: ['vue'],
            exports: 'vueResource'
        },
        'vueRouter': {
            deps: ['vue'],
            exports: 'vueRouter'
        }
    },
    urlArgs: 'v=20170720'
});

define(function (require) {
    var Vue = require('vue');
    var router = require('./routers.js');

    Vue.config.debug = true;
    Vue.config.devtools = true;

    var app = new Vue({
        router
    }).$mount('#app');
});