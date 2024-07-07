const zod = require("zod");

const formDataSchema = zod.object({
  fullname: zod.string().min(3).max(50),
  email: zod.string().email().min(5).max(50),
  contact: zod.number().min(10).max(11),
  company: zod.string().min(3).max(50),
  message: zod.string().min(5),
});

const aunthenticateInput = (req, res, next) => {
  if (
    !req.body.fullname ||
    !req.body.email ||
    !req.body.contact ||
    !req.body.company ||
    !req.body.message
  ) {
    res.status(400).send("All fields are required");
  }

  try {
    const parsed = formDataSchema.safeParse(req.body);
    if (parsed.success) {
      next();
    } else {
      res.status(400).send(parsed.error.errors.map((err) => err.message));
    }
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

module.exports = aunthenticateInput;
