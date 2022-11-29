const bcrypt = require("bcryptjs");

const chats = [];
const users = [
  // {
  //   name: "Ma Ma Lay Thiri",
  //   email: "chartage@gmail.com",
  //   password: "$2a$10$UFvUuTF7PduFiuekqdEdv.MvTuHTVS0MwCimlbedmEZ8ql4VQ5o/.",
  //   _id: "63612b669c00953aa0215f7e",
  // },
  {
    name: "Piyush",
    email: "piyush@example.com",
    password: "$2a$10$UFvUuTF7PduFiuekqdEdv.MvTuHTVS0MwCimlbedmEZ8ql4VQ5o/.",
    _id: "63612b669c00953aa0215f7f",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$UFvUuTF7PduFiuekqdEdv.MvTuHTVS0MwCimlbedmEZ8ql4VQ5o/.",
    _id: "63612b669c00953aa0215f80",
  },
  {
    name: "Guest User",
    email: "guest@example.com",
    password: "$2a$10$UFvUuTF7PduFiuekqdEdv.MvTuHTVS0MwCimlbedmEZ8ql4VQ5o/.",
    _id: "63612b669c00953aa0215f81",
  },
  {
    name: "Anthony",
    email: "anthony@example.com",
    password: "$2a$10$UFvUuTF7PduFiuekqdEdv.MvTuHTVS0MwCimlbedmEZ8ql4VQ5o/.",
    _id: "63612b669c00953aa0215f82",
  },
];
module.exports = { chats, users };
