const login = async () => {
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (!res.ok) {
            document.getElementById('incorrect_creds').classList.toggle('is-hidden')
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
            return
        }
        window.location.href ='/admin.html'
    })
}

const alreadyLoggedIn = () => {
    fetch('/api/authenticate/page', {method: 'POST'})
        .then(res => {
            if (res.ok) {
                window.location.replace('/admin.html')
                return
            }
        })
}