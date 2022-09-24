import jwt from 'jsonwebtoken'
import Users from '../models/User';
require('dotenv').config()

// get user by jwt token
const getUserByToken = async (token) => {

  if (!token) {
      return res.status(401).json({ error: "Acesso negado!" });
  } 
    
  // find user
  const decoded = jwt.verify(token, process.env.APP_SECRET);

  const userId = decoded.id;

  const user = await Users.findOne({ where: { id: userId } });

  return user;

}

export default getUserByToken;