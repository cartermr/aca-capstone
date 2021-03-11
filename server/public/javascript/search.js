let searchResults

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

const performSearch = async () => {
    let inputs = document.querySelectorAll('input')

    let searchParams = {}
    
    inputs.forEach(input => {
        if (input.type == "text" && input.value != "") {
            if (input.id == 'height_feet' || input.id == 'height_inches') {
                // Do nothing, skip this input
            } else {
                searchParams[input.id] = input.value
            }
        }
    })

    if (document.getElementById('height_feet').value != "") {
        feet = parseInt(document.getElementById('height_feet').value)
        if (document.getElementById('height_inches').value == "") {
            inches = 0
        } else {
            inches = parseInt(document.getElementById('height_inches').value)
        }
        height = feet + (inches / 12)
        searchParams['height'] = height
    }

    results = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        },
        body: JSON.stringify(searchParams)
    })

    if (results.status == 403) {
        window.location.href = '/'
    }

    if (results.ok) {
        searchResults = await results.json()
        document.getElementById('search').classList.toggle('is-hidden')
        document.getElementById('results').classList.toggle('is-hidden')
    
        let photos = document.getElementById('resultsBody')
    
        searchResults.forEach((person, index) => {
            let imageBlock = `<div class="column is-2">
                                <figure>
                                    <a id="${index}" onclick="displayInfo(this)">
                                        <img class="image is-128x128" src="https://storage.googleapis.com/acanvis/${person.picture_filename}" />
                                    </a>
                                </figure>
                            </div>`
    
            photos.insertAdjacentHTML('beforeend', imageBlock)
        })
    }
}

const newSearch = () => {
    window.location.reload()
}

const adjustSearch = () => {
    document.getElementById('search').classList.toggle('is-hidden')
    document.getElementById('results').classList.toggle('is-hidden')
    document.getElementById('resultsBody').innerHTML = ''
}

const displayInfo = (clicked) => {
    let card = document.getElementById('personInfo')
    card.classList.toggle('is-active')
    let info = searchResults[clicked.id]

    let name = document.getElementById('pickedName')
    name.innerText = `${info.first_name} ${info.last_name}`

    let contactInfoCard = document.getElementById('pickedInfo')
    contactInfoCard.innerHTML = ''

    let contactInfo = `<ul>
                    <li>DOB: ${info.dob}</li>
                    <li>Address: ${info.street_number} ${info.street_name} ${info.street_type}, ${info.city}, ${info.state} ${info.zip}</li>
                    <li>Phone: ${info.phone}</li>
                    <li></li>
                    <li>Emergency Contact: ${info.emergency_name}</li>
                    <li>Phone: ${info.emergency_phone}</li>
                    <li>Address: ${info.emergency_address}</li>
                </ul>`

    contactInfoCard.insertAdjacentHTML('beforeend', contactInfo)
}