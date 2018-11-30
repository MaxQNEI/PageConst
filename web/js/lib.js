'use strict';

/* String ------------------------------------------------------------------- */
(function() { /* FOLD */
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

/* NodeList ----------------------------------------------------------------- */
(() => { /* FOLD */
    return Object.defineProperties(NodeList.prototype, {
        each: { enumerable: true, value: each },
    });

    function each(handle) {
        const list = this;
        Object.values(this).some((nodeitem, nodeindex) => {
            handle.apply(nodeitem, [nodeitem, nodeindex, list]);
        });
        return this;
    }
})();

/* HTMLElement -------------------------------------------------------------- */
(() => { /* FOLD */
    return Object.defineProperties(HTMLElement.prototype, {
        attr: { enumerable: true, value: attr },
        hasAttr: { enumerable: true, value: hasAttr },
        setAttr: { enumerable: true, value: setAttr },
        getAttr: { enumerable: true, value: getAttr },
        removeAttr: { enumerable: true, value: removeAttr },

        hasClass: { enumerable: true, value: hasClass },
        addClass: { enumerable: true, value: addClass },
        removeClass: { enumerable: true, value: removeClass },
    })/*, test()*/;

    function attr(name, value) {
        if(!name) { throw new Error(`name is '${name}'!`); }

        const _this = this;

        if(name instanceof Object) {
            Object.keys(name).some(attrName => {
                _this.attr(attrName, name[attrName]);
            });
            return this;
        }

        if(value === null) {
            _this.removeAttr(name);
        } else if(value === undefined) {
            return _this.getAttr(name);
        } else {
            _this.setAttribute(name, value);
        }

        return this;
    }

    function hasAttr(name) {
        if(!name) { throw new Error(`name is '${name}'!`); }
        return this.hasAttribute(name);
    }

    function setAttr(name, value) {
        if(!name) { throw new Error(`name is '${name}'!`); }

        const _this = this;
        if(name instanceof Object) {
            Object.keys(name).some(attrName => {
                _this.setAttr(attrName, name[attrName]);
            });
            return this;
        }

        this.setAttribute(name, (value || ''));
        return this;
    }

    function getAttr(name) {
        if(!name) { throw new Error(`name is '${name}'!`); }
        return this.getAttribute(name);
    }

    function removeAttr(name) {
        if(!name) { throw new Error(`name is '${name}'!`); }
        this.removeAttribute(name);
        return this;
    }

    function hasClass(name) {
        return this.classList.contains(name.trim());
    }

    function addClass(name) {
        const _this = this;
        name.split(' ').some(className => {
            _this.classList.add(className);
        });
        return this;
    }

    function removeClass(name) {
        const _this = this;
        name.split(' ').some(className => {
            _this.classList.remove(className);
        });
        return this;
    }

    // function test() {
    //     console.group('HTMLElement.prototype test()');

    //     const element = document.createElement('div');

    //     const attrName = 'test-attribute';
    //     const attrValue = 'attribute-value';

    //     const className = 'test-classname';

    //     console.debug('element.attr() add', element.attr(attrName, attrValue));
    //     console.debug('element.attr() get', element.attr(attrName));
    //     console.debug('element.attr() remove', element.attr(attrName, null));

    //     console.group('element.hasAttr()');
    //     console.debug('element.hasAttr()', element.hasAttr(attrName));
    //     console.debug('element.attr() add', element.attr(attrName, attrValue));
    //     console.debug('element.hasAttr()', element.hasAttr(attrName));
    //     console.groupEnd();

    //     console.group('element.removeAttr()');
    //     console.debug('element.removeAttr()', element.removeAttr(attrName));
    //     console.groupEnd();

    //     console.group('element.setAttr()');
    //     console.debug('element.setAttr()', element.setAttr(attrName, attrValue));
    //     console.groupEnd();

    //     console.group('element.{has|add|remove}Class()');
    //     console.debug('element.hasClass()', element.hasClass(className));
    //     console.debug('element.addClass()', element.addClass(className));
    //     console.debug('element.hasClass()', element.hasClass(className));
    //     console.debug('element.removeClass()', element.removeClass(className));
    //     console.debug('element.hasClass()', element.hasClass(className));
    //     console.groupEnd();

    //     console.groupEnd();
    // }
})();
