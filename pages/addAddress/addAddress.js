const Zan = require('../zan/index.js');
const config = require('./config');

var app = getApp()

Page(Object.assign({}, Zan.Field, {
  data: {
    config,
    textareaValue: 'test textarea',
    province: ['省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    provinceIndex:0,
    city: ['城市', '福州市', '泉州市','厦门市', '莆田市','漳州市','龙岩市','南平市','宁德市','三明市'],
    cityIndex:0,
    area: ['区县', '台江区', '仓山区','马尾区'],
    areaIndex: 0,
    addressId: '',
    orderId: '',
    provinces: [],
    provinceIds: [],
    provinceIndex: 0,
    cities: [],
    cityIds: [],
    cityIndex: 0,
    districts: [],
    districtIds: [],
    districtIndex: 0,
    name: '张三丰',
    contact: '15260983828',
    detail: '东兴门下30好留',
    isDefault: 0,
    provincePara: {
      text: '',
      id: ''
    },
    cityPara: {
      text: '',
      id: ''
    },
    districtPara: {
      text: '',
      id: ''
    }
  },
  onProvinceChange(e) {
    this.setData({
      provinceIndex: e.detail.value
    });
  },
  onCityChange(e) {
    this.setData({
      cityIndex: e.detail.value
    });
  },
  onAreaChange(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  handleZanFieldChange(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:change]', componentId, detail);
  },

  handleZanFieldFocus(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:focus]', componentId, detail);
  },

  handleZanFieldBlur(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:blur]', componentId, detail);
  },

  clearInput() {
    this.setData({
      value: ''
    });
  },

  clearTextarea() {
    this.setData({
      textareaValue: ''
    });
  },

  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
  },

  formReset(event) {
    console.log('[zan:field:reset]', event);
  },

  onLoad: function(options){
    var id = options.id || '';     
    var orderId = options.oid || ''; 

    this.setData({
      addressId: id,
      orderId: orderId
    })
    //this.dataInitial();
  },
  dataInitial: function(){
    let id = this.data.addressId;
    if(id){
      this.getAddressDetail(id);
    }
    this.getArea('province', 0);
  },
  getAddressDetail: function(id){
    var that = this;

    app.sendRequest({
      url: '/index.php?r=AppShop/GetAddressById',
      data: { address_id: id },
      success: function(res){
        var data = res.data;
        that.setData({
          name: data.address_info.name,
          contact: data.address_info.contact,
          detail: data.address_info.detailAddress,
          isDefault: +data.is_default,
          provincePara: data.address_info.province,
          cityPara: data.address_info.city,
          districtPara: data.address_info.district
        })
      }
    });
  },
  getArea: function(category, pid){
    var that = this;

    app.sendRequest({
      url: '/index.php?r=Region/getRegionList',
      data: { pid: pid },
      success: function(res){
        var list = res.data,
            ids = [];

        for (var i = 0, j = list.length - 1; i <= j; i++) {
          ids.push(list[i].id);
          list[i] = list[i].name;
        }
        switch(category){
          case 'province':  that.setData({ provinces:list, provinceIds:ids, cities:[], districts:[] })
                            break;
              case 'city':  that.setData({ cities:list, cityIds:ids, districts:[] })
                            break;
          case 'district':  that.setData({ districts:list, districtIds:ids })
                            break;
        }
      }
    });
  },
  bindProvinceChange: function(e){
    var index = e.detail.value,
        id = this.data.provinceIds[index];

    this.getArea('city', id);
    this.setData({
      provincePara: {
        text: this.data.provinces[index],
        id: id
      },
      cityPara: {
        text: '',
        id: ''
      },
      districtPara: {
        text: '',
        id: ''
      }
    })
  },
  bindCityChange: function(e){
    var index = e.detail.value,
        id = this.data.cityIds[index];

    this.getArea('district', id);
    this.setData({
      cityPara: {
        text: this.data.cities[index],
        id: id
      },
      districtPara: {
        text: '',
        id: ''
      }
    })
  },
  bindDistrictChange: function(e){
    var index = e.detail.value,
        id = this.data.districtIds[index];

    this.setData({
      districtPara: {
        text: this.data.districts[index],
        id: id
      }
    })
  },
  nameInput: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  contactInput: function(e){
    this.setData({
      contact: e.detail.value
    })
  },
  detailInput: function(e){
    this.setData({
      detail: e.detail.value
    })
  },
  addAddress: function(){
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    });
    return false;
    var para = {};
    var that = this;

    if(!this.completeAddressInfo()){
      return;
    }
    para.province = this.data.provincePara;
    para.city = this.data.cityPara;
    para.district = this.data.districtPara;

    para.name = this.data.name;
    para.contact = this.data.contact;
    para.detailAddress = this.data.detail;

    app.sendRequest({
      method: 'post',
      url: '/index.php?r=AppShop/addAddress',
      data: {
        address_id: this.data.addressId,
        address_info: para,
        is_default: this.data.isDefault
      },
      success: function(res){
        if(that.data.orderId){
          that.setAddress(res.data);
        } else {
          app.turnBack();
        }
      }
    })
  },
  setAddress: function(addressId){
    var orderId = this.data.orderId;

    app.sendRequest({
      url: '/index.php?r=AppShop/setAddress',
      data: {
        order_id: orderId,
        address_id: addressId
      },
      success: function(res){
        app.turnBack();
      }
    });
  },
  completeAddressInfo: function(){
    var data = this.data,
        tip = '';

    if(!tip && !data.name.trim()){
      tip = '请填写名字';
    }
    if(!tip && !data.contact){
      tip = '请填写联系方式';
    }
    if(!tip && !data.provincePara.text){
      tip = '请选择省份';
    }
    if(!tip && !data.cityPara.text){
      tip = '请选择城市';
    }
    if(!tip && !data.districtPara.text){
      tip = '请选择地区';
    }
    if(!tip && !data.detail){
      tip = '请填写详细地址';
    }

    if(tip){
      app.showModal({
        content: tip
      });
      return false;
    }
    return true;
  },
  setDefaultAddress: function(e){
    var checked = e.detail.value;
    if(checked){
      this.setData({
        isDefault: 1
      })
    } else {
      this.setData({
        isDefault: 0
      })
    }
  }
}));
