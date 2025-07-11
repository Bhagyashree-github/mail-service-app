import { getUserData, createUserData } from "../database/user.js";
import { sendOriginalMail } from "./mailcontroller.js";


export async function signup(req, res) {
  //{name,email,website};
  let data = req.body;
  const userData = getUserData({website:data.website});
  console.log(userData);
  if(userData) return res.status(400).send("webside already mapped.");
  
  data.timestamp = Date.now();
  data = {
    ...data,
    timestamp: Date.now(),
    apikey: btoa(`${data.name}-${data.website}-${data.timestamp}`),
    amount: 50,
  };

  const dbRes = await createUserData(data);
  if(dbRes){
    res.json({
      apikey: data.apikey,
      message: "Send this api key in header as 'api-key' to send email.",
    });
  }else{
    res.status(500).json({status:'failure',message:'Internal Server Error.'});
  }
}



export async function forgotApiKey(req, res) {
  const dbRes = await getUserData({email:req.params.email});
// console.log(dbRes);

  if(dbRes){
    //send mail;
    sendOriginalMail({
      email:req.params.email,
      subject:"API KEY for Mail Server.",
      content:`Your api-key is : ${dbRes[0].apikey}`
    });
    res.status(200).send("Your API Key send succeessfully, please use this api key in header as 'api-key' to send email.");
  }else{
    res.status(500).json({status:'failure',message:'Internal Server Error.'});
  }

  
}
