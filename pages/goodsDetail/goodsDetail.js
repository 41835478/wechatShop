var app = getApp()
var util = require('../../utils/util.js')

// var WxParse = require('../../components/wxParse/wxParse.js');
Page({
  data: {
    goodsId: '20',
    goodsInfo: {
      "goods_type": 0,
      "stock": 50,
      "img_urls": [
        "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
        "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg"
      ],
      "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
      "title": "商品标题",
      "destription": "虎扑步行街是一条又黄又暖的宅男宅女街，它无时无刻不徐引入前往，每天花费的时间超过app使用时间的一半以上...",
      "model_items": {
        "length":2
      },
      "model": [
        {
          "name": "尺寸",
          "subModelId":[1,2,3,4],
          "subModelName": [
            "40", "41", "42", "43"
          ]
        },
        {
          "name": "颜色",
          "subModelId": [4, 5, 6, 7],
          "subModelName": [
            "白色", "红色", "蓝绿", "韭黄"
          ]
        }
      ],
      "detail": [
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg"
      ]
    },
    modelStrs: {},
    selectModelInfo: {
      models: [1,4],
      stock: '20',
      price: '22.00',
      virtualPrice: '30.00',
      buyCount: 1,
      models_text: ''
    },
    commentNums: [],
    commentExample: '',
    defaultPhoto: '',
    allStock: '',
    addToShoppingCartHidden: true,
    ifAddToShoppingCart: true,
    priceDiscountStr: '',
    page_hidden: false,
    appointmentPhone: '',
    isShowVirtualPrice: true
  },
  onLoad: function (options) {
    return false;
    var goodsId = options.detail,
      contact = options.contact,
      franchiseeId = options.franchisee || '',
      cartGoodsNum = options.cart_num,
      defaultPhoto = app.getDefaultPhoto(),
      goodsType = options.goodsType,
      userToken = options.user_token,
      hidestock = options.hidestock,
      isShowVirtualPrice = options.isShowVirtualPrice;
    this.setData({
      goodsId: goodsId,
      contact: contact,
      defaultPhoto: defaultPhoto,
      franchiseeId: franchiseeId,
      cartGoodsNum: cartGoodsNum,
      goodsType: goodsType,
      isSeckill: goodsType == 'seckill' ? true : false,
      hidestock: hidestock == 'true' ? true : false,
      isShowVirtualPrice: isShowVirtualPrice == 'true' ? true : false,
    })
    this.dataInitial();
    if (userToken) {
      app._getPromotionUserToken({
        user_token: userToken
      });
    }
  },
  dataInitial: function () {
    var that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: this.data.goodsId,
        sub_shop_app_id: this.data.franchiseeId,
        is_seckill: this.data.isSeckill ? 1 : ''
      },
      success: that.modifyGoodsDetail,
      complete: function () {
        that.setData({
          page_hidden: false
        })
      }
    })
  },
  onUnload: function () {
    if (this.downcount) {
      this.downcount.clear();
    }
  },
  goToMyOrder: function () {
    var franchiseeId = this.data.franchiseeId,
      pagePath = '/pages/myOrder/myOrder' + (franchiseeId ? '?franchisee=' + franchiseeId : '');
    app.turnToPage(pagePath, true);
  },
  goToShoppingCart: function () {
    var franchiseeId = this.data.franchiseeId,
      pagePath = '/pages/shoppingCart/shoppingCart' + (franchiseeId ? '?franchisee=' + franchiseeId : '');
    app.turnToPage(pagePath, true);
  },
  goToHomepage: function () {
    var router = app.getHomepageRouter();
    app.turnToPage('/pages/' + router + '/' + router, true);
  },
  goToCommentPage: function () {
    var franchiseeId = this.data.franchiseeId,
      pagePath = '/pages/goodsComment/goodsComment?detail=' + this.data.goodsId + (franchiseeId ? '&franchisee=' + franchiseeId : '');
    app.turnToPage(pagePath);
  },
  getAssessList: function () {
    var that = this;
    app.getAssessList({
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      data: {
        goods_id: that.data.goodsId,
        idx_arr: {
          idx: 'level',
          idx_value: 0
        },
        page: 1,
        page_size: 20,
        sub_shop_app_id: this.data.franchiseeId
      },
      success: function (res) {
        var commentExample = res.data[0];
        // if(commentExample){
        //   commentExample.add_time = util.formatTime(new Date(commentExample.add_time * 1000));
        // }
        that.setData({
          commentNums: res.num,
          commentExample: commentExample
        })
      }
    });
  },

  hiddeAddToShoppingCart: function () {
    this.setData({
      addToShoppingCartHidden: true
    })
  },
  selectSubModel: function (e) {
    var dataset = e.target.dataset,
      modelIndex = dataset.modelIndex,
      submodelIndex = dataset.submodelIndex,
      data = {},
      selectModels = this.data.selectModelInfo.models,
      model = this.data.goodsInfo.model,
      text = '';

    selectModels[modelIndex] = model[modelIndex].subModelId[submodelIndex];

    // 拼已选中规格文字
    for (let i = 0; i < selectModels.length; i++) {
      let selectSubModelId = model[i].subModelId;
      for (let j = 0; j < selectSubModelId.length; j++) {
        if (selectModels[i] == selectSubModelId[j]) {
          text += '“' + model[i].subModelName[j] + '” ';
        }
      }
    }
    data['selectModelInfo.models'] = selectModels;
    data['selectModelInfo.models_text'] = text;

    this.setData(data);
    this.resetSelectCountPrice();
  },
  resetSelectCountPrice: function () {
    var _this = this,
      selectModelIds = this.data.selectModelInfo.models.join(','),
      modelItems = this.data.goodsInfo.model_items,
      data = {};

    for (var i = modelItems.length - 1; i >= 0; i--) {
      if (modelItems[i].model == selectModelIds) {

          data['selectModelInfo.stock'] = modelItems[i].stock;
          data['selectModelInfo.price'] = modelItems[i].price;
          data['selectModelInfo.modelId'] = modelItems[i].id;
          data['selectModelInfo.imgurl'] = modelItems[i].img_url;
          data['selectModelInfo.virtualPrice'] = modelItems[i].virtual_price;
        
        break;
      }
    }
    this.setData(data);
  },
  clickMinusButton: function (e) {
    var count = this.data.selectModelInfo.buyCount;

    if (count <= 1) {
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count - 1
    });
  },
  clickPlusButton: function (e) {
    var selectModelInfo = this.data.selectModelInfo,
      goodsInfo = this.data.goodsInfo,
      count = selectModelInfo.buyCount,
      stock = selectModelInfo.stock;

    if (count >= stock) {
      app.showModal({ content: '购买数量不能大于库存' });
      return;
    }
    if (this.data.isSeckill && count >= goodsInfo.seckill_buy_limit) {
      app.showModal({ content: '购买数量不能大于秒杀限购数量' });
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count + 1
    });
  },
  showBuyDirectly: function () {
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: false
    })
  },
  showAddToShoppingCart: function () {
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: true
    })
  },
  sureAddToShoppingCart: function () {
    var that = this,
      param = {
        goods_id: this.data.goodsId,
        model_id: this.data.selectModelInfo.modelId || '',
        num: this.data.selectModelInfo.buyCount,
        sub_shop_app_id: this.data.franchiseeId || '',
        is_seckill: this.data.isSeckill ? 1 : ''
      };

    app.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function (res) {
        app.showToast({
          title: '添加成功',
          icon: 'success'
        });

        setTimeout(function () {
          that.hiddeAddToShoppingCart();
        }, 1000);
      }
    })
  },
  buyDirectlyNextStep: function (e) {
    var franchiseeId = this.data.franchiseeId,
      that = this,
      param = {
        goods_id: this.data.goodsId,
        model_id: this.data.selectModelInfo.modelId || '',
        num: this.data.selectModelInfo.buyCount,
        sub_shop_app_id: franchiseeId || '',
        is_seckill: this.data.isSeckill ? 1 : ''
      };

    app.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function (res) {
        var cart_arr = [res.data],
          pagePath = '/pages/previewGoodsOrder/previewGoodsOrder?cart_arr=' + encodeURIComponent(cart_arr);

        franchiseeId && (pagePath += '&franchisee=' + franchiseeId);
        that.hiddeAddToShoppingCart();
        app.turnToPage(pagePath);
      }
    })
  },
  makeAppointment: function () {
    var franchiseeId = this.data.franchiseeId,
      unitTime = this.data.modelStrs[0] && this.data.modelStrs[0].substring(this.data.modelStrs[0].length - 1),
      unitType = unitTime == '分' ? 1 : (unitTime == '时' ? 2 : 3),
      pagePath = '/pages/makeAppointment/makeAppointment?detail=' + this.data.goodsId + (franchiseeId ? '&franchisee=' + franchiseeId : '') + ('&param=' + unitType)
    app.turnToPage(pagePath);
  },
  inputBuyCount: function (e) {
    var count = +e.detail.value,
      selectModelInfo = this.data.selectModelInfo,
      goodsInfo = this.data.goodsInfo,
      stock = +selectModelInfo.stock;

    if (count >= stock) {
      count = stock;
      app.showModal({ content: '购买数量不能大于库存' });
    }
    if (this.data.isSeckill && count >= +goodsInfo.seckill_buy_limit) {
      count = goodsInfo.seckill_buy_limit;
      app.showModal({ content: '购买数量不能大于秒杀限购数量' });
    }
    this.setData({
      'selectModelInfo.buyCount': +count
    });
  },
  showShareMenu: function () {
    app.showShareMenu();
  },
  clickPlusImages: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: e.currentTarget.dataset.srcarr
    })
  },
  makePhoneCall: function () {
    app.makePhoneCall(this.data.appointmentPhone);
  },
  hideShareMenu: function () {
    this.setData({
      hideShareMenu: true
    })
  },
  showPageCode: function () {
  }
});
