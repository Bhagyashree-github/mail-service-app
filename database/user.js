import pool from "../config/db.js";

export async function getUserData({email,website,apikey}) {
  try {
    if(email){
    const query = "SELECT apikey FROM user WHERE email=?";
    const rows = await pool.query(query, [email]);
    return rows[0];
  }else if(website){
    const query = "SELECT apikey FROM user WHERE website=?";
    const rows = await pool.query(query, [website]);
    return rows[0];
  }else if(apikey){
    const query = "SELECT * FROM user WHERE apikey=?";
    const rows = await pool.query(query, [apikey]);
    return rows[0];
  }else{
    return false;
  }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateUserData(data) {}

export async function updateUserAmount(amount, apiKey) {
  try {
    const query = "UPDATE user SET amount=? WHERE apikey = ?";
    const rows = await pool.query(query, [amount - 0.5, apiKey]);
    // console.log(rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export async function createUserData(data) {
  try {
    const query =
      "INSERT INTO `user` (`name`, `email`, `website`, `timestamp`, `apikey`, `amount`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      data.name,
      data.email,
      data.website,
      data.timestamp,
      data.apikey,
      data.amount,
    ];
    const rows = await pool.query(query, values);
    return true;
  } catch (error) {
    console.log(error);
   return false;
  }
}

export async function deleteUserData(data) {}
