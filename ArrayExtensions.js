
var ExtendArray = (function () {

}(ExtendArray));


var AEx = Array.prototype; //Array Extention
//consider using the each() method for iterating through the array  for each of the functions

var _isFunction = function (spec) { //check if spec is a function
        return typeof spec === 'function';
    };

var nonFunction = function (spec) { //check if spec is a value and return it as a funct
    
      function compare(index) {
        return spec === index;
      }

      return compare;

};

var substractFunc =  function(a,b) {
	return a - b;
};


var _isArray = function(val){
	if( Object.prototype.toString.call(val) === '[object Array]' )
    return true;
};

AEx.each = function(callback) {
	var i;
	//this has ref to the object that the function was invoked upon
	for (i = 0; i < this.length; i += 1) {
		callback.call(this,this[i],i);
	}
};

AEx.where = function (callback) {
	var buffer = [],
		i;
	for(i = 0; i < this.length; i += 1){

		if(callback.call(this, this[i])){
			buffer.push(this[i]);
		}
	}
	return buffer;
};

AEx.any = function (callback) {

    var spec = (_isFunction(callback)) ? callback : nonFunction(callback),
		i;
	for(i = 0; i < this.length; i += 1){

		if(spec.call(this, this[i])){
			return true;
		}
	}
	return false;
};

AEx.select = function (callback) {
	var buffer = [],
		i;
	for(i = 0; i < this.length; i += 1){

		var ans = callback.call(this, this[i]);
		buffer.push(ans);
	}
	return buffer;
};

AEx.take = function (howMany, callback) {
	var buffer = [],
		check = 0,
		i;
	for(i = 0; i < this.length; i += 1){

		if (check >= howMany) {
            return buffer;
        }
		
		var ans = callback.call(this, this[i]);
		
		if(ans){
			buffer.push(this[i]);
			check++;
		}
	}
	return buffer;
};


AEx.skip = function(howMany){
	
	var newbuffer = [];
	newbuffer = this.splice(howMany,this.length);
	return newbuffer;
		
	
};

AEx.first = function(callback){
	var buffer = [],
		i;
	// if (_isFunction(callback)) {};

	for(i = 0; i<this.length; i += 1){
		
		var ans = callback.call(this, this[i]);
		
		if(ans){
			return this[i];
		}
	}
};

AEx.last = function(callback){
	var buffer = [],
		i;

	for (i = this.length; i >= 0; i -= 1) {
		var ans = callback.call(this, this[i]);
		
		if(ans){
			return this[i];
		}
	}
};

AEx.count = function(callback){
	var cont = 0,
		i;
	if (_isFunction(callback)) {
		callback = callback;
    } else{ return this.length;
    }

	for (i = 0; i < this.length; i += 1) {
		if(callback.call(this, this[i])){
			cont++;
		}
	}
	return cont;
};

AEx.index = function(callback){

    var spec = (_isFunction(callback)) ? callback : nonFunction(callback),
		i;

	for (i = 0; i < this.length; i += 1) {
		if(spec.call(this, this[i])){
			return i;
		}
	}
	return -1;

};

AEx.pluck = function(name){

	var buffer = [],
		i;
	for (i = 0; i<this.length; i += 1) {
		
			buffer.push(this[i].name);
		
	}
	return buffer;

};
//NOTE:  if you have elements taht are not numbers it will concatenate strings.
AEx.sum = function(callback) {

   var spec = (_isFunction(callback)) ? callback : nonFunction(callback),
		i, sum = 0;
	for(i = 0; i < this.length; i += 1) {
		if(_isFunction(callback)) {
			sum = sum + spec.call(this, this[i]);
		} else {
			sum = sum + this[i];
		}
		
	}
	return sum;
};

//will return maximum value in array,
//null value if empty
//will turn array val elem to number .length 
//function(a, b) a and b will be compared throughout the array will stay with the max value
//[1] if return value is positive a is bigger 
//[-1] if retunr value is negative b is bigger 
//[0] if return value is equal will return 0 will need to know if any other elements remain and compare them 
// var people = [
// {name: 'pedro', age: 19 },
// {name: 'juan', age: 15 },
// {name: 'pablo', age: 16 },
// {name: 'pancho', age: 20 },
// {name: 'topo', age: 18 }
// ];
AEx.max = function (callback) {
	var max,
		spec,
		tmpMax,
		res = 0;
	if (!this.length) {
		return null;
	}
	spec = (_isFunction(callback)) ? callback : substractFunc;
	max = this.reduce(
		function(a,b){
				res = spec.call(this, a,b);
				tmpMax = (res >=0) ? a : b;
				return tmpMax;
			}
		);
	return max;
};

