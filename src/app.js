requirejs.config({
    baseUrl: './js',
    paths: {
        text: 'lib/text',
        vue: 'lib/vue',
        vueResource: 'lib/vue-resource',
        vueRouter: 'lib/vue-router',
        vuex: 'lib/vuex',
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
        },
        'vuex': {
            deps: ['vue'],
            exports: 'vuex'
        }
    },
    packages: [
        {
            name: 'components',
            location: 'components',
            main: 'components'
        },
        {
            name: "views",
            location: "views",
            main: "views"
        }
    ],
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