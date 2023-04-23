const bcrypt = require('bcryptjs');

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
}

// Función para comparar un texto con un hash cifrado con bcrypt
const hashCompare = async (text, hash) =>{
  console.log(`text:"${text}"`);
  console.log(`hash:"${hash}"`);
  const compare = await bcrypt.compare(text, hash);
  console.log(compare)
  return compare;
} 
    


const isExist = function(row){

  return !(row === null || Object.keys(row).length === 0)
}


module.exports = {
  isExist,
  encryptText,
  hashCompare

}