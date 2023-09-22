import $ from '../core';

$.prototype.show = function() {
    for(let i = 0; i < this.length; i++) {
        if (!this[i].style) {
            continue;
        }
        this[i].style.display = '';
    }

    return this;
};

$.prototype.hide = function() {
    for(let i = 0; i < this.length; i++) {
        if (!this[i].style) {
            continue;
        }
        this[i].style.display = 'none';
    }
    return this;
};

$.prototype.toggle = function() {
    
    for(let i = 0; i < this.length; i++) {

        if (!this[i].style) {
            continue;
        }
        if (this[i].style.display === 'none') {
            this[i].style.display = '';
        } else {
            this[i].style.display = 'none';
        }
    }

    return this;
};

$.prototype.visibilityIn = function() { //добавил для колобка
    
    for (let i = 0; i < this.length; i++) {
        this[i].style.visibility = 'visible';
        his[i].style.maxHeight = '100%';
    }

    return this;
};

$.prototype.visibilityOut = function() { //добавил для колобка

    for (let i = 0; i < this.length; i++) {
        this[i].style.visibility = 'hidden';
        this[i].style.maxHeight = '0';
    }

    return this;
};