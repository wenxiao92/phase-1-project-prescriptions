/** Variable declaration in Global Scope**/
const baseUrl = 'http://localhost:3000'
let globalMed = []

/** NODE declaration **/
const mainDiv = () => document.getElementById('main')
const homePageLink = () => document.getElementById('homepage-link')
const medListLink = () => document.getElementById('medsList-link')
const displaySection = () => document.getElementById('displaySection')
const createMedLink = () => document.getElementById('createMeds-link')

/** Templates **/
const homePageTemplate = () => {
    return `
    <h1 class="center-align"> Welcome! </h1>
    <p class='center-align'> Please click the Meds/Drugs List or Create Meds/Drugs to get started! </p>
    `
}

const createMedTemplate = () => {
    mainDiv().innerHTML = ""
    displaySection().innerHTML = ""
    let h2 = document.createElement("h2")
    h2.className = "center-align"
    h2.innerText = "Add your prescripted medicine/drug to the list!"

    //Create the form
    let form = document.createElement('form')
    form.className = "row"

    let brandNameDiv = document.createElement('div')
    brandNameDiv.classList.add('input-field', 'col', 's6')
    let brandInput = document.createElement('input')
    brandInput.setAttribute("id", "brandNameInput")
    brandInput.setAttribute("type", "text")
    let brandLabel = document.createElement('label')
    brandLabel.innerText = "Brand Name"
    brandLabel.setAttribute('for', "brandNameInput")
    brandNameDiv.append(brandInput, brandLabel)

    let genericNameDiv = document.createElement('div')
    genericNameDiv.classList.add('input-field', 'col', 's6')
    let genericInput = document.createElement('input')
    genericInput.setAttribute("id", "genericNameInput")
    genericInput.setAttribute("type", "text")
    let genericLabel = document.createElement('label')
    genericLabel.innerText = "Generic Name"
    genericLabel.setAttribute('for', "genericNameInput")
    genericNameDiv.append(genericInput, genericLabel)

    let prescribedOTCDiv = document.createElement('div')
    prescribedOTCDiv.classList.add('input-field', 'col', 's6')
    let prescribedOTCInput = document.createElement('input')
    prescribedOTCInput.setAttribute("id", "prescribedOTCInput")
    prescribedOTCInput.setAttribute("type", "text")
    let prescribedOTCLabel = document.createElement('label')
    prescribedOTCLabel.innerText = "Prescripted or OTC"
    prescribedOTCLabel.setAttribute('for', "prescribedOTCInput")
    prescribedOTCDiv.append(prescribedOTCInput, prescribedOTCLabel)

    let routeDiv = document.createElement('div')
    routeDiv.classList.add('input-field', 'col', 's6')
    let routeInput = document.createElement('input')
    routeInput.setAttribute("id", "routeInput")
    routeInput.setAttribute("type", "text")
    let routeLabel = document.createElement('label')
    routeLabel.innerText = "Route"
    routeLabel.setAttribute('for', "routeInput")
    routeDiv.append(routeInput, routeLabel)

    let purposeDiv = document.createElement('div')
    purposeDiv.classList.add('input-field', 'col', 's12')
    let purposeInput = document.createElement('input')
    purposeInput.setAttribute("id", "purposeInput")
    purposeInput.setAttribute("type", "text")
    let purposeLabel = document.createElement('label')
    purposeLabel.innerText = "Purpose"
    purposeLabel.setAttribute('for', "purposeInput")
    purposeDiv.append(purposeInput, purposeLabel)

    //create the button
    submitBtn = document.createElement('input')
    submitBtn.classList.add('waves-effect','waves-light','btn')
    submitBtn.setAttribute('type','submit')
    submitBtn.setAttribute('value','Create Medication/Drug')

    form.append(brandNameDiv, genericNameDiv, prescribedOTCDiv, routeDiv, purposeDiv, submitBtn)
    
    form.addEventListener('submit', submitFormEvent)

    //console.log(form) //see output of form
    mainDiv().append(h2, form)

    displaySection().innerHTML = `
    <div>
        <h4>Try it yourself!</h4>
        <ul></ul>
        <li>Brand name: neti pot</li>
        <li>Generic name: NETI POT</li>
        <li>Prescripted or OTC: OTC</li>
        <li>Route: Nasal</li>
        <li>Purpose: To rinse nose and help reduce congestion</li> 
    </div>
    `

}

/** Combination function**/
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
    displaySection().innerHTML = ""
    let h1 = document.createElement('h1')

    h1.innerHTML = `
    Medication/Drug List
    `
    let label = document.createElement('label')
    label.style.fontSize = "20px"
    label.innerText = "Filter Route"

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

    label.append(select)

    renderInit(globalMed)

    select.addEventListener('change', (e) => {
        e.preventDefault();
        renderFilterMeds(e.target.value)
    })

    mainDiv().append(h1, label)
    
    M.FormSelect.init(select) //actual initialization of the dropdown list. Needs to be in own seperate call in materialize CSS

}

/** Renderers **/
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate() //sets the id main to have an innerHTML from homePageTemplate
    displaySection().innerHTML = "" //removes table from home page
}

function renderInit(meds){
    let table = document.createElement('table')
    table.className = "highlight"
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

function renderFilterMeds(currentRoute){
    displaySection().innerHTML = ""
    let currentRouteArray = []
    globalMed.forEach(medArray => {
        if(medArray.route[0] === currentRoute){
            currentRouteArray.push(medArray)
        }
    })
    console.log(currentRouteArray) //test log to see array of routes are pulling correctly
    

    let table = document.createElement('table')
    table.className = "highlight"
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    thead.innerHTML = `
        <th>Brand Name / Generic Name</th>
        <th>Human Prescripted/OTC</th>
        <th>Route of Administration</th>
        <th>Purpose</th>
    `
    
    //renders actual meds into table
    currentRouteArray.forEach((currentRoute) => {

    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${currentRoute.brand_name} / ${currentRoute.generic_name}</td>
    <td>${currentRoute.product_type}</td>
    <td>${currentRoute.route}</td>
    <td>${currentRoute.purpose}</td>
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
        loadMeds() //references the JSON data
    })
}

const createMedLinkEvent = () => {
    createMedLink().addEventListener('click', (e) => {
        e.preventDefault();
        createMedTemplate()
    })
}

function submitFormEvent(e){
    e.preventDefault();
    // const brandName = e.target.children[0];
    // const genericName = e.target.children[1]
    // const prescriptedOTCField = e.target.children[2]
    // const routeField = e.target.children[3]
    // const purposeField = e.target.children[4]
    const[brandName, genericName, prescriptedOTCField, routeField, purposeField] = e.target.children; //mass assignment of Node array
    //console.log(brandName.children[0].value, genericName.children[0].value, prescriptedOTCField.children[0].value, routeField.children[0].value, purposeField.children[0].value)
    fetch('http://localhost:3000/results', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_type: [prescriptedOTCField.children[0].value],
            route: [routeField.children[0].value],
            brand_name: [brandName.children[0].value],
            generic_name: [genericName.children[0].value],
            purpose: [purposeField.children[0].value]
        })
        
    })
}


/** DOM Load **/
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage()
    homePageLinkEvent()
    medListLinkEvent()
    createMedLinkEvent()
})

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

/** Test code cdn specific **/
// let label = document.createElement('div')
// label.innerHTML = `
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

