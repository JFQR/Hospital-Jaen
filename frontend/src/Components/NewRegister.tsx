/*made to add a new register that contains 
all the vital signs the app can register of a patient */ 


import NavBar from "./NavBar"
import Footer from "./Footer"
import { Stack, TextField, Box, Button, FormControl, InputLabel } from "@mui/material"
import Classics from "./Vital signs/TheClassiscs"
import WideSigns from "./Vital signs/WideSigns"

import {useState,useEffect} from 'react'
import Hemodynamics from "./Vital signs/Hemodynamic"
import Various from "./Vital signs/Various"
import Neurologic from "./Vital signs/Neurologic"
import type { register } from "./utils/utils"
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useRegis } from "./Hooks/SendRegisInfo"
import { useAuth } from "../Context"
import { refreshToken, useError } from "./Hooks/EvaluateError"

import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function NewRegister(){

    const context = useAuth()
    const [ controlNumbers, setControlNumbers ] = useState<string[] | null>(null)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [showTextField, setShowTextField] = useState<boolean>(true)

    useEffect(()=>{
        
        let accessKey = context.auth.access
        let id = context.auth.userId

        axios.get(`http://localhost:8000/registre/detail/control_numbers_by_doctor/${id}/`,{
            headers: {
                Authorization: `Bearer ${accessKey}`
            }
        }).then((res)=>{
            if(res.data.control_numbers.length !==0){
                setControlNumbers(res.data.control_numbers)
            }
        }).catch(err=>{
            //alert("Ocurrió un error al traer los datos de los pacientes")
            useError(err)
            if(err.response.status === 401){
                refreshToken()
            } 

        })
    },[])

    const [register, setRegister] = useState<register>({
        fk_doctor:null,
        date:null,
        patient_name:null,
        control_number:null,
        heartbeat:null,
        pas:null,
        pad:null,
        breathbeat:null,
        corporalTemp:null,
        pain:null,
        ocular:null,
        verbal:null,
        motor_response:null,
        skin_colour:null,
        trugidity:null,
        cardiac_output:null,
        cvp:null,
        perfution:null,
        _map:null,
        hemoglobin:null,
        hemotocrit:null,
        pupilary:null,
        muscle_tone:null,
        posture:null,
        bmi:null,
        urinary_flow:null,
        arterial_oxigen:null,
        cranial_pressure:null,
    })

    function setValue(value:number|string, field:string){
        console.log(value, field)
        for(const key in register){
            if(key === field){
                setRegister(prev=>({...prev,[field]:value}))
            } 
        }
    }

    const { createRegis } = useRegis()

    async function handleCreate(){

        let id = context.auth.userId
        let idNum = Number(id)

        setRegister(prev=>({...prev,fk_doctor:idNum}))

        let validControlNumber = await createControlNumber()
        console.log(validControlNumber)
        if(validControlNumber){
            
            setOpenConfirm(true)
        }
        
    }

    function sendInfo(){
        setOpenConfirm(false)
        createRegis(register)
    }
//-------------------------aditional functions:-------------------------------------
    function formatDate(date:any){
        let year:string = date.$y.toString()
        let month:string = date.$M+1
        let stringMonth = month.toString()
        let day:string = date.$D.toString()
        const myDate:string = `${year}-${stringMonth}-${day}`
        setRegister(prev=>({...prev,date:myDate}))
    }

    function createControlNumber() {
        const dateArray = register.date?.split("-");
        const name = register.patient_name;

        if (!register.patient_name || !dateArray) {
            //alert("Escriba el nombre del paciente y la fecha.");
            return false;
        }

        const controlNumber = dateArray[1] + (name?.charAt(2) || "") + (name?.charAt(4) || "");

        setRegister(prev => ({ ...prev, control_number: controlNumber }));

        //alert(`El no. de control de este paciente es ${controlNumber}, lo va a necesitar.`)

        return controlNumber;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setRegister(prev => ({ ...prev, patient_name: value }));
        
    };

    const nameError =
    register.patient_name && register.patient_name.length < 10;

    function handleMenuItem(num:string){
        setShowTextField(false)
        setRegister(prev => ({ ...prev, control_number: num }))
    }

    return(<>
        <NavBar/>
        <Stack sx={{width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box
                sx={{width:{sm:"90%",md:"100%"}, 
                    display:"flex",
                    justifyContent:"center",
                    marginTop:"25px",
                    wrap:"wrap",
                    flexDirection:{xs:"column",md:"row"},
                    paddingY:"10px"
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="Fecha de registro"
                    sx={{minWidth:"1000px"}} 
                    onChange={(newDate)=>{formatDate(newDate)}}
                    />
                </DemoContainer>
                </LocalizationProvider>

                {showTextField && (<TextField 
                    sx={{margin:"9px"}} id="filled-basic" 
                    label="Nombre del paciente" 
                    variant="filled"
                    onChange={handleChange}
                    helperText={nameError ? "Debe tener al menos 10 caracteres" : ""}
                />)}
                {controlNumbers !== null &&(<FormControl sx={{width:{xs:"100%",md:"30%"},marginTop:"5px"}}>
                    <InputLabel id="previous-patients">Pacientes previos</InputLabel>
                    <Select
                        labelId="previous-patients"
                        id="select-previous-patients"
                        label="Sus pacientes previos"
                    >
                        {controlNumbers.map(num => (

                            <MenuItem 
                                value={num} 
                                onClick={() => handleMenuItem(num)}
                            >{num}</MenuItem>

                        ))}
                    </Select>
                </FormControl>)}
            </Box>
            
            <Button 
                  sx={{
                        width:"100px" ,
                        position: "fixed",   
                        bottom: "600px",
                        right: { xs: "10px", sm: "20px", md: "380px" }, 
                        boxShadow:3,
                        zIndex: 100000         
                    }} onClick={handleCreate}>Aceptar</Button>
            
            <Box
            sx={{minWidth:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}
            >
                <Box
                    sx={{
                        minHeight:"90vh",
                        maxWidth:"810px",
                        display: "grid",
                        gridTemplateColumns: {sm:"1fr",md:"1fr 1fr"}, 
                        gap: "10px", 
                        paddingY:"1rem"                  
                    }}
                >

                    <Classics sendToParent={setValue}/>
                    <WideSigns sendToParent={setValue}/>
                    <Hemodynamics sendToParent={setValue}/>
                    <Neurologic sendToParent={setValue}/>
                    <Various sendToParent={setValue}/>
                </Box>

            </Box>
            <Button sx={{width:"400px"}} onClick={handleCreate}>Aceptar</Button>
        </Stack>

        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Confirmación</DialogTitle>
            <DialogContent>¿Está seguro de enviar la información?</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
                <Button onClick={sendInfo} variant="contained" color="success">
                Confirmar
                </Button>
            </DialogActions>
        </Dialog>


        <Footer/>
    </>)
}export default NewRegister