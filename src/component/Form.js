import React, { useState, useRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        root: {
            '& > *': {
                margin: theme.spacing(0),
                marginLeft: '20px',
                width: '100%',
            },
        },
    }),
);

const Form = (props) => {
    const classes = useStyles();
    const weightInput = useRef(null);

    const [newItem, setNewItem] = useState({ weight: '', value: '' });

    const handleAdd = (weight, value) => {
        if (weight !== '' && value !== '') {
            props.addItem(parseInt(weight), parseInt(value));
            setNewItem({ weight: '', value: '' })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault() // defaultでページreloadが入る
            handleAdd(newItem.weight, newItem.value);
            weightInput.current.focus();
        }
    }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={2}>
                <form className={classes.root} noValidate autoComplete="off" style={{ display: 'inline-block' }} >
                    <TextField
                        id="standard-basic"
                        label="Weight"
                        value={newItem.weight}
                        onChange={(e) => setNewItem({ weight: e.target.value.replace(/\D/, ''), value: newItem.value })}
                        inputRef={weightInput}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </form>
            </Grid>
            <Grid item xs={2}>
                <form className={classes.root} noValidate autoComplete="off" style={{ display: 'inline-block' }} >

                    <TextField
                        id="standard-basic"
                        label="Value"
                        value={newItem.value}
                        onChange={(e) => setNewItem({ weight: newItem.weight, value: e.target.value.replace(/\D/, '') })}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </form>
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="delete" className={classes.margin} size="medium" color="secondary" onClick={() => handleAdd(newItem.weight, newItem.value)} >
                    <AddCircleOutline fontSize="default" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Form;
