//  *main file
//  log() in this file start with : BbB

const http = require('http')
const { connectToMongoDB } = require('./utils/mongo-connection');
const taskRoutes = require('./routes/task.routes');

//make server for handel req from url
const server = http.createServer((req, res) => {

    //send req & res to taskRoutes
    taskRoutes(req, res);
})

const runServer = async () => {
    //wait for run DB
    await connectToMongoDB();
    console.log('BbB Connected to MongoDB successfully...');

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`BbB Server running on http://localhost:${PORT}`);
    });
};

runServer();
