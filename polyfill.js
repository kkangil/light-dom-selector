(function() {
    var select = function(selector, maxCount) {
        var style = document.createStyleSheet();
        var all = document.all,
            l = all.length,
            i,
            resultSet = [];

        style.addRule(selector, "foo:bar");
        for (i = 0; i < l; i += 1) {
            if (all[i].currentStyle.foo === "bar") {
                resultSet.push(all[i]);
                if (resultSet.length > maxCount) {
                    break;
                }
            }
        }
        style.removeRule(0);
        return resultSet;
    };

    if (!document.querySelector) {
        document.querySelector = document.body.querySelector = function(selector) {
            return select(selector, 1)[0] || null;
        };
    }

    if (!document.querySelectorAll) {
        document.querySelectorAll = document.body.querySelectorAll = function(
            selector
        ) {
            return select(selector, Infinity);
        };
    }

    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function(match) {
            var result = [],
                elements = document.body.getElementsByTagName("*"),
                i,
                elem;
            match = " " + match + " ";
            for (i = 0; i < elements.length; i++) {
                elem = elements[i];
                if (
                    (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(
                        match
                    ) > -1
                ) {
                    result.push(elem);
                }
            }
            return result;
        };
    }

    if (!Element.prototype.addEventListener) {
        var oListeners = {};
        function runListeners(oEvent) {
            if (!oEvent) { oEvent = window.event; }
            for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) {
                    for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
                    break;
                }
            }
        }
        Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
            if (oListeners.hasOwnProperty(sEventType)) {
                var oEvtListeners = oListeners[sEventType];
                for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                    if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
                }
                if (nElIdx === -1) {
                    oEvtListeners.aEls.push(this);
                    oEvtListeners.aEvts.push([fListener]);
                    this["on" + sEventType] = runListeners;
                } else {
                    var aElListeners = oEvtListeners.aEvts[nElIdx];
                    if (this["on" + sEventType] !== runListeners) {
                        aElListeners.splice(0);
                        this["on" + sEventType] = runListeners;
                    }
                    for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
                        if (aElListeners[iLstId] === fListener) { return; }
                    }
                    aElListeners.push(fListener);
                }
            } else {
                oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
                this["on" + sEventType] = runListeners;
            }
        };
        Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
            if (!oListeners.hasOwnProperty(sEventType)) { return; }
            var oEvtListeners = oListeners[sEventType];
            for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
            }
            if (nElIdx === -1) { return; }
            for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
                if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
            }
        };
    }

    var _slice = Array.prototype.slice;

    try {
        _slice.call(document.documentElement);
    } catch (e) {
        Array.prototype.slice = function(begin, end) {
            end = (typeof end !== 'undefined') ? end : this.length;

            if (Object.prototype.toString.call(this) === '[object Array]'){
                return _slice.call(this, begin, end);
            }

            var i, cloned = [],
                size, len = this.length;

            var start = begin || 0;
            start = (start >= 0) ? start : Math.max(0, len + start);

            var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
            if (end < 0) {
                upTo = len + end;
            }

            size = upTo - start;

            if (size > 0) {
                cloned = new Array(size);
                if (this.charAt) {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this.charAt(start + i);
                    }
                } else {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this[start + i];
                    }
                }
            }

            return cloned;
        };
    }
})();