let elForm = document.querySelector("#form")
let elBody = document.querySelector("#Body")
let elTitle = document.querySelector("#Title")
let token = localStorage.getItem("key")
elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()

    let title = elTitle.value.trim()
    let body = elBody.value.trim()
    fetch("https://fast-ravine-16741.herokuapp.com/api/posts" , {
        method: "POST",
        headers: {
            "Authorization" : token , 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title":title,
            "body":body
        })
    })
    title = null
    body = null
})