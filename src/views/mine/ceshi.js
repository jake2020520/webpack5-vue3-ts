// 将node的api 快速的转化成 promise的形式
// 函数

function curing(param1) {
  return function (param2) {
     return function (param3){
       return function (){
         return param1+param2+param3
       }
     }
  }
}
console.log('--',curing(1)(2)(3)())
curing(1)(2)(3)