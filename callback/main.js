var courses = [
    'JavaScript',
    'PHP',
    'Ruby'
]

Array.prototype.map2 = function(callback) {
    var array = [];
    var arrayLength = this.length;
    for(let i = 0; i < arrayLength; i++) {
      var result = callback(this[i],i);
      array.push(result);
    }
    return array;
}

var htmls = courses.map2(function(course){
    return `<h2>${course}</h2>`
});

console.log(htmls);