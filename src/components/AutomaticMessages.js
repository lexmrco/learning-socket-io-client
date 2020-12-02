import React, { useEffect, useState } from 'react';
import { getMessage } from '../services/messages';
import { Button, Box, TextField, Grid, Typography } from '@material-ui/core';


const AutomaticMessages = ({ sendMessage }) => {

  const[switchAutomatic, setSwitchAutomatic] = useState(false) ;
  const[message, setMessage] = useState(() => getMessage()) ;
  const[miliSeconds, setMiliSeconds] = useState(15000) ;

  const mapMessage = () => {
    const autMessage = getMessage();
    // Enviar mensaje
    sendMessage(autMessage.message, autMessage.type);
    // Actualizar el state
    setMessage(autMessage);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(switchAutomatic) {
        mapMessage();
      }
    }, miliSeconds);
    return () => clearInterval(interval);
  }, [message])
  
  const handleInputChange = event => {
    setMiliSeconds(event.target.value);
  };

  const handleOnclickAutomatic = event => {
    setSwitchAutomatic(false === switchAutomatic);
    if(false === switchAutomatic) {
      mapMessage();
    }
  };
  return (
    <Box component="span" m={1}>
      <Typography variant="body1" gutterBottom>Ingrese el intervalo en milisegundos para ejecutar el proceso automático que genera mensajes aleatorios</Typography>
      <Grid container>
        <Grid item xs={6}>
          <TextField
              id="standard-number"
              label="Milisegundos"
              type="number"
              value={miliSeconds}
              onChange={handleInputChange}
            />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color={switchAutomatic ? 'secondary':'primary'}
            onClick={handleOnclickAutomatic}>
            {switchAutomatic ? 'Detener proceso automático':'Ejecutar proceso automático'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AutomaticMessages;
