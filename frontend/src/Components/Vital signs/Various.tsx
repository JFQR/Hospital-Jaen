import { Slider } from "@mui/material"
import { GroupContainer } from "../utils/utils"
import type { toParent } from "../utils/utils"

import InterestsIcon from '@mui/icons-material/Interests';

function Various({sendToParent}:toParent){
    return(<GroupContainer>
        <h2 style={{marginLeft:"120px",display: "flex", alignItems: "center", gap: "8px" }}>
            Otros
            <InterestsIcon/>
        </h2>

        <p>IMC</p>
        <Slider
            valueLabelDisplay="on"
            min={15}
            max={40}
            step={0.5}
            onChangeCommitted={(e, value) =>sendToParent(value,"bmi")}
        />
        <p>Flujo orinario</p>
        <Slider
            valueLabelDisplay="on"
            min={50}
            max={250}
            step={2}
            onChangeCommitted={(e, value) =>sendToParent(value,"urinary_flow")}
        />
        <p>Nivel de oxígeno arterial (PaO₂) </p>
        <Slider
            valueLabelDisplay="on"
            min={40}
            max={100}
            onChangeCommitted={(e, value) =>sendToParent(value,"arterial_oxigen")}
        />
        <p>Presión intercranial</p>
        <Slider
            valueLabelDisplay="on"
            min={7}
            max={25}
            onChangeCommitted={(e, value) =>sendToParent(value,"cranial_pressure")}
        />
    </GroupContainer>)
}export default Various