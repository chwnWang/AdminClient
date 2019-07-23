import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig';
import logo from '../../component/images/logo.png';
import './leftNav.less';
import memoryUtils from '../../utils/memoryUtils.js'
const SubMenu = Menu.SubMenu

class LeftNav extends Component {
  hasAuth=(item)=>{
      //获取当前用户的信息
      const user = memoryUtils.user;
      //获取用户的menus
      const menus = user.role.menus;
       // 1. 如果当前用户是admin
    // 2. 如果item是公开的
    // 3. 当前用户有此item的权限
    if(user.username === 'admin' || item.public || menus.indexOf(item.key)!=-1){
      return true
    }else if (item.children) {
      // 4. 如果当前用户有item的某个子节点的权限, 当前item也应该显示
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key)!=-1)
      return !!cItem 
    }

    return false;

  }
  /*
    根据指定菜单数据列表产生<Menu>的子节点数组
     使用 reduce() + 递归
   */
  getMenuNodes2 = (menuList) => {

    // 得到当前请求的path
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = item.key;
          }
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes2(item.children)}
            </SubMenu>
          ))
        }
      }

      return pre
    }, [])
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes2(menuList);
  }



  render() {
    let selectKey = this.props.location.pathname;
    console.log(selectKey);
    if (selectKey.indexOf('/product') === 0) {
      selectKey = '/product'
    }
    return (
      <div className="left_nav">
        <Link to='/home' className='logo_link'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav);