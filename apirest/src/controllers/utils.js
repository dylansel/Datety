const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función para cifrar texto con bcrypt
const encryptText = async (text) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedText = await bcrypt.hash(text, salt);
    return encryptedText;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cifrar el texto");
  }
};

// Función para comparar un texto con un hash cifrado con bcrypt
const hashCompare = async (text, hash) => {
  const compare = await bcrypt.compare(text, hash);
  return compare;
};

//JWT Funtions
const createToken = (user) => {
  const token = jwt.sign({ idUser: user.idUser }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  return token;
};

const verifyToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (err) {
    return null;
  }
};

const isExist = function (row) {
  return !(row === null || Object.keys(row).length === 0);
};



function formatDateToString(date, format = 'YYYY-MM-DD') {
  
 
  const year = date.getFullYear();
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1).padStart(2, '0');

  const formattedDate = format
    .replace('YYYY', year)
    .replace('DD', day)
    .replace('MM', month);

  return formattedDate;
}

function operateDate(date, days){
  return  new Date(date.setDate(date.getDate() + days));
}

module.exports = {
  isExist,
  encryptText,
  hashCompare,
  createToken,
  verifyToken,
  formatDateToString,
  operateDate,
  
};
