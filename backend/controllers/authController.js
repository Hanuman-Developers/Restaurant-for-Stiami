import bcrypt from "bcrypt";
import Registration_Data from "../models/register.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import asyncHandler from "express-async-handler";
dotenv.config();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password)
    res.status(400).json({ message: "Please enter userName and Password" });
  else {
    const foundUser = await Registration_Data.findOne(
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

    console.log(foundUser);

    if (!foundUser) res.status(401).json({ Message: "UnAuthorized Access" });
    else {
      const decryptPassword = await bcrypt.compare(
        password,
        foundUser.password
      );
      const roles = Object.values(foundUser.roles);

      if (decryptPassword) {
        const accessToken = jwt.sign(
          {
            UserInfo: {
              email: foundUser.email,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );

        const RefreshToken = jwt.sign(
          { email: foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        foundUser.refreshToken = RefreshToken;
        const result = await foundUser.save();
        console.log(result);
        //res.cookie('jwt', RefreshToken ,{httpOnly:true, maxAge:24*60*60*1000})
        res.cookie("jwt", RefreshToken, { httpOnly: true });

        res.json({ accessToken, roles });
      } else {
        res.status(401).json({ Message: "Password Mismatch" });
      }
    }
  }
};

const loginFailed = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

const loginSuccess = asyncHandler(async (req, res) => {
  console.log("Inside Suceess");
  console.log(req.user);
  res.status(200).json({
    success: true,
    message: "Success",
    user: req.user,
  });
});

const logOut = asyncHandler(async (req, res) => {
  console.log("Before logout");
  console.log(req.user);
  req.logout();
  // res.redirect(process.env.CLIENT_URL);
  console.log("After Logout");
  console.log(req.user);
  res.send("Done");
});

export { handleLogin, loginFailed, loginSuccess, logOut };
