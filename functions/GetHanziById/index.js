// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 1. 获取数据库引用
const db = cloud.database();
const _ = db.command;


// 云函数入口函数
exports.main = async(event, context) => {
  // const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }




  var id = event.id;
  var hanziEntity = {};
  hanziEntity = await db.collection('HanZiDataBase')
    .where({
      Id: id
    })
    .field({
      BiHuaOriginal: true,
      // BiHuaSimple: true,
      BihuaNumbers: true,
      BuShou: true,
      FanQie: true,
      ImageFileKey: true,
      JiBenJieShi: true,
      KangXiZiDian: true,
      NewBiHuaDigit: true,
      PinYin: true,
      ShuoWenJieZi: true,
      SongBenGuangYun: true,
      ZiDianChuChu: true,
      // ZiTiJieGou: true,
      UnicodeNumber: true,
    })
    .get()
    .then(res => {
      hanziEntity.BiHuaOriginal = res.data[0].BiHuaOriginal;
      // BiHuaSimple是
      // hanziEntity.BiHuaSimple = res.data[0].BiHuaSimple;
      hanziEntity.BihuaNumbers = res.data[0].BihuaNumbers;
      hanziEntity.BuShou = res.data[0].BuShou;
      hanziEntity.FanQie = res.data[0].FanQie;
      hanziEntity.ImageFileKey = res.data[0].ImageFileKey;
      hanziEntity.JiBenJieShi = res.data[0].JiBenJieShi;
      //对基本解释进行字符串处理
      if (hanziEntity.JiBenJieShi != "" && hanziEntity.JiBenJieShi != null && hanziEntity.JiBenJieShi.indexOf("&") > 0) {
        hanziEntity.JiBenJieShi = res.data[0].JiBenJieShi.substr(0, res.data[0].JiBenJieShi.indexOf("&"));
      }
      hanziEntity.KangXiZiDian = res.data[0].KangXiZiDian;
      hanziEntity.NewBiHuaDigit = res.data[0].NewBiHuaDigit;
      hanziEntity.PinYin = res.data[0].PinYin;
      hanziEntity.ShuoWenJieZi = res.data[0].ShuoWenJieZi;
      hanziEntity.SongBenGuangYun = res.data[0].SongBenGuangYun;
      hanziEntity.ZiDianChuChu = res.data[0].ZiDianChuChu;
      // hanziEntity.ZiTiJieGou = res.data[0].ZiTiJieGou;
      hanziEntity.UnicodeNumber = res.data[0].UnicodeNumber;
      return hanziEntity;
    });
  hanziEntity = await db.collection("Hanzi_JianZiBiao").where({
      NewUniCodeNumber: hanziEntity.UnicodeNumber
    })
    .field({
      BuJianXuImage: true,
      BuJianXuImage2: true,
      ChuXiWenZiImage: true,
      JiaGuWenImage: true,
      JinWenImage: true,
      XiaoZhuanImage: true,
      ZiGenXuImage: true,
      ZiGenXuImage2: true,
      ZiGenZuImage: true,
      ZiGenZuImage2: true,
      GuangYunSuoYin: true,
      '中文大辞典索引': true,
      '中文大辞典部首': true,
      '仓颉': true,
      '康熙字典索引': true,
      '建宏汉语大字典': true,
      '汉语大字典': true,
      //'組字字数': true,
      '远东汉语大字典': true,
      //'部首笔画排序': true,
      '广韵索引': true,
      '字源': true,
      '小篆类别': true,
    })
    .get()
    .then(res => {
      hanziEntity.BuJianXuImage =  res.data[0].BuJianXuImage;
      hanziEntity.BuJianXuImage2 = res.data[0].BuJianXuImage2;
      hanziEntity.ChuXiWenZiImage = res.data[0].ChuXiWenZiImage;
      hanziEntity.JiaGuWenImage = res.data[0].JiaGuWenImage;
      hanziEntity.JinWenImage = res.data[0].JinWenImage;
      hanziEntity.XiaoZhuanImage = res.data[0].XiaoZhuanImage;
      hanziEntity.ZiGenXuImage =  res.data[0].ZiGenXuImage;
      hanziEntity.ZiGenXuImage2 = res.data[0].ZiGenXuImage2;
      hanziEntity.ZiGenZuImage = res.data[0].ZiGenZuImage;
      hanziEntity.ZiGenZuImage2 = res.data[0].ZiGenZuImage2;
      hanziEntity.ZhongWenDaCiDianSuoYin = res.data[0].中文大辞典索引;
      hanziEntity.ZhongWenDaCiDianBuShou = res.data[0].中文大辞典部首;
      hanziEntity.CangJie = res.data[0].仓颉;
      hanziEntity.KangXiZiDianSuoYin = res.data[0].康熙字典索引;
      hanziEntity.JianHongHanYuDaZiDian = res.data[0].建宏汉语大字典;
      hanziEntity.HanYuDaZiDian = res.data[0].汉语大字典;
      //hanziEntity.XuZiZiShu = res.data[0].組字字数;
      hanziEntity.YuDongHanYuDaZiDian = res.data[0].远东汉语大字典;
      // hanziEntity.BuShouBiHuaPaiXu = res.data[0].部首笔画排序;
      hanziEntity.GuangYunSuoYin = res.data[0].广韵索引;
      hanziEntity.ZiYuanInt = res.data[0].字源;
      hanziEntity.XiaoZhuanLeiBieInt = res.data[0].小篆类别;
      return hanziEntity;
    });



  //查字源
  hanziEntity = await db.collection("Hanzi_ZiYuanBiao").where({
      编号: hanziEntity.ZiYuanInt
  }).field({
      '字源': true
    })
    .get()
    .then(res => {
      hanziEntity.ZiYuan = res.data[0].字源;
      return hanziEntity;
    });

  //这个暂时不知道有啥用，取消这个字段
  //查小篆类别
  hanziEntity.XiaoZhuanLeiBie = "";
  //这个暂时不知道怎么查，取消这个字段
  //查小篆类别
  //查金文的器名
  hanziEntity.JinWenQiMingImage = "";
  //这个暂时不知道怎么查，取消这个字段
  //查小篆类别
  //查金文的器名
  //查异体字
  hanziEntity.YiTiZiImage = [];
  //这个暂时不知道怎么查，取消这个字段
  //查小篆类别
  //查金文的器名
  //查异写字
  hanziEntity.YiXieZiImage = [];
  //这个暂时不知道怎么查，取消这个字段
  //查小篆类别
  //查金文的器名
  return hanziEntity;

}