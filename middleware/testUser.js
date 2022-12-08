const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.res.testUser) {
    throw new BadRequestError("Test user. Read only.");
  }
  next();
};

module.exports = testUser;
