const originalFunction = () => {document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelector('select');

    M.FormSelect.init(elems);
    
    elems.addEventListener('change', (e) => {
        e.preventDefault()
        const result = document.querySelector('.result')
        result.textContent = `You like ${e.target.value}`
    })

})}

// function display(event){
//     event.addEventListener('click', ()=>{
//         console.log("testing")
//     })
// }

originalFunction()