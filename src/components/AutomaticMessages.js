import React, { useEffect, useState } from 'react';
import { getMessage } from '../services/messages';
import { Button } from '@material-ui/core';


const AutomaticMessages = ({ sendMessage }) => {

  const[switchAutomatic, setSwitchAutomatic] = useState(false) ;
  const[message, setMessage] = useState(() => getMessage()) ;

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
    }, 15000);
    return () => clearInterval(interval);
  }, [message])
  
  const handleOnclickAutomatic = event => {
    setSwitchAutomatic(false === switchAutomatic);
    if(false === switchAutomatic) {
      mapMessage();
    }
  };
  return (
    <Button variant="contained" color={switchAutomatic ? 'secondary':'primary'} onClick={handleOnclickAutomatic}>
     {switchAutomatic ? 'Detener proceso automático':'Ejecutar proceso automático'}
    </Button>
  );
};

export default AutomaticMessages;
