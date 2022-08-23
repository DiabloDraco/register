let elForm = document.querySelector("#form")
let elName = document.querySelector("#name")
let elMail = document.querySelector("#email")
let elPassword = document.querySelector("#password")
let elIsAdmin = document.querySelector("#isAdmin")



elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()

    let name = elName.value.trim()
    let mail = elMail.value.trim()
    let password = elPassword.value.trim()
    let admin = elIsAdmin.value

    if (admin == "on") {
        admin = true
    }else {
        admin= false
    }
    
    fetch("https://fast-ravine-16741.herokuapp.com/api/users" , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(
        {
            "email":mail,
            "password":password,
            "name":name ,
            "isAdmin": admin
        })
    })
    .then(data => data.json())
    .then(info => {
        if (!info.error) {
            window.location.href = "./../login.html"
            elName.value = null
            elMail.value = null
        }else {
            alert(info.error)
        }
    })
})