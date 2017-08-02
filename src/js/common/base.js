; (function () {
    var stan = {
        ua: navigator.userAgent.toLowerCase(),
        /**
         * 设备信息
         */
        device: {
            pc: function () {
                return !(this.android() || this.iphone() || this.ipad() || /midp/.test(stan.ua) || /symbianos/.test(stan.ua) ||
                    /windows ce/.test(stan.ua) || /windows mobile/.test(stan.ua) || /windows phone/.test(stan.ua))
            },
            android: function () { return /android/.test(stan.ua) },
            iphone: function () { return /iphone/.test(stan.ua) || /ipod/.test(stan.ua) },
            ipad: function () { return /ipad/.test(stan.ua) },
            weixin: function () { return /micromessenger/.test(stan.ua) }
        },
        /**
         * 获取参数值
        * @param {string} name 参数名称
         */
        params: function (name) {
            var _reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var _m = location.search.substr(1).match(_reg);
            var context = '';
            if (_m != null)
                context = _m[2];
            _reg = null;
            _m = null;
            return context == null || context == '' || context == 'undefined' ? '' : decodeURI(context);
        },
        /**
         * 获取和设置cookie
        * @param {string} name cookie名称
        * @param {string} value cookie值
        * @param {string} expiredays cookie过期时间
         */
        cookie: {
            get: function (name) {
                var _arr;
                var _reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
                if (_arr = document.cookie.match(_reg)) {
                    _reg = null;
                    return (_arr[2]);
                } else {
                    _reg = null;
                    return '';
                }
            },
            set: function (name, value, expiredays) {
                var _exp = new Date();
                _exp.setDate(_exp.getDate() + expiredays);
                console.log(_exp.toGMTString());
                document.cookie = name + '=' + escape(value) + ((expiredays == null) ? "" : "; expires=" + _exp.toGMTString());
                _exp = null;
            }
        },
        /**
         * 获取和设置没有时间限制的数据存储
        * @param {string} name 名称
        * @param {string} value 值
         */
        store: {
            get: function (name) {
                return JSON.parse(localStorage.getItem(name) || '');
            },
            set: function (name, value) {
                localStorage.setItem(name, JSON.stringify(value));
            }
        },
        /**
         * XMLHttpRequest
        * @param {string} type 请求方式，包括POST和GET两种方式
        * @param {object} header 向请求添加HTTP头。
        * @param {string} url 发送请求的url
        * @param {boolean} async 是否为异步请求，true为异步的，false为同步的
        * @param {object} data 发送的参数，格式为对象类型
        * @param {object} dataType 接收数据格式，默认json
        * @param {function} success ajax发送并接收成功调用的回调函数
         */
        http: function (options) {
            options = options || {};
            options.type = options.type || 'POST';
            options.type = options.type.toUpperCase();
            options.url = options.url || '';
            options.async = options.async || true;
            options.data = options.data || null;
            options.dataType = options.dataType || 'json';
            options.success = options.success || function () { };
            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            }
            else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var _params = [];
            if (options.data && typeof options.data == 'object') {
                for (var key in options.data) {
                    _params.push(key + '=' + options.data[key]);
                }
            }
            var _header = null;
            var _value = null;
            if (options.header && typeof options.data == 'object') {
                for (var key in options.header) {
                    _header = key;
                    _value = options.header[key];
                }
            }
            var _postData = _params.join('&');
            if (options.type === 'POST') {
                xmlHttp.open(options.type, options.url, options.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                if (_header && _value) {
                    xmlHttp.setRequestHeader(_header, _value);
                }
                xmlHttp.send(_postData);
            }
            else if (options.type === 'GET') {
                var _url = options.url;
                if (_params.length) {
                    _url += '?' + _postData;
                }
                xmlHttp.open(options.type, _url, options.async);
                if (_header && _value) {
                    xmlHttp.setRequestHeader(_header, _value);
                }
                xmlHttp.send();
            }
            xmlHttp.onload = function () {
                // if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status === 0) {
                    var responseData = xmlHttp.responseText;
                    if (options.dataType === 'json') {
                        responseData = JSON.parse(responseData);
                    }
                    options.success(responseData);
                }
            };
        },
        /**
         * 数组常见操作
         */
        array: {
            /**
             * 判断对象是否为数组
            * @param {object} obj 对象
             */
            isArray: function (obj) {
                if (Array.isArray) {
                    return Array.isArray(obj);
                }
                else {
                    return Object.prototype.toString.call(obj) === '[object Array]';
                }
            },
            /**
             * 在数组中可以找到一个给定元素的第一个索引
            * @param {array} arr 当前数组
            * @param {string} value 数组指定的值
            */
            indexOf: function (arr, value) {
                if (Array.prototype.indexOf) {
                    return arr.indexOf(value);
                }
                else {
                    var _len = arr.length;
                    var k = 0;
                    if (_len == 0) return -1;
                    while (k < _len) {
                        if (arr[k] == value) {
                            return k;
                        }
                        k++;
                        return -1;
                    }
                }
            },
            /**
             * 判断一个数组是否包含一个指定的值
            * @param {array} arr 当前数组
            * @param {string} value 数组指定的值
            */
            includes: function (arr, value) {
                if (Array.includes) {
                    return arr.includes(value);
                }
                else {
                    var _len = arr.length;
                    if (_len == 0) return false;
                    while (_len--) {
                        if (arr[_len] == value) {
                            return true;
                        }
                    }
                    return false;
                }
            },
            /**
             * 判断一个数组是否包含一个指定的值
            * @param {array} arr 当前数组
            * @param {string} value 数组指定的值
            */
            remove: function (arr, value) {
                var _index = this.indexOf(arr, value);
                if (_index == -1) return;
                arr.splice(_index, 1);
                return arr;
            }

        },



        // --------------------------------------------
        /**
         * 阻止事件冒泡
         */
        stop: function (e) {
            var ev = e || window.event;
            if (ev.stopPropagation) ev.stopPropagation();
            else ev.cancelemBubble = true;
        },
        /**
         * 阻止浏览器的默认行为
         */
        prevent: function (e) {
            if (e && e.preventDefault) e.preventDefault();
            else window.event.returnValue = false;
            return false;
        },
        /**
         * 获得触发事件的元素
         */
        target: function (e) {
            return e.target || window.event.srcElement;
        },
        /**
         * 获取和设置滚动位置
        * @param {number} value 滚动位置值
         */
        scroll: {
            get: function () {
                var _scrollTop = 0;
                // IE 6 Strict 
                if (document.documentElement && document.documentElement.scrollTop) {
                    _scrollTop = document.documentElement.scrollTop;
                }
                // all other IE  
                else if (document.body) {
                    _scrollTop = document.body.scrollTop;
                }
                return _scrollTop;
            },
            set: function (value) {
                // IE 6 Strict 
                if (document.documentElement && document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = value;
                }
                // all other IE  
                else if (document.body) {
                    document.body.scrollTop = value;
                }
            }
        },
        /**
         * 绑定事件
         * @param {object} ele Element对象
         * @param {string} ev 事件名称
         * @param {function} fn 回调函数
         */
        on: function (ele, ev, fn) {
            if (ele.addEventListener) {
                ele.addEventListener(ev, fn, false);
            } else if (ele.attachEvent) {
                ele.attachEvent('on' + ev, fn);
            } else {
                ele['on' + ev] = fn;
            }
        },
        /**
         * 解除事件
         * @param {object} ele Element对象
         * @param {string} ev 事件名称
         * @param {function} fn 回调函数
         */
        off: function (ele, ev, fn) {
            if (ele.removeEventListener) {
                ele.removeEventListener(ev, fn, false);
            } else if (ele.detachEvent) {
                ele.detachEvent('on' + ev, fn);
            } else {
                ele['on' + ev] = null;
            }
        }
    };
    var Stan = function (selector) {
        this.elements = [];
        if (!selector) return;
        if (document.querySelectorAll) {
            this.elements = document.querySelectorAll(selector);
        }
        else {
            // id
            if (selector.indexOf('#') > -1) {
                this.elements.push(document.getElementById(selector.replace(/^#/, '')));
            }
            // class
            else if (selector.indexOf('.') > -1) {
                var _selector = selector.replace(/^./, '');
                if (document.getElementsByClassName) {
                    this.elements = document.getElementsByClassName(_selector);
                }
                else {
                    var _eles = document.getElementsByTagName("*");
                    var _elements = [];
                    for (var i = 0, l = _eles.length; i < l; i++) {
                        if (_eles[i].className.match(new RegExp('(\\s|^)' + _selector + '(\\s|$)'))) {
                            _elements.push(_eles[i]);
                        }
                    }
                    this.elements = _elements;
                }
            }
            // tag
            else {
                this.elements = document.getElementsByTagName(selector);
            }
        }
        this.length = this.elements.length;
    }
    Stan.prototype = {
        /**
         * 绑定事件
         * @param {string} ev 事件名称
         * @param {function} fn 回调函数
         */
        on: function (ev, fn) {
            stan.on(this.elements[0], ev, fn);
        },
        /**
         * 解除事件
         * @param {string} ev 事件名称
         * @param {function} fn 回调函数
         */
        off: function (ev, fn) {
            stan.off(this.elements[0], ev, fn);
        },
        /**
         * 是否存在class名称
         * @param {string} name class名称
         */
        hasClass: function (name) {
            name = name || '';
            if (name.replace(/\s/g, '').length == 0) return false;
            return new RegExp(' ' + name + ' ').test(' ' + this.elements[0].className + ' ');
        },
        /**
         * 添加class名称
         * @param {string} name class名称
         */
        addClass: function (name) {
            if (!this.hasClass(name)) {
                var _cls = this.elements[0].className;
                this.elements[0].className = _cls == '' ? name : _cls + ' ' + name;
            }
            return this;
        },
        /**
         * 移除class名称
         * @param {string} name class名称
         */
        removeClass: function (name) {
            if (this.hasClass(name)) {
                var _cls = ' ' + this.elements[0].className.replace(/[\t\r\n]/g, '') + ' ';
                while (_cls.indexOf(' ' + name + ' ') > -1) {
                    _cls = _cls.replace(' ' + name + ' ', ' ');
                }
                this.elements[0].className = _cls.replace(/^\s+|\s+$/g, '');
            }
            return this;
        },
        /**
         * 获取和设置属性
         * @param {string} name 属性名称
         * @param {string} value 属性值
         */
        attr: function (name, value) {
            if (!value) {
                return this.elements[0].getAttribute(prop);
            } else {
                this.elements[0].setAttribute(prop, value);
            }
        },
        /**
         * text值
         */
        text: function () {
            return (typeof this.elements[0].textContent == 'string') ? this.elements[0].textContent : this.elements[0].innerText;
        },
        get: function (index) {
            if (this.length > 0) {
                if (index == undefined) this.elements[0];
                if (index > (this.length - 1)) {
                    return this.elements;
                }
                return this.elements[index];
            }
            else {
                return null;
            }
        }
        ,
        /**
         * 设置过渡动画
         */
        transform: function (style) {
            this.elements[0].style.webkitTransform = style;
            this.elements[0].style.transform = style;
        }
    }
    window.stan = stan;
    window.Stan = Stan;
})();
