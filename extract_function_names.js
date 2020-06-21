const { execSync } = require("child_process");
const root = execSync("npm root -g").toString().trim();
const fs = require('fs')
const YAML = require(`${root}/yaml`);
const regex = new RegExp(".*file\\((.+)/lambda_definition.yml\\)}", "i");

function extractFunctionNameFromConfig(serverlessConfig){
    let functions=''
    let delim=''
    let directories=extractLambdaDirectoriesFromConfig(serverlessConfig)
    directories.forEach(dir => {
        functionName=extractFunctionNameFromLambdaDirectory(dir);
        functions=functions+delim+functionName
        delim=','          
    });
    return functions
}

function extractLambdaDirectoriesFromConfig(fileName){
    const content = fs.readFileSync(fileName, 'utf8')
    let serverlessConfig=YAML.parse(content)
    let functions=[]
    serverlessConfig.functions.forEach(f => {
        word=extractWordByRegex(f, regex);
        functions.push(word)
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

function extractFunctionNameFromLambdaDirectory(dirName){
    const content = fs.readFileSync(`${dirName}/lambda_definition.yml`, 'utf8')
    let lambdaDefinition=YAML.parse(content)
    let functionName=Object.keys(lambdaDefinition)[0]
    return functionName
}

module.exports = {
    extractFunctionNameFromConfig,
    extractLambdaDirectoriesFromConfig,
    extractFunctionNameFromLambdaDirectory,
};

let serverlessConfig=process.argv[2];
if (serverlessConfig != null){
    let functions=extractFunctionNameFromConfig(serverlessConfig)
    process.stdout.write(functions);
}