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

