import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'
const Item = Form.Item;

class RolesFrom extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        //调用的是父组件的方法  (传入的是子组件的from)
        this.props.setForm(this.props.form)
    }
    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }

        return (
            <Form>
                <Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('roleName', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '必须输入角色名称' }
                            ]
                        })(
                            <Input placeholder='请输入角色名称' />
                        )
                    }
                </Item>

            </Form>
        )
    }
}

export default Form.create()(RolesFrom)
