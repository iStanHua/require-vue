define([], function () {
    return {
        template: '\
        <div class="content">\
            <div class="nodata">\
                <h1>很抱歉，您要访问的页面不存在！</h1>\
                <p><router-link to="/" replace>返回首页</router-link></p>\
            </div>\
        </div>'
    }
});