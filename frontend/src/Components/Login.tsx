//mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import { useAuth } from '../Context'
import { useError } from './Hooks/EvaluateError';
//react
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

function Login(){

    const { login } = useAuth()
    const navTo = useNavigate()

    const[ showLogin, setShowLogin ] = useState<boolean>(true)
    //this is responsible for the dialog:
    const [ showInfo, setShowInfo ] = useState<boolean>(false)
    const handleClose =()=>{setShowInfo(false)}
    //dialog responsibles avobe
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [license, setLicense] = useState<string>("")

    let myData = new FormData()

    function checkIfFilled(){
        console.log("das ist email",email, password)
        if(email && password){
            return true
        }else{
            return false
        }
    }

    async function handleLogin(){
        let filled = await checkIfFilled()
        if(!filled){
            alert("Rellene todos los campos")
            return
        }
        
        myData.append("email",email)
        myData.append("password",password)
        
        axios.post("http://localhost:8000/doctor/token/",myData).then(res=>{
            
            console.log(res.data)
            
            let data = {
                access:res.data.access, 
                refresh:res.data.refresh, 
                userId:res.data.id, 
                is_active:res.data.is_active.toString(), 
            }
            
            login(data)
            
            navTo("/")
        }).catch(err=>{
            console.error(err)
            console.log("entré a error")
            useError(err)
        })
    }

    async function newDoctor(){

        let filled = await checkIfFilled()
        if(!filled){
            alert("Rellene todos los campos")
            return
        }

        if (!/^\d+$/.test(license)) {
            alert("Número de cédula inválido")
            return
        } 

        myData.append("email",email)
        myData.append("password",password)
        myData.append("professional_license",license)

        axios.post("http://localhost:8000/doctor/register/", myData).then(res=>{
            console.log(res.data)
            
            setShowInfo(true)
            navTo("/login")
        }).catch(err=>{
            console.log("entré a error")
            useError(err)
        })
    }

    return(<><NavBar/>
    <Stack
        sx={{
            height:"80vh",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {showLogin && (<Card sx={{
            minWidth:"300px",
            maxWidth:"1000px"
        }}>
            <CardHeader
                title="Login"
                subheader="Acceda a su cuenta"
            />
            <CardMedia
                component="img"
                height="200"
                image="../../public/images/doctor-pictures.jpg"
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center',    
                    justifyContent: 'center',
                    mt:1,
                    '& > *': { mb: 1.5 },
                    '& > :last-child': { mb: 0 },
                }}
            >
                <TextField label="E-mail" sx={{marginBottom:"10px"}} onChange={(e)=>setEmail(e.target.value)}/>
                <TextField type="password" label="Contraseña" onChange={(e)=>setPassword(e.target.value)}/>
                <Stack direction="row" sx={{marginTop:"1rem"}} spacing={1}>
                    <Button 
                        onClick={()=>setShowLogin(false)}
                        sx={{backgroundColor:"white", color:"#b53f4e"}}
                        >No tengo cuenta
                    </Button>

                    <Button onClick={handleLogin} >Acceder</Button>
                </Stack>
                
            </CardContent>
        </Card>)}

        {!showLogin && (<Stack 
            sx={{
                minHeight:"100vh",
                justifyContent: "center",
                alignItems: "center",
                '& > *': { mb: 1.5 },
                '& > :last-child': { mb: 0 },
            }}
        >
            <CardHeader
                title="Nueva cuenta"
                subheader="Cree su cuenta"
            />
            <TextField onChange={(e)=>{setEmail(e.target.value)}} label="E-mail"/>
            <TextField type="password" onChange={(e)=>{setPassword(e.target.value)}} label="Contraseña"/>
            <TextField type="number" onChange={(e)=>{setLicense(e.target.value)}} label="Cédula profesional"/>

            <Stack direction="row" sx={{marginTop:"10px"}} spacing={1}>
                <Button 
                    onClick={()=>setShowLogin(true)}
                    sx={{backgroundColor:"white", color:"#b53f4e"}}
                    >Cancelar
                </Button>

                <Button onClick={newDoctor}>Crear cuenta</Button>
            </Stack>
        </Stack>)}
        
        <Dialog
            open={showInfo}
            onClose={handleClose}
        >
            <DialogTitle>
                {"¡Éxito!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Si bien, su cuenta fue creada, se necesita verificar su cédula 
                    profesional y, posteriormente, se le envirá un correo para una 
                    entrevista, si resutla elegido, podrá hacer login en la applicación.

                    Mientras tanto no podrá usar la app.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </Stack>
    <Footer/></>)
}export default Login