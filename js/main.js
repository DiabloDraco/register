let token = localStorage.getItem("key")


fetch("https://fast-ravine-16741.herokuapp.com/api/posts" , {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : token
    }
    })
    .then(data => data.json())
    .then(info => {
        if (!info.error) {
            renderRow(info.posts)
        }else{
            window.location.href = "/register.html"
        }
    })

let elWrapper = document.querySelector(".wrapper")
let elRowTemplate = document.querySelector("#rowTemplate").content

function renderRow(array) {
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < array.length; i++) {
        let template = elRowTemplate.cloneNode(true)

        template.querySelector(".name").textContent = array[i].title
        template.querySelector(".name").classList.add(`name${array[i]._id}`)
        template.querySelector(".mail").textContent = array[i].body
        template.querySelector(".mail").classList.add(`body${array[i]._id}`)
        template.querySelector(".id").textContent = array[i]._id
        template.querySelector(".num").textContent = [i]
        template.querySelector(".btn-remove").dataset.removeId = array[i]._id
        template.querySelector(".btn-edit").dataset.editId = array[i]._id
        template.querySelector(".btn-remove").classList.add(`rem${array[i]._id}`)
        template.querySelector(".btn-edit").classList.add(`edit${array[i]._id}`)
        
        fragment.appendChild(template)
    }
    elWrapper.appendChild(fragment)
}

let elLogOut = document.querySelector("#logOut")

elLogOut.addEventListener("click" , function () {
    localStorage.removeItem("key")
    window.location.href = "./register.html"
})

elWrapper.addEventListener("click" , function (evt) {
    let Object = evt.target.dataset
    if (Object.removeId) {
        let removeEl = document.querySelector(`.rem${Object.removeId}`)

        let element = removeEl.closest(".rowcha")
        fetch(`https://fast-ravine-16741.herokuapp.com/api/posts/${Object.removeId}` , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        element.remove()
    }
    if (Object.editId) {
        let elName = document.querySelector(`.name${Object.editId}`)
        let elBody = document.querySelector(`.body${Object.editId}`)

        console.log(elName);

        let modalTitle = document.querySelector(".edit-title")
        let modalBody = document.querySelector(".edit-body")

        let edit = document.querySelector(".edit-button")
        edit.addEventListener("click" , function () {
            let name = modalTitle.value
            let body = modalBody.value
            elName.textContent = modalTitle.value
            elBody.textContent = modalBody.value
            fetch(`https://fast-ravine-16741.herokuapp.com/api/posts/${Object.editId}` , {
                method : "PUT", 
                headers: {
                    Authorization : token , 
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(
                    {
                        "title": name,
                        "body":body
                    }
                )
            })
            name.value = null
            body.value = null
        })
    }
})