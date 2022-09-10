// var courses = ['JavaScript', 'PHP', 'Python', 'Java'];
// create forEach2 method:
// Array.prototype.forEach2 = function(callback){
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             callback(this[index], index, this);
//         }
//     }
// };

// courses.forEach2(function(course,index,array){
//     console.log(index, course,array);
// })

// Create some method:
// var courses = [
//     {
//         name: 'Java',
//         coin: 0
//     },
//     {
//         name: 'Python',
//         coin: 0
//     },
//     {
//         name: 'PHP',
//         coin: 101
//     }
// ]

// Array.prototype.some2 = function(callback){
//         for(let index in this){
//             if(this.hasOwnProperty(index)){
//               var output = callback(this[index],index,this);
//                     if(output){
//                         return true;
//                     }
//             }
//         }
//     return false;
// }
// var result = courses.some2(function(course,index){
//     return course.coin > 100;
// })

// console.log(result);

// Create filter method

// var courses = [
//     {
//         name: 'JavaScript',
//         coin: 680
//     },
//     {
//         name: 'PHP',
//         coin: 860
//     },
//     {
//         name: 'Ruby',
//         coin: 980
//     }
// ]

// Array.prototype.filter2 = function(callback){
//     var output = [];
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             var result = callback(this[index],index,this)
//             if(result){
//                 output.push(this[index]);
//             }
//         }
//     }
//     return output;
// }
// var filterCourses = courses.filter2(function(course,index,array){
//     return course.coin > 700;
// })
// console.log(filterCourses);

// Create some method

var courses = [
        {
            name: 'Java',
            coin: 0
        },
        {
            name: 'Python',
            coin: 0
        },
        {
            name: 'PHP',
            coin: 1
        }
    ];

Array.prototype.every2 = function(callback){
    var result = true
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var output = callback(this[index],index,this);
            if(!output){
                result = false;
                break;
            }
        }
    }
    return result;
}

var result = courses.every2(function(course){
    return course.coin === 0;
})

console.log(result);

