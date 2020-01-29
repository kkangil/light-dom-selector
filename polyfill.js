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
})();