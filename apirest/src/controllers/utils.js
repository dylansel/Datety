

const isExist = function(row){

  return !(row === null || Object.keys(row).length === 0)
}


module.exports = {
  isExist
}