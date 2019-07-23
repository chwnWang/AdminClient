import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import LinkButton from '../../utils/linkButton';
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser, reqRoles } from '../../api';
import UserForm from './Add-Update_User';
import {formateDate} from "../../utils/dateUtils"
/**
 * 用户管理
 */
export default class User extends Component {
  state = {
    users: [], //数据初始化
    roles: [],  //角色数据初始化
    isShow: false, //是否显示对话框
  }

  /**查询数据 */
  getUsers = async () => {
    const result = await reqUsers();
    if (result.status===0) {
      const {users, roles} = result.data

      // 生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)
      this.roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})

      this.setState({
        users,
        roles
      })
    }else {
      message.error('获取信息失败')
    }
  }

  /**获取角色列表 */
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      this.setState({
        roles: result.data
      })
    }
  }




  /**表头初始化 */
  getColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      }, {
        title: '邮箱',
        dataIndex: 'email',
      }, {
        title: '电话',
        dataIndex: 'phone',
      }, {
        title: '注册时间',
        dataIndex: 'create_time',
        render:formateDate,
      }, {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => this.roleNames[role_id]
      }, {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={
              () => {
                this.showUPdate(user);
              }
            }>修改</LinkButton>
            <LinkButton onClick={
              () => {
                this.DeleteUser(user);
              }
            }>删除</LinkButton>
          </span>
        )
      }

    ];
  }

  /**创建用户 */
  showAdd = () => {
    this.user = null;
    console.log(this.user);
    //this.user = {};
    //更新显示状态
    this.setState({
      isShow: true
    }
    )
  }

  //更新
  showUPdate = (user) => {
    //更新显示状态
    this.user = user
    this.setState({
      isShow: true,
    }
    )
  }

  /**添加用户 */
  addOrUpdateUser = () => {
    //进行表单统一严重
    this.setState({isShow: false});
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 如果this有user
        if (this.user) {
          values._id = this.user._id
        }
        //添加数据
        const result = await reqAddOrUpdateUser(values);
        if (result.status === 0) {
          message.success('添加成功');
          this.form.resetFields();
          this.getUsers();
          this.setState({
            isShow: false,
          });
        } else {
          message.error(result.msg)
        }
      }
    })
  }

  /**删除用户 */
    DeleteUser=(user)=>{
      Modal.confirm({
        title: `确认删除${user.username}用户吗?`,
        onOk: async () => {
          const result = await reqDeleteUser(user._id)
          if (result.status === 0) {
            message.success('删除用户成功!')
            this.getUsers()
          } else {
            message.error(result.msg)
          }
        }
      })
    }


  componentWillMount() {
    this.getColumns();
  }

  componentDidMount() {
    this.getUsers();
    this.getRoles();
  }
  render() {
    const { users, isShow, roles } = this.state;
    const user = this.user || {}
  
    const title = (
      <span>
        <Button type='primary' icon="plus" onClick={this.showAdd}>创建用户</Button>
      </span>
    )
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            dataSource={users}
            columns={this.columns}
            pagination={{ defaultPageSize: 6 }}
          />

          <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onOk={this.addOrUpdateUser}
            onCancel={() => {
              this.user = {};
              this.form.resetFields()
              this.setState({ isShow: false })
            }}
          >
            <UserForm setForm={form => this.form = form}
              roles={roles}
              user={user} />
          </Modal>


        </Card>
      </div>
    )
  }
}
