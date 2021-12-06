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

function createSelect() {
    let divTest = document.createElement('div')
    divTest.className = "input-field"
    let select = document.createElement('select')
    select.innerHTML =`
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
    `
    let output = document.createElement('div')
    output.className = "result"
    output.innerText = "see here"
    divTest.append(select, output)
    document.querySelector('#test').append(divTest)
    
    select.addEventListener('change', (e) => {
        e.preventDefault();
        output.innerText = `You like ${e.target.value}`
    })


    M.FormSelect.init(select);
}

function renderMeds(meds){
    mainDiv().innerHTML = ""
    let table = document.createElement('table')
    //table.className = highlight
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    thead.innerHTML = `
        <th>Brand Name / Generic Name</th>
        <th>Route of Administration</th>
        <th>Purpose</th>
        <th>Human Prescripted/OTC</th>
    `
    let div = document.createElement('div')
    let h1 = document.createElement('h1')

    h1.innerHTML = `
    Medication/Drug List
    `

    div.append(h1)
    
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
    mainDiv().append(div, table)
    //console.log(table)

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


/** JSON data **/
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
    createSelect()
    
    //console.log(select)
    // elems.addEventListener('change', (e) => {
    //     e.preventDefault()
    //     const result = document.querySelector('.result')
    //     result.textContent = `You like ${e.target.value}`
    // })

})

//     let elems = document.querySelector('select');
//     M.FormSelect.init(elems);
    
//     elems.addEventListener('change', (e) => {
//         e.preventDefault()
//         const result = document.querySelector('.result')
//         result.textContent = `You like ${e.target.value}`
//     })

// })}


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
