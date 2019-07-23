import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input
  } from 'antd'

class AddUpdateForm extends Component {

  static propTypes={
    //setFrom 必须是一个函数
    setFrom : PropTypes.func.isRequired,
    //categoryName  必须是一个字符串
    categoryName: PropTypes.string,
  }

  componentWillMount(){
    this.props.setFrom(this.props.form);
  }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('categoryName', {
                initialValue : categoryName||'',
                rules: [{ required: true, message: '类型名称为必填项' }],
              })(
                <Input type="text" placeholder="请输入分类名称"></Input>
              )}
            </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddUpdateForm);
