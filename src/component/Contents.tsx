import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Knapsack from '../features/condition/Knapsack';
import Form from '../features/condition/Form';
import Evaluation from '../features/condition/Evaluation';
import DpTable from '../features/dpTable/DpTable';

const Contents: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
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
