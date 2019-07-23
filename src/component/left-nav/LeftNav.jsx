import React,{ Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig';
import logo from '../../component/images/logo.png';
import './leftNav.less';
const SubMenu = Menu.SubMenu

class LeftNav extends Component {
    /*
     使用map遍历数组+函数递归
    */
    // getMenuNodes = (menuList) => {
    //     //获取路径
    //     const path = this.props.location.pathname;

    //     return menuList.map((item) => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         }
    //         return (
    //             <SubMenu
    //                 key={item.key}
    //                 title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                 }
    //             >
    //                 {this.getMenuNodes(item.children)}
    //             </SubMenu>
    //         )
    //     })
    // }
    /*
      根据指定菜单数据列表产生<Menu>的子节点数组
       使用 reduce() + 递归
     */
      getMenuNodes2 = (menuList) => {

        // 得到当前请求的path
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
          if (!item.children) {
            pre.push((
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <Icon type={item.icon}/>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            ))
          } else {

            const cItem = item.children.find(cItem=>path.indexOf(cItem.key) === 0)
            if(cItem){
              this.openKey = item.key;
            }

            pre.push((
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                  </span>
                }
              >
                {this.getMenuNodes2(item.children)}
              </SubMenu>
            ))
          }
          return pre
        }, [])
      }

      componentWillMount(){
        this.menuNodes = this.getMenuNodes2(menuList);
      }



    render() {
        let selectKey = this.props.location.pathname;
        console.log(selectKey);
        if (selectKey.indexOf('/product')===0) {
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