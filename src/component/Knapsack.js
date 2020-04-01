import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';


function valuetext(value: number) {
    return `${value}`;
}

const Knapsack = (props) => {
    const handleChange = (cap) => {
        cap = parseInt(cap)
        if (cap >= 10) {
            //alert("Knapsack容量は10以下で設定してください")
            props.setKnapsackCap(10);
            return;
        }
        props.setKnapsackCap(cap);
    }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Typography id="discrete-slider" gutterBottom align="left">
                    Knapsack Capacity
                </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Slider
                    value={props.knapsackCap}
                    onChange={(e, val) => handleChange(val)}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={0}
                    max={10}
                />
            </Grid>

        </Grid>
    )
}

export default Knapsack;