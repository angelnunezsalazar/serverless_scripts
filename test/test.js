let sut = require('../extract_function_names.js');

function assert(name,expected,actual){
    if (expected==actual)
        console.log(`${name}: TEST PASS`)
    else{
        console.log(`${name}: TEST FAIL:`)
        console.log(`Expected ${expected}`)
        console.log(`Expected ${actual}`)
    }
}

function test_extractLambdaDirectoriesFromConfig(){
    let expected="LMBJVVOBTCLIENTE,LMBJVVCUMULOS,LMBJVVWATCHLIST"
    let actual = sut.extractLambdaDirectoriesFromConfig('./serverless.yaml')
    assert('extractLambdaDirectoriesFromConfig',expected,actual)
}

function test_extractFunctionNameFromLambdaDirectory(){
    let expected="getObtCliente"
    let actual=sut.extractFunctionNameFromLambdaDirectory('LMBJVVOBTCLIENTE')
    assert('extractFunctionNameFromLambdaDirectory',expected,actual)
}

function test_extractFunctionNameFromConfig(){
    let expected="getObtCliente,getCumulus,getWatchList"
    let actual=sut.extractFunctionNameFromConfig('./serverless.yaml')
    assert('extractFunctionNameFromConfig',expected,actual)
}

test_extractLambdaDirectoriesFromConfig()
test_extractFunctionNameFromLambdaDirectory()
test_extractFunctionNameFromConfig()