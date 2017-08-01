define(function (require) {
    var Vue = require('vue'),
        vueRouter = require('vueRouter');

    Vue.use(vueRouter);

    var router = new vueRouter({
        routes: [
            {
                path: '/index',
                name: 'index',
                component: 'components/index.vue'
            }
        ]
    });
    return router;
});
