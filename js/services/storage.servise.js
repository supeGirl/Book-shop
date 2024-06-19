'use strict'

function loadFromStorage(key){
   const valueStr= localStorage.getItem(key)
   return JSON.parse(valueStr)

}
function saveTOStorage(value){
    const valueStr = JSON.stringify(value)
    localStorage.setItem(key,valueStr)
}