//Eloi Milego Miralles

//P1
const f1 = (a) => {
    console.log(a);
}

//f1("Hola")

//P2
const f2 = (a) => (a >= 0) ?  a*2 : -1

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

const f4 = (a,b) => a + b

llistaA = [1,2,3,4]
llistaB = llistaA.map(x => f4(x, 23))

//console.log(llistaB);

//P6 

const f5 = (a,b,c) => {
    //a: object, b and c: functions
    c(b(a))
}

//f5(9, f2, function(r) { console.log(r) })

//P7

const outerF = function() {
    let counter = 1;
    return () => console.log(`aqui ${counter++}`);
}

console.printaki2 = outerF()

/*console.printaki2()
console.printaki2()
console.printaki2()
console.printaki2()*/

//P8

const fs = require('fs')

const f6 = (list, finalCallback) => {
    fileContents = []
    list.forEach( element => {
        fs.readFile(element, 'utf8', (error, data) => {
            if(!error) {
                fileContents.push(data)
                if(list.length == fileContents.length) {
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
    list.forEach( (element, index) => {
        fs.readFile(element, 'utf8', (error, data) => {
            if(!error) {
                fileContents[index] = data
                filesReadCounter++
                if(list.length == filesReadCounter) { //We need a counter because filesContent.length can be equal to list.length but still need to read (empty list positions)
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
    list.forEach( (element) => {
        fs.readFile(element, 'utf8', (error, data) => {
            if(!error) {
                fileContents[index] = data
                filesReadCounter++
                if(list.length == filesReadCounter) { //We need a counter because filesContent.length can be equal to list.length but still need to read (empty list positions)
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

const asyncMap = function(list, f, callback2) {
    //function callback2(err, resultList) {...}
    //function f(a, callback1) {...} -> Same as fs.readFile function
    //function callback1(err, result) {...}

    resultList = []
    filesReadCounter = 0
    firstError = false //We only want to print the first error

    list.forEach( (element, index) => {
        f(element, (error, data) => {
            if (!error) {
                resultList[index] = data.toString()
                filesReadCounter++
                if (filesReadCounter == list.length) {
                    callback2(error, resultList)
                }
            }
            else {
                if(!firstError) {
                    firstError = true
                    callback2(error, resultList)
                }
            }
        })
    })
}

asyncMap(['a1.txt', 'a2.txt'], fs.readFile, (a,b)=>console.log(`error: ${a} data:${b}`))
//asyncMap(['a1.txt', 'a2.txt', 'notExists1.txt', 'notExists2.txt'], fs.readFile, (a,b)=>console.log(`error: ${a} data:${b}`))

//P12

