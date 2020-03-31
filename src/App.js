import React, { useState } from 'react';
import Table from './component/Table';
import ItemList from './component/List';
import Knapscak from './component/Knapsack';
import Form from './component/Form';
import Status from './component/Status';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Silurus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const Contents = (theme) => {
  const [items, setItems] = useState([
    { weight: 2, value: 3, isIncluded: false, isReffered: false },
    { weight: 1, value: 2, isIncluded: false, isReffered: false },
    { weight: 3, value: 3, isIncluded: false, isReffered: false },
    { weight: 2, value: 5, isIncluded: false, isReffered: false },
    { weight: 4, value: 6, isIncluded: false, isReffered: false },])
  const [knapsackCap, setKnapsackCap] = useState(8);
  const [status, setStatus] = useState("");
  const [maxValue, setMaxValue] = useState(0);

  const addItem = (weight, value) => {
    let newItems = [...items, { weight: weight, value: value, isIncluded: false }];
    setItems(newItems);
  }

  const deleteItem = (i) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  }

  const includedTrue = (i) => {
    let newItems = [...items];
    newItems[i].isIncluded = true;
    setItems(newItems);
  }

  const includedAllFalse = () => {
    let newItems = [...items];
    newItems.forEach(item => item.isIncluded = false);
    setItems(newItems);
  }

  const setReffered = (i, bool) => {
    let newItems = [...items];
    newItems.forEach(item => item.isReffered = false);
    newItems[i].isReffered = bool;
    setItems(newItems);
  }

  const classes = useStyles(theme);
  return (
    <Grid container spacing={0}>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Knapsack Problem
          </Typography>
          < div className="App" >
            <Knapscak knapsackCap={knapsackCap} setKnapsackCap={setKnapsackCap} />
            <Form addItem={addItem} />
            <ItemList items={items} deleteItem={deleteItem} />
            <Status
              status={status}
              maxValue={maxValue} />
            <Table
              items={items}
              knapsackCap={knapsackCap}
              includedTrue={includedTrue}
              includedAllFalse={includedAllFalse}
              setReffered={setReffered}
              setStatus={setStatus}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
            />
          </div>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">Enjoy Hacking</Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </Grid>
  )
}

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#80d8ff',
        list: '#eeff41',
      },
      secondary: {
        main: '#ff80ab',
      },
      success: {
        main: '#eeff41',
      },
      tonalOffset: 0.2,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Contents />
    </ThemeProvider>
  );
}


// import React, { useState } from 'react';
// import Table from './component/Table';
// import List from './component/List';
// import Knapscak from './component/Knapsack';
// import Form from './component/Form';
// import Status from './component/Status';

// const App = () => {
//   const [items, setItems] = useState([
//     { weight: 2, value: 3, isIncluded: false, isReffered: false },
//     { weight: 1, value: 2, isIncluded: false, isReffered: false },
//     { weight: 3, value: 3, isIncluded: false, isReffered: false },
//     { weight: 2, value: 5, isIncluded: false, isReffered: false },
//     { weight: 4, value: 6, isIncluded: false, isReffered: false },])
//   const [knapsackCap, setKnapsackCap] = useState(8);
//   const [status, setStatus] = useState("OVER");
//   const [maxValue, setMaxValue] = useState(0);

//   const addItem = (weight, value) => {
//     let newItems = [...items, { weight: weight, value: value, isIncluded: false }];
//     setItems(newItems);
//   }

//   const deleteItem = (i) => {
//     let newItems = [...items];
//     newItems.splice(i, 1);
//     setItems(newItems);
//   }

//   const includedTrue = (i) => {
//     let newItems = [...items];
//     newItems[i].isIncluded = true;
//     setItems(newItems);
//   }

//   const includedAllFalse = () => {
//     let newItems = [...items];
//     newItems.forEach(item => item.isIncluded = false);
//     setItems(newItems);
//   }

//   const setReffered = (i, bool) => {
//     let newItems = [...items];
//     newItems.forEach(item => item.isReffered = false);
//     newItems[i].isReffered = bool;
//     setItems(newItems);
//   }

//   return (
//     < div className="App" >
//       <p className="title">Knapsack Problem</p>
//       <Knapscak knapsackCap={knapsackCap} setKnapsackCap={setKnapsackCap} />
//       <Form addItem={addItem} />
//       <List items={items} deleteItem={deleteItem} />
//       <Status
//         status={status}
//         maxValue={maxValue} />
//       <Table
//         items={items}
//         knapsackCap={knapsackCap}
//         includedTrue={includedTrue}
//         includedAllFalse={includedAllFalse}
//         setReffered={setReffered}
//         setStatus={setStatus}
//         maxValue={maxValue}
//         setMaxValue={setMaxValue}
//       />
//     </div >
//   )
// }

// export default App;