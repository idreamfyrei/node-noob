import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };

const app = express();
const PORT = 8000;

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

//


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
