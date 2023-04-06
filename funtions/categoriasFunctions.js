exports.createQueryString = (array) => {
    
   let query = array.map((item,index) => {
        return "$" + (++index)
    }) 
  return  query.join()
}
exports.fkOnlyArray = (array) => {
   const nomes = array.map((item) => {
        return item.pk_id
    })
    return nomes
}