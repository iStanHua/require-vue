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
            if (e.targetTouches && e.targetTouches[0]) {
                return { x: e.targetTouches[0].pageX, y: e.targetTouches[0].pageY };
            }
            else {
                return { x: e.pageX || e.clientX, y: e.pageY || e.clientY };
            }
        },
        _bindEvent: function () {

        },
        _touchStart: function (e) {
            e.preventDefault();
            e.stopPropagation();

        },
        _touchMove: function (e) {

            e.preventDefault();
            e.stopPropagation();
        },
        _touchEnd: function (e) {

            e.preventDefault();
            e.stopPropagation();
        }
    };

    window.Touch = Touch;
})();

var touchEvents = {
    touchstart: 'ontouchend' in document ? 'touchstart' : 'mousedown',
    touchmove: 'ontouchend' in document ? 'touchmove' : 'mousemove',
    touchend: 'ontouchend' in document ? 'touchend' : 'mouseup',
    touches: function (e) {
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
console.log(touchEvents);
function load() {
    var carousel = new Stan('.carousel-inner');
    carousel.on(touchEvents.touchstart, touch);
    carousel.on(touchEvents.touchmove, touch);
    carousel.on(touchEvents.touchend, touch);

    function touch(event) {
        var event = event || window.event;
        var _startX = 0;
        switch (event.type) {
            case 'mousedown':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                _startX = _touches.X;
                break;
            case 'mousemove':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                break;
            case 'mouseup':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                var _offSetX = _touches.X - _startX;
                if (_offSetX > 30) {
                    console.log(_startX + '：' + _touches.X);
                }
                // carousel.transform('translate(0,' + _touches.y + 'px)');
                break;
            case 'touchstart':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                break;
            case 'touchmove':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                break;
            case 'touchend':
                event.preventDefault();
                event.stopPropagation();
                var _touches = touchEvents.touches(event);
                console.log(_touches);
                // carousel.transform('translate(0,' + _touches.y + 'px)');
                break;
        }

    }
}
window.addEventListener('load', load, false);