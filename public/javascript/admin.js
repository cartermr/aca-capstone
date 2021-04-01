const authenticate = () => {
    fetch('/api/authenticate/page', {method: 'POST'})
        .then(res => {
            if (!res.ok) {
                window.location.replace('/')
                window.alert('You are not Authorized, Please Login.')
                return
            }
        })
}

const logOut = () => {
    fetch('/api/logout', {method: 'POST'})
        .then(window.location.replace('/'))
}