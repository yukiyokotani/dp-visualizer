import { Container, createStyles, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Knapsack from '../features/condition/Knapsack';
import Form from '../features/condition/Form';
import Evaluation from '../features/condition/Evaluation';
import DpTable from '../features/dpTable/DpTable';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minWidth: '960px',
      overflow: 'auto',
    },
    mainContents: {
      marginTop: 0,
      marginBottom: 0,
    },
  })
);
const Contents: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.mainContents}>
        <Grid item xl={12} xs={12}>
          <Knapsack />
        </Grid>
        <Grid item xl={12} xs={12}>
          <Form />
        </Grid>
        <Grid item xl={12} xs={12}>
          <Evaluation />
        </Grid>
        <Grid item xl={12} xs={12}>
          <DpTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contents;
