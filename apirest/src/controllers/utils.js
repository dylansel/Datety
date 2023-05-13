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

module.exports = {
  isExist,
  encryptText,
  hashCompare,
  createToken,
  verifyToken,
};
