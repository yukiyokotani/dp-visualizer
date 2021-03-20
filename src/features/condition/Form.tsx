import React, { useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Box, Card, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import conditionSlice, { ConditionState, Item } from './conditionSlice';
import { RootState } from '../../utils/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    buttonBox: {
      margin: '4px 4px 4px 12px',
    },
  })
);

const Form: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, errors } = useForm<Item>();
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );

  const onSuccess = useCallback(
    (item: Item) => {
      const newItem: Item = {
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
    },
    [condition.items, dispatch, enqueueSnackbar]
  );

  const onError = useCallback(() => {
    enqueueSnackbar('値が不正です。', { variant: 'error' });
  }, [enqueueSnackbar]);

  return (
    <Card>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xl={12} xs={12} container>
            <Box flexGrow={1}>
              <Grid container spacing={2}>
                <Grid item xl={6} xs={6}>
                  <Controller
                    control={control}
                    name="weight"
                    defaultValue=""
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
                        value: 10,
                        message: '1以上10以下の整数を入力してください。',
                      },
                    }}
                    as={
                      <TextField
                        label="重さ"
                        variant="outlined"
                        fullWidth
                        error={!!errors.weight}
                        helperText={errors.weight?.message}
                      />
                    }
                  />
                </Grid>
                <Grid item xl={6} xs={6}>
                  <Controller
                    control={control}
                    name="worth"
                    defaultValue=""
                    rules={{
                      required: '必須項目です。',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: '整数を入力してください。',
                      },
                      min: {
                        value: 0,
                        message: '1以上10以下の整数を入力してください。',
                      },
                      max: {
                        value: 100,
                        message: '0以上100以下の整数を入力してください。',
                      },
                    }}
                    as={
                      <TextField
                        label="価値"
                        variant="outlined"
                        fullWidth
                        error={!!errors.worth}
                        helperText={errors.worth?.message}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.buttonBox}>
              <IconButton
                color="primary"
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
