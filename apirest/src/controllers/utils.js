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
  const day = String(date.getDate()).padStart(2, '0');
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

const listDateInWeekUntil  = (startDate,endDate,week)=>{
//esta funcion va a recibir una fecha de inicio y otra de fin y va a retornar todas las fechas que estan entre esas 2 fechas y que caen el dia de semana especificado

  const result = [];
  const currentDate = new Date(startDate);
  const targetDate = new Date(endDate);
  targetDate.setDate(targetDate.getDate() + 1); // Sumar 1 día a targetDate

  while (currentDate <= targetDate) {
    const dayOfWeek = ((currentDate.getDay()) % 7) + 1; // Ajuste para que 0 represente el domingo
    if (week[dayOfWeek] === 1) {
      result.push(currentDate.toISOString().split('T')[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};
const listDateInNumberUntil = (startDate, endDate, numberDay) => {
  const result = [];
  const currentDate = new Date(startDate);
  const targetDate = operateDate(new Date(endDate),+1);
  targetDate.setDate(targetDate.getDate());

  if (typeof numberDay === 'string') {
    numberDay = parseInt(numberDay);
  }

  while (currentDate <= targetDate) {
    if (currentDate.getDate() === numberDay) {
      result.push(currentDate.toISOString().split('T')[0]);
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(numberDay);
  }

  return result;
};

  const listDateInYearUntil = (startDate, endDate) => {
    const targetDate = new Date(endDate);
    let [startYear, startMonth, day] = startDate.split('-');
    const result = [];
  
    while (true) {
      const currentDate = new Date(startYear, startMonth - 1, day);
      if (currentDate > targetDate) {
        break;
      }
      
      const formattedDate = currentDate.toISOString().split('T')[0];
      result.push(formattedDate);
  
      startYear++;
    }
    return result;
  };
  
 


module.exports = {
  isExist,
  encryptText,
  hashCompare,
  createToken,
  verifyToken,
  formatDateToString,
  operateDate,
  listDateInWeekUntil,
  listDateInNumberUntil,
  listDateInYearUntil,

};
