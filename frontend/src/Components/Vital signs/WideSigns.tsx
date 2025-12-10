import { 
    Autocomplete,
    Slider,
    Stack,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio 
} 
from "@mui/material"

import { GroupContainer } from "../utils/utils"
import ButtonsScale from "../Complex components/ButtonsScale"
import type {toParent} from "../utils/utils"

import AddCircleIcon from '@mui/icons-material/AddCircle';

function WideSigns({sendToParent}:toParent){
    const skinColours = ["pálido", "cianótico", "rubicundo", "normal"]

    const setTrugidity =(e: React.ChangeEvent<HTMLInputElement>)=> {
        sendToParent(e.target.value,"trugidity")
    }

    return(<GroupContainer>
        <Stack>
            <h2 style={{marginLeft:"3rem",display: "flex", alignItems: "center", gap: "8px" }}>
                Signos ampliados
                <AddCircleIcon />
            </h2>
            <p>Dolor</p>
            <Slider
                min={0}
                max={10}
                onChangeCommitted={(e, value) =>sendToParent(value,"pain")}
                valueLabelDisplay="on"
                sx={{maxWidth:"250px",mt:"30px"}}
            />
            <p>Nivel de conciencia</p>
            <ButtonsScale
                onSend={sendToParent}
            />
            <Autocomplete
                options={skinColours}
                sx={{ width: 330, marginTop:"10px" }}
                renderInput={(params) => <TextField {...params} label="Color de la piel"/>}
                onChange={(e, value) => {
                    value ?sendToParent(value,"skin_colour"):null
                }}
            />
            <p>Turgencia de la piel</p>
            <RadioGroup
                defaultValue="female"
                name="radio-buttons-group"
                onChange={setTrugidity}
            >
                <FormControlLabel value="Normal" control={<Radio />}  label="Normal" />
                <FormControlLabel value="Disminuida" control={<Radio />} label="Disminuida" />
                <FormControlLabel value="Pobre" control={<Radio />} label="Pobre" />
            </RadioGroup>

        </Stack>

</GroupContainer>)}export default WideSigns