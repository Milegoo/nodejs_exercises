//Eloi Milego Miralles

const fs = require('fs') //file system

//P1
const f1 = (a) => {
    console.log(a);
}

//f1("Hola")

//P2
const f2 = (a) => (a >= 0) ? a * 2 : -1

//console.log(f2(-1));

//P3
const f3 = (llista) => {
    return llista.map(x => f2(x) + 23)
    //forEach doesn't return a new array it returns undefinied so here it wouldn't be useful
}

//console.log(f3([1,2,2,4]))

//P4
console.printaki = () => console.log("aqui");

//console.printaki()

//P5

const f4 = (a, b) => a + b

llistaA = [1, 2, 3, 4]
llistaB = llistaA.map(x => f4(x, 23))

//console.log(llistaB);

//P6 

const f5 = (a, b, c) => {
    //a: object, b and c: functions
    c(b(a))
}

//f5(9, f2, function(r) { console.log(r) })

//P7

const outerF = function () {
    let counter = 1;
    return () => console.log(`aqui ${counter++}`);
}

console.printaki2 = outerF()

/*console.printaki2()
console.printaki2()
console.printaki2()
console.printaki2()*/

//P8


const f6 = (list, finalCallback) => {
    fileContents = []
    list.forEach(element => {
        fs.readFile(element, 'utf8', (error, data) => {
            if (!error) {
                fileContents.push(data)
                if (list.length == fileContents.length) {
                    finalCallback(fileContents)
                }
            }
        })
    })

    //finalCallback(fileContents) -> We can't do it here because it will be called and the files won't be read yet.
}

//f6(['a1.txt','a2.txt'], function (result) { console.log(result) })

//P9

const f7 = (list, finalCallback) => {
    fileContents = []
    filesReadCounter = 0
    list.forEach((element, index) => {
        fs.readFile(element, 'utf8', (error, data) => {
            if (!error) {
                fileContents[index] = data
                filesReadCounter++
                if (list.length == filesReadCounter) { //We need a counter because filesContent.length can be equal to list.length but still need to read (empty list positions)
                    finalCallback(fileContents)
                }
            }
        })
    })
}

//f7(['a1.txt','a2.txt'], function (result) { console.log(result) })

//P10

const f7extra = (list, finalCallback) => {
    fileContents = []
    filesReadCounter = 0
    index = 0
    list.forEach((element) => {
        fs.readFile(element, 'utf8', (error, data) => {
            if (!error) {
                fileContents[index] = data
                filesReadCounter++
                if (list.length == filesReadCounter) { //We need a counter because filesContent.length can be equal to list.length but still need to read (empty list positions)
                    finalCallback(fileContents)
                }
            }
            index += 1
        })
    })
}

//The problem defining index outside the forEach is that if a file is read faster than a previous one its data
// will be stored in the position of the previous file that still has to be read. That is because fs.readFile is asyncronous.

//f7extra(['a1.txt','a2.txt'], function (result) { console.log(result) })

//P11

const asyncMap = function (list, f, callback2) {
    //function callback2(err, resultList) {...}
    //function f(a, callback1) {...} -> Same as fs.readFile function
    //function callback1(err, result) {...}

    resultList = []
    filesReadCounter = 0
    firstError = false //We only want to print the first error

    list.forEach((element, index) => {
        f(element, (error, data) => {
            if (!error) {
                resultList[index] = data.toString()
                filesReadCounter++
                if (filesReadCounter == list.length) {
                    callback2(error, resultList)
                }
            }
            else {
                if (!firstError) {
                    firstError = true
                    callback2(error, resultList)
                }
            }
        })
    })
}

//asyncMap(['a1.txt', 'a2.txt'], fs.readFile, (a,b)=>console.log(`error: ${a} data:${b}`))
//asyncMap(['a1.txt', 'a2.txt', 'notExists1.txt', 'notExists2.txt'], fs.readFile, (a,b)=>console.log(`error: ${a} data:${b}`))

//P12

let o1 = {
    counter: 0,

    //we can't do it with arrows (dictionary does not define a this)
    inc: function () {
        this.counter++;
        if (this.notify) {
            this.notify()
        }
    },

    notify: null,
}

//o1.notify = null; 
//o1.counter = 1; 
//o1.notify = function() { console.log("notified") }; 
//o1.inc()

//P12+

let o1extra = {
    counter: 0,

    inc: function () {
        this.counter++;
        if (this.notify) {
            this.notify(this.counter)
        }
    },

    notify: null,
}

