define(function(require, exports, module){
    /**
     * Created by Kodachi on 2016/10/12.
     */
    /*======================================================
     ************   Calendar   ************
     ======================================================*/
    /*jshint unused: false*/
    var $ = require('$');
    +function ($) {
        "use strict";
        var rtl = false;
        var Calendar = function (params) {
            var p = this;
            var defaults = {
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
                dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                firstDay: 1, // First day of the week, Monday
                weekendDays: [0, 6], // Sunday and Saturday
                multiple: false,
                dateFormat: 'yyyy-mm-dd',
                direction: 'horizontal', // or 'vertical'
                minDate: null,
                maxDate: null,
                touchMove: true,
                animate: true,
                closeOnSelect: true,
                monthPicker: true,
                monthPickerTemplate:
                '<div class="ui-picker-calendar-month-picker">' +
                '<a href="javascript:;" class="ui-link ui-icon-only ui-picker-calendar-prev-month"><i class="ui-icon ui-icon-prev"></i></a>' +
                '<div class="ui-current-month-value"></div>' +
                '<a href="javascript:;" class="ui-link ui-icon-only ui-picker-calendar-next-month"><i class="ui-icon ui-icon-next"></i></a>' +
                '</div>',
                yearPicker: true,
                yearPickerTemplate:
                '<div class="ui-picker-calendar-year-picker">' +
                '<a href="javascript:;" class="ui-link ui-icon-only ui-picker-calendar-prev-year"><i class="ui-icon ui-icon-prev"></i></a>' +
                '<span class="ui-current-year-value"></span>' +
                '<a href="javascript:;" class="ui-link ui-icon-only ui-picker-calendar-next-year"><i class="ui-icon ui-icon-next"></i></a>' +
                '</div>',
                weekHeader: true,
                // Common settings
                scrollToInput: true,
                inputReadOnly: true,
                toolbar: true,
                toolbarCloseText: 'Done',
                toolbarTemplate:
                '<div class="ui-toolbar">' +
                '<div class="ui-toolbar-inner">' +
                '{{monthPicker}}' +
                '{{yearPicker}}' +
                // '<a href="javascript:;" class="link close-picker">{{closeText}}</a>' +
                '</div>' +
                '</div>',
                /* Callbacks
                 onMonthAdd
                 onChange
                 onOpen
                 onClose
                 onDayClick
                 onMonthYearChangeStart
                 onMonthYearChangeEnd
                 */
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.initialized = false;

            // Inline flag
            p.inline = p.params.container ? true : false;

            // Is horizontal
            p.isH = p.params.direction === 'horizontal';

            // RTL inverter
            var inverter = p.isH ? (rtl ? -1 : 1) : 1;

            // Animating flag
            p.animating = false;

            // Format date
            function formatDate(date) {
                date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth();
                var month1 = month + 1;
                var day = date.getDate();
                var weekDay = date.getDay();
                return p.params.dateFormat
                    .replace(/yyyy/g, year)
                    .replace(/yy/g, (year + '').substring(2))
                    .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
                    .replace(/m/g, month1)
                    .replace(/MM/g, p.params.monthNames[month])
                    .replace(/M/g, p.params.monthNamesShort[month])
                    .replace(/dd/g, day < 10 ? '0' + day : day)
                    .replace(/d/g, day)
                    .replace(/DD/g, p.params.dayNames[weekDay])
                    .replace(/D/g, p.params.dayNamesShort[weekDay]);
            }


            // Value
            p.addValue = function (value) {
                if (p.params.multiple) {
                    if (!p.value) p.value = [];
                    var inValuesIndex;
                    for (var i = 0; i < p.value.length; i++) {
                        if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                            inValuesIndex = i;
                        }
                    }
                    if (typeof inValuesIndex === 'undefined') {
                        p.value.push(value);
                    }
                    else {
                        p.value.splice(inValuesIndex, 1);
                    }
                    p.updateValue();
                }
                else {
                    p.value = [value];
                    p.updateValue();
                }
            };
            p.setValue = function (arrValues) {
                p.value = arrValues;
                p.updateValue();
            };
            p.updateValue = function () {
                p.wrapper.find('.ui-picker-calendar-day-selected').removeClass('ui-picker-calendar-day-selected');
                var i, inputValue;
                for (i = 0; i < p.value.length; i++) {
                    var valueDate = new Date(p.value[i]);
                    p.wrapper.find('.ui-picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('ui-picker-calendar-day-selected');
                }
                if (p.params.onChange) {
                    p.params.onChange(p, p.value, p.value.map(formatDate));
                }
                if (p.input && p.input.length > 0) {
                    if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
                    else {
                        inputValue = [];
                        for (i = 0; i < p.value.length; i++) {
                            inputValue.push(formatDate(p.value[i]));
                        }
                        inputValue = inputValue.join(', ');
                    }
                    $(p.input).val(inputValue);
                    $(p.input).trigger('change');
                }
            };

            // Columns Handlers
            p.initCalendarEvents = function () {
                var col;
                var allowItemClick = true;
                var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    // e.preventDefault();
                    isTouched = true;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    percentage = 0;
                    allowItemClick = true;
                    isScrolling = undefined;
                    startTranslate = currentTranslate = p.monthsTranslate;
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;

                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (p.isH && isScrolling) {
                        isTouched = false;
                        return;
                    }
                    e.preventDefault();
                    if (p.animating) {
                        isTouched = false;
                        return;
                    }
                    allowItemClick = false;
                    if (!isMoved) {
                        // First move
                        isMoved = true;
                        wrapperWidth = p.wrapper[0].offsetWidth;
                        wrapperHeight = p.wrapper[0].offsetHeight;
                        p.wrapper.transition(0);
                    }
                    e.preventDefault();

                    touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
                    percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
                    currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;

                    // Transform wrapper
                    p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');

                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;

                    touchEndTime = new Date().getTime();
                    if (touchEndTime - touchStartTime < 300) {
                        if (Math.abs(touchesDiff) < 10) {
                            p.resetMonth();
                        }
                        else if (touchesDiff >= 10) {
                            if (rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            if (rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                    }
                    else {
                        if (percentage <= -0.5) {
                            if (rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                        else if (percentage >= 0.5) {
                            if (rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            p.resetMonth();
                        }
                    }

                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }

                function handleDayClick(e) {
                    if (!allowItemClick) return;
                    var day = $(e.target).parents('.ui-picker-calendar-day');
                    if (day.length === 0 && $(e.target).hasClass('ui-picker-calendar-day')) {
                        day = $(e.target);
                    }
                    if (day.length === 0) return;
                    if (day.hasClass('ui-picker-calendar-day-selected') && !p.params.multiple) return;
                    if (day.hasClass('ui-picker-calendar-day-disabled')) return;
                    if (day.hasClass('ui-picker-calendar-day-next')) p.nextMonth();
                    if (day.hasClass('ui-picker-calendar-day-prev')) p.prevMonth();
                    var dateYear = day.attr('data-year');
                    var dateMonth = day.attr('data-month');
                    var dateDay = day.attr('data-day');
                    if (p.params.onDayClick) {
                        p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
                    }
                    p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
                    if (p.params.closeOnSelect) p.close();
                }

                p.container.find('.ui-picker-calendar-prev-month').on('click', p.prevMonth);
                p.container.find('.ui-picker-calendar-next-month').on('click', p.nextMonth);
                p.container.find('.ui-picker-calendar-prev-year').on('click', p.prevYear);
                p.container.find('.ui-picker-calendar-next-year').on('click', p.nextYear);

                /**
                 * 处理选择年份时的手势操作事件
                 *
                 * Start - edit by JSoon
                 */
                function handleYearTouchStart (e) {
                    if (isMoved || isTouched) return;
                    // e.preventDefault();
                    isTouched = true;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    percentage = 0;
                    allowItemClick = true;
                    isScrolling = undefined;
                    startTranslate = currentTranslate = p.yearsTranslate;
                }

                function handleYearTouchMove (e) {
                    if (!isTouched) return;

                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (p.isH && isScrolling) {
                        isTouched = false;
                        return;
                    }
                    e.preventDefault();
                    if (p.animating) {
                        isTouched = false;
                        return;
                    }
                    allowItemClick = false;
                    if (!isMoved) {
                        // First move
                        isMoved = true;
                        wrapperWidth = p.yearsPickerWrapper[0].offsetWidth;
                        wrapperHeight = p.yearsPickerWrapper[0].offsetHeight;
                        p.yearsPickerWrapper.transition(0);
                    }
                    e.preventDefault();

                    touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
                    percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
                    currentTranslate = (p.yearsTranslate * inverter + percentage) * 100;

                    // Transform wrapper
                    p.yearsPickerWrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');

                }

                function handleYearTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;

                    touchEndTime = new Date().getTime();
                    if (touchEndTime - touchStartTime < 300) {
                        if (Math.abs(touchesDiff) < 10) {
                            p.resetYearsGroup();
                        }
                        else if (touchesDiff >= 10) {
                            if (rtl) p.nextYearsGroup();
                            else p.prevYearsGroup();
                        }
                        else {
                            if (rtl) p.prevYearsGroup();
                            else p.nextYearsGroup();
                        }
                    }
                    else {
                        if (percentage <= -0.5) {
                            if (rtl) p.prevYearsGroup();
                            else p.nextYearsGroup();
                        }
                        else if (percentage >= 0.5) {
                            if (rtl) p.nextYearsGroup();
                            else p.prevYearsGroup();
                        }
                        else {
                            p.resetYearsGroup();
                        }
                    }

                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }

                function handleYearSelector() {
                    var curYear = $(this).text(),
                        yearsPicker = p.container.find('.ui-picker-calendar-years-picker');
                    yearsPicker.show().transform('translate3d(0, 0, 0)');
                    p.updateSelectedInPickers();
                    yearsPicker.on('click', '.ui-picker-calendar-year-unit', p.pickYear);
                }

                function handleMonthSelector() {
                    var monthsPicker = p.container.find('.ui-picker-calendar-months-picker');
                    monthsPicker.show().transform('translate3d(0, 0, 0)');
                    p.updateSelectedInPickers();
                    monthsPicker.on('click', '.ui-picker-calendar-month-unit', p.pickMonth);
                }

                // 选择年份
                p.container.find('.ui-current-year-value').on('click', handleYearSelector);

                // 选择月份
                p.container.find('.ui-current-month-value').on('click', handleMonthSelector);
                /**
                 * End - edit by JSoon
                 */

                p.wrapper.on('click', handleDayClick);
                if (p.params.touchMove) {
                    /**
                     * 给年份选择器绑定手势操作事件
                     *
                     * Start - edit by JSoon
                     */
                    p.yearsPickerWrapper.on($.touchEvents.start, handleYearTouchStart);
                    p.yearsPickerWrapper.on($.touchEvents.move, handleYearTouchMove);
                    p.yearsPickerWrapper.on($.touchEvents.end, handleYearTouchEnd);
                    /**
                     * Start - edit by JSoon
                     */

                    p.wrapper.on($.touchEvents.start, handleTouchStart);
                    p.wrapper.on($.touchEvents.move, handleTouchMove);
                    p.wrapper.on($.touchEvents.end, handleTouchEnd);
                }

                p.container[0].f7DestroyCalendarEvents = function () {
                    p.container.find('.ui-picker-calendar-prev-month').off('click', p.prevMonth);
                    p.container.find('.ui-picker-calendar-next-month').off('click', p.nextMonth);
                    p.container.find('.ui-picker-calendar-prev-year').off('click', p.prevYear);
                    p.container.find('.ui-picker-calendar-next-year').off('click', p.nextYear);
                    p.wrapper.off('click', handleDayClick);
                    if (p.params.touchMove) {
                        p.wrapper.off($.touchEvents.start, handleTouchStart);
                        p.wrapper.off($.touchEvents.move, handleTouchMove);
                        p.wrapper.off($.touchEvents.end, handleTouchEnd);
                    }
                };


            };
            p.destroyCalendarEvents = function (colContainer) {
                if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
            };

            // Calendar Methods

            /**
             * 1. 生成年份和月份选择器DOM结构
             * 2. 年份选择和月份选择的pick事件函数
             * 3. 年份选择手势操作结束后，更新年分组DOM结构
             *
             * Start - edit by JSoon
             */
            p.yearsGroupHTML = function(date, offset) {
                date = new Date(date);
                var curYear = date.getFullYear(), // 日历上的当前年份
                    trueYear = new Date().getFullYear(), // 当前真实年份
                    yearNum = 25, // 年份面板年份总数量
                    firstYear = curYear - Math.floor(yearNum/2), // 年份面板第一格年份
                    yearsHTML = '';
                if (offset === 'next') {
                    firstYear = firstYear + yearNum;
                }
                if (offset === 'prev') {
                    firstYear = firstYear - yearNum;
                }
                for (var i = 0; i < 5; i += 1) {
                    var rowHTML = '';
                    var row = i;
                    rowHTML += '<div class="ui-picker-calendar-row">';
                    for (var j = 0; j < 5; j += 1) {
                        if (firstYear === trueYear) {
                            rowHTML += '<div class="ui-picker-calendar-year-unit ui-current-calendar-year-unit" data-year="'+ firstYear +'"><span>' + firstYear + '</span></div>';
                        } else if (firstYear === curYear) {
                            rowHTML += '<div class="ui-picker-calendar-year-unit ui-picker-calendar-year-unit-selected" data-year="'+ firstYear +'"><span>' + firstYear + '</span></div>';
                        } else {
                            rowHTML += '<div class="ui-picker-calendar-year-unit" data-year="'+ firstYear +'"><span>' + firstYear + '</span></div>';
                        }
                        firstYear += 1;
                    }
                    rowHTML += '</div>';
                    yearsHTML += rowHTML;
                }
                yearsHTML = '<div class="ui-picker-calendar-years-group">' + yearsHTML + '</div>';
                return yearsHTML;
            };

            p.pickYear = function() {
                var year = $(this).text(),
                    curYear = p.wrapper.find('.ui-picker-calendar-month-current').attr('data-year');
                p.yearsPickerWrapper.find('.ui-picker-calendar-year-unit').removeClass('ui-picker-calendar-year-unit-selected');
                $(this).addClass('ui-picker-calendar-year-unit-selected');
                if (curYear !== year) {
                    p.setYearMonth(year);
                    p.container.find('.ui-picker-calendar-years-picker').hide().transform('translate3d(0, 100%, 0)');
                } else {
                    p.container.find('.ui-picker-calendar-years-picker').transform('translate3d(0, 100%, 0)');
                }
            };

            p.onYearsChangeEnd = function (dir) {
                p.animating = false;
                var nextYearsHTML, prevYearsHTML, newCurFirstYear;
                var yearNum = p.yearsPickerWrapper.children('.ui-picker-calendar-years-next').find('.ui-picker-calendar-year-unit').length;
                if (dir === 'next') {
                    var newCurFirstYear = parseInt(p.yearsPickerWrapper.children('.ui-picker-calendar-years-next').find('.ui-picker-calendar-year-unit').eq(Math.floor(yearNum/2)).text());
                    nextYearsHTML = p.yearsGroupHTML(new Date(newCurFirstYear, p.currentMonth), 'next');
                    p.yearsPickerWrapper.append(nextYearsHTML);
                    p.yearsPickerWrapper.children().first().remove();
                    p.yearsGroups = p.container.find('.ui-picker-calendar-years-group');
                }
                if (dir === 'prev') {
                    var newCurFirstYear = parseInt(p.yearsPickerWrapper.children('.ui-picker-calendar-years-prev').find('.ui-picker-calendar-year-unit').eq(Math.floor(yearNum/2)).text());
                    prevYearsHTML = p.yearsGroupHTML(new Date(newCurFirstYear, p.currentMonth), 'prev');
                    p.yearsPickerWrapper.prepend(prevYearsHTML);
                    p.yearsPickerWrapper.children().last().remove();
                    p.yearsGroups = p.container.find('.ui-picker-calendar-years-group');
                }
                p.setYearsTranslate(p.yearsTranslate);
            };

            p.monthsGroupHTML = function(date) {
                date = new Date(date);
                var curMonth = date.getMonth() + 1, // 日历上的当前月份
                    trueMonth = new Date().getMonth() + 1, // 当前真实月份
                    monthNum = 12, // 月份面板月份总数量
                    firstMonth = 1,
                    monthsHTML = '';
                for (var i = 0; i < 3; i += 1) {
                    var rowHTML = '';
                    var row = i;
                    rowHTML += '<div class="ui-picker-calendar-row">';
                    for (var j = 0; j < 4; j += 1) {
                        if (firstMonth === trueMonth) {
                            rowHTML += '<div class="ui-picker-calendar-month-unit ui-current-calendar-month-unit" data-month="'+ (firstMonth-1) +'"><span>' + p.params.monthNames[firstMonth-1] + '</span></div>';
                        } else if (firstMonth === curMonth) {
                            rowHTML += '<div class="ui-picker-calendar-month-unit ui-picker-calendar-month-selected" data-month="'+ (firstMonth-1) +'"><span>' + p.params.monthNames[firstMonth-1] + '</span></div>';
                        } else {
                            rowHTML += '<div class="ui-picker-calendar-month-unit" data-month="'+ (firstMonth-1) +'"><span>' + p.params.monthNames[firstMonth-1] + '</span></div>';
                        }
                        firstMonth += 1;
                    }
                    rowHTML += '</div>';
                    monthsHTML += rowHTML;
                }
                monthsHTML = '<div class="ui-picker-calendar-months-group">' + monthsHTML + '</div>';
                return monthsHTML;
            };

            p.pickMonth = function() {
                var month = $(this).attr('data-month'),
                    curYear = p.wrapper.find('.ui-picker-calendar-month-current').attr('data-year'),
                    curMonth = p.wrapper.find('.ui-picker-calendar-month-current').attr('data-month');
                p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit').removeClass('ui-picker-calendar-month-unit-selected');
                $(this).addClass('ui-picker-calendar-month-unit-selected');
                if (curMonth !== month) {
                    p.setYearMonth(curYear, month);
                    p.container.find('.ui-picker-calendar-months-picker').hide().transform('translate3d(0, 100%, 0)');
                } else {
                    p.container.find('.ui-picker-calendar-months-picker').transform('translate3d(0, 100%, 0)');
                }
            };
            /**
             * End - edit by JSoon
             */

            p.daysInMonth = function (date) {
                var d = new Date(date);
                return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            };
            p.monthHTML = function (date, offset) {
                date = new Date(date);
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if (offset === 'next') {
                    if (month === 11) date = new Date(year + 1, 0);
                    else date = new Date(year, month + 1, 1);
                }
                if (offset === 'prev') {
                    if (month === 0) date = new Date(year - 1, 11);
                    else date = new Date(year, month - 1, 1);
                }
                if (offset === 'next' || offset === 'prev') {
                    month = date.getMonth();
                    year = date.getFullYear();
                }
                var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
                    daysInMonth = p.daysInMonth(date),
                    firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
                if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

                var dayDate, currentValues = [], i, j,
                    rows = 6, cols = 7,
                    monthHTML = '',
                    dayIndex = 0 + (p.params.firstDay - 1),
                    today = new Date().setHours(0,0,0,0),
                    minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                    maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;

                if (p.value && p.value.length) {
                    for (i = 0; i < p.value.length; i++) {
                        currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
                    }
                }

                for (i = 1; i <= rows; i++) {
                    var rowHTML = '';
                    var row = i;
                    for (j = 1; j <= cols; j++) {
                        var col = j;
                        dayIndex ++;
                        var dayNumber = dayIndex - firstDayOfMonthIndex;
                        var addClass = '';
                        if (dayNumber < 0) {
                            dayNumber = daysInPrevMonth + dayNumber + 1;
                            addClass += ' ui-picker-calendar-day-prev';
                            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                        }
                        else {
                            dayNumber = dayNumber + 1;
                            if (dayNumber > daysInMonth) {
                                dayNumber = dayNumber - daysInMonth;
                                addClass += ' ui-picker-calendar-day-next';
                                dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                            }
                            else {
                                dayDate = new Date(year, month, dayNumber).getTime();
                            }
                        }
                        // Today
                        if (dayDate === today) addClass += ' ui-picker-calendar-day-today';
                        // Selected
                        if (currentValues.indexOf(dayDate) >= 0) addClass += ' ui-picker-calendar-day-selected';
                        // Weekend
                        if (p.params.weekendDays.indexOf(col - 1) >= 0) {
                            addClass += ' ui-picker-calendar-day-weekend';
                        }
                        // Disabled
                        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                            addClass += ' ui-picker-calendar-day-disabled';
                        }

                        dayDate = new Date(dayDate);
                        var dayYear = dayDate.getFullYear();
                        var dayMonth = dayDate.getMonth();
                        rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="ui-picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
                    }
                    monthHTML += '<div class="ui-picker-calendar-row">' + rowHTML + '</div>';
                }
                monthHTML = '<div class="ui-picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
                return monthHTML;
            };
            p.animating = false;
            p.updateCurrentMonthYear = function (dir) {
                if (typeof dir === 'undefined') {
                    p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
                }
                else {
                    p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
                }
                p.container.find('.ui-current-month-value').text(p.params.monthNames[p.currentMonth]);
                p.container.find('.ui-current-year-value').text(p.currentYear);

            };
            p.onMonthChangeStart = function (dir) {
                p.updateCurrentMonthYear(dir);
                p.months.removeClass('ui-picker-calendar-month-current ui-picker-calendar-month-prev ui-picker-calendar-month-next');
                var currentIndex = dir === 'next' ? p.months.length - 1 : 0;

                p.months.eq(currentIndex).addClass('ui-picker-calendar-month-current');
                p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'ui-picker-calendar-month-prev' : 'ui-picker-calendar-month-next');

                if (p.params.onMonthYearChangeStart) {
                    p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
                }
            };
            p.onMonthChangeEnd = function (dir, rebuildBoth) {
                p.animating = false;
                var nextMonthHTML, prevMonthHTML, newMonthHTML;
                p.wrapper.find('.ui-picker-calendar-month:not(.ui-picker-calendar-month-prev):not(.ui-picker-calendar-month-current):not(.ui-picker-calendar-month-next)').remove();

                if (typeof dir === 'undefined') {
                    dir = 'next';
                    rebuildBoth = true;
                }
                if (!rebuildBoth) {
                    newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
                }
                else {
                    p.wrapper.find('.ui-picker-calendar-month-next, .ui-picker-calendar-month-prev').remove();
                    prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
                    nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
                }
                if (dir === 'next' || rebuildBoth) {
                    p.wrapper.append(newMonthHTML || nextMonthHTML);
                }
                if (dir === 'prev' || rebuildBoth) {
                    p.wrapper.prepend(newMonthHTML || prevMonthHTML);
                }
                p.months = p.wrapper.find('.ui-picker-calendar-month');
                p.setMonthsTranslate(p.monthsTranslate);
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                if (p.params.onMonthYearChangeEnd) {
                    p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
                }
                /**
                 * 月历面板结束手势操作后，更新年份/月份选择器中的选中高亮状态
                 *
                 * Start - edit by JSoon
                 */
                p.updateSelectedInPickers();
                /**
                 * End - edit by JSoon
                 */
            };

            /**
             * 1. 更新年份/月份选择器中的选中高亮状态函数
             * 2. 年份选择器过渡动画函数
             * 3. 下一个/上一个/当前年分组手势操作函数
             *
             * Start - edit by JSoon
             */
            p.updateSelectedInPickers = function() {
                var curYear = parseInt(p.wrapper.find('.ui-picker-calendar-month-current').attr('data-year'), 10),
                    trueYear = new Date().getFullYear(),
                    curMonth = parseInt(p.wrapper.find('.ui-picker-calendar-month-current').attr('data-month'), 10),
                    trueMonth = new Date().getMonth(),
                    selectedYear = parseInt(p.yearsPickerWrapper.find('.ui-picker-calendar-year-unit-selected').attr('data-year'), 10),
                    selectedMonth = parseInt(p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit-selected').attr('data-month'), 10);
                if (selectedYear !== curYear) {
                    p.yearsPickerWrapper.find('.ui-picker-calendar-year-unit').removeClass('ui-picker-calendar-year-unit-selected');
                    p.yearsPickerWrapper.find('.ui-picker-calendar-year-unit[data-year="' + curYear + '"]').addClass('ui-picker-calendar-year-unit-selected');
                }
                if (selectedMonth !== curMonth) {
                    p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit').removeClass('ui-picker-calendar-month-unit-selected');
                    p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit[data-month="' + curMonth + '"]').addClass('ui-picker-calendar-month-unit-selected');
                }
                if (trueYear !== curYear) {
                    p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit').removeClass('ui-current-calendar-month-unit');
                } else {
                    p.monthsPickerWrapper.find('.ui-picker-calendar-month-unit[data-month="' + trueMonth + '"]').addClass('ui-current-calendar-month-unit');
                }
            };

            p.setYearsTranslate = function (translate) {
                translate = translate || p.yearsTranslate || 0;
                if (typeof p.yearsTranslate === 'undefined') p.yearsTranslate = translate;
                p.yearsGroups.removeClass('ui-picker-calendar-years-current ui-picker-calendar-years-prev ui-picker-calendar-years-next');
                var prevYearTranslate = -(translate + 1) * 100 * inverter;
                var currentYearTranslate = -translate * 100 * inverter;
                var nextYearTranslate = -(translate - 1) * 100 * inverter;
                p.yearsGroups.eq(0).transform('translate3d(' + (p.isH ? prevYearTranslate : 0) + '%, ' + (p.isH ? 0 : prevYearTranslate) + '%, 0)').addClass('ui-picker-calendar-years-prev');
                p.yearsGroups.eq(1).transform('translate3d(' + (p.isH ? currentYearTranslate : 0) + '%, ' + (p.isH ? 0 : currentYearTranslate) + '%, 0)').addClass('ui-picker-calendar-years-current');
                p.yearsGroups.eq(2).transform('translate3d(' + (p.isH ? nextYearTranslate : 0) + '%, ' + (p.isH ? 0 : nextYearTranslate) + '%, 0)').addClass('ui-picker-calendar-years-next');
            };

            p.nextYearsGroup = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var transitionEndCallback = p.animating ? false : true;
                p.yearsTranslate --;
                p.animating = true;
                var translate = (p.yearsTranslate * 100) * inverter;
                p.yearsPickerWrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.yearsPickerWrapper.transitionEnd(function () {
                        p.onYearsChangeEnd('next');
                    });
                }
                if (!p.params.animate) {
                    p.onYearsChangeEnd('next');
                }
            };

            p.prevYearsGroup = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var transitionEndCallback = p.animating ? false : true;
                p.yearsTranslate ++;
                p.animating = true;
                var translate = (p.yearsTranslate * 100) * inverter;
                p.yearsPickerWrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.yearsPickerWrapper.transitionEnd(function () {
                        p.onYearsChangeEnd('prev');
                    });
                }
                if (!p.params.animate) {
                    p.onYearsChangeEnd('prev');
                }
            };

            p.resetYearsGroup = function (transition) {
                if (typeof transition === 'undefined') transition = '';
                var translate = (p.yearsTranslate * 100) * inverter;
                p.yearsPickerWrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
            };
            /**
             * End - edit by JSoon
             */

            p.setMonthsTranslate = function (translate) {
                translate = translate || p.monthsTranslate || 0;
                if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
                p.months.removeClass('ui-picker-calendar-month-current ui-picker-calendar-month-prev ui-picker-calendar-month-next');
                var prevMonthTranslate = -(translate + 1) * 100 * inverter;
                var currentMonthTranslate = -translate * 100 * inverter;
                var nextMonthTranslate = -(translate - 1) * 100 * inverter;
                p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-prev');
                p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-current');
                p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-next');
            };
            p.nextMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
                var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
                var nextDate = new Date(nextYear, nextMonth);
                var nextDateTime = nextDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.maxDate) {
                    if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate --;
                if (nextMonth === p.currentMonth) {
                    var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-next');
                    p.wrapper.append(nextMonthHTML[0]);
                    p.months = p.wrapper.find('.ui-picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('next');
                var translate = (p.monthsTranslate * 100) * inverter;

                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('next');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('next');
                }
            };
            p.prevMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
                var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
                var prevDate = new Date(prevYear, prevMonth + 1, -1);
                var prevDateTime = prevDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.minDate) {
                    if (prevDateTime < new Date(p.params.minDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate ++;
                if (prevMonth === p.currentMonth) {
                    var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-prev');
                    p.wrapper.prepend(prevMonthHTML[0]);
                    p.months = p.wrapper.find('.ui-picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(0)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('prev');
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('prev');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('prev');
                }
            };
            p.resetMonth = function (transition) {
                if (typeof transition === 'undefined') transition = '';
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
            };
            p.setYearMonth = function (year, month, transition) {
                if (typeof year === 'undefined') year = p.currentYear;
                if (typeof month === 'undefined') month = p.currentMonth;
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var targetDate;
                if (year < p.currentYear) {
                    targetDate = new Date(year, month + 1, -1).getTime();
                } else {
                    targetDate = new Date(year, month).getTime();
                }
                if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
                    return false;
                }
                if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
                    return false;
                }
                var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
                var dir = targetDate > currentDate ? 'next' : 'prev';
                var newMonthHTML = p.monthHTML(new Date(year, month));
                p.monthsTranslate = p.monthsTranslate || 0;
                var prevTranslate = p.monthsTranslate;
                var monthTranslate, wrapperTranslate;
                var transitionEndCallback = p.animating ? false : true;
                if (targetDate > currentDate) {
                    // To next
                    p.monthsTranslate --;
                    if (!p.animating) p.months.eq(p.months.length - 1).remove();
                    p.wrapper.append(newMonthHTML);
                    p.months = p.wrapper.find('.ui-picker-calendar-month');
                    monthTranslate = -(prevTranslate - 1) * 100 * inverter;
                    p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-next');
                }
                else {
                    // To prev
                    p.monthsTranslate ++;
                    if (!p.animating) p.months.eq(0).remove();
                    p.wrapper.prepend(newMonthHTML);
                    p.months = p.wrapper.find('.ui-picker-calendar-month');
                    monthTranslate = -(prevTranslate + 1) * 100 * inverter;
                    p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('ui-picker-calendar-month-prev');
                }
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                p.animating = true;
                p.onMonthChangeStart(dir);
                wrapperTranslate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd(dir, true);
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd(dir);
                }
            };
            p.nextYear = function () {
                p.setYearMonth(p.currentYear + 1);
            };
            p.prevYear = function () {
                p.setYearMonth(p.currentYear - 1);
            };


            // HTML Layout
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;

                var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
                /**
                 * 生成年份组和月份组DOM
                 *
                 * Start - edit by JSoon
                 */
                var prevYearsHTML = p.yearsGroupHTML(layoutDate, 'prev');
                var currentYearsHTML = p.yearsGroupHTML(layoutDate);
                var nextYearsHTML = p.yearsGroupHTML(layoutDate, 'next');
                var yearsGroupHTML = '<div class="ui-picker-calendar-years-picker"><div class="ui-picker-calendar-years-picker-wrapper">' + (prevYearsHTML + currentYearsHTML + nextYearsHTML) + '</div></div>';

                var monthsGroupHTML = '<div class="ui-picker-calendar-months-picker"><div class="ui-picker-calendar-months-picker-wrapper">' + p.monthsGroupHTML(layoutDate) + '</div></div>';
                /**
                 * End - edit by JSoon
                 */
                var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
                var currentMonthHTML = p.monthHTML(layoutDate);
                var nextMonthHTML = p.monthHTML(layoutDate, 'next');
                var monthsHTML = '<div class="ui-picker-calendar-months"><div class="ui-picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
                // Week days header
                var weekHeaderHTML = '';
                if (p.params.weekHeader) {
                    for (i = 0; i < 7; i++) {
                        var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                        var dayName = p.params.dayNamesShort[weekDayIndex];
                        weekHeaderHTML += '<div class="ui-picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'ui-picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';

                    }
                    weekHeaderHTML = '<div class="ui-picker-calendar-week-days">' + weekHeaderHTML + '</div>';
                }
                pickerClass = 'ui-picker-modal ui-picker-calendar ' + (p.params.cssClass || '');
                var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
                if (p.params.toolbar) {
                    toolbarHTML = p.params.toolbarTemplate
                        .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                        .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                        .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
                }

                /**
                 * 将年份组/月份组DOM添加document中
                 *
                 * Start - edit by JSoon
                 */
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                    toolbarHTML +
                    '<div class="ui-picker-modal-inner">' +
                    weekHeaderHTML +
                    monthsHTML +
                    '</div>' +
                    monthsGroupHTML +
                    yearsGroupHTML +
                    '</div>';
                /**
                 * End - edit by JSoon
                 */

                p.pickerHTML = pickerHTML;
            };

            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                // 安卓微信webviewreadonly的input依然弹出软键盘问题修复
                if ($.device.isWeixin && $.device.android && p.params.inputReadOnly) {
                    /*jshint validthis:true */
                    this.focus();
                    this.blur();
                }
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput) {
                    var pageContent = p.input.parents('.ui-content');
                    if (pageContent.length === 0) return;

                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;

                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.ui-picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.ui-picker-modal').length === 0) p.close();
                }
            }

            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);
                    }
                    /**
                     * 修复[#308](https://github.com/sdc-alibaba/SUI-Mobile/issues/308)
                     * 场景：内联页面中存在日历控件的input
                     * 问题：因未在关闭时unbind click openOnInput事件导致多次调用p.open()而生成多个日历
                     *
                     * Start - edit by JSoon
                     */
                    $(document).on('beforePageSwitch', function() {
                        p.input.off('click', openOnInput);
                        $(document).off('beforePageSwitch');
                    });
                    /**
                     * End - edit by JSoon
                     */
                }

            }

            if (!p.inline) $('html').on('click', closeOnHTMLClick);

            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) p.input.parents('.ui-content').css({'padding-bottom': ''});
                if (p.params.onClose) p.params.onClose(p);

                // Destroy events
                p.destroyCalendarEvents();
            }

            p.opened = false;
            p.open = function () {
                var updateValue = false;
                if (!p.opened) {
                    // Set date value
                    if (!p.value) {
                        if (p.params.value) {
                            p.value = p.params.value;
                            updateValue = true;
                        }
                    }

                    // Layout
                    p.layout();

                    // Append
                    if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('ui-picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $($.pickerModal(p.pickerHTML));
                        $(p.container)
                            .on('close', function () {
                                onPickerClose();
                            });
                    }

                    // Store calendar instance
                    p.container[0].f7Calendar = p;
                    p.wrapper = p.container.find('.ui-picker-calendar-months-wrapper');

                    /**
                     * 获取全局年份组及其wrapper的zepto对象
                     * 获取全局月份组wrapper的zepto对象
                     *
                     * Start - edit by JSoon
                     */
                    p.yearsPickerWrapper = p.container.find('.ui-picker-calendar-years-picker-wrapper');
                    p.yearsGroups = p.yearsPickerWrapper.find('.ui-picker-calendar-years-group');

                    p.monthsPickerWrapper = p.container.find('.ui-picker-calendar-months-picker-wrapper');
                    /**
                     * End - edit by JSoon
                     */

                    // Months
                    p.months = p.wrapper.find('.ui-picker-calendar-month');

                    // Update current month and year
                    p.updateCurrentMonthYear();

                    // Set initial translate
                    /**
                     * 初始化年份组过渡动画位置
                     *
                     * Start - edit by JSoon
                     */
                    p.yearsTranslate = 0;
                    p.setYearsTranslate();
                    /**
                     * End - edit by JSoon
                     */
                    p.monthsTranslate = 0;
                    p.setMonthsTranslate();

                    // Init events
                    p.initCalendarEvents();

                    // Update input value
                    if (updateValue) p.updateValue();

                }

                // Set flag
                p.opened = true;
                p.initialized = true;
                if (p.params.onMonthAdd) {
                    p.months.each(function () {
                        p.params.onMonthAdd(p, this);
                    });
                }
                if (p.params.onOpen) p.params.onOpen(p);
            };

            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                $.closeModal(p.container);
                return;
            };

            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
            };

            if (p.inline) {
                p.open();
            }

            return p;
        };
        $.fn.calendar = function (params) {
            return this.each(function() {
                var $this = $(this);
                if(!$this[0]) return;
                var p = {};
                if($this[0].tagName.toUpperCase() === "INPUT") {
                    p.input = $this;
                } else {
                    p.container = $this;
                }
                new Calendar($.extend(p, params));
            });
        };

        $.initCalendar = function(content) {
            var $content = content ? $(content) : $(document.body);
            //console.log($content.find("[data-toggle='date']")[0]);
            $content.find("[data-toggle='date']").each(function() {
                $(this).calendar();
            });
        };
        $.initCalendar($('.ui-page-content'));
    }($);
});