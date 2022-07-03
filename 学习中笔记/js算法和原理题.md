### 1、扁平数据结构

```
const menuList = [
  {
    pid: -1,
    name: '购物车',
    id: 1,
    auth: 'cart',
  },
  {
    pid: 1,
    name: '购物车列表',
    id: 4,
    auth: 'cart-list',
  },
  {
    pid: 4,
    name: '彩票',
    id: 5,
    auth: 'lottery',
  },
  {
    pid: 4,
    name: '商品',
    id: 6,
    auth: 'product',
  },
]
// 第一种实现方式 属性
let tree = []
let shuxing = {}
getThree(menuList)
function getThree(param = []) {
  param.map((item) => {
    shuxing[item.id] = item
    shuxing[item.id].children = []
    if (item.pid === -1) {
      tree = item
    }
    if (shuxing[item.pid]) {
      shuxing[item.pid].children.push(item)
    }
  })
}
// 第二种实现方式 递归
function getThree2(param = []) {
  let root = param.filter((item) => item.pid === -1),
    children = param.filter((item) => item.pid !== -1)
  setThree22(root, children)
  return root
  function setThree22(root, children) {
    root.forEach((item) => {
      children.forEach((sutItem, subIndex) => {
        if (item.id === sutItem.pid) {
          let childrenArr = JSON.parse(JSON.stringify(children))
          childrenArr.splice(subIndex, 1)
          setThree22([sutItem], childrenArr)
          if (item.children) {
            item.children.push(sutItem)
          } else {
            item.children = [sutItem]
          }
        }
      })
    })
  }
}
// 第三种filter
function getThree3(param = []) {
  const _param = JSON.parse(JSON.stringify(param))
  return _param.filter((item) => {
    const _arr = _param.filter((subItem) => {
      return item.id === subItem.pid
    })
    _arr && _arr.length > 0 && (item.children = _arr)
    return item.pid === -1
  })
}
```

### 2、深度遍历和广度遍历的问题

```
const data = [
  {
    name: 'a',
    children: [
      { name: 'b', children: [{ name: 'e' }] },
      { name: 'c', children: [{ name: 'f' }] },
      { name: 'd', children: [{ name: 'g' }] },
    ],
  },
  {
    name: 'a2',
    children: [
      { name: 'b2', children: [{ name: 'e2' }] },
      { name: 'c2', children: [{ name: 'f2' }] },
      { name: 'd2', children: [{ name: 'g2' }] },
    ],
  },
]

// 深度遍历, 使用递归
function getName(data) {
  const result = []
  data.forEach((item) => {
    const map = (data) => {
      result.push(data.name)
      data.children && data.children.forEach((child) => map(child))
    }
    map(item)
  })
  return result.join(',')
}

// 广度遍历, 创建一个执行队列, 当队列为空的时候则结束
function getName2(data) {
  let result = []
  let queue = data
  while (queue.length > 0) {
    [...queue].forEach((child) => {
      queue.shift()
      result.push(child.name)
      child.children && queue.push(...child.children)
    })
  }
  return result.join(',')
}

console.log(getName(data))
console.log(getName2(data))
```

### 3、冒泡排序

```
const aa = [8,94,15,88,55,76,21,39]
function getSort(param = []) {
  let num = null
  for (let i = 0; i < param.length - 1; i++) {
    for (let j = 0; j < param.length - 1 - i; j++) {
      if (param[j] > param[j + 1]) {
        num = param[j]
        param[j] = param[j + 1]
        param[j + 1] = num
      }
    }
  }
  return param
}
console.log(getSort(aa))
```

- 原理 两个循环

1. 当 i=0 的时候，里面的循环完整执行，从 j=0 执行到 j=6,这也就是第一遍排序，结果是将最大的数排到了最后，这一遍循环结束后的结果应该是[8,15,88,55,76,21,39,94]
2. 当 i=1 的时候，里面的循环再次完整执行，由于最大的数已经在最后了，没有必要去比较数组的最后两项，这也是 j<arr.length-1-i 的巧妙之处，结果是[8,15,55,76,21,39,88,94]
3. 说到这里，规律就清楚了，每次将剩下数组里面最大的一个数排到最后面，当第一个循环执行到最后的时候，也就是 i=6,此时，j=0,只需要比较数组的第一和第二项，比较完毕，返回。

### 4、快排

```
const aa = [1, 2, 44, 11, 232, 23]
const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr //结束
  }
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0] // 取出这个数据
  let left = []
  let right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))// 递归
}
console.log(quickSort(aa))
```

### 5、最长子序列问题(合唱队)

```
// 牛客 https://www.nowcoder.com/practice/6d9d69e3898f45169a441632b325c7b4?tpId=37&&tqId=21247&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking
const line = Number(readline());
let  arr = readline() ;
let newArr = arr.split(' ')
let dp =[];// 容器
for(let i=0;i<newArr.length;i++){
    dp[i]=1;
}
let res = 0;
for(let i=1;i<newArr.length;i++){
    for(let j=0;j<i;j++){
        if(i==7){
            console.log('-dp-i00-',j,i,newArr[j],newArr[i])
        }
        if(newArr[j]<newArr[i]){
            dp[i] = Math.max(dp[i],dp[j]+1)  // dp[i]代表第i个位置上升子序列中元素的长度
            if(i==7){
                console.log('-dp-i-',newArr[i],dp[i],i)
            }
        }
    }
    res = Math.max(res,dp[i])
}
console.log(dp)
console.log(res)
```

