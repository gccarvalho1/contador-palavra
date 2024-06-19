function filtraRepeticao(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1 )
}

function montaTextoFinal(listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraRepeticao(paragrafo).join(', ');
    if (duplicadas != 0){
        textoFinal += `
        Palavras duplicas no parágrafo ${indice + 1}: ${duplicadas}`;  
    }
})

    return textoFinal;
}

export { montaTextoFinal };