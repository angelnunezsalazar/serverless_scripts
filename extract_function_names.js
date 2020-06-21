const { execSync } = require("child_process");
const root = execSync("npm root -g").toString().trim();
const fs = require('fs')
const YAML = require(`${root}/yaml`);
const regex = new RegExp(".*file\\((.+)/lambda_definition.yml\\)}", "i");

function extractFunctionsFromFile(fileName){
    const content = fs.readFileSync(fileName, 'utf8')
    let serverless=YAML.parse(content)
    let functions=''
    let delim=''
    serverless.functions.forEach(f => {
        word=extractWordByRegex(f, regex);
        functions=functions+delim+word
        delim=','
    });
    return functions;
}

function extractWordByRegex(narration,regex) {
    let match = narration.match(regex);
    if(!match){
        throw new Error(`${narration} doesn't match Regex`);
    }
    word = match[1];
    return word;
}

module.exports = {
    extractFunctionsFromFile
};

let fileName=process.argv[2];
if (fileName != null){
    let functions=extractFunctionsFromFile(fileName)
    console.log(functions)
}
