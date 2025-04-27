import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/user", (req, res) => {
    res.send(`hello ! ${req.query.name}`);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);   
})