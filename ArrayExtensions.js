
(function (AEx) {

    'use strict';
    function isFunction(spec) { //check if spec is a function
        return typeof spec === 'function';
    }

    function nonFunction(spec) { //check if spec is a value and return it as a funct

        function compare(elem) {
            return spec === elem;
        }
        return compare;
    }

    function substractFunc(a,b) {
        return a - b;
    }


    function isArray(val) {
        if (Object.prototype.toString.call(val) === '[object Array]') {
            return true;
        }
        return false;
    }
    
    AEx.each = function (spec) {
        var i;
        for (i = 0; i < this.length; i += 1) {
            spec.call(this, this[i], i);
        }
    };

    AEx.where = function (spec) {
        var buffer = [],
            i;
        for (i = 0; i < this.length; i += 1) {
            if (spec.call(this, this[i])) {
                buffer.push(this[i]);
            }
        }
        return buffer;
    };

    AEx.any = function (spec) {

        var exp = (isFunction(spec)) ? spec : nonFunction(spec),
            i;
        for (i = 0; i < this.length; i += 1) {
            if (exp.call(this, this[i])) {
                return true;
            }
        }
        return false;
    };

    AEx.select = function (spec) {
        var buffer = [],
            i;
        for (i = 0; i < this.length; i += 1) {
            buffer.push(spec.call(this, this[i]));
        }
        return buffer;
    };

    AEx.take = function (howMany, spec) {
        var buffer = [],
            check = 0,
            i;
        for (i = 0; i < this.length; i += 1) {
            if (check >= howMany) {
                return buffer;
            }
            spec.call(this, this[i]);

            if (spec.call(this, this[i])) {
                buffer.push(this[i]);
                check += 1;
            }
        }
        return buffer;
    };


    AEx.skip = function (howMany) {

        var newbuffer = [];
        newbuffer = this.splice(howMany, this.length);
        return newbuffer;


    };
//refactorize
    AEx.first = function (spec) {
        var buffer = [],
            length = this.length,
            i;
        if (!this.length) {
            return null;
        }
        for (i = 0; i < length; i += 1) {
            if (isFunction(spec)) {
                spec.call(this, this[i]);
            } else {
                return this[i];
            }
            if (spec.call(this, this[i])) {
                return this[i];
            }
        }
    };

    AEx.last = function (spec) {
        var buffer = [],
            length = this.length,
            i;
        if (!this.length) {
            return null;
        } //fix this will return null op will continue
        for (i = length - 1; i > 0; i -= 1) {

            if (isFunction(spec)) {
                spec.call(this, this[i]);
            } else {
                return this[i];
            }

            if (spec.call(this, this[i])) {
                return this[i];
            }
        }
    };
    //fix this
    AEx.count = function(spec){
        var cont = 0,
            i;
        if (isFunction(spec)) {
            spec = spec;
        } else {
            return this.length;
        }

        for (i = 0; i < this.length; i += 1) {
            if (spec.call(this, this[i])) {
                cont += 1;
            }
        }
        return cont;
    };

    AEx.index = function (spec) {

        var exp = (isFunction(spec)) ? spec : nonFunction(spec),
            i;
        for (i = 0; i < this.length; i += 1) {
            if (exp.call(this, this[i])) {
                return i;
            }
        }
        return -1;
    };
   //WRONG!!!!!! : c 
    AEx.pluck = function (name) {

        var buffer = [],
            i;
        for (i = 0; i < this.length; i += 1) {
            buffer.push(this[i].name);
        }
        return buffer;
    };
    
    AEx.sum = function (spec) {

        var exp = (isFunction(spec)) ? spec : nonFunction(spec),
            i,
            sum = 0;
        for (i = 0; i < this.length; i += 1) {
            if (isFunction(exp)) {
                sum = sum + exp.call(this, this[i]);
            } else {
                sum = sum + this[i];
            }
        }
        return sum;
    };

    AEx.max = function (spec) {
        var max,
            exp,
            tmpMax,
            res = 0;
        if (!this.length) {
            return null;
        }
        if (!this.length) {
            return null;
        }
        exp = (isFunction(spec)) ? spec : substractFunc;
        max = this.reduce(
            function (a, b) {
                res = exp.call(this, a, b);
                tmpMax = (res >= 0) ? a : b;
                return tmpMax;
            }
        );
        return max;
    };

    AEx.min = function (spec) {
        var min,
            exp,
            tmpMin,
            res = 0;
        if (!this.length) {
            return null;
        }
        exp = (isFunction(spec)) ? spec : substractFunc;
        min = this.reduce(
            function (a, b) {
                res = exp.call(this, a, b);
                tmpMin = (res >= 0) ? b : a;
                return tmpMin;
            }
        );
        return min;
    };

    AEx.flatten = function () {
        var i,
            buffer = [];
        
        buffer = this.reduce(function flat(a,b){ //current ,previous values
            return a.concat(isArray(b) ? b.reduce(flat, []) : b);
        }, []);
        return buffer;
    };
}(Array.prototype));