//o1extra.counter = 1; 
//o1extra.notify = function(a) { console.log(a) }; 
//o1extra.inc()

//P13

let o2 = (function () {
    let count = 1
    let notify = null
    return {
        inc: function () {
            count++
            if (notify) {
                notify(count)
            }
        },
        count: function () { return count },
        setNotify: function (f) {
            notify = f;
        }
    }
})();

//o2.setNotify(function(a) {console.log(a)});
//o2.inc()

//P14

let Counter = function () { //constructor (CAN'T BE AN ARROW)
    this.a = 1
    this.inc = function () { //We could use arrow too in classes 
        this.a++
        if (this.notify) {
            this.notify(this.a)
        }
    }
    this.count = function () { return this.a }
    this.notify = null
    this.setNotify = function (f) {
        this.notify = f
    }
}

//With the class we can create multiple instances while the module pattern is a unique object with private variables.

//let o3 = new Counter()
//o3.setNotify(function (a) { console.log(a) }); 
//o3.inc()

//P14+

let Counterextra = function () {
    let a = 1 //private
    let notify = null //private
    let count = function () { return a } //private

    this.inc = function () { //public
        a++
        if (notify) {
            notify(a)
        }
    }
    this.setNotify = function (f) { //public
        notify = f
    }
}

//let o3extra = new Counter()
//o3extra.setNotify(function (a) { console.log(a) }); 
//o3extra.inc()

//P15

let DecreasingCounter = function () {
    Counter.call(this)

    this.inc = function () {
        this.a--
        if (this.notify) {
            this.notify(this.a)
        }
    }
}

DecreasingCounter.prototype = Object.create(Counter.prototype) //Create a Counter Prototype Object so DecreasingCounter can inherit its propertries.
DecreasingCounter.prototype.constructor = DecreasingCounter;

//let o4 = new DecreasingCounter()
//o4.setNotify(function (a) { console.log(a) }); 
//o4.inc()


//P16

const readIntoFuture = function (filename) {
    let future = { isDone: false, result: null }

    fs.readFile(filename, 'utf8', (error, data) => {
        future.isDone = true
        if (!error) {
            future.result = data
        }
    })

    return future
}

//future = readIntoFuture('a1.txt'); 
//console.log(future)
//setTimeout(function() { console.log(future) }, 1000)

//P17

const asyncToFuture = function (f) {
    return (filename) => {

        let future = { isDone: false, result: null }

        f(filename, 'utf8', (error, data) => {
            future.isDone = true
            if (!error) {
                future.result = data
            }
        })

        return future

    }
}

//readIntoFuture2 = asyncToFuture(fs.readFile);
//future2a = readIntoFuture2('a1.txt');
//setTimeout(function() { console.log(future2a) }, 1000)


//P18


const asyncToEnhancedFuture = function (f) {

    return (filename) => {

        const enhancedFuture = {
            isDone: false, result: null, notify: null,
            registerCallback: function (cb) {
                this.notify = cb
                if (this.isDone) {
                    this.notify(this);
                }
            }
        }

        f(filename, (error, data) => {
            enhancedFuture.isDone = true
            if (!error) {
                enhancedFuture.result = data
            }
            if (enhancedFuture.notify) {
                enhancedFuture.notify(enhancedFuture)
            }
        })

        return enhancedFuture

    }

}

//const utfReadFile = (f, c) => fs.readFile(f, 'utf-8', c);
//const readIntoEnhancedFuture = asyncToEnhancedFuture(utfReadFile);
//enhancedFuture = readIntoEnhancedFuture('a1.txt');
//enhancedFuture.registerCallback( function(ef) {console.log(ef) } )

//P19

const when = function (f1) {
    return {
        do: function (f2) {
            f1(f2)
        }
    }
}


//func1 = function(callback) { fs.readFile('a1.txt', 'utf-8', callback) }
//func2 = function(error, result) { console.log(result) }
////func1(func2)
//console.log(when(func1).do(func2)); 

//P20

const when2 = function (f1) {
    return {
        and: function (f2) {
            return {
                do: function (f3) {
                    let isf1Done = false
                    let isf2Done = false
                    let error1 = null
                    let error2 = null
                    let res1 = null
                    let res2 = null

                    f1((error, data) => {
                        error1 = error
                        res1 = data
                        isf1Done = true
                        if (isf1Done && isf2Done) {
                            f3(error1, error2, res1, res2)
                        }
                    })

                    f2((error, data) => {
                        error2 = error
                        res2 = data
                        isf2Done = true
                        if (isf1Done && isf2Done) {
                            f3(error1, error2, res1, res2)
                        }
                    })
                }
            }

        }

    }
}

