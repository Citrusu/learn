/**
 * Created by Kodachi on 2016/7/20.
 */
define(function(require,exports,module){
    var Zepto = require('$');
    ;$.smVersion = "0.6.2";+function ($) {
        "use strict";

        //全局配置
        var defaults = {
            autoInit: false, //自动初始化页面
            showPageLoadingIndicator: true, //push.js加载页面的时候显示一个加载提示
            router: true, //默认使用router
            swipePanel: "left", //滑动打开侧栏
            swipePanelOnlyClose: true  //只允许滑动关闭，不允许滑动打开侧栏
        };

        $.smConfig = $.extend(defaults, $.config);

    }(Zepto);

    + function($) {
        "use strict";

        //比较一个字符串版本号
        //a > b === 1
        //a = b === 0
        //a < b === -1
        $.compareVersion = function(a, b) {
            var as = a.split('.');
            var bs = b.split('.');
            if (a === b) return 0;

            for (var i = 0; i < as.length; i++) {
                var x = parseInt(as[i]);
                if (!bs[i]) return 1;
                var y = parseInt(bs[i]);
                if (x < y) return -1;
                if (x > y) return 1;
            }
            return -1;
        };

        $.getCurrentPage = function() {
            return $(".ui-page-current")[0] || $(".ui-page")[0] || document.body;
        };

    }(Zepto);

    /* global WebKitCSSMatrix:true */

    (function($) {
        "use strict";
        ['width', 'height'].forEach(function(dimension) {
            var  Dimension = dimension.replace(/./, function(m) {
                return m[0].toUpperCase();
            });
            $.fn['outer' + Dimension] = function(margin) {
                var elem = this;
                if (elem) {
                    var size = elem[dimension]();
                    var sides = {
                        'width': ['left', 'right'],
                        'height': ['top', 'bottom']
                    };
                    sides[dimension].forEach(function(side) {
                        if (margin) size += parseInt(elem.css('margin-' + side), 10);
                    });
                    return size;
                } else {
                    return null;
                }
            };
        });

        //support
        $.support = (function() {
            var support = {
                touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
            };
            return support;
        })();

        $.touchEvents = {
            start: $.support.touch ? 'touchstart' : 'mousedown',
            move: $.support.touch ? 'touchmove' : 'mousemove',
            end: $.support.touch ? 'touchend' : 'mouseup'
        };

        $.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;

            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }

            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }

            return curTransform || 0;
        };
        /* jshint ignore:start */
        $.requestAnimationFrame = function (callback) {
            if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
            else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
            else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
            else {
                return window.setTimeout(callback, 1000 / 60);
            }
        };
        $.cancelAnimationFrame = function (id) {
            if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
            else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
            else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
            else {
                return window.clearTimeout(id);
            }
        };
        /* jshint ignore:end */

        $.fn.dataset = function() {
            var dataset = {},
                ds = this[0].dataset;
            for (var key in ds) { // jshint ignore:line
                var item = (dataset[key] = ds[key]);
                if (item === 'false') dataset[key] = false;
                else if (item === 'true') dataset[key] = true;
                else if (parseFloat(item) === item * 1) dataset[key] = item * 1;
            }
            // mixin dataset and __eleData
            return $.extend({}, dataset, this[0].__eleData);
        };
        $.fn.data = function(key, value) {
                        var tmpData = $(this).dataset();
                        if (!key) {
                            return tmpData;
                        }
                        // value may be 0, false, null
                        if (typeof value === 'undefined') {
                            // Get value
                            var dataVal = tmpData[key],
                                __eD = this[0].__eleData;

                            //if (dataVal !== undefined) {
                            if (__eD && (key in __eD)) {
                                return __eD[key];
                            } else {
                                return dataVal;
                }

            } else {
                // Set value,uniformly set in extra ```__eleData```
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    // delete multiple data in dataset
                    if (key in tmpData) delete el.dataset[key];

                    if (!el.__eleData) el.__eleData = {};
                    el.__eleData[key] = value;
                }
                return this;
            }
        };
        function __dealCssEvent(eventNameArr, callback) {
            var events = eventNameArr,
                i, dom = this;// jshint ignore:line

            function fireCallBack(e) {
                /*jshint validthis:true */
                if (e.target !== this) return;
                callback.call(this, e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
        }
        $.fn.animationEnd = function(callback) {
            __dealCssEvent.call(this, ['webkitAnimationEnd', 'animationend'], callback);
            return this;
        };
        $.fn.transitionEnd = function(callback) {
            __dealCssEvent.call(this, ['webkitTransitionEnd', 'transitionend'], callback);
            return this;
        };
        $.fn.transition = function(duration) {
            if (typeof duration !== 'string') {
                duration = duration + 'ms';
            }
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        };
        $.fn.transform = function(transform) {
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
            }
            return this;
        };
        $.fn.prevAll = function (selector) {
            var prevEls = [];
            var el = this[0];
            if (!el) return $([]);
            while (el.previousElementSibling) {
                var prev = el.previousElementSibling;
                if (selector) {
                    if($(prev).is(selector)) prevEls.push(prev);
                }
                else prevEls.push(prev);
                el = prev;
            }
            return $(prevEls);
        };
        $.fn.nextAll = function (selector) {
            var nextEls = [];
            var el = this[0];
            if (!el) return $([]);
            while (el.nextElementSibling) {
                var next = el.nextElementSibling;
                if (selector) {
                    if($(next).is(selector)) nextEls.push(next);
                }
                else nextEls.push(next);
                el = next;
            }
            return $(nextEls);
        };

        //重置zepto的show方法，防止有些人引用的版本中 show 方法操作 opacity 属性影响动画执行
        $.fn.show = function(){
            var elementDisplay = {};
            function defaultDisplay(nodeName) {
                var element, display;
                if (!elementDisplay[nodeName]) {
                    element = document.createElement(nodeName);
                    document.body.appendChild(element);
                    display = getComputedStyle(element, '').getPropertyValue("display");
                    element.parentNode.removeChild(element);
                    display === "none" && (display = "block");
                    elementDisplay[nodeName] = display;
                }
                return elementDisplay[nodeName];
            }

            return this.each(function(){
                this.style.display === "none" && (this.style.display = '');
                if (getComputedStyle(this, '').getPropertyValue("display") === "none");
                this.style.display = defaultDisplay(this.nodeName);
            });
        };
    })(Zepto);

    /*===========================
     Device/OS Detection
     ===========================*/
    ;(function ($) {
        "use strict";
        var device = {};
        var ua = navigator.userAgent;

        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

        device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }

        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView &&
                (ipod || iphone) &&
                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        }

        // Check for status bar and fullscreen app mode
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        device.statusBar = false;
        if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
            device.statusBar = true;
        }
        else {
            device.statusBar = false;
        }

        // Classes
        var classNames = [];

        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('ui-pixel-ratio-' + Math.floor(device.pixelRatio));
        if (device.pixelRatio >= 2) {
            classNames.push('ui-retina');
        }

        // OS classes
        if (device.os) {
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if (device.os === 'ios') {
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for (var i = major - 1; i >= 6; i--) {
                    classNames.push('ui-ios-gt-' + i);
                }
            }

        }
        // Status bar classes
        if (device.statusBar) {
            classNames.push('ui-with-statusbar-overlay');
        }
        else {
            $('html').removeClass('ui-with-statusbar-overlay');
        }

        // Add html classes
        if (classNames.length > 0) $('html').addClass(classNames.join(' '));

        // keng..
        device.isWeixin = /MicroMessenger/i.test(ua);

        $.device = device;
    })(Zepto);

    /*===========================
     FastClick
     ===========================*/
    ;(function () {
        'use strict';

        /**
         * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
         *
         * @codingstandard ftlabs-jsv2
         * @copyright The Financial Times Limited [All Rights Reserved]
         * @license MIT License (see LICENSE.txt)
         */

        /*jslint browser:true, node:true, elision:true*/
        /*global Event, Node*/


        /**
         * Instantiate fast-clicking listeners on the specified layer.
         *
         * @constructor
         * @param {Element} layer The layer to listen on
         * @param {Object} [options={}] The options to override the defaults
         */
        function FastClick(layer, options) {
            var oldOnClick;

            options = options || {};

            /**
             * Whether a click is currently being tracked.
             *
             * @type boolean
             */
            this.trackingClick = false;


            /**
             * Timestamp for when click tracking started.
             *
             * @type number
             */
            this.trackingClickStart = 0;


            /**
             * The element being tracked for a click.
             *
             * @type EventTarget
             */
            this.targetElement = null;


            /**
             * X-coordinate of touch start event.
             *
             * @type number
             */
            this.touchStartX = 0;


            /**
             * Y-coordinate of touch start event.
             *
             * @type number
             */
            this.touchStartY = 0;


            /**
             * ID of the last touch, retrieved from Touch.identifier.
             *
             * @type number
             */
            this.lastTouchIdentifier = 0;


            /**
             * Touchmove boundary, beyond which a click will be cancelled.
             *
             * @type number
             */
            this.touchBoundary = options.touchBoundary || 10;


            /**
             * The FastClick layer.
             *
             * @type Element
             */
            this.layer = layer;

            /**
             * The minimum time between tap(touchstart and touchend) events
             *
             * @type number
             */
            this.tapDelay = options.tapDelay || 200;

            /**
             * The maximum time for a tap
             *
             * @type number
             */
            this.tapTimeout = options.tapTimeout || 700;

            if (FastClick.notNeeded(layer)) {
                return;
            }

            // Some old versions of Android don't have Function.prototype.bind
            function bind(method, context) {
                return function() { return method.apply(context, arguments); };
            }


            var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
            var context = this;
            for (var i = 0, l = methods.length; i < l; i++) {
                context[methods[i]] = bind(context[methods[i]], context);
            }

            // Set up event handlers as required
            if (deviceIsAndroid) {
                layer.addEventListener('mouseover', this.onMouse, true);
                layer.addEventListener('mousedown', this.onMouse, true);
                layer.addEventListener('mouseup', this.onMouse, true);
            }

            layer.addEventListener('click', this.onClick, true);
            layer.addEventListener('touchstart', this.onTouchStart, false);
            layer.addEventListener('touchmove', this.onTouchMove, false);
            layer.addEventListener('touchend', this.onTouchEnd, false);
            layer.addEventListener('touchcancel', this.onTouchCancel, false);

            // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
            // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
            // layer when they are cancelled.
            if (!Event.prototype.stopImmediatePropagation) {
                layer.removeEventListener = function(type, callback, capture) {
                    var rmv = Node.prototype.removeEventListener;
                    if (type === 'click') {
                        rmv.call(layer, type, callback.hijacked || callback, capture);
                    } else {
                        rmv.call(layer, type, callback, capture);
                    }
                };

                layer.addEventListener = function(type, callback, capture) {
                    var adv = Node.prototype.addEventListener;
                    if (type === 'click') {
                        adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                                if (!event.propagationStopped) {
                                    callback(event);
                                }
                            }), capture);
                    } else {
                        adv.call(layer, type, callback, capture);
                    }
                };
            }

            // If a handler is already declared in the element's onclick attribute, it will be fired before
            // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
            // adding it as listener.
            if (typeof layer.onclick === 'function') {

                // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
                // - the old one won't work if passed to addEventListener directly.
                oldOnClick = layer.onclick;
                layer.addEventListener('click', function(event) {
                    oldOnClick(event);
                }, false);
                layer.onclick = null;
            }
        }

        /**
         * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
         *
         * @type boolean
         */
        var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

        /**
         * Android requires exceptions.
         *
         * @type boolean
         */
        var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


        /**
         * iOS requires exceptions.
         *
         * @type boolean
         */
        var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


        /**
         * iOS 4 requires an exception for select elements.
         *
         * @type boolean
         */
        var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


        /**
         * iOS 6.0-7.* requires the target element to be manually derived
         *
         * @type boolean
         */
        var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

        /**
         * BlackBerry requires exceptions.
         *
         * @type boolean
         */
        var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

        /**
         * 判断是否组合型label
         * @type {Boolean}
         */
        var isCompositeLabel = false;

        /**
         * Determine whether a given element requires a native click.
         *
         * @param {EventTarget|Element} target Target DOM element
         * @returns {boolean} Returns true if the element needs a native click
         */
        FastClick.prototype.needsClick = function(target) {

            // 修复bug: 如果父元素中有 label
            // 如果label上有needsclick这个类，则用原生的点击，否则，用模拟点击
            var parent = target;
            while(parent && (parent.tagName.toUpperCase() !== "BODY")) {
                if (parent.tagName.toUpperCase() === "LABEL") {
                    isCompositeLabel = true;
                    if ((/\bneedsclick\b/).test(parent.className)) return true;
                }
                parent = parent.parentNode;
            }

            switch (target.nodeName.toLowerCase()) {

                // Don't send a synthetic click to disabled inputs (issue #62)
                case 'button':
                case 'select':
                case 'textarea':
                    if (target.disabled) {
                        return true;
                    }

                    break;
                case 'input':

                    // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                    if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                        return true;
                    }

                    break;
                case 'label':
                case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
                case 'video':
                    return true;
            }

            return (/\bneedsclick\b/).test(target.className);
        };


        /**
         * Determine whether a given element requires a call to focus to simulate click into element.
         *
         * @param {EventTarget|Element} target Target DOM element
         * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
         */
        FastClick.prototype.needsFocus = function(target) {
            switch (target.nodeName.toLowerCase()) {
                case 'textarea':
                    return true;
                case 'select':
                    return !deviceIsAndroid;
                case 'input':
                    switch (target.type) {
                        case 'button':
                        case 'checkbox':
                        case 'file':
                        case 'image':
                        case 'radio':
                        case 'submit':
                            return false;
                    }

                    // No point in attempting to focus disabled inputs
                    return !target.disabled && !target.readOnly;
                default:
                    return (/\bneedsfocus\b/).test(target.className);
            }
        };


        /**
         * Send a click event to the specified element.
         *
         * @param {EventTarget|Element} targetElement
         * @param {Event} event
         */
        FastClick.prototype.sendClick = function(targetElement, event) {
            var clickEvent, touch;

            // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
            if (document.activeElement && document.activeElement !== targetElement) {
                document.activeElement.blur();
            }

            touch = event.changedTouches[0];

            // Synthesise a click event, with an extra attribute so it can be tracked
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            clickEvent.forwardedTouchEvent = true;
            targetElement.dispatchEvent(clickEvent);
        };

        FastClick.prototype.determineEventType = function(targetElement) {

            //Issue #159: Android Chrome Select Box does not open with a synthetic click event
            if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
                return 'mousedown';
            }

            return 'click';
        };


        /**
         * @param {EventTarget|Element} targetElement
         */
        FastClick.prototype.focus = function(targetElement) {
            var length;

            // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
            var unsupportedType = ['date', 'time', 'month', 'number', 'email'];
            if (deviceIsIOS && targetElement.setSelectionRange && unsupportedType.indexOf(targetElement.type) === -1) {
                length = targetElement.value.length;
                targetElement.setSelectionRange(length, length);
            } else {
                targetElement.focus();
            }
        };


        /**
         * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
         *
         * @param {EventTarget|Element} targetElement
         */
        FastClick.prototype.updateScrollParent = function(targetElement) {
            var scrollParent, parentElement;

            scrollParent = targetElement.fastClickScrollParent;

            // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
            // target element was moved to another parent.
            if (!scrollParent || !scrollParent.contains(targetElement)) {
                parentElement = targetElement;
                do {
                    if (parentElement.scrollHeight > parentElement.offsetHeight) {
                        scrollParent = parentElement;
                        targetElement.fastClickScrollParent = parentElement;
                        break;
                    }

                    parentElement = parentElement.parentElement;
                } while (parentElement);
            }

            // Always update the scroll top tracker if possible.
            if (scrollParent) {
                scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
            }
        };


        /**
         * @param {EventTarget} targetElement
         * @returns {Element|EventTarget}
         */
        FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

            // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
            if (eventTarget.nodeType === Node.TEXT_NODE) {
                return eventTarget.parentNode;
            }

            return eventTarget;
        };


        /**
         * On touch start, record the position and scroll offset.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.onTouchStart = function(event) {
            var targetElement, touch, selection;

            // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
            if (event.targetTouches.length > 1) {
                return true;
            }

            targetElement = this.getTargetElementFromEventTarget(event.target);
            touch = event.targetTouches[0];

            if (deviceIsIOS) {

                // Only trusted events will deselect text on iOS (issue #49)
                selection = window.getSelection();
                if (selection.rangeCount && !selection.isCollapsed) {
                    return true;
                }

                if (!deviceIsIOS4) {

                    // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                    // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                    // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                    // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                    // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                    // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                    // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                    // random integers, it's safe to to continue if the identifier is 0 here.
                    if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                        event.preventDefault();
                        return false;
                    }

                    this.lastTouchIdentifier = touch.identifier;

                    // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                    // 1) the user does a fling scroll on the scrollable layer
                    // 2) the user stops the fling scroll with another tap
                    // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                    // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                    // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                    this.updateScrollParent(targetElement);
                }
            }

            this.trackingClick = true;
            this.trackingClickStart = event.timeStamp;
            this.targetElement = targetElement;

            this.touchStartX = touch.pageX;
            this.touchStartY = touch.pageY;

            // Prevent phantom clicks on fast double-tap (issue #36)
            if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
                event.preventDefault();
            }

            return true;
        };


        /**
         * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.touchHasMoved = function(event) {
            var touch = event.changedTouches[0], boundary = this.touchBoundary;

            if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
                return true;
            }

            return false;
        };


        /**
         * Update the last position.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.onTouchMove = function(event) {
            if (!this.trackingClick) {
                return true;
            }

            // If the touch has moved, cancel the click tracking
            if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
                this.trackingClick = false;
                this.targetElement = null;
            }

            return true;
        };


        /**
         * Attempt to find the labelled control for the given label element.
         *
         * @param {EventTarget|HTMLLabelElement} labelElement
         * @returns {Element|null}
         */
        FastClick.prototype.findControl = function(labelElement) {

            // Fast path for newer browsers supporting the HTML5 control attribute
            if (labelElement.control !== undefined) {
                return labelElement.control;
            }

            // All browsers under test that support touch events also support the HTML5 htmlFor attribute
            if (labelElement.htmlFor) {
                return document.getElementById(labelElement.htmlFor);
            }

            // If no for attribute exists, attempt to retrieve the first labellable descendant element
            // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
            return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
        };


        /**
         * On touch end, determine whether to send a click event at once.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.onTouchEnd = function(event) {
            var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

            if (!this.trackingClick) {
                return true;
            }

            // Prevent phantom clicks on fast double-tap (issue #36)
            if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
                this.cancelNextClick = true;
                return true;
            }

            if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
                return true;
            }
            //修复安卓微信下，input type="date" 的bug，经测试date,time,month已没问题
            var unsupportedType = ['date', 'time', 'month'];
            if(unsupportedType.indexOf(event.target.type) !== -1){
                return false;
            }
            // Reset to prevent wrong click cancel on input (issue #156).
            this.cancelNextClick = false;

            this.lastClickTime = event.timeStamp;

            trackingClickStart = this.trackingClickStart;
            this.trackingClick = false;
            this.trackingClickStart = 0;

            // On some iOS devices, the targetElement supplied with the event is invalid if the layer
            // is performing a transition or scroll, and has to be re-detected manually. Note that
            // for this to function correctly, it must be called *after* the event target is checked!
            // See issue #57; also filed as rdar://13048589 .
            if (deviceIsIOSWithBadTarget) {
                touch = event.changedTouches[0];

                // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
                targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
                targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
            }

            targetTagName = targetElement.tagName.toLowerCase();
            if (targetTagName === 'label') {
                forElement = this.findControl(targetElement);
                if (forElement) {
                    this.focus(targetElement);
                    if (deviceIsAndroid) {
                        return false;
                    }

                    targetElement = forElement;
                }
            } else if (this.needsFocus(targetElement)) {

                // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
                // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
                if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                    this.targetElement = null;
                    return false;
                }

                this.focus(targetElement);
                this.sendClick(targetElement, event);

                // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
                // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
                if (!deviceIsIOS || targetTagName !== 'select') {
                    this.targetElement = null;
                    event.preventDefault();
                }

                return false;
            }

            if (deviceIsIOS && !deviceIsIOS4) {

                // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
                // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
                scrollParent = targetElement.fastClickScrollParent;
                if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                    return true;
                }
            }

            // Prevent the actual click from going though - unless the target node is marked as requiring
            // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
            if (!this.needsClick(targetElement)) {
                event.preventDefault();
                this.sendClick(targetElement, event);
            }

            return false;
        };


        /**
         * On touch cancel, stop tracking the click.
         *
         * @returns {void}
         */
        FastClick.prototype.onTouchCancel = function() {
            this.trackingClick = false;
            this.targetElement = null;
        };


        /**
         * Determine mouse events which should be permitted.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.onMouse = function(event) {

            // If a target element was never set (because a touch event was never fired) allow the event
            if (!this.targetElement) {
                return true;
            }

            if (event.forwardedTouchEvent) {
                return true;
            }

            // Programmatically generated events targeting a specific element should be permitted
            if (!event.cancelable) {
                return true;
            }

            // Derive and check the target element to see whether the mouse event needs to be permitted;
            // unless explicitly enabled, prevent non-touch click events from triggering actions,
            // to prevent ghost/doubleclicks.
            if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

                // Prevent any user-added listeners declared on FastClick element from being fired.
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                } else {

                    // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                    event.propagationStopped = true;
                }

                // Cancel the event
                event.stopPropagation();
                // 允许组合型label冒泡
                if (!isCompositeLabel) {
                    event.preventDefault();
                }
                // 允许组合型label冒泡
                return false;
            }

            // If the mouse event is permitted, return true for the action to go through.
            return true;
        };


        /**
         * On actual clicks, determine whether this is a touch-generated click, a click action occurring
         * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
         * an actual click which should be permitted.
         *
         * @param {Event} event
         * @returns {boolean}
         */
        FastClick.prototype.onClick = function(event) {
            var permitted;

            // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
            if (this.trackingClick) {
                this.targetElement = null;
                this.trackingClick = false;
                return true;
            }

            // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
            if (event.target.type === 'submit' && event.detail === 0) {
                return true;
            }

            permitted = this.onMouse(event);

            // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
            if (!permitted) {
                this.targetElement = null;
            }

            // If clicks are permitted, return true for the action to go through.
            return permitted;
        };


        /**
         * Remove all FastClick's event listeners.
         *
         * @returns {void}
         */
        FastClick.prototype.destroy = function() {
            var layer = this.layer;

            if (deviceIsAndroid) {
                layer.removeEventListener('mouseover', this.onMouse, true);
                layer.removeEventListener('mousedown', this.onMouse, true);
                layer.removeEventListener('mouseup', this.onMouse, true);
            }

            layer.removeEventListener('click', this.onClick, true);
            layer.removeEventListener('touchstart', this.onTouchStart, false);
            layer.removeEventListener('touchmove', this.onTouchMove, false);
            layer.removeEventListener('touchend', this.onTouchEnd, false);
            layer.removeEventListener('touchcancel', this.onTouchCancel, false);
        };


        /**
         * Check whether FastClick is needed.
         *
         * @param {Element} layer The layer to listen on
         */
        FastClick.notNeeded = function(layer) {
            var metaViewport;
            var chromeVersion;
            var blackberryVersion;
            var firefoxVersion;

            // Devices that don't support touch don't need FastClick
            if (typeof window.ontouchstart === 'undefined') {
                return true;
            }

            // Chrome version - zero for other browsers
            chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

            if (chromeVersion) {

                if (deviceIsAndroid) {
                    metaViewport = document.querySelector('meta[name=viewport]');

                    if (metaViewport) {
                        // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                            return true;
                        }
                        // Chrome 32 and above with width=device-width or less don't need FastClick
                        if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                            return true;
                        }
                    }

                    // Chrome desktop doesn't need FastClick (issue #15)
                } else {
                    return true;
                }
            }

            if (deviceIsBlackBerry10) {
                blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

                // BlackBerry 10.3+ does not require Fastclick library.
                // https://github.com/ftlabs/fastclick/issues/251
                if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                    metaViewport = document.querySelector('meta[name=viewport]');

                    if (metaViewport) {
                        // user-scalable=no eliminates click delay.
                        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                            return true;
                        }
                        // width=device-width (or less than device-width) eliminates click delay.
                        if (document.documentElement.scrollWidth <= window.outerWidth) {
                            return true;
                        }
                    }
                }
            }

            // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
            if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
                return true;
            }

            // Firefox version - zero for other browsers
            firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

            if (firefoxVersion >= 27) {
                // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

                metaViewport = document.querySelector('meta[name=viewport]');
                if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                    return true;
                }
            }

            // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
            // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
            if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
                return true;
            }

            return false;
        };


        /**
         * Factory method for creating a FastClick object
         *
         * @param {Element} layer The layer to listen on
         * @param {Object} [options={}] The options to override the defaults
         */
        FastClick.attach = function(layer, options) {
            return new FastClick(layer, options);
        };

        window.FastClick = FastClick;
    }());
});