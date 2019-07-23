import React, { Component } from 'react';
import { Card, Form, Input, Icon, Select ,Button,message} from 'antd';
import LinkButton from '../../utils/linkButton';
import RichTextEditor from './richTextEditor';
import { reqCategorys, reqAddUpdateProduct} from '../../api';
import memoryUtils from '../../utils/memoryUtils';

import PicturesWall from './PicturesWall';


const Item = Form.Item
const Option = Select.Option
/* 
商品添加/更新的路由组件
*/
class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    // 创建ref容器, 并保存到组件对象
    this.pwRef = React.createRef();
    this.editorRef = React.createRef();
  }

  state = {
    categroys: [],
  }

  /**在组件挂载之前判断是添加还是修改 */
  componentWillMount() {
    this.product = memoryUtils.product;
    this.isUpdate = !!this.product._id;
  }

  /**提交表单 */
  handleSubmit = (event) => {
    //阻止事件的默认行为
    event.preventDefault();
    //表单进行统一严重
    this.props.form.validateFields(async (err, values) => {
      const { name, desc, price, categoryId } = values
      // 收集上传的图片文件名的数组
      const imgs = this.pwRef.current.getImgs()
      const detail = this.editorRef.current.getDetail();

      //封装数据
      const product={name, desc, price, categoryId,imgs,detail};
      if (this.isUpdate) {
        product._id = this.product._id
      }
      const result = await  reqAddUpdateProduct(product);

      if(result.status===0){
         message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`);
         this.props.history.replace('/product')
      }else{
        message.error('添加失败')
      }
    })
  }


  getCategorys = async () => {
    //获取商品类型
    const result = await reqCategorys();
    if (result.status === 0) {
      const categroys = result.data;
      this.setState({
        categroys
      })
    }
  }

  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { product, isUpdate } = this;
    const title = (<span>
      <LinkButton onClick={() => { this.props.history.goBack() }}>
        <Icon type='arrow-left' />
      </LinkButton>
      <span>{isUpdate ? '修改商品' : '添加商品'}</span>
    </span>
    )
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    const { categroys } = this.state;

    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                { required: true, message: '必须输入商品名称!' }
              ],
            })(<Input placeholder="商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                { required: true, message: '必须输入商品描述!' }
              ],
            })(<Input placeholder="商品描述" />)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, message: '必须输入价格!' },
                { validator: this.validatePrice }
              ],
            })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',
              rules: [
                { required: true, message: '必须输入商品分类!' }
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
                  categroys.map(c =>
                    <Option value={c._id} key={c._id}>{c.name}</Option>)

                }
              </Select>
            )}
          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={this.pwRef} imgs={product.imgs} />
          </Item>
          <Item label='商品详情' wrapperCol={{ span: 20 }} >
            <RichTextEditor ref={this.editorRef} detail={product.detail}/>
          </Item>
          <Item >
            <Button type="primary" htmlType="submit">提交</Button>
          
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate);
