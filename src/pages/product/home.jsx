import React, { Component } from 'react';
import { Card, Table, Select, Input, Button, message, Pagination } from 'antd';
import { reqProducts,reqProductsSearch,reqUpdateStatus } from '../../api';

import LinkButton from '../../utils/linkButton.js';
import {PAGE_SIZE} from '../../utils/Constants';
import memoryUtils from '../../utils/memoryUtils';

const { Option } = Select;

/**
 * 商品管理
 */
export default class Home extends Component {
  state = {
    loading: false,
    products: [], // 商品列表
    total: 0, // 商品的总数量
    searchType: 'productName', // 默认是按商品名称搜索
    searchName: '', // 搜索的关键字
  }
  /**字段初始化 */
  getColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      }, {
        title: '商品描述',
        dataIndex: 'desc',
      }, {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      }, {
        title: '状态',
        render: ({_id,status}) => {
        
          let btnText = '下架';
          let text = '在售';
          if (status === 2) {
            btnText = '上架';
            text = '已下架';
          }
          return (
            <span>
              <Button type="primary" onClick={()=>{
          
                this.updateStatus(_id,status)
                }}>{btnText}</Button> &nbsp;
              <span>{text}</span>
            </span>
          )
        }
      }, {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton onClick={()=>{
          
              memoryUtils.product = product;
              this.props.history.push('/product/detail')
              }}>详情</LinkButton>
            <LinkButton onClick={()=>{
              memoryUtils.product = product;
              this.props.history.push('/product/addupdate')
            }}>修改</LinkButton>
          </span>
        )
      }

    ];
  }
  /**异步查询商品列表数据 */
  getReqProducts = async (pageNum) => {
    //存入当前的页数
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchName, searchType } = this.state;
    let result;
    if (!this.isSearch) {
      result = await reqProducts(pageNum, PAGE_SIZE);
    } else {
      //获取数据
      result = await reqProductsSearch (pageNum,PAGE_SIZE,searchName,searchType);
    }
    this.setState({ loading: false });
    // console.log(result.status)
    if (result.status === 0) {
      //获取列表数据
      const { total, list } = result.data;
      //更新状态
      this.setState({
        products: list,
        total
      })
    } else {
      message.error('加载信息失败');
    }
  }
  /**修改状态  上下架 */
  updateStatus = async(productId,status) => {
    //修改状态
    status = status===1 ? 2 : 1 ;
    //获取参数
    const result = await reqUpdateStatus(productId,status);
 
    if(result.status===0){
      message.success('更新商品状态成功');
      this.getReqProducts(this.pageNum);
    }
  }

  componentWillMount() {
    this.getColumns();
  }
  componentDidMount() {
    this.getReqProducts(1);
  }
  render() {
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (<span>
        <Select
          style={{ width: 200 }}
          value={searchType}
          onChange={
            (value) => {
              this.setState({
                searchType: value,
              })
            }
          }
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 200, margin: '0 10px' }}
          placeholder="关键字"
          value={searchName}
          onChange={
           (event)=>this.setState({
              searchName: event.target.value,
            })
          }
        />
        <Button type="primary" onClick={() => {
          this.isSearch = true;
          this.getReqProducts(1)
        }}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" icon="plus"
       onClick={()=>{
        memoryUtils.product={}
         this.props.history.push('/product/addupdate')
         }}>
         添加商品</Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          loading={loading}
          rowKey="_id"
          columns={this.columns}
          dataSource={products}
          pagination={
            {
              total,
              defaultPageSize: PAGE_SIZE,
              showQuickJumper: true,
              onChange: this.getReqProducts,
              current :this.pageNum,
            }}
        />

      </Card>
    )
  }
}
