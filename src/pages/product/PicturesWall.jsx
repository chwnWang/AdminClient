import React from 'react';
import PropTypes from "prop-types"
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api';
import {BASE_IMG} from '../../utils/Constants';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false,//是否显示大图预览
    previewImage: '',  //大图的url或者是base64的值
    fileList: [ //图片对象
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });
  //获取所有上传的图片
  getImgs = () => this.state.fileList.map(file => file.name)


  /**进行大图预览的回调函数
   * file:
   */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  componentWillMount() {
    const imgs = this.props.imgs;
    if (imgs && imgs.length > 0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index,  
        name: img,  
        status: 'done',    //图片状态
        url: BASE_IMG + img
       }))
       this.setState({fileList});
    }
    

  }

  /**
   * 在file状态改变的监听回调
   * file:当前的操作(上传/删除) 
   * {fileList}  传入的是一个对象,对象里面有一个fileList属性
   */
  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      //将数组中的最后一个file添加屌file变量中
      file = fileList[fileList.length - 1];
      //取出响应数据的name和url
      const { name, url } = file.response.data;
      //保存到上传的file对象中
      file.name = name;
      file.url = url;
    } else if (file.status === 'removed') {
      const result = reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success('删除成功')
      }
    }
    //更新状态
    this.setState({ fileList });
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"  //图片上传的路径
          name='image' //文件名对应的参数名
          listType="picture-card"//显示风格
          fileList={fileList}// 已上传的所有图片文件信息对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}