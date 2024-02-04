module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword

) => {

    const errors = {}

    if (username.trim() === '') {
        errors.username = 'username must not be empty'
    }
    if (email.trim() === '') {
        errors.username = 'username must not be empty'
    }
    else {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email.match(regex)) {
            errors.email = 'Email must be a valid email address'
        }
    }

    if (password === "") {
        errors.password = 'Password must not be empty'

    }
    else if (password !== confirmPassword) {
        errors.password = 'Password must match'
    }

    return {
        errors,
        valid: Object.keys(errors) < 1
    }

}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'username must not be empty'
    }
    if (password === "") {
        errors.password = 'Password must not be empty'

    }
    return {
        errors,
        valid: Object.keys(errors) < 1
    }


}