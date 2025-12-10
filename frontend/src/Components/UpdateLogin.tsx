/**this component is only to update a doctor's
 * information.
 * In general, I like to put the update options 
 * apart because it give more order to the components.
 */
import { 
    Box, 
    Button, 
    Card, 
    CardActions, 
    TextField, 
    Stack, 
    Tooltip, 
    Dialog, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    DialogActions 
} from "@mui/material"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context';
import { refreshToken } from './Hooks/EvaluateError';
import axios from 'axios'
import NavBar from './NavBar';
import Footer from './Footer';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function UpdateLogin(){

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [license, setLicense] = useState<string>("")
    const [ correctPassword, setCorrectPassword ] = useState<boolean>(true)
    const [ showInfo, setShowInfo ] = useState<boolean>(false)
    const [ openConfirm, setOpenConfirm ] = useState<boolean>(false)
    const handleClose =()=>{setShowInfo(prev=>(!prev))}
    
    const navTo = useNavigate()
    const context = useAuth()

    function validatePassword(){

        let accessKey = context.auth.access

        axios.post("http://localhost:8000/doctor/check-password/",{current_password:currentPassword},{
            headers: {
                Authorization: `Bearer ${accessKey}`
            }
        }).then(res=>{
            if(res.data.detail === "Contraseña correcta"){
                alert("Puede cambiar su información")
                setCorrectPassword(false)
            }else{
                alert("Contraseña incorrecta")
            }
        }).catch(err=>{
            console.error(err)
            if(err.message === "Request failed with status code 401"){
                refreshToken()
            }
        })
    }

    function updateInfo(){
        let myInfo = new FormData()
        let accessKey = context.auth.access

        if (email) {myInfo.append("email", email)}
        if (password) {myInfo.append("password",password)}
        if (license) {myInfo.append("professional_license",license)}

        axios.patch("http://localhost:8000/doctor/update/",myInfo,{
            headers:{
                Authorization: `Bearer ${accessKey}`
            }
        }).then(res=>{
            console.log(res.data)
            setShowInfo(true)
        }).catch(err=>{
            console.error(err)
        })
    }


    const showWarning =()=>{setOpenConfirm(true)}
    function handleDelete(){
        let accessKey = context.auth.access

        axios.delete("http://localhost:8000/doctor/delete/",{
            headers:{
                Authorization:`Bearer ${accessKey}`
            }
        }).then(res=>{
            console.log(res.data)
            alert("Cuenta eliminada con éxito")
            context.logout()
            navTo("/login")
        }).catch(err=>{
            console.error(err)

        })
    }

    function handleLogOut(){
        context.logout()
        navTo("/login")
    }

    return(<>
    <NavBar/>
    <Stack
        sx={{
            minHeight:"80vh",
            display:"flex",
            width:"100vw",
            justifyContent:"center",
            alignItems:"center"
        }}
    >
        
        <Box
            sx={{
                display:"flex", 
                padding:"10px",
                width:{sm:"100%",md:"40%"},
                justifyContent:"center",

            }}
        >
            <TextField 
                type="password" 
                onChange={(e)=>setCurrentPassword(e.target.value)} 
                label="Contraseña actual"
            >
            </TextField>
            <Button onClick={validatePassword} endIcon={<KeyboardDoubleArrowRightIcon/>}></Button>
        </Box>
        <Card
            sx={{
               width:{xs: "100%", sm: "100%",md:"40%"},
               display:"flex",
               flexDirection:"column",
                gap:"10px"
            }}
        >
            <TextField onChange={(e)=>{setEmail(e.target.value)}} label="E-mail"/>
            <TextField type="password" onChange={(e)=>{setPassword(e.target.value)}} label="Contraseña"/>
            <TextField type="number" onChange={(e)=>{setLicense(e.target.value)}} label="Cédula profesional"/>
            <CardActions>
                <Button onClick={()=>navTo("/")}>Cancelar<CancelIcon/></Button>
                <Tooltip title="Necesita primero comprobar su contraseña para poder actualizar su info.">
                    <span>
                        <Button 
                            disabled={correctPassword}
                            onClick={updateInfo}
                        >
                            Aceptar<CheckIcon/>
                        </Button>
                    </span>
                </Tooltip>
            </CardActions>
            <CardActions>
                
                <Tooltip title="Necesita primero comprobar su contraseña para poder borrar su cuenta.">
                    <span>
                        <Button disabled={correctPassword} onClick={showWarning}>Borrar cuenta<DangerousIcon/></Button>
                    </span>
                </Tooltip>

                <Button onClick={handleLogOut}>Cerrar sesión<LogoutIcon/></Button>
            </CardActions>
        </Card>
        
    </Stack>
    <Footer/>


    <Dialog
        open={showInfo}
        onClose={handleClose}
    >
        <DialogTitle>
            {"¡Éxito!"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Su información ha sido actualizada.
            </DialogContentText>
        </DialogContent>
    </Dialog>

    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>¿Está seguro de eliminar su cuenta?</DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Cancelar<CancelIcon/></Button>
            <Button onClick={handleDelete} variant="contained" color="success">
                Confirmar<CheckIcon/>
            </Button>
        </DialogActions>
    </Dialog>
    </>)
}export default UpdateLogin