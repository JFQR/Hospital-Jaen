/**
 * this component was made to send info to the backend,
 * wether is an update or the creation of a register
 */

import { refreshToken } from "../Hooks/EvaluateError"

import axios from 'axios'
import type { register } from '../utils/utils'
import { useAuth } from "../../Context"


export function useRegis() {

  const context = useAuth()

  function createRegis(regis:register) {
      console.log("regis en createRegis",regis)
      if(!regis.control_number || !regis.date){
        alert("Tiene que esoger un número de control o escribir un nombre y escoger una fecha")
        return
      }
    
      let accesskey = context.auth.access
      axios.post(`http://localhost:8000/registre/create/registre/`,regis,{
        headers: {
            Authorization: `Bearer ${accesskey}`
        }
      }).then(res=>{
          console.log(res.data)
          alert("Registro añadido con éxito")
      }).catch(err=>{
        if(err.response.status === 401){
          console.log("error401")
          refreshToken()
        }
      })   
  }   

  function updateRegis(regis:register) {

    let idRegis = localStorage.getItem("idregis")
    let accessKey = context.auth.access 
    axios.patch(`http://localhost:8000/registre/update/registre/${idRegis}/`,regis,{
          headers:{
            Authorization: `Bearer ${accessKey}`
          }
        }).then(res=>{

          console.log(res.data)
          alert("Actualizado con éxito")

        }).catch(err=>{
          console.log(err)
          if(err.response.status === 401){
              refreshToken()
          }   
    })
    
  }   

  return { createRegis, updateRegis }
}
