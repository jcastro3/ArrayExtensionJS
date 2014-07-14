//order an array of obj by prop value decending ascending
//firstOrDefault lastOrDafault


var people = [
	{name: 'pedro', age: 119 },
	{name: 'juan', age: 5 },
	{name: 'min', age: 16 },
	{name: 'astrid', age: 20 },
	{name: 'topo', age: 18 }
];



var peopleSkills = [
    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea'] },
    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
];


var children = [
    {name: 'ana', sex: 'f'},
    {name: 'fosto', sex: 'm'},
    {name: 'jane', sex: 'f'},
    {name: 'yadaaai', sex: 'f'},
    {name: 'lili', sex: 'f'},
    {name: 'bany', sex: 'm'},
    {name: 'rod', sex: null},
    {name: 'ss', sex: 'f'},
    {name: 'martin', sex: 'm'}
];


console.log('Hire the following guys');

console.log('#1 EACH');
people.each(function (x, i) { console.log((i + 1) + '.- ' + x.name + ' is ' + x.age +  ' years old'); });
var logPerson = function (x, i) { console.log((i + 1) + '. ' + x.name + ' is ' + x.age + ' years old'); };

console.log('PROBLEM #3');
peopleSkills.where(function (dev) { var skills = dev.skills.where(function(skill) { return skill === 'PHP'; }); return skills.length === 0; }).each(logPerson);


peopleSkills
    .where(function (dev) { return !dev.skills.any('C#'); }).each(logPerson);

console.log('PROBLEM #4');
peopleSkills
     .where(function(dev){
         return !dev.skills.any('C#');
     })
     .select(function(dev) {
         return dev.name;
     })
     .each(function(x){
         console.log(x);
     });




console.log('PROBLEM #5');
    children
        .take(3, function(x){ return x.sex == 'f'; })
        .each(function(x){ console.log(x.name); });

console.log("PROBLEM #6");
    children
        .skip(3).each(function(x){ console.log(x.name); });


console.log("PROBLEM #7");
    console.log(children.first().name); 
    console.log(children.first(function(x){ return x.sex == 'm';}).name);


console.log("PROBLEM #8");
    console.log(children.last().name);
    console.log(children.last(function(x){ return x.sex == 'f';}).name);


console.log("PROBLEM #9");
    console.log(children.count() +  ' children');
    console.log(children.count(function(x){ return x.sex === 'f';}) + ' are female');


console.log("PROBLEM #10");
    console.log(children.index( function(x) { return x.name == 'bany'; }));
    console.log(children.index( function(x) { return x.name == 'mark'; }));
    console.log([1,3,5,7,9,11].index(7));

console.log("PROBLEM #11");
    children
 	  .pluck('sex')
 	  .each(function(x){ console.log(x);});


 console.log("PROBLEM #12");
 console.log([1, 3, 5, 7, 9, 11, 's'].sum());
 console.log([1, 3, 5, 7, 9, 11].sum(function(x) { return x * 2; } ));

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


console.log('PROBLEM #16');
    console.log(people.orderByAsc('name'));

console.log('PROBLEM #17');
    console.log(children.orderByDesc('name'));

console.log('PROBLEM #18');
    console.log(people.firstOrDefault(function(a){ return a.age === 20; }));
console.log('PROBLEM #19');
    console.log(people.lastOrDefault(function(a){ return a.name === 5; }));

var compare = [{name: 'tony'}, {name: 'july'}, {name: 'tony'}];
console.log('PROBLEM #20');
    console.log(compare.distinct(function(a, b) { return a.name !== b.name; }));