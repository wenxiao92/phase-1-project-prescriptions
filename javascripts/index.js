/** Variable declaration in Global Scope**/
const baseUrl = 'http://localhost:3000'

/** NODE declaration **/
const mainDiv = () => document.getElementById('main')
const homePageLink = () => document.getElementById('homepage-link')
const medListLink = () => document.getElementById('medsList-link')

/** Templates **/
const homePageTemplate = () => {
    return `
    <h1 class="center-align">Fill Out Later</h1>
    `
}

const medListTemplate = () => {
    renderEachMed()
}

/** Renderers **/

const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate() //sets the id main to have an innerHTML from homePageTemplate
}

// const renderMedListPage = () => {
//     mainDiv().innerHTML = medListTemplate()
// }

function renderMeds(meds){
    mainDiv().innerHTML = ""
    let table = document.createElement('table')
    //table.className = highlight
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    thead.innerHTML = `
        <th>Brand Name</th>
        <th>Route of Administration</th>
        <th>Purpose</th>
        <th>Human Prescripted/OTC</th>
    `
    let h1 = document.createElement('h1')
    h1.innerHTML = `
    Medication/Drug List
    `
    meds.forEach((med) => {

    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${med.brand_name}</td>
    <td>${med.product_type}</td>
    <td>${med.route}</td>
    <td>${med.purpose}</td>
    `
    tbody.append(tr)

    })

    table.append(thead, tbody)
    mainDiv().append(h1, table)
    //console.log(table)

}

/** event listeners in their seperate function **/

const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage()
    })
}

const medListLinkEvent = () => {
    medListLink().addEventListener('click', (e) => {
        e.preventDefault();
        //renderEachMed();
        //renderMedListPage();
        loadMeds()
    })
}

const loadMeds = () => {
    fetch(baseUrl + '/results')
    .then(resp => resp.json())
    .then(function(data) {
        //console.log(data) //test data output
        renderMeds(data)
        })
}

/** DOM Load **/
document.addEventListener('DOMContentLoaded', () => {
    homePageLinkEvent()
    medListLinkEvent()
})