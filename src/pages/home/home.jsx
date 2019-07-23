import React, { Component } from 'react';
import { Row, Col } from 'antd';


import imgBd from './images/bd_190624.jpg'
import imgH5 from './images/h5190708.jpg'
import imgJava from './images/java_190624.jpg'
import imgLinux from './images/linux190717.jpg'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import xuexi from './images/xuexi.png';
import huodong from './images/huodong.png';
import './home.less'

export default class home extends Component {

    render() {
        const title = (
            <span>开班典礼</span>
        )
        return (
            <div className='home'>
                <Row className='home_title'>
                    <Col span={24}>
                        <span><img src={xuexi}/>
                        </span>开班典礼</Col>
                </Row>
                <Row>
                    <Col className='row_list' span={5}>
                        <span>
                            <img src={imgBd}/>
                            <h1>【北京】0717期大数据运维+Python自动化就业班,火爆开学！</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={imgJava}/>
                            <h1>【北京】0717期大数据运维+Python自动化就业班,火爆开学！</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={imgLinux}/>
                            <h1>【北京】0717期大数据运维+Python自动化就业班,火爆开学！</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={imgH5}/>
                            <h1>【北京】0717期大数据运维+Python自动化就业班,火爆开学！</h1>
                        </span>
                    </Col>
                </Row>
                <Row className='home_title'>
                    <Col span={24}><span><img src={huodong}/>
                        </span>学员活动</Col> 
                </Row>
                <Row>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={img1}/>
                            <h1>尚硅谷奥森拓展之凝聚你我, 放飞梦想！欢乐同行，一路歌飞！</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={img2}/>
                            <h1>青春正好，恋爱趁早—尚硅谷老学员专属联谊活动圆满举办</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={img3}/>
                            <h1>硅谷前沿技术会暨同学会圆满举办！与阿里专家技术大咖面对面”活动</h1>
                        </span>
                    </Col>
                    <Col className='row_list' span={5}>
                    <span>
                            <img src={img4}/>
                            <h1>畅享IT，畅游深圳——尚硅谷深圳校区2018春游记</h1>
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
