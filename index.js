require("./polyfill");

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

function addEventOn(element, eventType, callback) {
    eventType = eventType.split(" ");
    for (var i = 0; i < eventType.length; i++) {
        element.addEventListener(eventType[i], callback);
    }
    return this;
}

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

SelectorFn.prototype.on = function(eventType, callback) {
    var element = this.element;
    if (!element) return;

    if (isNodeList(element)) {
        var elementArray = Array.prototype.slice.call(element);
        for (var i = 0, len = elementArray.length; i < len; i++) {
            addEventOn(elementArray[i], eventType, callback);
        }
    } else {
        addEventOn(element, eventType, callback);
    }
    return this;
};

module.exports = function(selector) {
    return new SelectorFn(selector);
};