### 6、手写-实现一个对象的 flatten 方法（阿里）

```
const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 }
  },
  b: [1, 3, { a: 2, b: 3 }, [1, 2]],
  c: 3
};
// 整体用的递归，通过对对象和数组的不同处理
let flattenObj = {};
function flatten(obj = {}, pre) {
  if (typeof obj === 'object' && !Array.isArray(obj)) {// 是对象，而不是数组
    for (let key in obj) {
      if (typeof obj[key] !== 'object') {
        flattenObj[`${pre ? pre + '.' : ''}${key || ''}`] = obj[key];
      } else {
        const pre1 = pre ? `${pre}.${key}` : key;
        flatten(obj[key || ''], pre1);
      }
    }
  } else if (Array.isArray(obj)) { // 数组的处理
    console.log('flatten ', obj, pre);
    obj.forEach((item, index) => {
      const pre1 = `${pre}[${index}]`;
      if (typeof item === 'object') {
        flatten(item, pre1);
      } else {
        flattenObj[`${pre1}`] = item;
      }
    });
  }
  return flattenObj;
}
// 结果
console.log(flatten(obj));
//  {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3,
//   'b[3][0]': 1,
//   'b[3][1]': 2,
//   c: 3
// }
```

### 7、手写-判断括号字符串是否有效（小米））

```
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足： 左括号必须用相同类型的右括号闭合。 左括号必须以正确的顺序闭合。
示例 1： 输入：s = "()" 输出：true
示例 2： 输入：s = "()[]{}" 输出：true
示例 3： 输入：s = "(]" 输出：false
```

**从内部比较的这种思路，值得学习**

```
function isValid1(markWord) {
  const markArr = markWord.split('');
  if (markArr.length % 2 === 1) {
    return false;
  }
  const obj = { '{': '}', '[': ']', '(': ')' };
  let stack=[];
  for (let i = 0; i <markArr.length; i++) {
    const item = markArr[i];
    if(['{',"[","("].includes(item) ){
      stack.push(item);
    }else{
      const pop1 = stack.pop();
      if(item!==obj[pop1]){
        return false;
      }
    }
  }
  if(stack.length){
   return false;
  }
return true;
}

const s = '[{]()}';
console.log(isValid1(s))
```

### 8、手写-查找数组公共前缀（美团）

```
// 我自己的做法，用了三个for循环
function getMaxLength(markWord = []) {
  let maxWords = [];
  markWord.forEach(item => {
    const itemArr = item.split('');
    maxWords.push(itemArr);
  });
  let commonWord = [];
  maxWords[0].forEach((item, index) => {
      if (isWord(maxWords, index, item)) {
        commonWord.push(item);
      }
  });
  return commonWord;
}
function isWord(maxWords = [], index, item) {
  for (let i = 0; i < maxWords.length; i++) {
    if (item !== maxWords[i][index]) {
      return false;
    }
  }
  return true;
}
const strs = ["cdog","cdracecar","cdar"]
console.log(getMaxLength(strs)); // c d
```

```
function getMaxLength(markWord = []) {
  let str = markWord[0];
  let index = 0,
    words,
    isGo = true;
  while (index < str.length && isGo) {
    words = str.slice(0, index);
    isGo = isComment(markWord, words);
    if (!isGo) {
      words = words.slice(0, index - 1);
    }
    index = index + 1;
  }
  return words;
}
function isComment(markWord = [], words) {
  for (let i = 0; i < markWord.length; i++) {
    if (!markWord[i].startsWith(words)) {
      return false;
    }
  }
  return true;
}

const strs = ['1cdog', '2cdoracecar', '3cdoar'];
console.log(getMaxLength(strs));
```

### 9、手写-字符串最长的不重复子串 (自己没有做出来，网上参考的)

```
const lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }
  let left = 0;
  let right = 1;
  let maxString = '';
  while (right <= s.length) {
    let lr = s.slice(left, right);
    const index = lr.indexOf(s[right]);
    if (index > -1) {
      left = index + left + 1;
    } else {
      lr = s.slice(left, right + 1);
      if (lr.length > maxString.length) {
        maxString = lr;
      }
    }
    right++;
  }
  return [maxString.length, maxString];
};

const strs = 'aabcbbc';
console.log(lengthOfLongestSubstring(strs));
```

### 10、输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如 180 的质因子为 2 2 3 3 5 ）最后一个数后面也要有空格

```
function getPreGens(a)
{
    var arr = [];
    var n = Math.floor(a/2)+ 1;//
    var t = n;//
    var i;
    while(true)
    {
        if(i==t)
        {
            arr.push(a);
            break;// 停止while 循环
        }
        for(i=2; i<t; i++)
        {
            if(a%i == 0)
            {
                arr.push(i);
                a = a/i;
                t = Math.floor(a/2 )+ 1;
                break;// 停止for 循环
            }
        }
    }
    return arr;
}

console.log(getPreGens(180));//2,2,3,3,5
```
