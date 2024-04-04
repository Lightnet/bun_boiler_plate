/*
  License: MIT
  Created By Lightnet
  Type: Javascript Module
*/

// TEST
// Bun 1.1
console.log("Hello via Bun!");

var public_path = "public"; //folder

//fetch base on browser 
function fetch(req, server) {
  const success = server.upgrade(req); // websocket handle check
  if (success) {
    // Bun automatically returns a 101 Switching Protocols
    // if the upgrade succeeds
    return undefined;
  }

	//console.log('URL: ' + req.url)
	let filePath = new URL(req.url).pathname;
	//console.log('path: ' + filePath);
	if (filePath == '/') {// index
		filePath = public_path+'/index.html'
		const file = Bun.file(filePath);
		return new Response(file);
	} else {
    if(filePath == "/favicon.ico"){
      
    }
		filePath = public_path + filePath;
		const file = Bun.file(filePath);
		return new Response(file);
	}
}

const server = Bun.serve({
	fetch: fetch,
  websocket: {
    // this is called when a message is received
    async message(ws, message) {
      //console.log(ws);
      console.log(`Received ${message}`);
      // send back a message
      //ws.send(`You said: ${message}`);
    },
    open(ws) {
      console.log(ws);
      console.log("ws open")
    }, // a socket is opened
    close(ws, code, message) {
      console.log("ws close")
    }, // a socket is closed
    drain(ws) {
      console.log("ws drain")
    }, // the socket is ready to receive more data
  },
	port: 1337
})
//console.log('Server is running on port 1337!')
console.log(`Listening on http://${server.hostname}:${server.port}`)