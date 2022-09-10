var courseApi = 'http://localhost:3000/courses';
function start() {
    getCourses(renderCourses);
    handleCreateForm();
}
start();

// Function
function getCourses(callback) {
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback);

}

function createCourses(data,callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi,options)
        .then(function(response){
            response.json();
        })
        .then(callback)
}
function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `
                <li class="course-item-${course.id}">
                 <h4>${course.name}</h4>
                 <p>${course.description}</p>
                </li>
                <button onclick="handleDeleteCourse(${course.id})" >Xoá</button>
            `
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
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

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseApi + '/' + id,options)
        .then(function(response){
            response.json();
        })
        .then(function() {
          var courseItem = document.querySelector('.course-item-' + id)
          if(courseItem) {
            courseItem.remove;
          }
        })
}