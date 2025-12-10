import { MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import { GroupContainer } from "../utils/utils"
import type { toParent } from "../utils/utils"
import type { SelectChangeEvent } from "@mui/material";

import PsychologyIcon from '@mui/icons-material/Psychology';

function Neurologic({sendToParent}:toParent){

    const setPupilary =(e: SelectChangeEvent)=> {
        sendToParent(e.target.value,"pupilary")
    }

    const setMuscleTone =(e: SelectChangeEvent)=> {
        sendToParent(e.target.value,"muscle_tone")
    }
    
    const setPosture =(e: SelectChangeEvent)=> {
        sendToParent(e.target.value,"posture")
    }

    return(<GroupContainer>

        <h2 style={{marginLeft:"80px",gap:"8px",display: "flex", alignItems: "center"}}>
            Neurológicos
            <PsychologyIcon/>
        </h2>

        <FormControl fullWidth>    
            <InputLabel id="lbl-reflex-eyes">Reflejos pupilares</InputLabel>
            <Select
                labelId="lbl-reflex-eyes"
                label="Reflejos pupilares"
                onChange={setPupilary}
            >
                <MenuItem value={"Rápida"}>Rápida</MenuItem>
                <MenuItem value={"Reactiva"}>Reactiva</MenuItem>
                <MenuItem value={"Lenta"}>Lenta</MenuItem>
                <MenuItem value={"Fija"}>Fija</MenuItem>
                <MenuItem value={"No reactiva"}>No reactiva</MenuItem>
                <MenuItem value={"Asimétrica"}>Asimétrica</MenuItem>
            </Select>
        </FormControl>  

        <FormControl fullWidth>  
            <InputLabel id="muscle">Tono muscular</InputLabel>
            <Select
                label="Tono muscular"
                labelId="muscle"
                onChange={setMuscleTone}
            >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1+</MenuItem>
                <MenuItem value={2}>2+</MenuItem>
                <MenuItem value={3}>3+</MenuItem>
                <MenuItem value={4}>4+</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth> 
            <InputLabel id="posture">Postura corporal</InputLabel>
            <Select
                labelId="posture"
                label="Postura corporal"
                onChange={setPosture}
            >
                <MenuItem value={"m1"}>m1</MenuItem>
                <MenuItem value={"m2"}>m2</MenuItem>
                <MenuItem value={"m3"}>m3</MenuItem>
                <MenuItem value={"m4"}>m4</MenuItem>
                <MenuItem value={"m5"}>m5</MenuItem>
            </Select>
        </FormControl>
        
    </GroupContainer>)
}export default Neurologic