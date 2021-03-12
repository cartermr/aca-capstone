import { useState } from 'react'
import Register from './Register'
import FileUpload from './FileUpload'

const RegisterControl = () => {
    // control the input values, create searchParameters object
    const [registerParameters, setRegisterParameters] = useState({})
    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        let params = registerParameters
        params[key] = value
        setRegisterParameters(params)
        console.log('registerParams = ' + JSON.stringify(registerParameters))
    }

    const registerPerson = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target)

        // let form = document.getElementById('photoUpload')
        //console.log(form)

        let data = new FormData(e.target)
        console.log(data)
        
        //data.append('newPerson', JSON.stringify(registerParameters))

        //console.log(data)

        // fetch('/api/register', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         'content-type': 'multipart/form-data'
        //     },
        //     body: data
        // })
    }

    const changeDisplay = () => {
        setCurrentDisplay((<FileUpload register={registerPerson} />))
    }

    // determine if the search screen or the results screen will display
    const [CurrentDisplay, setCurrentDisplay] = useState(<Register onChange={handleInput} change={changeDisplay} />)

    return CurrentDisplay
}

export default RegisterControl