/** Variable declaration in Global Scope**/
const baseUrl = 'http://localhost:3000'
let globalMed = []

/** NODE declaration **/
const mainDiv = () => document.getElementById('main')
const homePageLink = () => document.getElementById('homepage-link')
const medListLink = () => document.getElementById('medsList-link')
const displaySection = () => document.getElementById('displaySection')

/** Templates **/
const homePageTemplate = () => {
    return `
    <h1 class="center-align">Fill Out Later</h1>
    `
}

const medListTemplate = () => {
    //handleDropDownList()
    //renderEachMed()
}

/** Other **/
function handleDropDownList(){
    // grabs all routes and dedupe
    //console.log(globalMed)
    let allRoutes = []
    globalMed.forEach(eachData  => {
        allRoutes.push(eachData.route[0])
    })
    let unique = [...new Set(allRoutes)]
    //console.log(unique)

    showDropDown(unique)
}

function showDropDown(uniqueRoute){
    mainDiv().innerHTML = ""
    let h1 = document.createElement('h1')

    h1.innerHTML = `
    Medication/Drug List
    `
    let divTest = document.createElement('div')
    divTest.className = "input-field"

    let select = document.createElement('select')
    select.innerHTML = `
    <option value="" disabled selected>Choose your option</option>
    `
    uniqueRoute.forEach(eachRoute => {
        let option = document.createElement('option')
        option.setAttribute("value", `${eachRoute}`)
        option.innerText = eachRoute
        select.append(option)
        //console.log(select) //test selection is created
    })

    divTest.append(select)

    select.addEventListener('change', (e) => {
        e.preventDefault();

        if(e.target.value === "ORAL"){
            renderInit(globalMed)
        } else {
            console.log("error")
        }

    })

    mainDiv().append(h1, divTest)
    renderInit(globalMed)
    M.FormSelect.init(select) //actual initialization of the dropdown list. Needs to be in own seperate call in materialize CSS

}

/** Renderers **/
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate() //sets the id main to have an innerHTML from homePageTemplate
    displaySection().innerHTML = "" //removes table from home page
}

function renderTable() {

}

function renderInit(meds){
    let table = document.createElement('table')
    //table.className = highlight
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    thead.innerHTML = `
        <th>Brand Name / Generic Name</th>
        <th>Human Prescripted/OTC</th>
        <th>Route of Administration</th>
        <th>Purpose</th>
    `
    
    //renders actual meds into table
    meds.forEach((med) => {

    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${med.brand_name} / ${med.generic_name}</td>
    <td>${med.product_type}</td>
    <td>${med.route}</td>
    <td>${med.purpose}</td>
    `
    tbody.append(tr)

    })

    table.append(thead, tbody)
    //console.log(table)
    displaySection().append(table)


}



/** Event listeners in their seperate function **/
const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage()
    })
}

const medListLinkEvent = () => {
    medListLink().addEventListener('click', (e) => {
        e.preventDefault();
        loadMeds()

        //loadMeds() //references the JSON data
    })
}


/** JSON data **/
const loadMeds = () => {
    fetch(baseUrl + '/results')
    .then(resp => resp.json())
    .then(function(data) {
        //console.log(data) //test data output
        globalMed = data
        //renderMeds(data)
        handleDropDownList()
        })
}

/** DOM Load **/
document.addEventListener('DOMContentLoaded', () => {
    homePageLinkEvent()
    medListLinkEvent()
})


/** Test code cdn specific **/
// let divTest = document.createElement('div')
// divTest.innerHTML = `
// <!-- Dropdown Trigger -->
// <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

// <!-- Dropdown Structure -->
// <ul id='dropdown1' class='dropdown-content'>
//   <li><a href="#!">one</a></li>
//   <li><a href="#!">two</a></li>
//   <li class="divider" tabindex="-1"></li>
//   <li><a href="#!">three</a></li>
//   <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
//   <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
// </ul>
// `

// function createSelect() {
//     mainDiv().innerHTML = ""

//     let h1 = document.createElement('h1')

//     h1.innerHTML = `
//     Medication/Drug List
//     `
    
//     let divTest = document.createElement('div')
//     divTest.className = "input-field"
//     let select = document.createElement('select')
//     handleDropDownList()
//     select.append(handleDropDownList())
//     // `
//     //             <option value="" disabled selected>Choose your option</option>
//     //             <option value="1">Option 1</option>
//     //             <option value="2">Option 2</option>
//     //             <option value="3">Option 3</option>
//     // `
//     console.log(select)
//     let output = document.createElement('div')
//     output.className = "result"
//     output.innerText = "see here"
//     divTest.append(select, output)
//     document.querySelector('#test').append(divTest)
//     //console.log(globalMed)
//     select.addEventListener('change', (e) => {
//         e.preventDefault();
//         console.log(e.target.value)
//         output.innerText = `You like ${e.target.value}`
//     })

//     mainDiv().append(h1, divTest)
//     M.FormSelect.init(select); 
// }