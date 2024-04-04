/*
  License: MIT
  Created By Lightnet
  Type: Javascript Module
*/

import van from 'van';

const { div, input, button } = van.tags;

function App(){
  console.log(window.location.host)
  //const webSocket = new WebSocket(url, protocols);
  let ws_url = "ws://"+window.location.host;
  ws_url = "ws://"+window.location.host+"/gun";
  console.log(ws_url);
  const socket = new WebSocket(ws_url);

  // Connection opened
  socket.addEventListener('open', (event) => {
    console.log("connect server!");
    //socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
  });

  // Connection closed
  socket.addEventListener('close', (event) => {
    console.log('Server connection closed:', event.data);
  });

  const messsages = div();
  const message = van.state("")

  function btnMessageSent(){
    console.log("message: ",message.val);
    if((typeof message.val === 'string' )&&(message.val.length > 0)){
      socket.send("test");
    }
  }

  return div(
    input({value:message,oninput:e=>message.val=e.target.value}),
    button({onclick:btnMessageSent},'Send'),
    messsages,
  )
}

export default App;