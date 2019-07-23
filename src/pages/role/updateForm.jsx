import React, { Component } from 'react'
import { Form, Tree, Input } from 'antd';
import PropTypes from 'prop-types';
import menuList from '../../config/menuConfig';

const Item = Form.Item;
const TreeNode = Tree.TreeNode;
export default class UpdateForm extends Component {

    static propTypes = {
        role: PropTypes.object,
        
    }

    state={
        checkedKeys:[]
    }

    getMenus = ()=>this.state.checkedKeys;

    /**获取treeNode节点的树 */
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {
                        item.children?this.getTreeNodes(item.children): null
                    }
                </TreeNode>
            )
            return pre
        },[])
    }

    handleCheck = (checkedKeys) => {
        // 更新状态
        this.setState({
          checkedKeys
        })
      }

    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList);
        const {menus} = this.props.role;
        this.setState({
            checkedKeys:menus,
        })
    }
 
    componentWillReceiveProps(nextProps){
  
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys:menus,
        })
    }


    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }
        const { role } = this.props;
        const {checkedKeys} = this.state;
        console.log(role)
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.handleCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {
                            this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}


