var numbers = [1, 2, 3, 4, 5];
Array.prototype.reduceSecond = function(callback, result){
    var i = 0;
    if( arguments.length <2) {
        i = 1;
        result = this[0];
    }
    for(; i < this.length; i++){
       result = callback(result,this[i],i,this);
    }
    return result;
}
var result = numbers.reduceSecond((total,number, currentIndex, originalArray) => {
    // console.log(total,number, currentIndex, originalArray)
    return total + number;
},10)
console.log(result);