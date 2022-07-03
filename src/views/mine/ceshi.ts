const element = document.createElement('div');
element.innerHTML = 'http://localhost:8001';
export default element;

import(
  /* webpackChunkName: 'element' */
  /* webpackPrefetch: true */
  '../mine/ceshi'
).then(async (res: any) => {
  console.log('-ceshi-', res);
  // if(data.age%2===0){
  //   document.body.appendChild(res.default)
  // }else{
  //   document.body.removeChild(res.default)
  // }
});
