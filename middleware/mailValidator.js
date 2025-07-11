export function checkSignupData(req, res, next) {
  const { name, email, website } = req.body;
  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const websiteRegex =
    /^((localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/\S*)?$/;
console.log(typeof name);

  console.log(nameRegex.test(name));
  
  if (name==undefined || !nameRegex.test(name) || (name?.length < 3 || name?.length >= 30 )) {
    res.status(400).send("Invalid Name.");
  } else if (!emailRegex.test(email)) {
    res.status(400).send("Invalid Email Id.");
  } else if (!websiteRegex.test(website)) {
    res.status(400).send("Invalid Email Id.");
  } else {
    // next();
  }
}
