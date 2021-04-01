const createUser = () => {
    let blank = checkBlanks()
    let passMatch = checkPassMatch()

    if (blank || !passMatch) {
        return
    }

    let email = checkEmail()
    
    if (!email) {
        return
    }

    let newUser = {
        "first_name": document.getElementById('first_name').value,
        "last_name": document.getElementById('last_name').value,
        "username": document.getElementById('username').value,
        "hash": document.getElementById('hash').value,
        "authorized_search": true,
        "regristrant_owner": false
    }

    fetch('/api/newuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(res => {
        console.log(res.status)
        if (res.status == 404) {
            if (document.getElementById('email').classList.contains('is-hidden')){
                document.getElementById('email').classList.toggle('is-hidden')
                checkPassMatch()
                return
            }
        }
        if (res.ok) {
            window.location.href = '/'
        } else {
            window.alert('Account creation failed')
            window.location.reload()
        }
    })
}

const checkPassMatch = () => {
    if (document.getElementById('hash').value == document.getElementById('verifyHash').value) {
        if (!document.getElementById('password_match').classList.contains('is-hidden')) {
            document.getElementById('password_match').classList.toggle('is-hidden')
        }
        return true
    } else {
        if (document.getElementById('password_match').classList.contains('is-hidden')) {
            document.getElementById('password_match').classList.toggle('is-hidden')
            return false
        }
        return false
    }
}

const checkBlanks = () => {
    let blank = false
    let inputs = document.getElementsByName('text')

    inputs.forEach(input => {
        if (input.value == '') {
            if (document.getElementsByName(input.id)[0].classList.contains('is-hidden')) {
                document.getElementsByName(input.id)[0].classList.toggle('is-hidden')
            }
            blank = true
        } else {
            if (!document.getElementsByName(input.id)[0].classList.contains('is-hidden')) {
                document.getElementsByName(input.id)[0].classList.toggle('is-hidden')
            }
        }
    })
    return blank
}

const checkEmail = () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById('username').value)) {
        if (!document.getElementById('email_type').classList.contains('is-hidden')) {
            document.getElementById('email_type').classList.toggle('is-hidden')
        }
        return true
    }

    if (document.getElementById('email_type').classList.contains('is-hidden')) {
        document.getElementById('email_type').classList.toggle('is-hidden')
    }
    return false
}