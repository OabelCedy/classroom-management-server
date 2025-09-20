const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, firstName: "Cedrick", lastName: "Oabel", section: "bsit 4b", status: "present" },
  { id: 2, firstName: "Cedy", lastName: "Oabels", section: "bsit 4b", status: "absent" },
];


app.post("/users", (req, res) => {
  const { firstName, lastName, section, status } = req.body;

  const userIndex = users.findIndex(
    (user) => user.firstName === firstName && user.lastName === lastName
  );

  if (userIndex !== -1) {
    // update status
    users[userIndex].status = status;
    console.log(`Updated attendance for ${firstName} ${lastName} to: ${status}`);
    res.status(200).json({
      message: `Attendance for ${firstName} ${lastName} has been updated to ${status}`,
    });
  } else {
    // add new user
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      section,
      status,
    };
    users.push(newUser);
    console.log(`New User added: ${firstName} ${lastName} with status ${status}`);
    res.status(201).json({
      message: `New Student ${firstName} ${lastName} has been added with status ${status}`,
    });
  }
});


app.get("/users", (req, res) => {
  res.status(200).json(users);
});


app.get("/", (req, res) => {
  res.send("Server is up and Running");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