//fu1 = function(callback) { fs.readFile('a1.txt', 'utf-8', callback) }
//fu2 = function(callback) { fs.readFile('a2.txt', 'utf-8', callback) }
//fu3 = function(err1, err2, res1, res2) { console.log(res1, res2) }
//console.log(when2(fu1).and(fu2).do(fu3));

//P20+

const when2extra = function (f1) {

    let err1 = false
    let res1 = false
    let isf1Done = false

    f1((err, res) => {
        err1 = err
        res1 = res
        isf1Done = true
    })

    return {
        and: function (f2) {
            let err2 = false
            let res2 = false
            let isf2Done = false

            f2((err, res) => {
                err2 = err
                res2 = res
                isf2Done = true
            })

            return {
                do: function (f3) {
                    if (isf1Done && isf2Done) {
                        f3(err1, err2, res1, res2)
                    }
                }
            }

        }

    }
}

//fun1 = callback => { console.log('f1'); callback(null, 'ok1'); }
//fun2 = callback => { console.log('f2'); callback(null, 'ok2'); }
//fun3 = (err1, err2, res1, res2) => console.log('callback', res1, res2);
//////console.log(when2extra(fun1));
////console.log(when2extra(fun1).and(fun2));
//console.log(when2extra(fun1).and(fun2).do(fun3));

//P21

const composer = (f1, f2) => {
    return (x) => {
        return f1(f2(x))
    }
}

//func1 = function(a) { return a + 1 }
//func3 = composer(func1, func1)
//console.log(func3(3));

//func4 = function(a) { return a * 3 }
//func5 = composer(func3, func4)
//console.log(func5(3));

//P22

const asyncComposer = (f1, f2) => {
    return (a, callback) => {
        f2(a, (err2, res2) => {
            if (err2) {
                callback(err2, res2)
            }
            else {
                f1(res2, (err1, res1) => {
                    callback(err1, res1)
                })
            }
        })

    }
}

//fu1 = function(a, callback1) { callback1(null, a + 1) }
//fu2 = function(a, callback2) { callback2(null, a + 2) }
//fu3 = asyncComposer(fu1, fu2)
//fu3(3, function(error, result) { console.log(result) } )

//fu1 = function(a, callback) { callback(null, a + 1) }
//fu3 = asyncComposer(fu1, fu1)
//fu3(3, function(error, result) { console.log(result) } )

//fu1 = function(a, callback) { callback(null, a + 1) }
//fu2 = function(a, callback) { callback("error", "") }
//fu3 = asyncComposer(fu1, fu2)
//fu3(3, function(error, result) { console.log(error, result) } )


//P23

const fsp = require('fs/promises')

//p = Promise.resolve(0).then(x => x + 1).then(x => x + 2).then(x => x + 4);
//p.then(x => console.log(x)) 

//Prints 7 because the first promise is resolved with 0, the second with 1, the third with 3 and the fourth with 7.
//Since all of them are resolved all the thens are executed.

//p = Promise.reject(0).then(x => x + 1).catch(x => x + 2).then(x => x + 4);
//p.then(x => console.log(x)) 

//Prints a 6 because the first promise rejects, so the first then isn't executed, the second promise is the one from the catch 
// and it resolves with 2 and the third and last promise resolves with 6

//p = Promise.resolve(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8);
//p.then(x => console.log(x)) 

//Prints 11 because all promises execute except the one in the catch that won't execute because the promise of the second then doesn't reject.

//p = Promise.reject(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8);
//p.then(x => console.log(x)) 

//Prints a 12 because the first promise rejects, the second promise will be the one in the catch and the third ant last the one in the last then.
// 0 + 4 = 4 => 4 + 8 = 12

//p = Promise.reject(0).then(x => x + 1, null).catch(x => x + 2).catch(x => x + 4);
//p.then(x => console.log(x)) 

//Prints 2, the first promise is rejeted so the first catch is executed (0 + 2) the other catch isn't executed since this second promise doesn't reject.

//P24

const antipromise = (p) => {
    return new Promise((resolve, reject) => {
        p.then((x) => reject(x)).catch((x) => resolve(x))
    })
}

//antipromise(Promise.reject(0)).then(console.log);
//antipromise(Promise.resolve(1)).catch(console.log);

//P25

