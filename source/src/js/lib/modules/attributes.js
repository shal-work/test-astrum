import $ from '../core';

// $('.activ').setAttribute('id', 'ok');

$.prototype.setAttribute = function (attributeName, value) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].hasAttribute(attributeName)) { //можно не проверять, работает
            this[i].setAttribute(attributeName, value);
        }
    }

    return this;
};

$.prototype.getAttribute = function (attributeName) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            return this[i].getAttribute(attributeName);
        }
    }
    return this;
};

$.prototype.removeAttribute = function (attributeName) {
    for (let i = 0; i < this.length; i++) {

        if (this[i].hasAttribute(attributeName)) { //можно не проверять, работает
            this[i].removeAttribute(attributeName);
        }
    }
    return this;
};


$.prototype.toggleAttribute = function (attributeName, value) {
    for (let i = 0; i < this.length; i++) {

        if (this[i].hasAttribute(attributeName)) {
            this[i].removeAttribute(attributeName);
            this[i].setAttribute(attributeName, value);
        } else {
            this[i].setAttribute(attributeName, value);
        }
    }

    return this;
};