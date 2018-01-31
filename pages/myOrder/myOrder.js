const { Tab, extend} = require('../zan/index.js');

var app = getApp()

Page(extend({}, 
Tab, 
{
  data: {
    list: [
      {
        id: 'all',
        title: '全部'
      }, 
      {
        id: 'tosend',
        title: '待发货'
      },
      {
        id: 'send',
        title: '待收货'
      }, 
      {
        id: 'sign',
        title: '已完成'
      },
      {
        id: 'tocancel',
        title: '待退款'
      }, 
    ],
    selectedId: "all",
    hasMore: 2,
    loading_hidden:true,
    orderLists: [
      {
        "add_time": "2018-12-31 12:30",
        "status": 1,
        "order_id": 1,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 2,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 3,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 4,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 5,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 6,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 7,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      },
      {
        "add_time": "2018-12-31 12:30",
        "status": 0,
        "order_id": 2,
        "total_price": "20.00",
        "goods_info": [{
          "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
          "goods_name": "名称商品2018放假代理商",
          "price": "10.00",
          "num": "2"
        }]
      }
    ],
    pages: 1,
    noMore: false,
    currentTabIndex: 'all',
    isFromBack: false
  },
  handleZanTabChange({ componentId, selectedId }) {
    this.setData({
      selectedId: selectedId,
      orderLists: [],
      loading_hidden:false
    });
    
    var data = [];
    var item = {
      "add_time": "2018-12-31 12:30",
      "status": 2,
      "order_id": 2,
      "total_price": "20.00",
      "goods_info": [{
        "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
        "goods_name": "名称商品2018放假代理商",
        "price": "10.00",
        "num": "2"
      }]
    };

    for(var i=0; i<5 ; i++) {
      data[i] = item;
    }
    console.log(data);
    this.setData({
      orderLists: data,
      loading_hidden: true
    })
  },
  onLoad: function (options) {
    console.log(options);
    if (options.goodsType && options.currentIndex) {
      this.setData({
        currentGoodsType: options.goodsType,
        currentTabIndex: options.currentIndex
      })
    }
    //this.dataInitial();
  },
  onShow: function () {
    return false;
    if (this.data.isFromBack) {
      this.setData({
        pages: 1,
        currentTabIndex: this.data.currentTabIndex,
        noMore: false
      });
      this.getOrderList({ tabIndex: this.data.currentTabIndex });
    } else {
      this.setData({
        isFromBack: true
      })
    }
  },
  dataInitial: function () {
    var that = this;
    this.getOrderList({
      tabIndex: that.data.currentTabIndex,
      firstLoad: true
    });
  },
  getOrderList: function (param) {
    var that = this,
      data = {
        page: that.data.pages,
        page_size: 50
      },
      type;

    if (this.data.currentGoodsType != "") {
      type = this.data.types[this.data.currentGoodsType][param.tabIndex];

      if (type != undefined) {
        data.idx_arr = {
          idx: 'status',
          idx_value: type
        }
      }
      data.goods_type = this.data.currentGoodsType
    }

    data.parent_shop_app_id = '';

    if (param.firstLoad && this.data.currentGoodsType == "") {

      data.use_default_goods_type = 1;
    }
    console.log('get more'); 

    var data = this.data.orderLists;
    var item = {
      "add_time": "2018-12-31 12:30",
      "status": 2,
      "order_id": 2,
      "total_price": "20.00",
      "goods_info": [{
        "cover": "https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg",
        "goods_name": "名称商品2018放假代理商",
        "price": "10.00",
        "num": "2"
      }]
    };

    for (var i = 0; i < 5; i++) {
      data = data.concat(item);
    }
    
    this.setData({
      orderLists: data
    })
    
    return false;
    app.sendRequest({
      url: '/index.php?r=AppShop/orderList',
      method: 'post',
      data: data,
      success: function (res) {
        var data = {},
          orders = res.data;

        for (var i = orders.length - 1; i >= 0; i--) {
          var formData = orders[i].form_data;

          if (formData.tostore_data && formData.tostore_data.appointed_time) {
            formData.tostore_data.appointed_time = formData.tostore_data.appointed_time.substr(11, 5);
          }
          orders[i] = formData;
        }

        if (param.scrollLoad) {
          orders = that.data.orderLists.concat(orders);
        }
        data['orderLists'] = orders;
        data['takeoutInfo'] = res.take_out_info;
        data['pages'] = that.data.pages + 1;
        data['noMore'] = res.is_more == 0 ? true : false;
        data['currentGoodsType'] = res.current_goods_type;
        // 判断goods_type_list里面是否存在当前需要展示的列表
        if (param.firstLoad) {
          data['goodsTypeList'] = res.goods_type_list;
          if (data['goodsTypeList'].indexOf(data['currentGoodsType'].toString()) < 0) {
            data['goodsTypeList'].push(data['currentGoodsType']);
          }
        }
        that.setData(data);
      }
    })
  },
  goToOrderDetail: function (e) {
    var dataset = e.currentTarget.dataset,
      orderId = dataset.id,
      type = dataset.type,
      franchiseeId = dataset.franchisee,
      queryStr = '';//franchiseeId === app.getAppId() ? '' : '&franchisee=' + franchiseeId,
    
    var router = 'orderDetail';
    wx.navigateTo({
      url: '/pages/' + router + '/' + router + '?detail=' + orderId + queryStr
    });
    //app.turnToPage('/pages/' + router + '/' + router + '?detail=' + orderId + queryStr);
  },
  cancelOrder: function (e) {
    var orderId = e.target.dataset.id,
      franchisee = e.target.dataset.franchisee,
      subShopId = '',
      that = this;

    app.showModal({
      content: '确定要取消订单？',
      showCancel: true,
      cancelText: '否',
      confirmText: '确定',
      confirm: function () {
        app.sendRequest({
          url: '/index.php?r=AppShop/cancelOrder',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function (res) {
            var index = that.data.currentTabIndex,
              data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({ tabIndex: index });
          }
        })
      }
    })
  },
  applyDrawback: function (e) {
    var orderId = e.target.dataset.id,
      franchisee = e.target.dataset.franchisee,
      subShopId = '',
      that = this;

    app.showModal({
      content: '确定要申请退款？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      confirm: function () {
        app.sendRequest({
          url: '/index.php?r=AppShop/applyRefund',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function (res) {
            var index = that.data.currentTabIndex,
              data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({ tabIndex: index });
          }
        })
      }
    })
  },
  checkLogistics: function (e) {
    var orderId = e.target.dataset.id;
    app.turnToPage('/pages/logisticsPage/logisticsPage?detail=' + orderId);
  },
  sureReceipt: function (e) {
    var orderId = e.target.dataset.id,
      franchisee = e.target.dataset.franchisee,
      subShopId = '',
      that = this,
      content = this.data.currentGoodsType == '1' ? '确认已消费?' : '确认已收到货物?';

    app.showModal({
      content: content,
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      confirm: function () {
        app.sendRequest({
          url: '/index.php?r=AppShop/comfirmOrder',
          data: {
            order_id: orderId,
            sub_shop_app_id: subShopId
          },
          success: function (res) {
            var index = that.data.currentTabIndex,
              data = {};

            data['pages'] = 1;
            that.setData(data);
            that.getOrderList({ tabIndex: index });
          }
        })
      }
    })
  },
  makeComment: function (e) {
    var orderId = e.target.dataset.id,
      franchiseeId = e.target.dataset.franchisee,
      queryStr = '';
    app.turnToPage('/pages/makeComment/makeComment?detail=' + orderId + queryStr);
  },
  verificationCode: function (e) {
    var orderId = e.target.dataset.id;
    var franchiseeId = e.target.dataset.franchisee;
    app.turnToPage('/pages/verificationCodePage/verificationCodePage?detail=' + orderId + '&sub_shop_app_id=' + franchiseeId);
  },
  scrollToListBottom: function () {
    var selectedId = this.data.selectedId
    if (this.data.noMore) {
      return;
    }
    this.getOrderList({
      selectedId: selectedId,
      scrollLoad: true
    });
  }
}));
