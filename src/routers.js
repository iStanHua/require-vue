define(function (require) {
    var Vue = require('vue');
    var vueRouter = require('vueRouter');
    Vue.use(vueRouter);

    var Index = { template: '<div><pre>{{ $route.params.id }}</pre></div>' }
    var Regex = { template: '<div>{{ $route.params.id }}</div>' }
    var User = {
        template: '<div class="user"><h2>User {{ $route.params.id }}</h2><router-view></router-view></div></div>',

        watch: {
            '$route'(to, from) {
                console.log(to.path);
                console.log(from.path);
            }
        }
    }
    var router = new vueRouter({
        mode: 'history',
        routes: [
            {
                path: '/index/:id?',
                component: Index
            },
            {
                path: '/regex/:id(\\d+)',
                component: Regex
            },
            {
                path: '/user/:id',
                component: User,
                children: [
                    {
                        // 当 /user/:id/index 匹配成功，
                        // Index 会被渲染在 User 的 <router-view> 中
                        path: 'index',
                        component: Index
                    },
                    {
                        // 当 /user/:id/regex 匹配成功
                        // Regex 会被渲染在 User 的 <router-view> 中
                        path: 'regex',
                        component: Regex
                    }
                ]
            }
        ]
    });
    return router;
});
