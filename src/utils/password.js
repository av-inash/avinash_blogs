import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()




export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};




export const comparePassword = async (plainTextPassword, hashedPassword) => {
    try {
      let password =  await bcrypt.compare(plainTextPassword, hashedPassword);
      return password
    } catch (error) {
      console.log(error);
      return false;
    }
};