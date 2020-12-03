// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 1. 获取数据库引用
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context) => {
  // var inputStr = "山禾女鬼";
  var inputStr = event.input.toString();
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。
  //API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据
  //1.将输入的字符串转为int32的字符串


  var unicodeNumberArr = new Array();

  for (var i = 0; i < inputStr.length; i++) {
    unicodeNumberArr[i] = inputStr[i].charCodeAt(0);
  }

  var res = await db.collection('HanZiDataBase')
    .where({
      UnicodeNumber: _.in(unicodeNumberArr)
    })
    .field({
      Id: true,
      BiHuaDigit: true,
      UnicodeNumber: true,
      UniCode: true,
      NewBiHuaDigit: true
    })
    .get()
    .then(res => {
      return res;
    });
  var realData ;
  if (res.data != null && res.data.length != 0) {
    //2.在haiziRelation中查找符合包含的字符串
    var biHuaArr = new Array();
    //2.1按照输入字符串的顺序拼接这个数组
    for (var i = 0; i < unicodeNumberArr.length; i++) {
      var unicodeNumberTemp = unicodeNumberArr[i].BiHuaDigit;
      for (var j = 0; j < res.data.length; j++) {
        if (res.data[j].UnicodeNumber == unicodeNumberArr[i]) {
          biHuaArr.push(res.data[j].BiHuaDigit);
        }
      }
    }
    //3 开始搜索根据拼接后的笔画顺序搜索字符串
    //3.1完全匹配
    var bihuaStr = biHuaArr.join('[1-5]*');
    realData = await db.collection("HanZiDataBase").where({
        NewBiHuaDigit: db.RegExp({
          regexp: bihuaStr,
          options: 'i',
        })
      })
      .field({
        Id:true,
        PinYin: true,
        BuShou: true,
        ImageFileKey: true,
      })
      .get()
      .then(reso => {
        //3直接返回搜索匹配的结果
        return reso;
      })
    
  } 
  return realData;

}