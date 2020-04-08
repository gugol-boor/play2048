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
*/

let wrap = document.getElementById('wrap');
// 获取每一个格子
let obox = wrap.getElementsByTagName('div');
// 给每一个格子添加下标
for (let i = 0; i < obox.length; i++) {
  obox[i].setAttribute('index', i)
  obox[i].setAttribute('value', 0)
}
// 模拟数组
let arr = [
  [2, 4, 0, 2],
  [2, 4, 2, 2],
  [4, 0, 0, 2],
  [0, 2, 0, 0]
];


function toleft(arr) {
  let newarr = []
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
        newarr.push(arr[i] + arr[j])
        i = j
      } else {// d1!==d2
        newarr.push(arr[i])
      }
    }
  }
  // 新数组比原有数组少几个数我们push几个0进去，保证长度为4
  var zero = arr.length - newarr.length
  for (var i = 0; i < zero; i++) {
    newarr.push(0)
  }
  return newarr
}
// console.log(toleft(arr));




document.onkeydown = function (e) {
  console.log(e.keyCode);
  // W:87 A:65 S:83 D:68
  switch (e.keyCode) {
    case 65:
      // 向左移动
      console.log(toleft(arr[1]));

      break
    case 68:
      // 向右移动
      break
    case 87:
      // 向上移动
      break;
    case 83:
      // 向下移动
      break
  }

}