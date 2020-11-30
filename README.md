# learning-socket-io-client :page_facing_up:
## Ambiente de desarrollo
<pre>
npm install
npm start
</pre>

### Configurar variables de entorno
Ubicar archivos .env .env.production

<pre>
REACT_APP_SOCKET_URL=http://localhost:9000
</pre>
En esta variable se almacena la url donde se encuentra el sockect-io-server

El proyecto socket-io-server se encuentra en: 
https://github.com/lexmrco/learning-socket-io-server

### package.json
Script start
Ambiente de desarrollo
<pre>    "start": "react-scripts start"</pre>

Ambiente de producción
<pre>    "start": "node server.js"</pre>
