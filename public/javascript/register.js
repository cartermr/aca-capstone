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

const register = () => {
    let feet = parseInt(document.getElementById('height_feet').value)
    let inches = parseInt(document.getElementById('height_inches').value)
    let height = feet + (inches / 12)

    let personToRegister = {
        "first_name": document.getElementById('first_name').value,
        "last_name": document.getElementById('last_name').value,
        "dob": document.getElementById('DOB').value,
        "age": getAge(document.getElementById('DOB').value),
        "sex": document.getElementById('sex').value,
        "race": document.getElementById('race').value,
        "height": height,
        "weight": document.getElementById('weight').value,
        "hair_color": document.getElementById('hair_color').value,
        "eye_color": document.getElementById('eye_color').value,
        "street_number": document.getElementById('street_number').value,
        "street_name": document.getElementById('street_name').value,
        "street_type": document.getElementById('street_type').value,
        "street_direction": document.getElementById('street_direction').value,
        "apartment_number": document.getElementById('apartment_number').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "zip": document.getElementById('zip').value,
        "phone": document.getElementById('phone').value,
        "emergency_name": document.getElementById('emergency_name').value,
        "emergency_address": document.getElementById('emergency_address').value,
        "emergency_phone": document.getElementById('emergency_phone').value,
        "emergency_relationship": document.getElementById('emergency_relationship').value
    }

    document.getElementById('register').classList.toggle("is-hidden")
    document.getElementById('photoUpload').classList.toggle("is-hidden")

    let uploadForm = document.getElementById('photoUploadForm')
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let data = new FormData(uploadForm)
        data.append('newPerson', JSON.stringify(personToRegister))

        fetch(`/api/register`, {
            method: 'POST',
            body: data
        })
        
        regComplete()
    })
}

const getAge = (dob) => {
    let dif = new Date() - new Date(dob)
    let age = Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25))
    return age
}

const regComplete = () => {
    window.alert("Thank you, registration is complete.")
    location.replace("/admin.html")
}