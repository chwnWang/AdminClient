import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';
import { formateDate } from '../../utils/dateUtils.js';
import LinkButton from '../../utils/linkButton.js';
import RolesFrom from './Add-Update_Role';
import UpdateForm from './updateForm';
import memoryUtils from '../../utils/memoryUtils.js'
/**
 * 角色管理
 */

export default class Role extends Component {
  state = {
    roles: [],
    isShow: false,
    isShowAuth: false,
  }

  constructor(props) {
    super(props);
    this.authRef = React.createRef();
  }

  getColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'name',
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate,
      }, {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate,
      }, {
        title: '授权人',
        dataIndex: 'auth_name',
      }, {
        title: '操作',
        render: (role) => (
          <span>
            <LinkButton onClick={() => this.updateRole(role)}>设置权限</LinkButton>
          </span>
        )
      }

    ];
  }

  /**获取数据 */
  getRoles = async () => {

    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    } else {
      message.error('获取失败')
    }
  }
  /**添加角色 */
  addShow = () => {
    //更新状态
    this.setState({
      isShow: true,
    }
    )
  }

  /**添加更新数据 */
  addOrUpdateRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await reqAddRole(values.roleName);
        if (result.status === 0) {
          message.success('添加成功');
          this.setState({
            isShow: false,
          })
        } else {
          message.error('添加失败')
        }
      }
    })

  }

  /**更新权限对话框状态显示 */
  updateRole = (role) => {
    this.role = role;
    this.setState({
      isShowAuth: true,
    })



  }
  /**更新 */
  reqUpdateRole = async () => {

    const { role } = this;
    role.menus = this.authRef.current.getMenus();
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      message.success('设置成功');
      this.setState({
        isShowAuth: false,
      });
      this.getRoles();
    } else {
      message.error('设置失败')
    }
  }

  componentWillMount() {
    this.getColumns();
  }
  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, isShow, isShowAuth } = this.state;
    const role = this.role || {};
    const title = (
      <span>
        <Button type='primary' icon="plus" onClick={this.addShow} >添加角色</Button>
      </span>
    )
    return (

      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: 6 }}
        />

        <Modal
          title={role._id ? '修改角色' : '添加角色'}
          visible={isShow}
          onOk={this.addOrUpdateRole}
          onCancel={() => {
            this.role = {};
            this.form.resetFields()
            this.setState({ isShow: false })
          }}
        >
          <RolesFrom setForm={form => this.form = form} />
        </Modal>

        <Modal
          title='设置权限'
          visible={isShowAuth}
          onOk={this.reqUpdateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <UpdateForm ref={this.authRef} role={role} />
        </Modal>

      </Card>

    )
  }
}
