/**
 * touch
 */
; (function () {
    function Touch() {

    }
    Touch.prototype = {
        isTouched: false,
        init: function () {

        },
        touchEvents: function () {
            var _this = this;
            this.supportTouches_ = 'ontouchend' in document;
            this.events_ = {
                click: this.supportTouches_ ? 'touchstart' : 'click',
                down: this.supportTouches_ ? 'touchstart' : 'mousedown',
                move: this.supportTouches_ ? 'touchmove' : 'mousemove',
                up: this.supportTouches_ ? 'touchend' : 'mouseup'
            };
        },
        _touches: function (e) {
            var _x = 0;
            var _y = 0;
            if (e.targetTouches && e.targetTouches[0]) {
                _x = e.targetTouches[0].pageX;
                _y = e.targetTouches[0].pageY;
            }
            else {
                _x = e.pageX || e.clientX;
                _y = e.pageY || e.clientY;
            }
            return { X: _x, Y: _y }
        },
        _touch: function (e) {
            e = e || window.event;
            switch (e.type) {
                case 'click':
                    break;
                case 'down':
                    this._start(e);
                    break;
                case 'move':
                    this._move(e);
                    break;
                case 'up':
                    this.up(e);
                    break;
            }
        },
        _start: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        _move: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        _up: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        set: function () {

        }
    };

    window.Touch = Touch;
})();

var touchEvents = {
    click: 'ontouchend' in document ? 'touchstart' : 'click',
    touchstart: 'ontouchend' in document ? 'touchstart' : 'mousedown',
    touchmove: 'ontouchend' in document ? 'touchmove' : 'mousemove',
    touchend: 'ontouchend' in document ? 'touchend' : 'mouseup',
    touches: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var _x = 0;
        var _y = 0;
        if (e.targetTouches && e.targetTouches[0]) {
            _x = e.targetTouches[0].pageX;
            _y = e.targetTouches[0].pageY;
        }
        else {
            _x = e.pageX || e.clientX;
            _y = e.pageY || e.clientY;
        }
        return { X: _x, Y: _y }
    }
}
function load() {
    var section = new Stan('.read-section');
    section.on(touchEvents.click, touch);
    section.on(touchEvents.touchstart, touch);
    section.on(touchEvents.touchmove, touch);
    section.on(touchEvents.touchend, touch);
    var setting = {
        index: 0,
        startX: 0,
        diffX: 0,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: section.get(0).scrollWidth,
        isDown: false,
        isMove: false
    };
    function touch(event) {
        event = event || window.event;
        switch (event.type) {
            case 'mousedown':
                var _touches = touchEvents.touches(event);
                setting.startX = _touches.X;
                setting.isDown = true;
                break;
            case 'mousemove':
                var _touches = touchEvents.touches(event);
                setting.diffX = _touches.X - setting.startX;
                setting.isMove = true;
                break;
            case 'mouseup':
                event.preventDefault();
                event.stopPropagation();
                if (setting.isDown && setting.isMove) {
                    if (setting.diffX > setting.clientWidth / 5) {
                        if (setting.index > 0) {
                            setting.index--;
                        }
                    }
                    if (setting.diffX < -setting.clientWidth / 5) {
                        if ((setting.index + 1) * (setting.clientWidth - 15) < setting.scrollWidth) {
                            setting.index++;
                        }
                    }
                    section.transform('translate3d(' + -setting.index * (setting.clientWidth - 15) + 'px,0,0)');
                    setting.startX = 0;
                    setting.diffX = 0;
                    setting.isDown = false;
                    setting.isMove = false;
                }
                break;
            case 'click':
                if (setting.isDown && !setting.isMove) {
                    setting.index++;
                    section.transform('translate3d(' + -setting.index * (setting.clientWidth - 15) + 'px,0,0)');
                }
                break;
            case 'touchstart':
                var _touches = touchEvents.touches(event);
                setting.startX = _touches.X;
                setting.isDown = true;
                break;
            case 'touchmove':
                var _touches = touchEvents.touches(event);
                setting.diffX = _touches.X - setting.startX;
                setting.isMove = true;
                break;
            case 'touchend':
                event.preventDefault();
                event.stopPropagation();
                if (setting.isDown && setting.isMove) {
                    if (setting.diffX > setting.clientWidth / 5) {
                        if (setting.index > 0) {
                            setting.index--;
                        }
                    }
                    if (setting.diffX < -setting.clientWidth / 5) {
                        if ((setting.index + 1) * (setting.clientWidth - 15) < setting.scrollWidth) {
                            setting.index++;
                        }
                    }
                    section.transform('translate3d(' + -setting.index * (setting.clientWidth - 15) + 'px,0,0)');
                    setting.startX = 0;
                    setting.diffX = 0;
                    setting.isDown = false;
                    setting.isMove = false;
                }
                break;
        }
    }
}
window.addEventListener('load', load, false);