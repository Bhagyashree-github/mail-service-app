import { updateUserAmount,getUserData } from "../database/user.js";
import pool from "../config/db.js";
import mailer from "../config/mailConfig.js";




export async function sendMail(req, res) {
  let data = req.body;
  const apiKey = req.headers["api-key"];
  
  // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = req.get("host");
  // console.log("Sender URL:", fullUrl);
  let userData = await getUserData({apikey:apiKey});
  userData = userData[0];

  if (!userData) {
    return res.status(400).send("Invalid Api key.");
  }

  if (userData.website !== url) {
    return res.status(401).send("Unauthorized Request URL.");
  }

  if (!checkAmount(userData.amount)) {
    return res.status(400).send("Insufficient Balance.");
  }

  updateUserAmount(userData.amount, userData.apikey);
  let datafom = sendOriginalMail(data,res);
  
  
}



// async function getUserData(apiKey) {
//   try {
//     const query = "SELECT * FROM user WHERE apiKey = ?";
//     const rows = await pool.query(query, [apiKey]);
//     // console.log(rows[0]);

//     return rows[0];
//   } catch (error) {
//     console.log(error);

//     return null;
//   }
// }

function checkAmount(amount) {
  const perMailAmnt = 0.5;
  if (amount <= 0) {
    return false;
  }
  if (amount - perMailAmnt > 0) {
    return true;
  }
  return false;
}

export function sendOriginalMail(data,res=null) {
  try {
    mailer.sendMail({
      email: data.email,
      subject: data.subject,
      content: data.content,
    },(response)=>{
      // console.log(response);
      if(res){
        res.status(200).json(response);
      }
      
    });
  } catch (error) {
    console.log(error);
  }

}
