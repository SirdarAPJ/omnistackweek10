module.exports = function parseStringToArray(array) {
    return array.split(',').map(a => a.trim());
}