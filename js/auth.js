let elForm = document.querySelector("#form")
let elName = document.querySelector("#name")
let elMail = document.querySelector("#email")
let elPassword = document.querySelector("#password")



elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()
    
    let mail = elMail.value.trim()
    let password = elPassword.value.trim()
    
    fetch("https://fast-ravine-16741.herokuapp.com/api/auth" , {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body:  JSON.stringify(
        {
            "email":mail,
            "password":password
        })
    })
    .then(data => data.json())
    .then(info => {
        if (!info.error) {
            localStorage.setItem("key" , info.Authorization)
            console.log(info.Authorization);
            window.location.href = "./../index.html"
            elName.value = null
            elMail.value = null
        }else {
            alert(info.error)
        }
    })
})