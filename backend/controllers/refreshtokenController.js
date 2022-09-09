import asynchandler from "express-async-handler";
import dotenv from "dotenv";
import Registration_Data from "../models/register.js";

import jwt from "jsonwebtoken";

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.jwt) {
    res.sendStatus(401);
  } else {
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await Registration_Data.findOne(
      { refreshToken: refreshToken },
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

    //console.log(foundUser)

    if (!foundUser) res.status(401).json({ Message: "UnAuthorized Access" });
    else {
      const roles = Object.values(foundUser.roles);
      const email = foundUser.email;

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          console.log(err);
          if (err || decoded.email !== foundUser.email) {
            res.sendStatus(403);
          } else {
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

            res.json({ email, roles, accessToken });
          }
        }
      );
    }
  }
};

export { handleRefreshToken };
