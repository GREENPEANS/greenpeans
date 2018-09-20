var Reflux = require('reflux');
var reqwest = require('reqwest');

var AppActions = require('../actions/AppActions');

export default Reflux.createStore({
    listenables: [AppActions],
    menuData: [],
    onInitStore() {
        this.queryData();
    },
    queryData() {
        Utils.ajaxData({
            url: '/modules/manage/system/roleMenu/find.htm?sysType=1',
            type: 'json',
            method:'post',
            callback: (result) => {
                this.menuData = result.data;
                this.update();
               // console.log(JSON.stringify(result.data));
            }
        });
    },
    update() {
        this.trigger(this.menuData);
    }
});