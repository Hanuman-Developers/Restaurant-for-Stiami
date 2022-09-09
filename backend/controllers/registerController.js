import ROLES_LIST from "../config/rolesList.js";
import bcrypt from "bcrypt";
import Registration_Data from "../models/register.js";
import asyncHandler from "express-async-handler";

const handleNewUser = asyncHandler(async (req, res) => {
  const { email, password, roles } = req.body;
  console.log(email);
  console.log(password);
  console.log(roles);

  if (!email || !password)
    res.status(400).json({ message: "Please enter userName and Password" });

  const duplicate = await Registration_Data.findOne(
    { email: email },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(data);
        return data;
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });

  console.log("From register route", duplicate);

  if (duplicate)
    res.status(400).json({ Message: "User Already Present in database" });
  else {
    try {
      const hashPwd = await bcrypt.hash(password, 10);
      //const val= Object.values(roles);
      //console.log(roles);
      //console.log(ROLES_LIST[val])

      const result = await Registration_Data.create({
        email: email,
        roles: roles,
        password: hashPwd,
      });

      console.log("From register Route", result);
      res.status(201).json({ Success: `New User with ${email} created` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

export { handleNewUser };