const promiseToCallback = (f) => {
    return g = function (x, callback) { //callback(err, res)
        p = f(x)
        p.then((res) => callback(null, res)).catch((err) => callback(err, null))
    }
}

const isEven = x => new Promise(
    (resolve, reject) => x % 2 ? reject(x) : resolve(x)
);

const isEvenCallback = promiseToCallback(isEven);

////isEven(2).then(() => console.log("OK"), () => console.log("KO"));
////isEvenCallback(2, (err, res) => console.log(err, res));

//isEven(3).then(() => console.log("OK"), () => console.log("KO"));
//isEvenCallback(3, (err, res) => console.log(err, res));

//P26

const readToPromise = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (!err) {
                resolve(data)
            }
            else {
                reject(err)
            }
        })
    })
}

//readToPromise("a1.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));
//readToPromise("notfound.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));

//P27

const callbackToPromise = (f) => {
    return (file) => {
        return new Promise((resolve, reject) => {
            f(file, (err, data) => {
                if (!err) {
                    resolve(data)
                }
                else {
                    reject(err)
                }
            })
        })
    }
}

//const readToPromise2 = callbackToPromise(fs.readFile);
//readToPromise2("a1.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));

//P28

const enhancedFutureToPromise = (enhancedFuture) => {

    return new Promise((resolve, reject) => {
        enhancedFuture.registerCallback((result) => {
            resolve(result)
        })
    })

}

//readIntoEnhancedFuture = asyncToEnhancedFuture(fs.readFile)
//const enhancedFuture = readIntoEnhancedFuture('a1.txt')
//const promise = enhancedFutureToPromise(enhancedFuture);
//promise.then(console.log)
//enhancedFuture.registerCallback(console.log)

//P29

const mergedPromise = (p) => {
    return new Promise((resolve, reject) => {
        p.then((x) => resolve(x)).catch((x) => resolve(x))
    })
}

//mergedPromise(Promise.resolve(0)).then(console.log);
//mergedPromise(Promise.reject(1)).then(console.log);

//P30

const promiseComposer = (f1, f2) => {
    return (x) => {
        return new Promise((resolve, reject) => {
            f2(x).then((y) => f1(y)).then((z) => resolve(z)).catch((t) => reject(t))
        })
    }
}

//const fu1 = x => new Promise((resolve, reject) => resolve(x + 1));
//promiseComposer(fu1, fu1)(3).then(console.log);
//const fu2 = x => new Promise((resolve, reject) => reject('always fails'));
//promiseComposer(fu1, fu2)(3).catch(console.log);
//let fu3 = x => new Promise((resolve, reject) =>
//setTimeout(() => resolve(x * 2), 500));
//promiseComposer(fu1, fu3)(3).then(console.log);


//P31

const parallelPromise = function (p1, p2) {
    return new Promise((resolve, reject) => {
        values = []
        counter = 0

        p1.then((x) => values[0] = x).catch((x) => values[0] = x)
            .then(() => {
                counter++;
                if (counter == 2) {
                    resolve(values)
                }
            })

        p2.then((x) => values[1] = x).catch((x) => values[1] = x)
            .then(() => {
                counter++;
                if (counter == 2) {
                    resolve(values)
                }
            })

    })
    // We can also use the constractor all that take an iterable of Promises and returns a Promise that resolves with an array with the values of the promises.
}

//let p1 = parallelPromise(Promise.resolve(0), Promise.resolve(1));
//p1.then(console.log);

//let plast = new Promise((resolve, reject) =>
//    setTimeout(() => resolve('left'), 200));
//let pfirst = new Promise((resolve, reject) =>
//    setTimeout(() => resolve('right'), 100));
//let p2 = parallelPromise(plast, pfirst);
//p2.then(console.log);

//let plast = new Promise((resolve, reject) =>
//  setTimeout(() => reject('left rejected'), 200));
//let pfirst = new Promise((resolve, reject) =>
//    setTimeout(() => reject('right rejected'), 100));
//let p2 = parallelPromise(plast, pfirst);
//p2.then(console.log);

//P32

const promiseBarrier = (numPromises) => {

    let list = []
    let valuesToResolve = []
    let pendingResolves = []
    let counter = 0

    for (let i = 0; i < numPromises; i++) {
        list[i] = ((x) => {
            return new Promise((resolve, reject) => {
                valuesToResolve[i] = x
                pendingResolves[i] = resolve
                counter++
                if (counter === numPromises) {
                    for (let j = 0; j < numPromises; j++) {
                        pendingResolves[j](valuesToResolve[j])
                    }
                }
            })
        })
    }

    return list
}

