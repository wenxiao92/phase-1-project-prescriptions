// const originalFunction = () => {document.addEventListener('DOMContentLoaded', function() {
//     let elems = document.querySelector('select');

//     M.FormSelect.init(elems);
    
//     elems.addEventListener('change', (e) => {
//         e.preventDefault()
//         const result = document.querySelector('.result')
//         result.textContent = `You like ${e.target.value}`
//     })

// })}

// originalFunction()

// function display(event){
//     event.addEventListener('click', ()=>{
//         console.log("testing")
//     })
// }

//

// function dropDownPrescriptedOTC(){
//     // let prescribedOTCDiv = document.createElement('div')
//     // prescribedOTCDiv.classList.add('input-field', 'col', 's6')
//     // let prescribedOTCInput = document.createElement('input')
//     // prescribedOTCInput.setAttribute("id", "prescribedOTCInput")
//     // prescribedOTCInput.setAttribute("type", "text")
//     // let prescribedOTCLabel = document.createElement('label')
//     // prescribedOTCLabel.innerText = "Prescripted or OTC"
//     // prescribedOTCLabel.setAttribute('for', "prescribedOTCInput")
//     // prescribedOTCDiv.append(prescribedOTCInput, prescribedOTCLabel)

//     let prescribedOTCDiv = document.createElement('div')
//     prescribedOTCDiv.classList.add('input-field', 'col', 's6')
//     let selectPrescribedOTC = document.createElement('select')
//     selectPrescribedOTC.innerHTML = `
//     <option value="" disabled selected>Choose your option</option>
//     <option value="Prescription" disabled selected>Prescription</option>
//     <option value="OTC" disabled selected>OTC</option>
//     `
    
//     prescribedOTCDiv.append(selectPrescribedOTC)
    
//     //mainDiv().append(selectPrescribedOTC)
//     console.log(prescribedOTCDiv)
//     mainDiv().append(prescribedOTCDiv)
//     //return prescribedOTCDiv
//     M.FormSelect.init(selectPrescribedOTC)
// }