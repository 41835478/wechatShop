var app      = getApp();

var pageData = {
  data: {
    "user_center1":{
      "type":"user-center",
      "style":"opacity:1;color:rgb(255, 255, 255);margin-top:page10000;font-size:37.5rpx;height:972.65625rpx;margin-left:auto;",
      "content":"",
      "customFeature":{
        "mode":1,
        "with-horizontal":true
      },
      "animations":[],
      "page_form":"",
      "compId":"user_center1",
      "parentCompid":"user_center1"
    },
    "userInfo": {
      "cover_thumb": "http://img.zhichiwangluo.com/zc_app_default_photo.png",
    },
    "contact":{
      "image": "http://img.weiye.me/zcimgdir/album/file_58e75ee7ebf23.png",
      "eventParams": "{\"phone_num\":\"0755-66606955\"}",
      "eventHandler": "tapPhoneCallHandler",
      "text": "联系我们",
      "style": "width:750rpx;height:103.125rpx;background-color:rgb(255, 255, 255);box-shadow:rgb(0, 0, 0) page10000 page10000 5;margin-bottom:auto;margin-right:auto;margin-top:23.4375rpx;opacity:1;margin-left:auto;",
      "img_style": "opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:42.1875rpx;width:42.1875rpx;margin-left:page10000;margin-right:page10000;margin-top:page10000;position:absolute;left:23.4375rpx;top:30.46875rpx;",
      "text_style": "background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:30.46875rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:page10000;margin-top:page10000;opacity:1;text-align:left;position:absolute;left:86.71875rpx;top:30.46875rpx;margin-right:page10000;",
    },
    "has_tabbar":1,
    "page_hidden":true,
    "page_form":"",
    "top_nav":{"navigationBarBackgroundColor":"#000000","navigationBarTextStyle":"white","navigationBarTitleText":"\u6211\u7684"}
  },
  need_login: false,
  page_router: 'user',
  page_form: 'none',
  onLoad: function (e) {
    //app.onPageLoad(e);
  },
  dataInitial: function () {
    app.pageDataInitial();
  },
  onShow: function () {
    //app.onPageShow();
  },
  showAddress: function() {
    wx.navigateTo({
      url: '/pages/myAddress/myAddress'
    });
  },
  showOrder: function () {
    console.log('2222');
    wx.switchTab({
      url: '/pages/myOrder/myOrder',
    });
  },
  userCenterTurnToPage: function (e) {
    app.userCenterTurnToPage(e);
  },
};
Page(pageData);
