const express = require(`express`);
const app= express();
const PORT = 3000;

app.use(express.json());

let users= [
    {id:1, firstName:`Cedrick`, lastName:`Oabel`, section: `bsit 4b` , status: `present`},
    {id:2, firstName:`Cedy`, lastName:`Oabels`, section: `bsit 4b` , status: `absent`},

];

app.get(`/users`,(req,res) => {
    const {firstName, lastName, section, status} = req.body;
    const userIndex = users.findIndex(user=> user.firstName === firstName && user.lastName === lastName);

    if (userIndex !== -1){
        user[userIndex].status = status;
        console.log(`update attendance for ${lastName} ${firstName} to: ${status}`);
        res.status(200).json({message:`Attendance for ${lastName} ${firstName} has been updated to ${status}`});
    }
    else {
        const newUser = {
            id:users.length +1,
            lastName,
            firstName,
            section,
            status
        };
        user.push(newUser);
        console.log(`New User added: ${lastName} ${firstName} with status ${status}`);
        res.status(201).json({message: `New Student ${firstName} ${lastName} has been added with status ${status}`});
    }
});

app.get(`/users`, (req,res) => {
    res.status(200).json(users);
});

app.get(`/`, (req,res)=> {

    res.send(`Server is up and Running`);
});

module.exports = app;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
});

// req and res = response and request