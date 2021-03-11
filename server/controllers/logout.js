const logout = (req, res) => {
    res.clearCookie('authcookie').send()
}

module.exports = {logout}