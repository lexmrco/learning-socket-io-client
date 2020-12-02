import React, { useState } from 'react';
import { Button, InputBase, TextField, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const NicknameForm = ({ sendNickname }) => {
  const [nickname, setNickname] = useState('');
  const classes = useStyles();
  const handleSubmit = event => {
    event.preventDefault();
    sendNickname(nickname);
    setNickname('');
  };

  const handleInputChange = event => {
    setNickname(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        autoComplete="off"
        name="nickname"
        onChange={handleInputChange}
        placeholder="Nombre de usuario..."
        value={nickname}
        variant="outlined"
        required
      />
      
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Iniciar sesión
      </Button>
    </Paper>
  );
};

export default NicknameForm;
