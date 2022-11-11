
export function getVariableName<TResult>(name: () => TResult) {
    var varExtractor = new RegExp("return (.*);");
    var m = varExtractor.exec(name + "");
    if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
    return m[1];
}

var foo = "";
console.log(getVariableName(() => foo));