AEx.min = function (callback) {
	var min,
		spec,
		tmpMin,
		res = 0;
	if (!this.length) {
		return null;
	}
	spec = (_isFunction(callback)) ? callback : substractFunc;
	min = this.reduce(
		function(a,b){
				res = spec.call(this, a,b);
				tmpMin = (res >=0) ? b : a;
				return tmpMin;
			}
		);
	return min;

};

AEx.flatten = function() {
    var i,
    buffer = [];
    buffer = this.reduce(function flat(a,b){ //current ,previous values
		return a.concat(_isArray(b) ? b.reduce(flat,[]) : b);
    },[]);
    return buffer;
};


var people = [
	{name: 'pedro', age: 119 },
	{name: 'juan', age: 5 },
	{name: 'min', age: 16 },
	{name: 'pancho', age: 20 },
	{name: 'topo', age: 18 }
];


// var logPerson = function(x, i){	console.log((i + 1) + '.'+ x.name + ' is ' + x.age + ' years old')};

var peopleSkills = [
{name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
{name: 'juan', age: 23, skills: ['PHP', 'Drink tea'] },
{name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
];



console.log('Hire the following guys');

 // 1. EACH
// people.each(function(x,i){
// console.log((i + 1) + '.- ' + x.name + ' is ' + x.age +  ' years old');
// });

// var logPerson = function(x, i){
//   console.log((i + 1) + '.­ ' + x.name + ' is ' + x.age + ' years old');
// };


// peopleSkills.where(function(dev){
// 	var skills = dev.skills.where(function(skill) { return skill === 'PHP'; });
// 	return skills.length === 0;
// }).each(logPerson);

// peopleSkills
// 			.where(function(dev){
// 			    return !dev.skills.any('C#');
// 			})
// 			.each(logPerson);


// peopleSkills
//     .where(function(dev){
//         return !dev.skills.any('C#');
//     })
//     .select(function(dev) {
//         return dev.name;
//     })
//     .each(function(x){
//         console.log(x);
//     });


var children = [
    {name: 'ana', sex: 'f'},
    {name: 'fosto', sex: 'm'},
    {name: 'jane', sex: 'f'},
    {name: 'yadaaai', sex: 'f'},
    {name: 'lili', sex: 'f'},
    {name: 'bany', sex: 'm'},
    {name: 'rod', sex: null},
    {name: 'ss', sex: 'f'},
    {name: 'martin', sex: 'm'}];

// console.log('PROBLEM #5');
// children
// .take(3, function(x){ return x.sex == 'f'; })
// .each(function(x){ console.log(x.name); });

// console.log("PROBLEM #6");
// children
//     .skip(3).each(function(x){ console.log(x.name); });


// console.log("PROBLEM #7");
// // console.log(children.first().name); NEED TO FIX THIS
// console.log(children.first(function(x){ return x.sex == 'm';}).name);


// console.log("PROBLEM #8");
// // console.log(children.first().name); NEED TO FIX THIS
// console.log(children.first(function(x){ return x.sex == 'f';}).name);


// console.log("PROBLEM #9");
// console.log(children.count() +  ' children');
// console.log(children.count(function(x){ return x.sex === 'f';}) + ' are female');


// console.log("PROBLEM #10");
// console.log(children.index( function(x) { return x.name == 'bany'; }));
// console.log(children.index( function(x) { return x.name == 'mark'; }));
// console.log([1,3,5,7,9,11].index(7));

// console.log("PROBLEM #11");
// children
// 	.pluck('name')
// 	.each(function(x){ console.log(x);});


// console.log("PROBLEM #12");
// console.log([1, 3, 5, 7, 9, 11].sum());
// console.log([1, 3, 5, 7, 9, 11].sum(function(x) { return x * 2; } ));

console.log("PROBLEM #13");
console.log([1, 3, 5, 7, 9, 11, 2, 4, 6].max());
console.log(children.max(function(a, b){ return a.name.length - b.name.length;}).name);
console.log(people.max(function(a, b) { return a.age - b.age; }).name);
console.log("PROBLEM #14");
console.log([11, 3, 0, 7, 9, 11, 1, 4, 6].min());
console.log(children.min(function(a, b){ return a.name.length - b.name.length; }).name);
console.log(people.min(function(a, b){ return a.age - b.age; }).name);
console.log("PROBLEM #15");
console.log([1,2,3,[4,5,[6, 7, 8], 9, [[10, 11], 12], 13, 14], 15, 16].flatten());