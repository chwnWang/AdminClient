import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { reqCategorys, addCategory, updateCategory } from '../../api';
import LinkButton from '../../utils/linkButton.js';
import AddUpdateForm from './add_update_input';

/**
 * 分类管理
 */
export default class Category extends Component {
  state = {
    categorys: [], // 所有分类的数组
    loading: false, // 是否正在请求加载中
    showStatus: 0, // 0: 不显示, 1: 显示添加, 2: 显示修改
  }
  /*获取类型数据 */
  getCategorys = async () => {
    this.setState({loading:true})
    //获取返回的数据
    const result = await reqCategorys();
    this.setState({loading:false})
    //判断数据是否加载成功
    if (result.status === 0) {
      // 更新状态categorys数据
      this.setState({
        categorys: result.data
      })
    } else {
      message.error('数据加载失败')
    }
    console.log(result.data);
  }
  /**
   *异步获取分类列表显示
   */
  getColumns = () => {
    this.columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        //render: ()=>{<LinkButton>修改分类</LinkButton>}
        render: (category) => <LinkButton onClick={() => {
          this.category = category //保存当前的分类
          this.setState({ showStatus: 2 })
        }}>修改分类</LinkButton>
      },
    ];
  }

  /*点击确定按钮 */
  handleOk = () => {
    //验证表单
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let result;
        //获取表单输入的数据
        const { categoryName } = values;
        //判断状态showStatus-1-添加  2-更新
        const {showStatus}  = this.state;
        if(showStatus===1){
           //发送请求
         result = await addCategory(categoryName);
        }else{
         const categoryId =  this.category._id;
         result = await updateCategory(categoryId,categoryName);
        }
        //重置表单
        this.form.resetFields();
        //更新状态  关闭对话框
        this.setState({showStatus:0,});
        const action = showStatus ===1?'添加':'更新'
        //判断请求是否成功
        if (result.status === 0) {
          //重新获取数据
          this.getCategorys();
           //重置表单
          this.category={};
          message.success(action+'成功');
        } else {
          message.error(action+'失败');
        }

      }
    });

  }

  /*点击取消按钮 */
  handleCancel = () => {
    this.form.resetFields();
    this.category={};
    this.setState({
      showStatus: 0
    })
  }
  componentWillMount() {
    this.getColumns()
  }

  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const { categorys, showStatus ,loading} = this.state;
    const extra = (
      <Button type="primary" icon="plus" onClick={() => {
        this.setState({ showStatus: 1 })
      }}>添加类型</Button>
    )
    // 读取更新的分类名称
    const category = this.category || {}

    return (
      /**extra	是card右上角的操作区域 */
      <Card extra={extra}>
        <Table
          columns={this.columns}
          dataSource={categorys}
          rowKey="_id"
          bordered={true}
          loading={loading}
          pagination={{ defaultPageSize: 6, showQuickJumper: true }} />,

        <Modal
          title={showStatus === 1 ? '添加类型' : '修改类型'}
          visible={showStatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdateForm setFrom={(form) => { this.form = form }} categoryName={category.name}/>
        </Modal>

      </Card>

    )
  }
}
