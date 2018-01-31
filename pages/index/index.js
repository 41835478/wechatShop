var app      = getApp();

var pageData = {
  data: {
    "suspension": {
      "type": "suspension",
      "style": "opacity:1;color:#fff;font-size:46.875rpx;margin-left:auto;",
      "list_style": "margin-bottom:2.34375rpx;background-color:rgba(0,0,0,0.5);margin-left:auto;",
      "suspension_bottom": 20
    },
    "hasMore": 1,
    "has_tabbar": 1,
    "page_num": 1,
    "page_loading": false,
    "carousel1":{
      "type":"carousel",
      "style":"height:482.8125rpx;margin-left:auto;margin-right:auto;margin-top:0;opacity:1;",
      "content":[
        {
          "customFeature":{
            "action":"goods-trade",
            "goods-id":"1018983",
            "goods-name":"\u5988\u5988\u7269\u8bed"
          },
          "pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58ef16b51c4bd.jpg",
          "itemIndex":0,
          "eventParams":"{\"goods_id\":\"1018983\",\"goods_type\":null}",
          "eventHandler":"tapGoodsTradeHandler"
        },
        {
          "customFeature":{
            "action":"community",
            "community-id":"516",
            "community-name":" \u5988\u5988\u6d3e"
          },
          "pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58f6fb921bce4.jpg",
          "itemIndex":1,
          "eventParams":"{\"community_id\":\"516\"}","eventHandler":"tapCommunityHandler"
        }
      ],
      "customFeature":{"autoplay":true,"interval":3},
      "animations":[],
      "page_form":"",
      "compId":"carousel1"
    },

    "free_vessel2":{
      "type":"free-vessel",
      "style":"width:750rpx;height:93.75rpx;background-color:rgba(0, 0, 0, 0);margin-bottom:auto;margin-right:auto;margin-top:-93.75rpx;opacity:1;margin-left:auto;",
      "content":[
        {
          "type":"picture",
          "style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:70.3125rpx;width:637.5rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:56.25rpx;top:9.375rpx;right:auto;",
          "content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58ef19333c814.png"
        }
      ],
      "itemIndex":"free_vessel2",
      "eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10009\\\/page10009\",\"is_redirect\":0}",
      "eventHandler":"tapInnerLinkHandler"
    },
    
    "album3":{
      "style":"background-color:rgb(250, 250, 250);color:rgb(102, 102, 102);font-size:23.4375rpx;opacity:1;text-align:center;margin-left:auto;",
      "ul_style":"padding-left:72.65625rpx;padding-top:7.03125rpx;margin-left:auto;",
      "html_mode":"sec-mode",
      "li":[
        {
          "action":"inner-link",
          "li_class":"album-pic router",
          "pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58ef1b07817ed.jpg",
          "title":"\u6700\u65b0\u63a8\u8350",
          "router":"page10006",
          "li_style":"width:96.6796875rpx;margin-right:72.65625rpx;margin-bottom:7.03125rpx;margin-left:auto;",                                "img_style":"height:93.75rpx;margin-left:auto;",
          "eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10006\\\/page10006\",\"is_redirect\":0}",                                     "eventHandler":"tapInnerLinkHandler"
        },
        {
          "action":"inner-link",
          "li_class":"album-pic router",
          "pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58ef1b078974e.jpg",
          "title":"\u70ed\u95e8\u83dc\u8c31",
          "router":"page10007",
          "li_style":"width:96.6796875rpx;margin-right:72.65625rpx;margin-bottom:7.03125rpx;margin-left:auto;",                                "img_style":"height:93.75rpx;margin-left:auto;",
          "eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10007\\\/page10007\",\"is_redirect\":0}",                                     "eventHandler":"tapInnerLinkHandler"
        },
        {
          "action":"inner-link",
          "li_class":"album-pic router",
          "pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_58ef1b07907f3.jpg",
          "title":"\u4eba\u6c14\u83dc\u80b4",
          "router":"page10008",
          "li_style":"width:96.6796875rpx;margin-right:72.65625rpx;margin-bottom:7.03125rpx;margin-left:auto;",                                "img_style":"height:93.75rpx;margin-left:auto;",
          "eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10008\\\/page10008\",\"is_redirect\":0}",                                     "eventHandler":"tapInnerLinkHandler"
        }
      ],
      "itemType":"album",
      "itemParentType":null,
      "itemIndex":"album3",
      "content":""
    },

    "title_ele4":{
      "type":"title-ele",
      "style":"opacity:1;line-height:75rpx;background-color:rgb(250, 250, 250);border-color:rgb(34, 34, 34);border-style:none;color:#666;font-size:30.46875rpx;margin-left:auto;margin-right:auto;margin-top:23.4375rpx;",
      "content":"\u79ef\u5206\u83dc\u54c1",          
      "markColor":"rgb(255, 103, 103)",
      "mode":3
    },

    "goods_list5":{
      "type":"goods-list",
      "style":"background-color:rgb(243, 243, 243);margin-top:-18.75rpx;opacity:1;color:rgb(102, 102, 102);font-size:28.125rpx;height:auto;margin-left:auto;",
      "content":"",
      "customFeature":{
        "vesselAutoheight":1,
        "height":"300px",
        "form":"goods",
        "mode":1,
        "name":"\u5546\u54c1\u5217\u8868",
        "ifUseContact":true,
        "id":"list-goods",
      },
      "hasMore":0,
      "animations":[],
      "page_form":"",
      "compId":"goods_list5",
      "param":"",
      "goods_data":[
        {
          "goodsId": "20",
          "title": "商品标题1",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "21",
          "title": "商品标题2",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "22",
          "title": "商品标题3",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        },
        {
          "goodsId": "23",
          "title": "商品标题4",
          "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "price": "2000.00",
          "sales": "50"
        }
    
      ]
    },

    "page_form":"",
    "top_nav":{"navigationBarBackgroundColor":"#000000","navigationBarTextStyle":"white","navigationBarTitleText":"此店铺"}
    },
    need_login: false,
    page_router: 'index',
    page_form: 'none',
    goods_compids_params: [{"compid":"goods_list5","param":{"id":"list-100677602924","form":"goods","goods_type":0,"page":1,"app_id":"VPzgdVvg8T","is_count":0,"is_integral":1}}],
    prevPage:0,
  onLoad: function (e) {
    //app.onPageLoad(e);
  },
  dataInitial: function () {
    app.pageDataInitial();
  },
  suspensionBottom: function () {
    app.suspensionBottom();
  },
  reachBottomFuc: [],
  onReachBottom: function (e) {
    return false;
    this.setData({
      "goods_list5": {
        "goods_data": [
          {
            "goodsId": "20",
            "title": "商品标题11",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "21",
            "title": "商品标题22",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "22",
            "title": "商品标题33",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题44",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题45",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题46",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题47",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题48",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题49",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题499",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题488",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          },
          {
            "goodsId": "23",
            "title": "商品标题477",
            "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
            "price": "2000.00",
            "sales": "50"
          }
        ]
      }
    });  
    //app.onPageReachBottom( this.reachBottomFuc );
  },
  onUnload: function () {
    app.onPageUnload();
  },
  pageScrollFunc: function (e) {
    app.pageScrollFunc(e);
  },
  goodsScrollFunc: function (e) {
    var self = this;
    self.setData({
      "hasMore": 1
    });
    var page_num = self.data.page_num;
    var tempArray = self.data.goods_list5.goods_data;
    var goods_data = [];
    var goods_item = {
      "goodsId": "22",
      "title": "商品标题",
      "image": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
      "price": "2000.00",
      "sales": "50"
    };

    console.log(page_num);

    // over
    if (self.data.page_num > 5) {
      self.setData({
        "hasMore": 2
      });
      return false;
    }

    if (self.data.page_loading) {
      return false;
    } else {
      for (var i = 0; i < 6; i++) {
        goods_data[i] = goods_item;
      }
    }

    tempArray = tempArray.concat(goods_data);
    self.setData({
      "goods_list5": {
        "goods_data": tempArray
      },
      "hasMore": 0,
      "page_loading": false,
      "page_num": parseInt(page_num) + 1,
    });
    
    //this.goodsScrollFunc(e);
  },
  goodsScrollFunsc: function (event) {
  },
  gotoDetail: function(e) {
    let goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail',
    })
  },
  scrollPageTop: function () {
    app.pageScrollTo(0);
  },
};
Page(pageData);
