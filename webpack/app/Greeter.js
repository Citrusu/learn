let config = require('./config.json');
module.exports = function(){
    let div = document.createElement('div');
    div.textContent = config.greetText;
    return div;
}