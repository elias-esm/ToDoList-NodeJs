//  log() in this file start with : CcC

const { insertTask, updateTask, deleteTask, findTasks } = require('../models/taskmodels');

//type of status
const VALID_STATUSES = ["in-progress", "canceled", "done"];

async function taskRoutes(req, res) {

    //GET List
    if (req.method === 'GET' && req.url === '/tasks') {
        const tasks = await findTasks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));

        //POST
    } else if (req.method === 'POST' && req.url === '/tasks') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', async () => {
            const task = JSON.parse(body);
            if (!VALID_STATUSES.includes(task.status)) {
                if (!res.headersSent) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'CcC Invalid status value' }))
                }
                return;
            }

            //insert to list
            const result = await insertTask(task);
            if (result && result.acknowledged) {
                if (!res.headersSent) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ...task, _id: result.insertedId }));
                }
            }
        });
        //PUT
    } else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const taskUpdate = JSON.parse(body);
            if (taskUpdate.status && !VALID_STATUSES.includes(taskUpdate.status)) {
                if (!res.headersSent) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'CcC Invalid status value' }));
                }
                return;
            }
            const updatedTask = await updateTask(id, taskUpdate);
            if (!res.headersSent) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedTask))
            }
        })
        //DELETE
    } else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
        const id = req.url.split('/')[2];
        await deleteTask(id);
        if (!res.headersSent) {
            res.writeHead(204);
            res.end();
        }
    }
}

module.exports = taskRoutes;
