var SelectorFn = function(selector) {
    var matches = {
        "#": "getElementById",
        ".": "getElementsByClassName",
        "*": "querySelectorAll",
        "~": "getElementsByName",
        "@": "getElementsByTagName"
    }[selector[0]];
    this.element = undefined;
    if (!matches) return this;

    var el = document[matches](selector.slice(1));
    if (!el) return this;

    this.element = el.length < 2 ? el[0] : el;
    return this;
};

function isNodeList(nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return (
        typeof nodes === "object" &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        nodes.length !== undefined &&
        (nodes.length === 0 ||
            (typeof nodes[0] === "object" && nodes[0].nodeType > 0))
    );
}

function addEvent(element, eventType, callback) {
    eventType = eventType.split(" ");
    for (var i = 0; i < eventType.length; i++) {
        element.addEventListener(eventType[i], callback);
    }
    return this;
}

function removeEvent(element, eventType, callback) {
    eventType = eventType.split(" ");
    for (var i = 0; i < eventType.length; i++) {
        element.removeEventListener(eventType[i], callback);
    }
    return this;
}

function handleEvent(eventType, callback, eventFn) {
    var element = this.element;
    if (!element) return;

    if (isNodeList(element)) {
        var elementArray = Array.prototype.slice.call(element);
        for (var i = 0, len = elementArray.length; i < len; i++) {
            eventFn(elementArray[i], eventType, callback);
        }
    } else {
        eventFn(element, eventType, callback);
    }
    return this;
}

function createArrayBySlice(arr, defaultArray) {
    var args = Array.prototype.slice.call(arr);
    if (defaultArray) args = args.concat(defaultArray);
    return args;
}

SelectorFn.prototype.on = function() {
    return handleEvent.apply(this, createArrayBySlice(arguments, [addEvent]));
};

SelectorFn.prototype.off = function() {
    return handleEvent.apply(this, createArrayBySlice(arguments, [removeEvent]));
};

module.exports = function(selector) {
    return new SelectorFn(selector);
};
