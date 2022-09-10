// function sleep(ms) {
//     return new Promise( (resolve) => {
//         setInterval(resolve,ms)
//     })
// }
// sleep(1000)
//     .then(() => {
//         console.log(1);
//         return sleep(1000)
//     })
//     .then(() => {
//         console.log(2);
//         return sleep(1000);
//     })
//     .then(() => {
//         console.log(3);
//         return sleep(1000);
//     })
//     .then(() => {
//         console.log(4);
//         return sleep(1000);
//     })

var promise1 = new Promise(function(resolve) {
        setInterval(function() {
            resolve([1])
        },1000)
})

var promise2 = Promise.reject('Có lỗi');

Promise.all([promise1, promise2])
 .then(function([result1, result2]) {
        console.log(result1.concat(result2));
 })
 .catch(function(err){
    console.log('Error: ', err);
 })

