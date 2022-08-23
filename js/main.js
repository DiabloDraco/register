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
            window.location.href = "/login.html"
        }
    })

let elWrapper = document.querySelector(".wrapper")
let elRowTemplate = document.querySelector("#rowTemplate").content

function renderRow(array) {
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < array.length; i++) {
        let template = elRowTemplate.cloneNode(true)

        template.querySelector(".name").textContent = array[i].title
        template.querySelector(".mail").textContent = array[i].body
        template.querySelector(".id").textContent = array[i]._id
        template.querySelector(".num").textContent = [i]
        template.querySelector(".btn-remove").dataset.removeId = array[i]._id
        template.querySelector(".btn-remove").classList.add(`rem${array[i]._id}`)

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
    let removeObject = evt.target.dataset.removeId
    if (removeObject) {
        let removeEl = document.querySelector(`.rem${removeObject}`)

        let element = removeEl.closest(".rowcha")

        element.remove()
    }
})