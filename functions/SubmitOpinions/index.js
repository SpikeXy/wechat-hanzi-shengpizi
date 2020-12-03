
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 1. 获取数据库引用
const db = cloud.database();
const _ = db.command;


cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  const { OPENID, APPID, UNIONID } = cloud.getWXContext()
  var inputStr = event.input.toString();

  await db.collection('UserOpinions').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      UserOpenId: OPENID,
      UnionId: UNIONID,
      Opinions: inputStr,
      Date: new Date(),

    }
  })
    .then(res => {
      // console.log(res)
    })
    .catch(res => {
      console.error
    })


  return true;
}