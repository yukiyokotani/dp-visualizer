import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Check, CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            // margin: theme.spacing(0),
        },
        table: {
            width: '40%',
            // align: 'center',
            margin: '4ch'
        },
        row: {
            // rowHeight: '90px',
        },
    }),
);

const ItemList = (props) => {
    const classes = useStyles();

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#eeff41',
            },
            secondary: {
                main: '#eeff41',
            },
            tonalOffset: 0.2,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container justify="center" spacing={0}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.row}>
                            <TableCell></TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Weight</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((item, i) => (
                            <TableRow className={classes.row} hover={true} key={i}>
                                {item.isIncluded
                                    ? <TableCell align="center" >
                                        <CheckBox fontSize="small" className={classes.margin} color="primary" />
                                    </TableCell>
                                    : <TableCell align="center" >
                                        <CheckBoxOutlineBlank fontSize="small" className={classes.margin} />
                                    </TableCell>
                                }
                                <TableCell align="center" className={item.isIncluded ? "included" : ""}>{i + 1}</TableCell>
                                <TableCell align="center">{item.weight}</TableCell>
                                <TableCell align="center" className={item.isReffered ? "reffered" : ""}>{item.value}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" className={classes.margin} onClick={() => props.deleteItem(i)} size="small">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid >
        </ThemeProvider>
    )
    {/* return (
        <table className="item-list">
            <tbody>
                <tr>
                    <th>Item</th>
                    <th>Weight</th>
                    <th>Value</th>
                </tr>
                {props.items.map((item, i) => (
                    <tr key={i}>
                        <td className={item.isIncluded ? "included" : ""}>{i + 1}</td>
                        <td>{item.weight}</td>
                        <td className={item.isReffered ? "reffered" : ""}>{item.value}</td>
                        <td><IconButton aria-label="delete" className={classes.margin} onClick={() => props.deleteItem(i)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton></td>
                    </tr>
                ))}
            </tbody>
        </table >
    ) */}
};

export default ItemList;