const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownList = document.querySelector('.dropdown-list');
let productSubmit = document.querySelector('.product-submit');
let projectWindow = document.querySelector('.add-project-window')
const projectDialog = document.querySelector('.new-project');
let productWindow = document.querySelector('.add-product-window')
let companyWindow = document.querySelector('.add-company-window')
const projectSubmit = document.querySelector('.project-submit');
let projectTitle = document.querySelector('.project-title')
let companyName = document.querySelector('.company-name')
let companyAdd = document.querySelector('.company-add')
let companyPin = document.querySelector('.company-pin')
let prodName = document.querySelector('.pro-Name')
let prodId = document.querySelector('.p-id')
let prodImage = document.querySelector('.p-image')
let prodSales = document.querySelector('.p-sales')
let reviewCount = document.querySelector('.review-count')
let productForm = document.querySelector('.product-form')
let projectForm = document.querySelector('.project-form')
let companyForm = document.querySelector('.company-form')
let projectList = document.querySelector('.project-list')
let projectDesc = document.querySelector('.project-desc')
let backbtn1 = document.querySelector('.prev-dialog1')
let backbtn2 = document.querySelector('.prev-dialog2')
let closeWindow1 = document.querySelector('.close-window1')
let closeWindow2 = document.querySelector('.close-window2')
let closeWindow3 = document.querySelector('.close-window3')

const projectsArray = [];
const companiesArray = [];


function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

dropdownTrigger.addEventListener('click', () => {
    dropdownList.classList.toggle('show'); 
});

projectDialog.addEventListener('click', () => {
    projectWindow.classList.toggle('project-window-hidden');
    projectTitle.value = "";
    projectDesc.value = "";
});


projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (projectTitle.value && projectDesc.value) {
        let existingProject = projectsArray.find(proj => proj.title === projectTitle.value);

        if (!existingProject) {
            let project = {
                title: projectTitle.value,
                desc: projectDesc.value,
                companies: []  // Empty array to store companies
            };

            projectsArray.push(project);
        }

        projectWindow.classList.add('project-window-hidden');
        companyWindow.classList.toggle('company-window-hidden');

        displayProjectCard(projectsArray);
    }
});

companyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    companyWindow.classList.toggle('company-window-hidden');
    productWindow.classList.toggle('product-window-hidden');

    let existingProject = projectsArray.find(proj => proj.title === projectTitle.value);

    if (existingProject) {
        let existingCompany = existingProject.companies.find(com => com.cDetails.cName === companyName.value);

        if (!existingCompany) {
            let compDetails = {
                cDetails: {
                    cName: companyName.value,
                    cAdd: companyAdd.value,
                    cPin: companyPin.value
                },
                products: []  // Empty array to store products for this company
            };

            existingProject.companies.push(compDetails);
        }
    }
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (prodName.value && prodId.value && prodSales.value && reviewCount.value) {
        const product = {
            name: prodName.value,
            id: prodId.value,
            sales: prodSales.value,
            reviews: reviewCount.value
        };

        let existingProject = projectsArray.find(proj => proj.title === projectTitle.value);

        if (existingProject) {
            let existingCompany = existingProject.companies.find(com => com.cDetails.cName === companyName.value);

            if (existingCompany) {
                existingCompany.products.push(product);
                displayProductCard(existingCompany.products);
            } else {
                console.log(`No company found for name: ${companyName.value}`);
            }
        } else {
            console.log(`No project found for title: ${projectTitle.value}`);
        }

        productWindow.classList.add('product-window-hidden');
        prodName.value = "";
        prodId.value = "";
        prodSales.value = "";
        reviewCount.value = "";
        companyName.value = "";
        projectTitle.value = "";

        console.log(existingProject.companies);
        console.log(projectsArray);
    }
});

backbtn1.addEventListener('click', () => {
    projectWindow.classList.toggle('project-window-hidden');
    companyWindow.classList.toggle('company-window-hidden');
});

backbtn2.addEventListener('click', () => {
    companyWindow.classList.toggle('company-window-hidden');
    productWindow.classList.toggle('product-window-hidden');
});



closeWindow1.addEventListener('click', () => {
    if(!projectWindow.classList.contains('project-window-hidden')){
        projectWindow.classList.add('project-window-hidden')
        projectTitle.value = "";
        projectDesc.value = "";    
    }
})

closeWindow2.addEventListener('click', () => {
    if(!companyWindow.classList.contains('company-window-hidden')){
        companyWindow.classList.add('company-window-hidden')
        companyName.value = "";
        companyAdd.value = "";
        companyPin.value = "";
        projectTitle.value = "";
        projectDesc.value = ""; 
    }
})

closeWindow3.addEventListener('click', () => {
    if(!productWindow.classList.contains('product-window-hidden')){
        productWindow.classList.add('product-window-hidden')
        prodName.value = "";
        prodId.value = "";
        prodSales.value = "";
        reviewCount.value = "";
        projectTitle.value = "";
        projectDesc.value = ""; 
        companyName.value = "";
        companyAdd.value = "";
        companyPin.value = "";
    }
})


function displayProductCard(products) {
    products.forEach((prod) => {
        console.log(prod.name, prod.sales, prod.id, prod.reviews);
    });
}

function displayProjectCard(projects) {
    projects.forEach((proj) => {
        const existingItem = Array.from(projectList.children).find(item => 
            item.querySelector('.side-text').textContent === proj.title
        );
        
        if (!existingItem) {
            const projectItem = document.createElement('div');
            projectItem.classList.add('menuItem');

            projectItem.innerHTML = `
                <img src="sidebar-icons/window-desktop.svg" alt="" class="menu-icon">
                <h5 class="side-text">${proj.title}</h5>`;

            projectList.appendChild(projectItem);
            console.log(projectList);
            
        }
    });
}


