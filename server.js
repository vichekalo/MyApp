const express = require("express");
const app = express();
const fs = require('fs');
app.listen(process.env.PORT || 5000, () => console.log("Server running..."));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

//---Read file from users.json
let users=JSON.parse(fs.readFileSync('users.json'))
app.get("/users", (req, res) => {
    console.log(users)
    res.send(users)
});
app.post('/users', (req, res) => {
    let id = users.length + 1;
    let userlist = req.body;
    userlist.id = id;
    users.push(userlist);
    fs.writeFileSync("users.json" ,JSON.stringify(users));
    res.send(users);

});
// ------------------Delete message-----------
app.delete("/users/:id", (req,res) =>{
    let id = req.params.id;
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users.splice(index,1);
            fs.writeFileSync("users.json" ,JSON.stringify(users)); 
            res.send(users);
        }
    }
});
//------------Update message-------------------
app.put("/users/:id", (req , res) => {
    let id = req.params.id;
    let text = req.body.text;
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users[index].text = text;
            fs.writeFileSync("users.json" ,JSON.stringify(users));
            res.send(users);
        }
    }
})





