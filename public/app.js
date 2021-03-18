const getAll = document.querySelector('#read_all')
const contain = document.querySelector('#contain')
getAll.addEventListener('click', (e)=>{
    fetch('http://localhost:8000/api/task')
        .then(async(result)=>{
            let text =await result.text();
            console.log(text)
            
            contain.innerHTML= text
        })
    }
)