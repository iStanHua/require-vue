define(['../views/index/index', '../views/add/index', '../views/edit/index', '../views/404/index'],
    function (Index, Add, Edit, Page404) {
        return [
            { path: '/', component: Index },
            { path: '/index', component: Index },
            { path: '/add', component: Add },
            { path: '/edit/:id', component: Edit, name: 'edit' },
            { path: '*', component: Page404 }
        ];
    }
);