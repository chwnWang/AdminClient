import  React,{Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
export default class Admin extends Component{
    render() {
       //const user= localStorage.getItem('user_key');
       const user = memoryUtils.user;
       if (!user._id) {
        // this.props.history.replace('/login') // 事件回调函数中进行路由跳转
        return <Redirect to="/login"/> // 自动跳转到指定的路由路径
      }
        return (
            <div>
                <h2>你好,</h2>
                 <h2>{user.username}</h2>
            </div>
        )
    }
}