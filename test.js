let sut = require('./extract_function_names.js');

let expected="LMBJVVMTOADN,LMBJVVMTOFAMILIA,LMBJVVMETAGASTO"
let actual = sut.extractFunctionsFromFile('./test_serverless.yaml')

if (expected==actual)
    console.log("TEST PASS")
else{
    console.log("TEST FAIL:")
    console.log(`Expected ${expected}`)
    console.log(`Expected ${actual}`)
}