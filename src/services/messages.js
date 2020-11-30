import { v4 as uuid } from 'uuid';

export function getMessage() {
  const temp = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
  const bmodel = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  let alert = 'warning'
  if(temp >= 20 && temp <= 30)
    alert = 'info'
  else if(temp >= 40 || temp <= -5){
    alert = 'danger'
  };

  return {
    id: uuid(),
    type: alert,
    message: `Dispositivo: Batería. Modelo: ${bmodel} Temperatura ${temp}° C`,
  };
}