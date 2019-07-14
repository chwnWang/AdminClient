import React,{Component} from 'react';
import { Form, Icon, Input, Button} from 'antd';
import loginImg from './images/logo.png';
import './login.less';


export default class Login extends Component{
    render() {
        return (
            <div className='login'>
               <div className='login-header'>
                   <img src={loginImg} alt=''/>
                   <h1>后台管理系统</h1>
               </div>
               <div className='login-content'>
                   <h3>用户管理</h3>
                   <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
        <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />
        </Form.Item>
        <Form.Item>
        <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
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