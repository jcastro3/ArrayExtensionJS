describe('Array Extension', function () {
    'use strict';
    var objArray,
        peopleSkills,
        stringArray,
        numArray,
        result;
    beforeEach(function () {
        result = [];
        objArray = [{name: 'pedro', age: 22 }];
        numArray = [1, 2, 3];
        peopleSkills = [
            {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
            {name: 'juan', age: 23, skills: ['PHP', 'Drink tea'] },
            {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
        ];

        
    });
    describe('1. "EACH" ', function () {
        stringArray = ['SOS'];
        it('using strings ', function () {
            stringArray.each(function (x) { result += x; });
            expect(result).toBe('SOS');
        });
        
        it('using numbers ', function () {
            numArray.each(function (x) { result += x; });
            expect(result).toBe('123');
        });
        
        it('using obj literals', function () {
            objArray.each(function (x, i) { result += (i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old'; });
            expect(result).toBe('1.- pedro is 22 years old');
        });
        
        it('should be empty', function () {
            var empty = [];
            expect(empty.each()).toBeNull();
        });
    });
    
    describe('2. "WHERE"  ', function () {
        var cars = ['ford', 'mazda', 'honda', 'volkswagen', 'ferrari'];
        it('using strings', function () {
           result  = cars.where(function (brand) { return brand === 'ferrari'; });
           expect(result).toMatch('ferrari');
           expect(result).not.toMatch('ford');
           expect(result).not.toBeNull();
        });
        
        it('using numbers', function () {
            result = numArray.where(function (n) { return n !== 1; });
            expect(result).toMatch(2, 3);
            expect(result).not.toMatch(1);
            expect(result).not.toBeNull();
        });
        
        it('using obj literal', function () {
            var logPerson = function (x) { result.push(x.name  + ' is ' +  x.age + ' he is hired');  };
            peopleSkills
                .where(function (dev) {
                    var skills = dev.skills.where(function (skill) { return skill === 'PHP' || skill === 'C#'; }); return skills.length === 0; })
                .each(logPerson);
            expect(result).toMatch('pablo is 26 he is hired');
            expect(result).not.toMatch('juan is 23 he is hired');
            expect(result).not.toBeNull();
            
        });
    });
    
    describe('3. "ANY" c ', function () {
        var languages = ['php', 'c#', 'javascript', 'ruby', 'java'],
            falsy = languages.any(function (skill) { return skill === 'cobol'; }),
            truthy = languages.any(function (skill) { return skill === 'javascript'; }),
            logPerson = function (x) { result.push(x.name  + ' is ' +  x.age + ' he is hired');  }; //will use later
        
        it('its false', function () {
            expect(falsy).toBeFalsy();
            expect(falsy).not.toBeTruthy();
        });
        
        it('its true', function () {
            expect(truthy).toBeTruthy();
            expect(truthy).not.toBeFalsy();
        });
        
    });
    
    describe('4. "SELECT" ', function () {
        var x = [{name:'tony', age:24}, {name:'gaby', age:17},{name:'july', age:25}],
            names = x.select(function (n) { return n.name; }),
            age = x.select(function (a) { return a.age; }),
            both = x.select(function (b) { return b.name + ' ' + b.age; });

        it('selects all names', function () {
//            expect(names).toBeAnArray(names);
            expect(names).toMatch('tony', 'gaby', 'july');
        });
        it('selects all ages', function () {
//            expect(age).toBeAnArray(age);
            expect(age).toMatch(24, 17, 25);
        });

        it('selects both', function () {
//            expect(both).toBeAnArray(both);
            expect(both).toMatch('tony 24', 'gaby 17', 'july 25');
        });
    });
    
    describe('5. "TAKE" ', function () {
        var result = [],
            x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            names = x.take(3, function (x) { return x.sex === 'f'; }).each(function(x){ return x.name;}),
            sex2 = x.take(2, function (x) { return x.sex === 'f'; }),
            sex3 = x.take(3, function (x) { return x.sex === 'f'; }),
            both = x.take(3, function(x){ return x.name;}).each( function (x) { return x.name + ' is ' + x.sex});

        it('take 2 females ', function () {
            expect(sex2).not.toBeNull();
//            expect(sex2).toBeAnArray(sex2);
//            expect(2).toHaveIndexOf(sex2);
        });
        it('take 3 females ', function () {
            expect(sex3).not.toBeNull();
//            expect(sex3).toBeAnArray(sex3);
//            expect(3).toHaveIndexOf(sex3);
        });
        it('take 3 fem name values', function () {
            expect(names).not.toBeNull();
//            expect(names).toBeAnArray(result);
            expect(names).toMatch('ana', 'jane', 'july');

        });
//
        it('take first 4', function () {
            expect(both).not.toBeNull();
//            expect(both).toBeAnArray(both);
            expect(both).toMatch('ana is f', 'fosto is m', 'jane is f');
        });
    });

    describe('6. "SKIP" ', function () {
        var empty = [],
            x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            skip3 = x.skip(3).each(function(x){ return x.name;}),
            skip2 = x.skip(2).each(function(x){ return x.name;}),
            sex2 = x.take(2, function (x) { return x.sex === 'f'; }),
            emp = empty.skip(3);

        it('skip the first 2 names', function () {
            expect(skip2).not.toBeNull();
//            expect(skip2).toBeAnArray(skip2);
//            expect(1).toHaveIndexOf(sex2);
            expect(skip2).toMatch('jane', 'july');
        });

        it('skip the first 3 names', function () {
            expect(skip3).not.toBeNull();
//            expect().toBeAnArray(skip3);
//            expect(1).toHaveIndexOf(sex2);
            expect(skip3).toMatch('july');
        });
        it('returns null', function () {
           expect(emp).toBeNull();
           expect(emp).not.toBe('july');
//           expect(emp).not.toBeAnArray(emp);
        });

    //MISSING SPEC WILL ADD IT LATER


    });


    describe('7. "FIRST"', function () {
        var x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            empty = [],
            names = x.first().name,
            spec1 = x.first(function(x) { return x.name !== 'ana'}).name,
            spec2 = empty.first();


        it('returns 1st value it finds ', function () {
            expect(names).not.toBeNull();
            expect(names).toBe('ana');
            expect(names).not.toBe('fosto');

        });

        it('returns 1st value with given spec ', function () {
            expect(spec1).not.toBeNull();
            expect(spec1).toBe('fosto');
            expect(spec1).not.toBe('ana');

        });

        it('returns null ', function () {
            expect(spec2).toBeNull();
            expect(spec2).not.toBe('ana');
            expect(spec2).not.toBe('fosto');

        });

    });

    describe('8. "LAST"', function () {
        var x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            empty = [],
            names = x.last().name,
            spec1 = x.last(function(x) { return x.name !== 'july'}).name,
            spec2 = empty.last();


        it('returns 1st value it finds ', function () {
            expect(names).not.toBeNull();
            expect(names).toBe('july');
            expect(names).not.toBe('fosto');

        });

        it('returns 1st value with given spec ', function () {
            expect(spec1).not.toBeNull();
            expect(spec1).toBe('jane');
            expect(spec1).not.toBe('ana');

        });

        it('returns null ', function () {
            expect(spec2).toBeNull();
            expect(spec2).not.toBe('ana');
            expect(spec2).not.toBe('fosto');

        });

    });

    describe('9. "COUNT"', function () {
        var x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            empty = [],
            size = x.count(),
            spec1 = x.count(function(a) { return a.sex !== 'f'; }),
            spec2 = x.count(function(a) { return a.sex !== 'm'; });




        it('returns length of collection ', function () {
            expect(size).not.toBeNull();
            expect(size).toBe(4);
        });

        it('returns collection w/ give spec', function() {
            expect(spec1).not.toBeNull();
            expect(spec2).not.toBeNull();
            expect(spec1).toBe(1);
            expect(spec2).toBe(3);
            expect(spec1 && spec2).not.toEqual(NaN);

        });



    });


    describe('10. "INDEX"', function () {
        var x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            empty = [],
            array = [11,22,33,44,55],
            val1 = array.index(22),
            val2 = array.index(44),
            val3 = array.index(111),
            spec1 = x.index(function(a) { return a.name === 'ana'; }),
            spec2 = x.index(function(a) { return a.name === 'july'; }),
            spec3 = x.index(function(a) { return a.name === 'tony'; });

        console.log(val1);
        console.log(val2);


        it('returns index value ', function () {
            expect(val2 && val2).not.toBeNull();
            expect(val1).toBe(1);
            expect(val2).toBe(3);
            expect(val1).not.toBe(2);
            expect(val2).not.toBe(6);

        });

        it('should return -1 ', function () {
            expect(val3).not.toBeNull();
            expect(val3).toBe(-1);
            expect(spec3).toBe(-1);
            expect(val3).not.toBe(3);
            expect(val3).not.toBe(2);
            expect(val3).not.toBe(6);

        });

        it('returns index with provided spec ', function () {
            expect(spec1 && spec2).not.toBeNull();
            expect(spec1).toBe(0);
            expect(spec2).toBe(3);
            expect(spec1).not.toBe(3);
            expect(spec1).not.toBe(2);
            expect(spec2).not.toBe(5);

        });




    });

    describe('11. "PLUCK"', function() {

        var x = [{name:'ana', sex: 'f'}, {name:'fosto', sex: 'm'}, {name: 'jane', sex: 'f'}, {name: 'july', sex: 'f'}],
            y = [{car: 'ford'  , year: 1995}, {car: 'bmw'  , year: 2015}, {car: 'honda'  , year: 2005}],
            spec1 = x.pluck('name'),
            spec2 = x.pluck('sex'),
            spec3 = y.pluck('car'),
            spec4 = y.pluck('year');
        it('display name property', function(){
            expect(spec1).not.toBeNull();
            expect(spec1).toMatch('ana', 'fosto', 'jane', 'july');


        });

        it('display gender property', function(){
            expect(spec2).not.toBeNull();
            expect(spec2).toMatch('f','m','f','f');

        });

        it('display car properties', function(){
            expect(spec3 && spec4).not.toBeNull();
            expect(spec3).toMatch('ford', 'bmw', 'honda');
            expect(spec4).toMatch(1995, 2015, 2005);

        });
    });

    describe('12. "SUM"', function () {
        var arr = [11,22,33,44,55,66],
            sum1 = arr.sum(),
            sum2 = arr.sum(function (x){ return x *5});

        it('add all elements', function() {
            expect(sum1).not.toBeNull();
            expect(sum1).toBe(231);
            expect(sum1).not.toBe(232);

        });

        it('add all elements with given spec', function() {
            expect(sum2).not.toBeNull();
            expect(sum2).toBe(1155);
            expect(sum2).not.toBe(1156)
        })
    });

    describe('13, "MAX" ', function() {
        var arr = [1,32,4,54,5,233],
            people = [{name:'tony', age:24}, {name:'gabriela', age:17},{name:'july', age:25}],
            val1 = arr.max(),
            spec1 = people.max(function (a,b) { return a.name.length - b.name.length;}).name,
            spec2 = people.max(function(a,b) { return a.age - b.age; }).name;
        it('max value' , function() {
            expect(val1).not.toBeNull();
            expect(val1).toBe(233);
            expect(val1).toBeGreaterThan(232);
            expect(val1).toBeLessThan(234);
            expect(typeof val1).toBe('number');
        })

        it('max by name', function() {
            expect(spec1).not.toBeNull();
            expect(spec1).toBe('gabriela');
            expect(typeof spec1).toBe('string');
        })

        it('max by age', function() {
            expect(spec2).not.toBeNull();
            expect(spec2).toBe('july');
            expect(typeof spec2).toBe('string');
        })
    });



    describe('14, "MIN" ', function() {
        var arr = [1,32,4,54,5,233],
            people = [{name:'tony', age:24}, {name:'gabriela', age:17},{name:'julia', age:25}],
            val1 = arr.min(),
            spec1 = people.min(function (a,b) { return a.name.length - b.name.length;}).name,
            spec2 = people.min(function(a,b) { return a.age - b.age; }).name;
        it('smallest by value' , function() {
            expect(val1).not.toBeNull();
            expect(val1).toBe(1);
            expect(val1).toBeGreaterThan(0);
            expect(val1).toBeLessThan(2);
            expect(typeof val1).toBe('number');
        })

        it('smallest by name', function() {
            expect(spec1).not.toBeNull();
            expect(spec1).toBe('tony');
            expect(typeof spec1).toBe('string');
        })

        it('smallest by age', function() {
            expect(spec2).not.toBeNull();
            expect(spec2).toBe('gabriela');
            expect(typeof spec2).toBe('string');
        })
    });

    describe('15. "FLATTEN" ', function() {
        var arr = [1,[32,[4,54]],[5,233,4,2], [4]],
            flat = arr.flatten();

        it('flatten array' , function() {
            expect(flat).not.toBeNull();
            expect(typeof flat).toBe('object');
            expect(flat).toMatch(1,32,4,54,5,233,4,2,4);
        })

    });

    describe('16. "By Ascending"', function() {
        var names = [{name:'tony'}, {name:'gabriela'},{name:'julia'},{name:'ana'}],
            year = [{year:1700},{ year:2800},{year:2400},{year:1900}],
            ascending_name = [{name:'ana'}, {name:'gabriela'},{name:'julia'},{name:'tony'}],
            ascending_year = [{year:2800},{ year:2400},{year:1900},{year:1700}],

            res1 = names.orderByAsc('name'),
            res2 = year.orderByAsc('year'),
            noProp1 = names.orderByDesc('last'),
            noProp2 = year.orderByDesc('type');;

        it('name by ascending', function() {
            expect(res1).not.toBeNull();
            expect(res1).toEqual(ascending_name);

        })

        it('year by ascending', function() {
            expect(res2).not.toBeNull();
            expect(res2).toEqual(ascending_year);
        })

        it('should be null', function (){
            expect(noProp1).toBeNull();
            expect(noProp2).toBeNull();
        })

    });


    describe('17. "By Descending"', function() {
        var arr1 = [{name:'tony', age:24}, {name:'gabriela', age:17},{name:'julia', age:25},{name:'ana', age:21}],
            arr2 = [{name:'tony', age:24}, {name:'gabriela', age:17},{name:'julia', age:25},{name:'ana', age:21}],
            empty = [],
            descending_name = [{name:'tony', age:24},{name:'julia', age:25}, {name:'gabriela', age:17}, {name:'ana', age:21}],
            descending_age = [{name:'julia', age:25}, {name:'tony', age:24},{name:'ana', age:21},{name:'gabriela', age:17}],
            res1 = arr1.orderByDesc('name'),
            res2 = arr2.orderByDesc('age'),
            noProp1 = arr1.orderByDesc('years'),
            noProp2 = arr2.orderByDesc('years');
        it('name by descending', function() {
            expect(res1).not.toBeNull();
            expect(typeof res1).toBe('object')
            expect(res1).toEqual(descending_name);
        })

        it('age by descending', function() {
            expect(res2).not.toBeNull();
            expect(typeof res1).toBe('object')
            expect(res2).toEqual(descending_age);
        })


        it('should be null', function (){
            expect(noProp1).toBeNull();
            expect(noProp2).toBeNull();
        })


    });


    describe('18. "First or Default"', function() {
        var people = [{name:'tony', age:24}, {name:'gabriela', age:25},{name:'julia', age:25},{name:'ana', age:21}],
            empty = [],
            res1 = people.firstOrDefault(function(a) { return a.age === 25; }).name,
            res2 = people.firstOrDefault(function(a) { return a.age === 122;}),
            res3 = people.firstOrDefault(function(a) {return a.name === 'julia'}).name,
            res4 = people.firstOrDefault(function(a) {return a.name === 'panchita'});
        it('first found number', function() {
            expect(res1).not.toBeNull();
            expect(res1).not.toBe('julia');
            expect(res1).toBe('gabriela');
        })

        it('not found number', function() {
            expect(res2).toBeNull();
            expect(res2).not.toMatch(24);
            expect(res2).not.toMatch(25);
            expect(res2).not.toMatch(21);
        })

        it('first found string', function() {
            expect(res3).not.toBeNull();
            expect(res3).toBe('julia');

        })

        it('not found string', function() {
            expect(res4).toBeNull();
        })


    });


    describe('19. "Last or Default"', function() {
        var people = [{name:'tony', age:24}, {name:'gabriela', age:25},{name:'juan', age:25},{name:'julia', age:25},{name:'ana', age:21}],
            empty = [],
            res1 = people.lastOrDefault(function(a) { return a.age === 25; }).name,
            res2 = people.lastOrDefault(function(a) { return a.age === 122;}),
            res3 = people.lastOrDefault(function(a) {return a.age === 25}).name,
            res4 = people.lastOrDefault(function(a) {return a.name === 'panchita'});
        it('first found number', function() {
            expect(res1).not.toBeNull();
            expect(res1).not.toBe('gabriela');
            expect(res1).toBe('julia');
        })

        it('not found number', function() {
            expect(res2).toBeNull();
            expect(res2).not.toMatch(24);
            expect(res2).not.toMatch(25);
            expect(res2).not.toMatch(21);
        })

        it('first found string', function() {
            expect(res3).not.toBeNull();
            expect(res3).toBe('julia');

        })

        it('not found string', function() {
            expect(res4).toBeNull();
        })


    });

//    console.log('PROBLEM #16');
//    console.log(people.orderByAsc('name'));
//
//    console.log('PROBLEM #17');
//    console.log(children.orderByDesc('name'));
//
//    console.log('PROBLEM #18');
//    console.log(people.firstOrDefault(function(a){ return a.age === 20; }));
//    console.log('PROBLEM #19');
//    console.log(people.lastOrDefault(function(a){ return a.name === 5; }));
//
//    var compare = [{name: 'tony'}, {name: 'july'}, {name: 'tony'}];
//    console.log('PROBLEM #20');
//    console.log(compare.distinct(function(a, b) { return a.name !== b.name; }));
});