//TEST 1 - first As are written then Bs
/*
let [fu1, fu2] = promiseBarrier(2);
Promise.resolve(0)
.then(fu1)
.then(x => { console.log("c1 s1 b"); return x; })
.then(x => { console.log("c1 s2 b"); return x; })
Promise.resolve(0)
.then(x => { console.log("c2 s1 a"); return x; })
.then(x => { console.log("c2 s2 a"); return x; })
.then(x => { console.log("c2 s3 a"); return x; })
.then(x => { console.log("c2 s4 a"); return x; })
.then(fu2)
*/

//TEST 2 - first As are written then Bs
/*
let [fu1, fu2, fu3] = promiseBarrier(3);
Promise.resolve(0)
.then(x => { console.log("c1 s1 a"); return x; })
.then(x => { console.log("c1 s2 a"); return x; })
.then(x => { console.log("c1 s3 a"); return x; })
.then(fu1)
.then(x => { console.log("c1 s4 b"); return x; })
Promise.resolve(0)
.then(x => { console.log("c2 s1 a"); return x; })
.then(fu2)
.then(x => { console.log("c2 s2 b"); return x; })
Promise.resolve(0)
.then(fu3)
.then(x => { console.log("c3 s1 b"); return x; })
.then(x => { console.log("c3 s2 b"); return x; })
.then(x => { console.log("c3 s3 b"); return x; })
*/

//TEST3 - Expected output: 1 2 
/*
let [fu1, fu2] = promiseBarrier(2);
Promise.resolve(1).then(fu1).then(console.log)
Promise.resolve(2).then(fu2).then(console.log)
*/

//P32+

const timedPromiseBarrier = (n, t) => {

    let list = []
    let valuesToResolve = []
    let pendingResolves = []
    let counter = 0
    let timeout = null

    for (let i = 0; i < n; i++) {
        list[i] = ((x) => {
            return new Promise((resolve, reject) => {
                valuesToResolve[i] = x
                pendingResolves[i] = resolve
                if (counter == 0 && timeout == null) { //first function called
                    timeout = setTimeout(() => {
                        for (let j = 0; j < n; j++) {
                            if (pendingResolves[j]) {
                                pendingResolves[j](valuesToResolve[j])
                            }
                        }
                    }, t)

                }
                counter++
                if (counter === n) {
                    for (let j = 0; j < n; j++) {
                        pendingResolves[j](valuesToResolve[j])
                    }
                }
            })
        })
    }

    return list
}

// Should return the ones finished in a and after 5 seconds the line with the b.
/*
let [fu1, fu2, fu3] = timedPromiseBarrier(3, 5000);
Promise.resolve(0)
.then(x => { console.log("c1 s1 a"); return x; })
.then(x => { console.log("c1 s2 a"); return x; })
.then(x => { console.log("c1 s3 a"); return x; })
.then(fu1)
.then(x => { console.log("c1 s4 b"); return x; })
*/
/*
var [fu1, fu2] = timedPromiseBarrier(2, 1500);
Promise.resolve(0)
    .then(fu1)
    .then((x) => {
        console.log("c1 s1 b");
        return x;
    })
    .then((x) => {
        console.log("c1 s2 b");
        return x;
    });
setTimeout(() => {
    Promise.resolve(0)
        .then((x) => {
            console.log("c2 s1 a");
            return x;
        })
        .then((x) => {
            console.log("c2 s2 a");
            return x;
        })
        .then((x) => {
            console.log("c2 s3 a");
            return x;
        })
        .then((x) => {
            console.log("c2 s4 a");
            return x;
        })
        .then(fu2);
}, 5000);
*/
//P33

const PromisedPriorityQueue = function () {

    let queue = []

    this.decorate = function (p, priority) {

        return new Promise((resolve, reject) => {
            const prom = { promise: p, priority: priority}
            this.queue.push(prom)
            
            this.queue.sort(function (a, b) {
                if (a.priority > b.priority) {
                    return 1;
                }
                if (a.priority < b.priority) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            p.then((x) => {}) //No se com seguir, no se com fer per saber si segueix sent la més prioritària o no.
        })
    }

}

/*

let ppq = new PromisedPriorityQueue()
p1 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(1)}, 1000)
})
p2 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(2)},2000)
})
p3 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(3)},3000)
})

ppq.decorate(p1,1).then(console.log)
ppq.decorate(p2,2).then(console.log)
ppq.decorate(p3,3).then(console.log)
*/


//P33+

