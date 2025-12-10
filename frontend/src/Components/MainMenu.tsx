import { Paper } from '@mui/material'
import NavBar from './NavBar'
import Footer from './Footer'
import Box from '@mui/material/Box'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context'

function MainMenu(){

    const navTo = useNavigate()
    const context = useAuth()
    useEffect(()=>{
        let logged = context.auth.access
        if(!logged){
            navTo("/login")
        }
    },[])

    return(<>
        <NavBar/>
        <Box
            sx={{
                minHeight: '90vh', 
                width:'100wv',              
                display: 'flex',
                justifyContent: 'center',       
                alignItems: 'center',           
            }}
        >
            <Box sx={{display:"flex", 
                    flexWrap: 'wrap', 
                    gap: 2, 
                    justifyContent: "center",
                    padding:"10px",
            }}>
                <Paper
                    elevation={4}
                    onClick={()=>navTo("/newregister")}
                    sx={{
                    width: {xs:"250px",md:"400px"},
                    height: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    borderColor:"#b53f4e",
                    borderWidth:"3px",
                    borderStyle: "solid", 
                    cursor:"pointer",
                    fontSize:"32px",
                    alignItems: 'center',
                }}
                    >Nuevo registro
                </Paper>
                <Paper
                    onClick={()=>navTo("/consultregister")}
                    elevation={4}
                    sx={{
                    width: {xs:"250px",md:"400px"},
                    height: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    borderColor:"#b53f4e",
                    borderWidth:"3px",
                    borderStyle: "solid", 
                    cursor:"pointer",
                    fontSize:"32px",
                    alignItems: 'center',
                }}
                    >Buscar paciente
                </Paper>
            </Box>
        </Box>
        <Footer/>
    </>)
}export default MainMenu