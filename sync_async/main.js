// Khởi tạo đối tượng Promise bằng từ khoá new
var promise = new Promise(
    // Executor
    function(resolve,reject){
    // Resolve: thành công;
    // Reject: Thất bại
    // resolve([
    //     {   id: 1,
    //         name: 'JavaScript'
    // }
    // ]);
    reject('Có lỗi!');
})
promise
    .then(function(course){
        console.log(course);
    })
    .catch(function(error){
        console.log(error);
    })
    .finally(function(){
        console.log('Done!');
    })