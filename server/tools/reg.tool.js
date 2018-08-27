const _l = require('lodash');

let removeNaN = function(str){
  let standardNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '千', '百', '万', '亿'];
  if(typeof str === 'string'){
    let strArray = str.split("");
    for(let i=0; i<strArray.length; i++){
      if(!_l.some(standardNum, strArray[i])){
        strArray[i] = '';
      }
    }
    return strArray.join('');
  }else{
    console.log('你传给removeNaN的参数格式错误，不是一个string！');
    return '';
  }
};

module.exports = {
  removeNaN
};