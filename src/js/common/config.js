requirejs.config({
    baseUrl: 'js',
    paths: {
        text: 'lib/text',
        vue: 'lib/vue',
        vueResource: 'lib/vue-resource',
        vueRouter: 'lib/vue-router',
        vuex: 'lib/vuex',
        lodash: 'lib/lodash',
        base: 'common/base',
        routes: 'common/routes'
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
    urlArgs: 'v=20170720'
});