import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;

//* Middleware
// get the data from POST request, creates a JS object of it, and attach it to req.body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//* ROUTES
// return user in the form of HTML
app.get('/users',(req,res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
});


// Give JSON data in case user hit /api/users through mobile devices that doesn't support HTML rendering
app.get('/api/users',(req,res) =>{
    return res.json(users);
});

// do get data for a specific user through dynamic routing (:id)
app.get('/api/users/:id',(req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.send(user);
});

//* Post
app.post('/api/users/', (req,res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({status: 'Success', id: users.length + 1});
    });
});

//* Patch
app.patch('/api/users/:id', (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const body = req.body;
    const index = users.indexOf(user);
    users[id - 1] = {...user, ...body};
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({status: 'Success', id});
    });
});

//* Delete
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'User not found' });
    }

    users.splice(index, 1);

    // Reassign IDs to keep them sequential
    users.forEach((user, idx) => {
        user.id = idx + 1;
    });

    // Save to file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ status: 'Error writing file' });
        return res.json({ status: 'Deleted', id });
    });
});

/*
* can combine route as

app.route('/api/users/:id')
    .get((req,res) => {})
    .patch((req,res) => {})
    .delete((req,res) => {});
*/


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
