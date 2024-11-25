const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownList = document.querySelector('.dropdown-list');
let productSubmit = document.querySelector('.product-submit');
let projectWindow = document.querySelector('.add-project-window');
const projectDialog = document.querySelector('.new-project');
let productWindow = document.querySelector('.add-product-window');
let companyWindow = document.querySelector('.add-company-window');
const projectSubmit = document.querySelector('.project-submit');
let projectTitle = document.querySelector('.project-title');
let companyName = document.querySelector('.company-name');
let companyAdd = document.querySelector('.company-add');
let companyPin = document.querySelector('.company-pin');
let prodName = document.querySelector('.pro-Name');
let prodId = document.querySelector('.p-id');
let prodImage = document.querySelector('.p-image');
let prodSales = document.querySelector('.p-sales');
let reviewCount = document.querySelector('.review-count');
let productForm = document.querySelector('.product-form');
let projectForm = document.querySelector('.project-form');
let companyForm = document.querySelector('.company-form');
let projectList = document.querySelector('.project-list');
let projectDesc = document.querySelector('.project-desc');
let backbtn1 = document.querySelector('.prev-dialog1');
let backbtn2 = document.querySelector('.prev-dialog2');
let backbtn3 = document.querySelector('.prev-dialog3');
let closeWindow1 = document.querySelector('.close-window1');
let closeWindow2 = document.querySelector('.close-window2');
let closeWindow3 = document.querySelector('.close-window3');
let closeWindow4 = document.querySelector('.close-window4');
let companyList = document.querySelector('.company-list');
let finalWindow = document.querySelector('.final-window');
let addCompanyBtn = document.querySelector('.add-company-btn')
let saveProjectBtn = document.querySelector('.save-project-btn')

const projectsArray = [];
let currentProject = null;
let currentCompany = null;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

dropdownTrigger.addEventListener('click', () => {
    dropdownList.classList.toggle('show'); 
});

document.addEventListener('DOMContentLoaded', () => {
    initializeDropdown();
    displayProjectCard(projectsArray);
});

function checkProjectForm() {
    projectDesc.disabled = !projectTitle.value.trim();
}

function checkCompanyForm() {
    companyAdd.disabled = !companyName.value.trim();
    companyPin.disabled = !companyName.value.trim();
}

projectDialog.addEventListener('click', () => {
    projectWindow.classList.toggle('project-window-hidden');
    projectTitle.value = "";
    projectDesc.value = "";
});

function initializeDropdown() {
    if (projectsArray.length > 0) {
        currentProject = projectsArray[0]; 
        updateCompanyDropdown();
    }
}

function updateCompanyDropdown() {
    companyList.innerHTML = '<option selected>Select Company</option>';

    if (currentProject && currentProject.companies.length > 0) {
        currentProject.companies.forEach((com) => {
            const option = document.createElement('option');
            option.textContent = com.cDetails.cName;
            companyList.appendChild(option);
        });
    }
}

function displayProjectCard(projects) {
    if (projectList.childNodes.length === 0) {
        projectList.innerHTML = "";
    }

    projects.forEach((proj) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('menuItem');
        projectItem.setAttribute('id', proj.id);
    
        projectItem.innerHTML = 
            `<img src="sidebar-icons/window-desktop.svg" alt="" class="menu-icon">
            <h5 class="side-text">${proj.title}</h5>`;
        
        projectList.appendChild(projectItem);
    
        projectItem.addEventListener('click', () => {
            document.querySelectorAll('.menuItem').forEach(item => item.classList.remove('selected'));
            projectItem.classList.add('selected');
            currentProject = proj;
            updateCompanyDropdown();
        });
    });
    
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (projectTitle.value) {
        let existingProject = projectsArray.find(proj => proj.title === projectTitle.value);

        if (existingProject) {
            alert("This project already exists. Editing fields for existing projects is disabled.");
            projectDesc.disabled = true;
        } else {
            let project = {
                id: Date.now(), 
                title: projectTitle.value,
                desc: projectDesc.value,
                companies: []
            };

            projectsArray.push(project);
            currentProject = project;

            projectDesc.disabled = false;

            projectTitle.value = "";
            projectDesc.value = "";


            companyWindow.classList.remove('company-window-hidden');
            projectWindow.classList.add('project-window-hidden');
        }
    }
});




companyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentProject) {
        alert("Select or create a project first.");
        return;
    }

    let existingCompany = currentProject.companies.find(
        (com) => com.cDetails.cName === companyName.value
    );

    if (existingCompany) {
        alert("This company already exists in the selected project. Editing details for existing companies is disabled.");
    } else if (companyName.value) {
        companyAdd.disabled = false;
        companyPin.disabled = false;

        let compDetails = {
            cDetails: {
                cName: companyName.value,
                cAdd: companyAdd.value,
                cPin: companyPin.value
            },
            products: []
        };

        currentProject.companies.push(compDetails);
        currentCompany = compDetails;

        const option = document.createElement('option');
        option.textContent = compDetails.cDetails.cName;
        companyList.appendChild(option);

        companyName.value = "";
        companyAdd.value = "";
        companyPin.value = "";

       
        companyWindow.classList.add('company-window-hidden');
        productWindow.classList.remove('product-window-hidden');
    }

    companyAdd.disabled = false;
    companyPin.disabled = false;
});



productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentCompany) {
        alert("Please select or create a company first.");
        return;
    }

    if (prodName.value && prodId.value && prodSales.value && reviewCount.value) {
        const product = {
            name: prodName.value,
            id: prodId.value,
            sales: prodSales.value,
            reviews: reviewCount.value
        };

        currentCompany.products.push(product);
        displayProductCard(currentCompany.products);

        prodName.value = "";
        prodId.value = "";
        prodSales.value = "";
        reviewCount.value = "";
        productWindow.classList.add('product-window-hidden');

        displayFinalWindow();
    }
});


function displayProductCard(products) {
    products.forEach((prod) => {
        console.log(prod.name, prod.sales, prod.id, prod.reviews);
    });
}

function displayFinalWindow() {
    finalWindow.classList.toggle('final-window-hidden');

    const projectNameLabel = finalWindow.querySelector('.project-name-label');
    projectNameLabel.textContent = `${currentProject.title}`;
    projectNameLabel.dataset.projectId = currentProject.id;

    const companyDropdown = finalWindow.querySelector('.company-dropdown');
    companyDropdown.innerHTML = '<option selected>Select Company</option>';

    currentProject.companies.forEach((com) => {
        const option = document.createElement('option');
        option.textContent = com.cDetails.cName;
        option.value = com.cDetails.cName; 
        companyDropdown.appendChild(option);
    });

    const productDropdown = finalWindow.querySelector('.product-dropdown');
    productDropdown.innerHTML = '<option selected>Select Product</option>';

    const addProductBtn = finalWindow.querySelector('.add-product-btn');
    addProductBtn.style.display = 'none';

    companyDropdown.onchange = () => {
        const selectedCompanyName = companyDropdown.value;
        const selectedCompany = currentProject.companies.find(
            (com) => com.cDetails.cName === selectedCompanyName
        );

        // Clearing previous products
        productDropdown.innerHTML = '<option selected>Select Product</option>';

        if (selectedCompany) {
            addProductBtn.style.display = 'inline-block'; 

            selectedCompany.products.forEach((prod) => {
                const option = document.createElement('option');
                option.textContent = prod.name; 
                option.value = prod.id;
                productDropdown.appendChild(option);
            });
        } else {
            addProductBtn.style.display = 'none'; 
        }
    };

    addProductBtn.onclick = () => {
        const selectedCompanyName = companyDropdown.value;
        const selectedCompany = currentProject.companies.find(
            (com) => com.cDetails.cName === selectedCompanyName
        );

        if (selectedCompany) {
            currentCompany = selectedCompany; 
            productWindow.classList.remove('product-window-hidden'); 
            finalWindow.classList.add('final-window-hidden'); 
        } else {
            alert("Please select a valid company to add a product.");
        }
    };

    addCompanyBtn.onclick = () => openCompanyFormFromFinalWindow();
}


function openCompanyFormFromFinalWindow() {
    if (currentProject) {
        companyWindow.classList.remove('company-window-hidden');
        finalWindow.classList.add('final-window-hidden');
    } else {
        alert("Unable to identify the project. Please refresh and try again.");
    }
}



function saveProjectDetails() {
    if (!currentProject) {
        console.log("No project selected to save.");
        return;
    }

    const projectToSave = {
        id: currentProject.id,
        title: currentProject.title,
        description: currentProject.desc,
        companies: currentProject.companies.map(company => ({
            name: company.cDetails.cName,
            address: company.cDetails.cAdd,
            pin: company.cDetails.cPin,
            id: company.cDetails.cId,
            products: company.products.map(prod => ({
                name: prod.name,
                id: prod.id,
                sales: prod.sales,
                reviews: prod.reviews
            }))
        }))
    };


    displayProjectCard(projectsArray);

    console.log('Project details saved:', projectToSave);

    currentProject = null;
    resetForms(); 
}



saveProjectBtn.addEventListener('click', saveProjectDetails);




function resetForms() {
    projectWindow.classList.add('project-window-hidden');
    companyWindow.classList.add('company-window-hidden');
    productWindow.classList.add('product-window-hidden');
    finalWindow.classList.add('final-window-hidden');

    projectTitle.value = "";
    projectDesc.value = "";
    companyName.value = "";
    companyAdd.value = "";
    companyPin.value = "";
    prodName.value = "";
    prodId.value = "";
    prodSales.value = "";
    reviewCount.value = "";
    
    projectsArray.length = 0;
}


backbtn1.addEventListener('click', () => {
    projectWindow.classList.remove('project-window-hidden');
    companyWindow.classList.add('company-window-hidden');
});

backbtn2.addEventListener('click', () => {
    productWindow.classList.add('product-window-hidden');
    companyWindow.classList.remove('company-window-hidden');
});

backbtn3.addEventListener('click', () => {
    finalWindow.classList.add('final-window-hidden');
    productWindow.classList.remove('product-window-hidden');
});

closeWindow1.addEventListener('click', () => {
    projectWindow.classList.add('project-window-hidden');
});

closeWindow2.addEventListener('click', () => {
    companyWindow.classList.add('company-window-hidden');
});

closeWindow3.addEventListener('click', () => {
    productWindow.classList.add('product-window-hidden');
});

closeWindow4.addEventListener('click', () => {
    finalWindow.classList.add('final-window-hidden');
});