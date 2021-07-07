const filterProperties = (obj) => {
    let newObject = {}
    Object.keys(obj).forEach(key => {
        if (obj[key] !== '') newObject[key] = obj[key];
    })
    return newObject;
}

module.exports = filterProperties