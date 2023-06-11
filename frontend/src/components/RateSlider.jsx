import React from "react";
import { Typography, Slider } from '@mui/material';
const RateSlider = (props) => {
    let value = props.input[props.name]
    let feedback = props.feedbacks[value/2]
    console.log(props.input)
    return (
        <>
            <div style={{ width: '100%', margin:10}}>
                <Typography id="input-slider" gutterBottom>
                    {props.name}
                </Typography>
                <Slider
                    aria-label="Small steps"
                    defaultValue={0}
                    name={props.name}
                    value={props.input[props.name]}
                    onChange={props.set}
                    step={2}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                />
            </div>
            <div style={{ width: '100%', margin:10}}>
                {feedback}
            </div>
        </>
    )
}

export default RateSlider;