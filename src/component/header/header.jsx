import React, { Component } from 'react';
import { formateDate } from '../../utils/dateUtils.js';
import { reqWeather } from '../../api';
import LinkButton from '../../utils/linkButton';
import { Modal } from 'antd';
import storageUtils from '../../utils/storageUtils.js';
import memoryUtils from '../../utils/memoryUtils.js';
import {withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig.js';
import './header.less';
const { confirm } = Modal;

class Header extends Component {

    state = {
        sysTime: formateDate(Date.now()),
        dayPictureUrl: '', // 天气图片的url
        weather: ''
    }
    /*设置天气 */
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('北京');
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    /*设置时间 */
    getSysTime = () => {
        this.timeId = setInterval(() => {
            this.setState({
                sysTime: formateDate(Date.now())
            })
        }, 1000);
    }
    /*退出操作 */
    logout = () => {
        confirm({
            content: '您确定退出吗?',
            onOk:()=>{
                storageUtils.removeUser();
                memoryUtils.user = {};
                // 跳转到login
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    /**获取title */
    getTitle=()=>{
        let title='';
        const path = this.props.location.pathname;
        menuList.forEach((item)=>{
            if(item.key===path){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem=>cItem.key===path);
                if(cItem){
                    title = cItem.title;
                }
            }
        })
        
        return title;
    }
    /*组件刚挂载之后 */
    componentDidMount() {
        this.getSysTime()
        this.getWeather()
    }
    /*组件即将被卸载 */
    componentWillUnmount() {
        clearInterval(this.timeId)

    }

    render() {
        const { sysTime, dayPictureUrl, weather } = this.state;
        const title = this.getTitle();
        return (
            <div className='header'>
                <div className='header_top'>
                    <span> 欢迎 admin</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header_bottom'>
                    <div className='header_bottom_left'>
                        {title}
                    </div>
                    <div className='header_bottom_right'>
                        <span> {sysTime}</span>
                        <img src={dayPictureUrl} alt='img' />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
