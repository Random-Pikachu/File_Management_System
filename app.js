const http  = require('http');
const {requestHandler} = require('./requestHandler')


const server = http.createServer(requestHandler);



const PORT = 3200;
server.listen(PORT, () => {
    console.log(`server started at https://localhost/${PORT}`);
})