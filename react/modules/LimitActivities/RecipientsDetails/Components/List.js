import React from 'react'
import {Table, Modal, Icon} from 'antd';
var confirm = Modal.confirm;
const objectAssign = require('object-assign');
export default React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [], // 这里配置默认勾选列
            loading: false,
            data: [],
            pagination: {
                pageSize: 10,
                current: 1
            },
            canEdit: true,
            visible: false,
            visible1: false,
            visible2: false,
            pictureData: [],
            creditReportData: [],
            rowRecord:[],
            record:"",
            visibleAdd:false,

        };
    },

    componentWillReceiveProps(nextProps, nextState) {
        this.fetch(nextProps.params);
    },

    componentDidMount() {
        this.fetch();
    },

    fetch(params = {}) {
        this.setState({
            loading: true
        });
        if (!params.pageSize) {
            var params = {};
            params = {
                pageSize: 10,
                current: 1,
                userName: " ",
            }
        }
        Utils.ajaxData({
            url: '/modules/manage/coupon/page.htm',
            method: "post",
            data: params,
            callback: (result) => {
                const pagination = this.state.pagination;
                pagination.current = params.current;
                pagination.pageSize = params.pageSize;
                pagination.total = result.page.total;
                if (!pagination.current) {
                    pagination.current = 1
                }
                ;
                this.setState({
                    loading: false,
                    data: result.data,
                    pagination
                });
            }
        });
    },

    rowKey(record) {
        return record.id;
    },

    //选择
    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        });
    },

    //分页
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.refreshList();
    },

    refreshList() {
        var pagination = this.state.pagination;
        var params = objectAssign({}, this.props.params, {
            current: pagination.current,
            pageSize: pagination.pageSize
        });
        this.fetch(params);
    },

    //行点击事件
    onRowClick(record) {
        //console.log(record)
        this.setState({
            selectedRowKeys: [record.id],
            selectedRow: record,
            rowRecord:record
        },()=>{
            this
        });
    },

    //选择
    onSelectAll(selected, selectedRowKeys, selectedRows, changeRows) {
        if (selected) {
            this.setState({
                selectedRowKeys
            })
        } else {
            this.setState({
                selectedRowKeys: []
            })
        }
    },


    render() {
        const {
            loading,
            selectedRowKeys
            } = this.state;
        let me=this;
        const hasSelected = selectedRowKeys.length > 0;
        var columns = [{
            title: '优惠券编号',
            dataIndex: 'id',
        }, {
            title: '领取用户',
            dataIndex: "userName",
            // render: (text) => {
            //     switch(text){
            //         case 1: 
            //             return "一级";
            //         case 2: 
            //             return "二级";
            //         case 3: 
            //             return "三级";
            //     }
            // }
        }, {
            title: '领取时间',
            dataIndex: "createTime",
            // render: (text) => {
            //     if(text){
            //         return text.toFixed(2);
            //     }
            // }
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render:(text,record) =>{
                
                var useTime = '使用时间：' + record.useTime;
                var orderNo = '关联订单：' + record.orderNo;
                if (record.useTime == null || record.useTime == ""){
                    useTime = "使用时间：暂无信息";
                }
                if (record.orderNo == null || record.orderNo == ""){
                     orderNo = "关联订单：暂无信息";
                 }
                if(text == 0){
                    let st = '使用状态：未使用';
                    let msg = st + '  ' + useTime + '  '+orderNo 
                    return msg; 
                }else if (text == 1){
                    let st = '使用状态：使用';
                    let msg = st + '  ' + useTime + '   '+orderNo 
                    return msg;
                }
            }
        }]

        var state = this.state;
        return (
            <div className="block-panel">
                <div className="actionBtns" style={{ marginBottom: 16 }}>
                </div>
                <Table columns={columns} rowKey={this.rowKey} ref="table" 
                       onRowClick={this.onRowClick}
                       dataSource={this.state.data}
                       rowClassName={this.rowClassName}
                       pagination={this.state.pagination}
                       onChange={this.handleTableChange}
                />
            </div>
        );
    }
})
