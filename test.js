var $ = require("./index");

document.body.innerHTML = `
    <div id="app">
        <h1>APP</h1>
    </div>
    <div class="foo" name="bar"></div>
`;

console.log($("#app"));
console.log($(".foo"));
console.log($("*#app h1"));
console.log($("~h1"));
console.log($("@bar"));

$("#app").on("click", function () {
    console.log(this);
});