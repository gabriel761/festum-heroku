
exports.caixaAlta =  (string) => {
    var ignorar = ["das", "dos", "e", "é", "do", "da", "de"];
    return String(string).replace(/([^A-zÀ-ú]?)([A-zÀ-ú]+)/g, function(match, separator, word) {
        if (ignorar.indexOf(word) != -1) return separator + word;
        return separator + word.charAt(0).toUpperCase() + word.slice(1);
    });
}

