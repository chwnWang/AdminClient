import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils.js';
import { Card, List, Icon } from 'antd';
import LinkButton from '../../utils/linkButton.js';
import {reqCategory} from '../../api';
import {BASE_IMG} from '../../utils/Constants';

const Item = List.Item;

/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {
  state = {
    catrgroyName:''
  }

  getCategroyName=async(categoryId)=>{
    //获取类型的ID
    const result = await reqCategory(categoryId);
    this.setState({
      catrgroyName:result.data.name,
    })
  }

  componentWillMount(){
    const product = memoryUtils.product
    if (product._id) {
      this.getCategroyName(product.categoryId)
    }
  }

  render() {
    const {catrgroyName} = this.state;
    const product = memoryUtils.product
    if (!product || !product._id) {
      return <Redirect to="/product"/>
    }
    const title = (
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
          <Icon type='arrow-left' />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )


    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类:</span>
            <span>{catrgroyName}</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片:</span>
            <span>
               {
                 product.imgs.map(img=>
                    <img className="detail-img" src={BASE_IMG+img} key={img} alt="img"/>
                 )
               }
            </span>
          </Item>
          <Item>
          <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
