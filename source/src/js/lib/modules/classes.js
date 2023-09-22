import $ from '../core';

$.prototype.addClass = function(...classNames){
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) {
            continue;
        }
        this[i].classList.add(...classNames);
    }

    return this;
};

$.prototype.removeClass = function(...classNames){
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) {
            continue;
        }
        this[i].classList.remove(...classNames);
    }

    return this;
};

$.prototype.toggleClass = function(classNames){
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) {
            continue;
        }
        this[i].classList.toggle(classNames);
    }

    return this;
};

// 12.03.2023 есть такой класс
// если класс есть то вернет true, иначе false
$.prototype.hasClass = function (className) {
    if (!this[0]) {
        // console.log('none');
        return false;
    }
    let elements = [... this[0].classList];
    for (let i = 0; i < elements.length; i++) {
        // console.log( elements.indexOf(className));
        return (elements.indexOf(className)) > -1;
    }
    return false;
}