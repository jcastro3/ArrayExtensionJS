
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
        var buffer = [];
        if (!this.length) {
            return null;
        }
        var i;
        for (i = 0; i < this.length; i += 1) {
             var res = spec.call(this, this[i], i);
            if(res) {
                buffer.push(res);
            }
        }
        return buffer;
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
    //make a function that will let you take how many and leave the spec out of it
    AEx.take = function (howMany, spec) {
        var buffer = [],
            check = 0,
            i,
            exp = (isFunction(spec)) ? spec : nonFunction(howMany);
        for (i = 0; i < this.length; i += 1) {
            if (check >= howMany) {
                return buffer;
            }
            if (exp.call(this, this[i])) {
                buffer.push(this[i]);
                check += 1;
            }
        }
        return buffer;
    };


    AEx.skip = function (howMany) {
        if(!this.length) {
            return null;
        }
        var newbuffer = [];
        newbuffer = this.splice(howMany, this.length);
        return newbuffer;


    };
    
    AEx.first = function (spec) {
        var buffer = [],
            length = this.length,
            i;
        if (!this.length) {
            return null;
        } else if (!isFunction(spec)) {
            return this[0];
        }
        for (i = 0; i < length; i += 1) {

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
        } else if (!isFunction(spec)) {
            return this[length - 1];
        }
        for (i = length - 1; i > 0; i -= 1) {
            if (spec.call(this, this[i])) {
                return this[i];
            }
        }
    };

    AEx.count = function (spec) {
        var count = 0,
            i;
        if (!isFunction(spec)) {
            return this.length;
        }

        for (i = 0; i < this.length; i += 1) {
            if (spec.call(this, this[i])) {
                count += 1;
            }
        }
        return count;
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

    AEx.pluck = function (name) {

        var buffer = [],
            i;
        for (i = 0; i < this.length; i += 1) {
            buffer.push(this[i][name]);
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
        var buffer = [];
        buffer = this.reduce(function flat(a, b) { //current ,previous values
            return a.concat(isArray(b) ? b.reduce(flat, []) : [b]);
        }, []);
        return buffer;
    };
    

    //order an array of obj by the prop value selected either in  decending or ascending order
    AEx.orderByAsc = function (propName) {
        //use sort(function(){})
        //if property does not exist return null
        if (!this[0].hasOwnProperty(propName)) {
            return null;
        }
        var order = []; //change buffer name
        order = this.sort(
            function (a, b) {
                
                if (typeof a[propName] === 'string') {
                    return (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
                } else {
                    return a[propName] - b[propName];
                }
            }
        );
        return order;
    };
    //
    AEx.orderByDesc = function (propName) {
        var order = [];
        
        if (!this[0].hasOwnProperty(propName)) {
            return null;
        }
        
        order = this.sort(
            function (a, b) {
                if (typeof a[propName] === 'string') {
                    return (a[propName] < b[propName]) ? 1 : (a[propName] > b[propName]) ? -1 : 0;
                } else {
                    return b[propName] - a[propName];
                }
            }
        );
        return order;
    };
    
    AEx.firstOrDefault = function (spec) {
//            will get first element that satisfies  the condition if not vallue is faound then defaul will be return
        var i;
        for (i = 0; i < this.length; i += 1) {
            if (spec.call(this, this[i])) {
                return this[i];
            }
        }
        return null;
    };
    
    AEx.lastOrDefault = function (spec) {
        var i;
        for (i = this.length - 1; i > 0; i -= 1) {
            if (spec.call(this, this[i])) {
                return this[i];
            }
        }
        return null;
    };
    
    //NOTA: si es mas de una condicional haz una condicion a la vez, ordenas las condiciens , merge sort nLog(n)
    AEx.distinct = function (spec) {
        var o = {}, i, l = this.length, r = [];
        for(i = 0; i < l;i += 1) o[this[i]] = this[i];
        for(i in o)  {
            
            r.push(o[i]);
        
        }
        return r;
            
            
    
       
    };
    
    
    
}(Array.prototype));