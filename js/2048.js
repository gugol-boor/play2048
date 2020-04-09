/* 
思路：
1.给每个格子添加下标
2.监听键盘事件document.onkeydown，当键盘按下触发对应事件
3.先只考虑一行的功能实现,把这一行代码的数字组成一个数组进行操作，如果是空白的用0表示，如下：
let arr=[2,0,4,2]
先判断第一项==0??
第一项!=0：
  排查第二项==0?,如果第二项==0就排查第三项直到出现非0数的那项（用第n项表示）
    第一项==第n项:数字相加push到新数组然后开始比较n后面两项
    第一项!=第n项:第一项push到新数组比较第n项和n+1项数字
    以此类推
第一项=0：
  同理一直排查出两项不为0的比较
    如果相同：相加然后push到一个新数组中
    如果不同：把前面那项push到新数组中比较后面的
    以此类推
得出新数组后有可能length不足4;我们自动在后面添加项
判断游戏结束：当页面空白格子为0，且所有格子都不能继续合并时游戏失败
*/

let wrap = document.getElementById('wrap');
// 获取每一个格子
let obox = wrap.getElementsByTagName('div');
// 模拟数组
// let arr = [
//   [2, 4, 0, 2],
//   [2, 4, 2, 2],
//   [4, 0, 0, 2],
//   [0, 2, 0, 0]
// ];

// 初始化：在格子中随机生成一个数a
(function init(){
  let n = Math.floor(Math.random() * obox.length)
  obox[n].className='num2';
  obox[n].setAttribute('value',2)
})()

// 核心算法
function toMove(arr) {
  let newArr = []
  for (var i = 0; i < arr.length; i++) {
    //d1!==0
    if (arr[i] !== 0) {
      //取当前值后面那位
      for (var j = i + 1; j < arr.length; j++) {
        // 确保后面那位不是0再和前面的比较
        if (arr[j] !== 0) {
          break;
        }
      }
      //d1==d2
      if (arr[i] === arr[j]) {
        newArr.push(arr[i] + arr[j])
        i = j
      } else {// d1!==d2
        newArr.push(arr[i])
      }
    }
  }
  // 新数组比原有数组少几个数我们push几个0进去，保证长度为4
  var zero = arr.length - newArr.length
  for (var i = 0; i < zero; i++) {
    newArr.push(0)
  }
  return newArr
}

function run(arr) {
  // 获取每一排数组的集合
  let val = [
    Number(obox[arr[0]].getAttribute('value')),
    Number(obox[arr[1]].getAttribute('value')),
    Number(obox[arr[2]].getAttribute('value')),
    Number(obox[arr[3]].getAttribute('value'))
  ]
  // console.log(val);
  // 得到计算后的数组
  var newVal = toMove(val)
  // 把计算后数组里的数字添加到value中并且同步class
  for (var i = 0; i < arr.length; i++) {
    obox[arr[i]].setAttribute('value', newVal[i])
    obox[arr[i]].className = "num" + obox[arr[i]].getAttribute('value')
  }
}
// 移动过后给空白页随机添加数字2
function addZero() {
  var nullArr = []
  // 把所有空白的格子下标添加到新数组中
  for (var i = 0; i < obox.length; i++) {
    if (obox[i].getAttribute('value') === '0') {
      nullArr.push(i)
    }
  }
  // 新数组随机生成一个下标
  var n = Math.floor(Math.random() * nullArr.length)
  // console.log(n);
  // 当新数组有值时随机给空白盒子添加class和value
  if (nullArr.length !== 0) {
    obox[nullArr[n]].className = "num2"
    obox[nullArr[n]].setAttribute('value', 2)
  }
}
document.onkeydown = function (e) {
  // console.log(e.keyCode);
  // W:87 A:65 S:83 D:68
  switch (e.keyCode) {

    // 向左移动
    case 65:
      // 第一排
      run([0, 1, 2, 3])
      // 第二排
      run([4, 5, 6, 7])
      // 第三排
      run([8, 9, 10, 11])
      // 第四排
      run([12, 13, 14, 15])
      addZero()
      break

    // 向右移动
    case 68:
      // 第一排
      run([3, 2, 1, 0])
      // 第二排
      run([7, 6, 5, 4])
      // 第三排
      run([11, 10, 9, 8])
      // 第四排
      run([15, 14, 13, 12])
      addZero()
      break

    // 向上移动
    case 87:
      // 第一列
      run([0, 4, 8, 12])
      // 第二列
      run([1, 5, 9, 13])
      // 第三列
      run([2, 6, 10, 14])
      // 第四列a
      run([3, 7, 11, 15])
      addZero()
      break;

    // 向下移动
    case 83:
      // 第一列
      run([12, 8, 4, 0])
      // 第二列
      run([13, 9, 5, 1])
      // 第三列
      run([14, 10, 6, 2])
      // 第四列
      run([15, 11, 7, 3])
      addZero()
      break
  }
}