function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}


const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownList = document.querySelector('.dropdown-list');

dropdownTrigger.addEventListener('click', () => {
    dropdownList.classList.toggle('show');    
});