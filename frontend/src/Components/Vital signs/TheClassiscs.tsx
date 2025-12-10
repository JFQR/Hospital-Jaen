import { Box, TextField, Stack, Typography,Switch, Slider } from "@mui/material"
import NumberSnipper from '../Complex components/NumberSnipper'
import { useState } from 'react'
import { GroupContainer } from "../utils/utils"
import type { toParent } from "../utils/utils"

import AccessibilityIcon from '@mui/icons-material/Accessibility';

function Classics({sendToParent}:toParent){

    const [ celcious, setCelcious ] = useState<boolean>(true)
    
    return(<>
        <GroupContainer>
            <h2 style={{marginLeft:"100px",gap:"8px",display: "flex", alignItems: "center"}}>
                Básicos 
                <AccessibilityIcon />
            </h2>
            <p>Frecuencia cardíaca</p>
            <NumberSnipper 
                min={40} max={200} 
                startNumber={100}
                field={"heartbeat"} 
                onSend={sendToParent}
            />
            <p>Presión arterial</p>
            <Box sx={{ display: 'flex', }}>
                <TextField
                    label="Sistólica"
                    type="number"
                    onChange={e => sendToParent(Math.floor(Number(e.target.value)),"pas")}
                />

                <TextField
                    label="diastólica"
                    type="number"
                    onChange={e => sendToParent(Math.floor(Number(e.target.value)),"pad")}
                />
            </Box>
            <p>Velocidad de respiración</p>
            <NumberSnipper 
                min={8} max={80} 
                field={"breathbeat"} 
                startNumber={15}
                onSend={sendToParent}
            />
            <Stack
                
            >
                <p>Temperatura</p>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography>ºC</Typography>
                    <Switch onChange={()=>setCelcious(!celcious)}/>
                    <Typography>ºF</Typography>
                </Stack>
                <Slider
                    min={celcious ? 35 : 97}
                    step={celcious ? 0.5 : 0.3}
                    max={celcious ? 42 : 101}
                    valueLabelDisplay="on"
                    sx={{maxWidth:"250px",mt:"30px"}}
                    onChangeCommitted={(e, value) =>sendToParent(value,"corporalTemp")}
                />
            </Stack>
        </GroupContainer>
    </>)
}export default Classics