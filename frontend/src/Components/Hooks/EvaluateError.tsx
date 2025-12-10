/**this hook will tell the user
 * with more presition what error 
 * they got from the backend. To give
 * a better UX.
 */

import { useNavigate } from "react-router-dom";

export function useError(err:any){
    
    const msg = err?.response?.data;
    const status = err?.response?.status;

    if(err.response.data.detail === 
        "No active account found with the given credentials"){

            alert("Error, probablemente su contraseña no es correcta") 
            return
            
        } 

    if(err.message === 
        "Network Error"){
            alert("Error de red, lo sentimos")
            return
        }   

    if (err.message === "Network Error") {
        alert("Error de red. Verifique tu conexión.")
        return
    }

    if (status === 500) {
        alert("Error interno del servidor. Lo sentimos.")
        return
    }

    if (status === 401) {
        alert("Sesión expirada o credenciales inválidas.")
        return
    }

    if (status === 403) {
        alert("No tiene permisos para esta acción.")
        return
    }

    if (status === 404) {
        alert("El recurso no existe.")
        return
    }

    if (status === 400 && msg?.email) {
        alert("El e-mail es inválido o ya está registrado.")
        return
    }

    if (status === 400 && msg?.password) {
        alert("La contraseña no cumple los requisitos.")
        return
    }

    alert("Ocurrió un error inesperado. Lo sentimos.")
}

import axios from "axios";

export async function refreshToken() {
    alert("Ocurrió un error con su sesión. Recarge la página.")
    console.log("refreshtoken")
    const refresh = localStorage.getItem("refresh_token");  

    const navTo = useNavigate()

    axios.post("http://localhost:8000/doctor/token/refresh/", { refresh: refresh }).then(res=>{
        console.log("refreshtoken-axios")
        console.log(res.data)
        localStorage.setItem("access_token", res.data.access)
    }).catch(err=>{
        if(err.message === "Request failed with status code 401"){
            alert("Sesión expirada, debe volver a hacer login.")
            navTo("/login")
        }
    })
    
}