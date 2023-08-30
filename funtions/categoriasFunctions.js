exports.createQueryString = (array) => {

  let query = array.map((item, index) => {
    return "$" + (++index)
  })
  return query.join()
}
exports.fkOnlyArray = (array) => {
  const nomes = array.map((item) => {
    return item.pk_id
  })
  return nomes
}


exports.criarStringObjetoImagensSubcategorias = (array) => {
  let string = ''
  array.forEach(element => {
    const stringElement = `{
                    nome: '${element.imagem}',
                    imagem: require('../assets/images/Icones_Subcategorias/${element.imagem}.png'),
                },
                `
    string = string + stringElement
  });
  string = `[
            ${string}
        ]
            `
  return string
}