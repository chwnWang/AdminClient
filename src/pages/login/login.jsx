import React, { Component } from 'react';
import { Form, Icon, Input, Button ,message} from 'antd';
import { Redirect } from 'react-router-dom';
import {reqLogin} from '../../api';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import loginImg from './images/logo.png';
import './login.less';

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();

        //对表单所有的字段进行验证
        this.props.form.validateFields(async(err,{username,password})=>{
             console.log(username,password)
             if(!err){
                //发送ajax请求  实现登录接口
                const result= await reqLogin(username,password);
                console.log(result);
                if(result.status===0){
                    const user = result.data;
                    storageUtils.saveUser(user);
                    memoryUtils.user = user;
                    this.props.history.replace('/');
                    message.success('登录成功');
                }else{
                    message.error(result.msg);
                }
             }else{
                 console.log(err)
             }
        })
    }
    /**
     * 进行对密码的验证
     */
    handleConfirmPassword = (rule, value, callback) => {
        if(!value){
            callback('密码为必填项');
        }else if(value.length<4){
            callback('密码不能小于4位');
        }else if(value.length>12){
            callback('密码不能大于12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('用户名必须是英文、数字或下划线组成');
        }else{
            callback();
        }
 }

    render() {
        const { getFieldDecorator } = this.props.form;


        //获取保存在内存中的user   如果存在就直接跳转到admin页面,不存在则登录
        const user=memoryUtils.user;
        if(user._id){
            // 自动跳转到指定的路由路径
           // this.props.history.replace('/')
           return <Redirect to='/'/>
        }
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={loginImg} alt='' />
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h3>用户管理</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { required: true, whitespace:true,message: '用户名是必须输入项' },
                                        { min:4,message:'用户名不能小于4位' },
                                        { max:12,message:'用户名不能大于12位' },
                                        { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '用户名是必须输入项' },
                                        { validator: this.handleConfirmPassword}
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrapperForm = Form.create()(Login);
export default WrapperForm;