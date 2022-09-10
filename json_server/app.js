var couserApi = 'http://localhost:3000/courses';
function start() {
    getCourses(renderCourses);
    handleCreateForm();
}
start();
function getCourses(callback) {
    fetch(couserApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback)
}
function createCourses(data, callback){
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
    }
    fetch(couserApi,option)
        .then(function(reponse){
            reponse.json();
        })
        .then(callback)
}
function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-course');
    var htmls = courses.map(function(course){
        return `
                <li class="course-item-${course.id}">
                    <h4>${course.name}</h4>
                    <p>${course.description}</p>
                    <button onclick="handledeleteCourse(${course.id})">Xoa</button>
                </li>
            `
    })
    var html = htmls.join('');
    listCoursesBlock.innerHTML = html;
}
function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        }
        createCourses(formData,function(){
            getCourses(renderCourses);
        });
    }   
} 
function handledeleteCourse(id){
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    }
    fetch(couserApi+ '/' + id,option)
        .then(function(reponse){
            reponse.json();
        })
        .then(function(){
           var couseItem = document.querySelector('.course-item-' + id)
           if(couseItem){
            couseItem.remove;
           }
        })

}