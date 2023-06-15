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


const listDateInWeekUntil  = (startDate,endDate,week)=>{
//esta funcion va a recibir una fecha de inicio y otra de fin y va a retornar todas las fechas que estan entre esas 2 fechas y que caen el dia de semana especificado

  const result = [];
  const currentDate = new Date(startDate);
  const targetDate = new Date(endDate);
  targetDate.setDate(targetDate.getDate() + 1); // Sumar 1 día a targetDate

  while (currentDate <= targetDate) {
    const dayOfWeek = (currentDate.getDay()) % 7; // Ajuste para que 0 represente el domingo
    if (week[dayOfWeek] === 1) {
      result.push(currentDate.toISOString().split('T')[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};





module.exports = {
  isExist,
  encryptText,
  hashCompare,
  createToken,
  verifyToken,
  listDateInWeekUntil,
};
