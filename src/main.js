define(function (require) {
    var Vue = require('vue');
    var router = require('./routers');

    Vue.config.debug = true;
    Vue.config.devtools = true;

    var app = new Vue({
        router
    }).$mount('#app');
});