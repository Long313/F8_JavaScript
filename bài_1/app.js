var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var line = document.querySelector('.line');
var tabs = $$('.tab-item');
var tabPanes = $$('.tab-pane');
const tabActive = $('.tab-item.active');
console.log([tabActive]);

tabs.forEach((tab,index) => {
    tab.onclick = function(){
       var tabPane = tabPanes[index];
        $('.tab-item.active').classList.remove('active');
        tab.classList.add('active');
        $('.tab-pane.active').classList.remove('active');
        tabPane.classList.add('active');
        console.log(line);
        line.style.left = this.offsetLeft + 'px';
        line.style.width= this.offsetWidth + 'px';
    }
})