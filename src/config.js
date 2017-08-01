requirejs.config({
    paths: {
        vue: 'lib/vue',
        vueResource: 'lib/vue-resource',
        vueRouter: 'lib/vue-router',
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
    urlArgs: 'v=20170711'
});
require(['./main']);