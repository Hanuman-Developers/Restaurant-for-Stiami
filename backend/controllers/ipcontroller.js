import asyncHandler from "express-async-handler";

import Ipschema from "../models/ipAddress.js";

const saveIp = asyncHandler(async (req, res, next) => {
  const { address } = req.body;
  const data = new Ipschema({
    address: address,
  });

  await data.save();
  res.status(200).json({
    success: true,
    message: "New address has been added",
  });
});

export { saveIp };
