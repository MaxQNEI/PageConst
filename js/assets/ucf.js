'use strict';

(function() {
    if(String.prototype.hasOwnProperty('toUpperCaseFirst')) {
        return;
    }

    return Object.defineProperties(String.prototype, {
        toUpperCaseFirst: { enumerable: true, value: toUpperCaseFirst },
        toUCF: { enumerable: true, value: toUpperCaseFirst },
    });

    function toUpperCaseFirst() {
        return (this.toLowerCase().match(/\w+[^\w]*/g) || []).map(function(p) {
            return `${p[0].toUpperCase()}${p.substr(1)}`;
        }).join('');
    }
})();
