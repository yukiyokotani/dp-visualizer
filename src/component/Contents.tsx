import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import Condition from '../features/condition/Condition';
import Form from '../features/condition/Form';
import Evaluation from '../features/condition/Evaluation';
import DpTable from '../features/dpTable/DpTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 40,
    },
  })
);

const Contents: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xl={12} xs={12}>
          <Form />
        </Grid>
        {/* <Grid item xl={12} xs={12}>
          <Condition />
        </Grid> */}
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
