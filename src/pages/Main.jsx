import "./main.css"
import { useEffect, useState } from "react"
import Tabla from "../components/Tabla"


 const Main = ()=>{
     const [firstName, setFirstName] = useState("")
     const [lastName, setLastName] = useState("")
     const [address, setAddress] = useState("")
     const [ssn, setSsn] = useState("")
     const [validator, setValidator] = useState(false)
     const [datos, setDatos] = useState([])
     const [token, setToken] = useState("")
     const [error, setError] = useState("")

     let url = "http://localhost:8081/"
     
     //let refresher // var for timeout refresh

     // reset form value item to its initial form
     const resetForm = ()=>{
         for (let item of [setFirstName, setAddress, setLastName, setSsn]){
             item("")
         }
     }

     // Refresh function for table data
     const refreshTable = () =>{
        fetch(url + "api/members", {
            headers: {
                'Authorization': 'Bearer ' + token.token,
            }
        } )
        .then(body => body.json())
        .then(setDatos)
        console.log("refrescado")
     }

     // Function that make the post request
     const handlePost = ()=>{
         if (!validator) return
         let data = {firstName, lastName, address, ssn}
         for (let item of datos){
             if (item.ssn === ssn)return setError("Ssn Duplicado, debe ser unico.")
         }

         fetch(url + "api/members", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + token.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(
                res=>{
                    if(res.status === 200){
                        setDatos([...datos, data]) //if request succed add data to the end of table
                        resetForm()
                    }
                }
            )
            .catch(
                e=>console.warn(e)
            )

     }


     // un regex para validar el Ssn en varios lugares 
     let validateSSN = ()=>{
        return /^[0-9]{3}-[0-9]{2}-[0-9]{4}/.test(ssn)
     }

     // al cambiar cualquiera de los parametros miramos si es valido el form
     useEffect(()=>{
        if(!firstName || !lastName || !address || !ssn)return setValidator(false)
        if(!validateSSN())return setValidator(false)
        setValidator(validateSSN())
        //console.log(validator)

     }, [firstName, lastName, address, ssn])//eslint-disable-line

     // just on init verify the credentials login and set token
     useEffect(()=>{
        let authUri = url + "auth"
        let creds = {username: "sarah", password: "connor"}   // this is suppose to  come from a login here is hardcoded

        fetch(authUri, {
            method: "POST",
            body: JSON.stringify(creds),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(body => body.json())
        .then(setToken)
        .catch(console.warn)
     },[])//eslint-disable-line

     // When token changes get the firs values for the first render of the table
     useEffect(()=>{
         if(!token)return
         refreshTable()
         let refresher = setInterval(refreshTable, 120000)  // refresh each 2 minutes 120 000 ms
        return ()=>clearInterval(refresher)
     },[token])//eslint-disable-line

     useEffect(()=>{
         if (!error) return
         const errTimeout = setTimeout(()=>setError(""), 70000)
         return ()=>clearTimeout(errTimeout)
     }, [error])


    return(
        <div className="main-container">
        <div className="form-container">
        <form action={""}>

            <div className="form-input">
            <input
            placeholder="first Name"
            type='text'
            required
            minLength={1}
            value={firstName}
            onChange={e=>setFirstName(e.target.value.trim())}
            />
            </div>
            <div className="form-input">

            <input
            placeholder="Last Name"
            type='text'
            required
            minLength={1}
            value={lastName}
            onChange={e=>setLastName(e.target.value.trim())}
            />
            </div>
            <div className="form-input">

            <input
            placeholder="Address"
            type='text'
            required
            minLength={1}
            value={address}
            onChange={e=>setAddress(e.target.value.trim())}
            />
            </div>

            <div className="form-input">
            <input
            placeholder="Social Security Number"
            type='text'
            required
            minLength={11}
            maxLength={11}
            value={ssn}
            onChange={e=>setSsn(e.target.value)}
            />
            </div>
        </form>
        <div className="botton-container">
            <button className="botton-reset" onClick={resetForm}>Reset </button>
            <button className="botton-save" onClick={handlePost} disabled={!validateSSN()}>Save</button>
        </div>
        <div className="error-container"><p>{error}</p></div>
        </div>
        <div className="table-container">
            <Tabla info={datos}/>
        </div>
        </div>
    )
}

export default Main