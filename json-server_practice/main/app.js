var courseApi = 'http://localhost:3000/course';
function start(){
    getCourse(renderCourses)
    handleCreateForm();
}

start();
function getCourse(callback){
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback)
}
function createCourse(data,callback){
    var option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" heade
    }
    fetch(courseApi,option)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback);
}
function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
            var html = courses.map(function(course){
                return `
                        <li class="course-item-${course.id}">
                            <h4>${course.name}</h4>
                            <p>${course.description}</p>
                            <button onclick="deleteCourse(${course.id})">Xoá</button>
                        </li>
                `
            })
            listCoursesBlock.innerHTML = html.join('');
}

function handleCreateForm(){
    var createBtn = document.getElementById('create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData,function(){
            getCourse(renderCourses)
        })
    }
}
function deleteCourse(id){
    var option = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
    fetch(courseApi +'/' + id,option)
        .then(function(reponse){
            return reponse.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-'+id);
            if(courseItem){
                courseItem.remove();
            }
        });

}