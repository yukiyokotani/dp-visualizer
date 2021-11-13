import React, { useCallback, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Box, Card, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import conditionSlice, { ConditionState, Item } from './conditionSlice';
import { RootState } from '../../utils/store';
import { SizeContext } from '../../component/App';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      minWidth: '48px',
      margin: '16px 16px 16px 0px',
    },
    buttonBox: {
      minWidth: '48px',
      margin: '4px 0px',
    },
    textField: {
      minWidth: '100px',
    },
  })
);

const Form: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useContext(SizeContext);
  const { control, handleSubmit, errors, reset } = useForm<Item>();
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );

  const onSuccess = useCallback(
    (item: Item) => {
      const newItem: Item = {
        id: new Date().toISOString(),
        weight:
          typeof item.weight === 'string'
            ? parseInt(item.weight, 10)
            : item.weight,
        worth:
          typeof item.worth === 'string'
            ? parseInt(item.worth, 10)
            : item.worth,
        isProcessed: false,
      };
      if (condition.items[9]?.weight) {
        enqueueSnackbar('アイテム数が上限に達しています。', {
          variant: 'error',
        });
        return;
      }
      dispatch(conditionSlice.actions.addItem(newItem));
      enqueueSnackbar('アイテムを追加しました。', { variant: 'success' });
      reset({ weight: 1, worth: 1 });
    },
    [condition.items, dispatch, enqueueSnackbar, reset]
  );

  const onError = useCallback(() => {
    enqueueSnackbar('値が不正です。', { variant: 'error' });
  }, [enqueueSnackbar]);

  return (
    <Card>
      <Box p={isMobile ? 2 : 3}>
        <Grid container spacing={2}>
          <Grid item xl={1} sm={1} xs={2}>
            <Box className={classes.icon}>
              <AddShoppingCartIcon />
            </Box>
          </Grid>
          <Grid item xl={5} sm={5} xs={4}>
            <Controller
              control={control}
              name="weight"
              defaultValue={1}
              rules={{
                required: '必須項目です。',
                pattern: {
                  value: /^[0-9]+$/,
                  message: '整数を入力してください。',
                },
                min: {
                  value: 1,
                  message: '1以上, 10以下の整数を入力してください。',
                },
                max: {
                  value: 10,
                  message: '1以上, 10以下の整数を入力してください。',
                },
              }}
              as={
                <TextField
                  label={isMobile ? '重さ' : '重さ (1~10)'}
                  variant="outlined"
                  fullWidth
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                />
              }
            />
          </Grid>
          <Grid item xl={5} sm={5} xs={4}>
            <Controller
              control={control}
              name="worth"
              defaultValue={1}
              rules={{
                required: '必須項目です。',
                pattern: {
                  value: /^[0-9]+$/,
                  message: '整数を入力してください。',
                },
                min: {
                  value: 1,
                  message: '1以上10以下の整数を入力してください。',
                },
                max: {
                  value: 100,
                  message: '0以上100以下の整数を入力してください。',
                },
              }}
              as={
                <TextField
                  label={isMobile ? '価値' : '価値 (1~100)'}
                  variant="outlined"
                  fullWidth
                  error={!!errors.worth}
                  helperText={errors.worth?.message}
                />
              }
            />
          </Grid>
          <Grid item xl={1} sm={1} xs={2} container justifyContent="flex-end">
            <Box className={classes.buttonBox}>
              <IconButton
                color="primary"
                disabled={
                  condition.eval !== 'BEFORE' && condition.eval !== 'COMPLETE'
                }
                onClick={handleSubmit(onSuccess, onError)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Form;
