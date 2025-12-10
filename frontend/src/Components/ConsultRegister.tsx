import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { register } from './utils/utils';
import { useState, useEffect } from 'react';
import { useRegis } from './Hooks/SendRegisInfo';
import { useAuth } from '../Context';
import { useError, refreshToken } from './Hooks/EvaluateError';
import { Accordion, 
  Grid, 
  AccordionDetails,
  AccordionSummary, 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import NavBar from './NavBar';
import Footer from './Footer';

import DeleteIcon from '@mui/icons-material/Delete';

import CheckIcon from '@mui/icons-material/Check';

function ConsultRegister(){
  
  const {updateRegis} = useRegis()
  const context = useAuth()
  
  const [ controlNumbers, setControlNumbers ] = useState<string[] | null>(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  //here, register will store the registre that the doctor needs to modify
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
  //all the registres that match with the given date and the given control number:
  const [ madeRegistres, setMadeRegistres ] = useState<any>()

  //I needed the fieldnames in spanish
  const fieldNames = ["Frecuencia cardíaca","Presión sistólica","Presión diastólica",
    "Frecuencia respiratoria ","Temperatura corporal","Dolor",
    "Respuesta ocular","Respuesta verbal","Respuesta motriz","Color de piel","Trugencia","Gasto cardíaco",
    "Presión venosa central","Perfusión","Persión arterial media","Hemoglobina","Hemotocrito",
    "Reflejos pupilares","Tono muscular","postura","IMC","Flujo urinario","Oxígeno arterial","Presión cranial"
  ]

  //this will bring all the patients of a doctor
  useEffect(()=>{
    let id = context.auth.userId
    let accessKey = context.auth.access
    axios.get(`http://localhost:8000/registre/detail/control_numbers_by_doctor/${id}/`,{
      headers:{
        Authorization: `Bearer ${accessKey}`
      }
    }
    ).then(res=>{
        if(res.data.control_numbers.length !==0){
            setControlNumbers(res.data.control_numbers)
        }
    }).catch(err=>{
      console.error(err)
        useError(err)
        
        if(err.response.status === 401){
          refreshToken()
        } 
    })
  },[])

  //this shows all the registres made for a patient in a certain date
  function handleModify(idRegistre:number){
    let accessKey = context.auth.access
    axios.get(`http://localhost:8000/registre/specificRegistre/${idRegistre}/`,{
      headers:{
        Authorization: `Bearer ${accessKey}`
      }
    }).then(res=>{
      localStorage.setItem("idregis",res.data.registre.idRegistre)
      setRegister(res.data.registre)
    }).catch(err =>{
      console.log(err)
      useError(err)
      if(err.response.status === 401){
          refreshToken()
      }
    })
  }
  

  function setValue(value:number|string, field:string){
      for(const key in register){
          if(key === field){
              setRegister(prev=>({...prev,[field]:value}))
          } 
      }
  }
  //deletes the chosen registre
  function handleDelete(){
    let idRegis = localStorage.getItem("idregis")
    let accessKey = context.auth.access
    axios.delete(`http://localhost:8000/registre/delete/registre/${idRegis}/`,{
      headers:{
        Authorization: `Bearer ${accessKey}`
      }
    }).then(res=>{

      console.log(res.data)
      alert("Eliminado con éxito")
      setOpenConfirm(false)

    }).catch(err=>{
      console.log(err)
      useError(err)
      if(err.response.status === 401){
          refreshToken()
      }   

    })
  }
//-----------------------------------extra functions-----------------------------------------------
function formatDate(date: any) {
    const year = date.$y.toString()
    const month = (date.$M + 1).toString().padStart(2, '0')//pad start adds a 0 to the left if needed
    const day = date.$D.toString().padStart(2, '0')         

    const myDate = `${year}-${month}-${day}`
    setRegister(prev => ({ ...prev, date: myDate }))
}

  function handleMenuItem(num:string){
      setRegister(prev => ({ ...prev, control_number: num }))
  }

  //this will get all the registres made to a patient on a certain date
  useEffect(()=>{
    if(register.date && register.control_number){
      console.log(register.date, register.control_number)
      let accessKey = context.auth.access

      axios.get(`http://localhost:8000/registre/detail/registre_by_control_and_date/${register.control_number}/${register.date}/`,
      {
        headers:{
          Authorization: `Bearer ${accessKey}`
        }
      }
      ).then(res=>{
        console.log(res.data)
        setMadeRegistres(res.data.results)
      }).catch(err=>{
        console.log(err)
        useError(err)
        if(err.response.status === 401){
          refreshToken()
        } 
          
      })
    }
  },[register.date,register.control_number])

  return(<>
    <NavBar/>

    <Stack
      sx={{minWidth:"100vw",display:"flex",alignItems:"center", gap:"5px",minHeight:"80vh"}}
    >
      <Box sx={{margin:"10px", display:'flex', flexDirection:"column", gap:"10px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DatePicker 
            label="Fecha de registro"
            onChange={(newDate)=>{formatDate(newDate)}}
            />
        </DemoContainer>
        </LocalizationProvider>
        
        {controlNumbers !== null ?(
          <FormControl fullWidth>
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
          </FormControl>)
            :<Typography>Debe haber registrado signos vitales al menos una vez para usar esta sección.</Typography>}
      </Box>

      {madeRegistres && madeRegistres.length > 0 ? (madeRegistres.map((registre:any,index:number)=>(
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{`Registro ${index+1}`}</Typography>
          </AccordionSummary>
            <AccordionDetails sx={{ height: "200px" }}>
              <Stack spacing={1}> {/* spacing agrega separación vertical */}
                <Typography>
                  {registre.heartbeat ? `Frecuencia cardíaca: ${registre.heartbeat}` : "Sin frecuencia registrada"}
                </Typography>

                <Typography>
                  {registre.corporalTemp ? `Temperatura: ${registre.corporalTemp}` : "Sin temperatura registrada"}
                </Typography>

                <Typography>
                  {registre.pad ? `Presión diastólica: ${registre.pad}` : "Sin presión diastólica registrada"}
                </Typography>

                <Typography>
                  {registre.pas ? `Presión sistólica: ${registre.pas}` : "Sin presión sistólica registrada"}
                </Typography>
                <Button onClick={()=>handleModify(registre.idRegistre)}>Modificar</Button>
              </Stack>
            </AccordionDetails>
        </Accordion>
        ))
      ):<Typography>Sin registros para este paciente y esta fecha</Typography>}

      {register.fk_doctor &&(
        <Button sx={{width:"400px",display: "flex", alignItems: "center", gap: "8px"}} onClick={()=>updateRegis(register)}>Aceptar<CheckIcon/></Button>
      )}
      
      <Grid 
        container 
        columns={5} 
        spacing={2} 
        
        sx={{
          maxWidth:"800px", 
          display:"flex", 
          justifyContent:"center", 
          marginY:"10px"
        }}>

        {register.fk_doctor && Object.keys(register).map((field,index) =>(
          index < 5 ? null : 

              <TextField 
                label={fieldNames[index-5]} 
                onChange={(e)=>setValue(e.target.value,field)}
              >
              </TextField>
        ))}
      </Grid>
      {register.fk_doctor &&(<>
        <Button 
            sx={{width:"400px",display: "flex", alignItems: "center", gap: "8px"}} 
            onClick={()=>updateRegis(register)} 
          >
            Aceptar
            <CheckIcon/>
        </Button>
        <Button 
            sx={{width:"400px",display: "flex", alignItems: "center", gap: "8px" }} 
            onClick={()=>setOpenConfirm(true)}  
          >
            Eliminar
            <DeleteIcon/>
        </Button>
      </>)}

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>¿Estás seguro de eliminar la información?</DialogContent>
          <DialogActions>
              <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
              <Button onClick={handleDelete} variant="contained" color="success">
                Confirmar
              </Button>
          </DialogActions>
      </Dialog>
    </Stack>
    <Footer
  />
  </>)
}export default ConsultRegister