
function Context() {
    var values = { };
    
    this.get = function (name) {
        if (values[name] == undefined)
            return null;
            
        return values[name];
    };
    
    this.set = function (name, value) {
        values[name] = value;
    };
}

function createContext() {
    return new Context();
}

module.exports = {
    createContext: createContext
};

