import React from "react";
import styles from './Header.module.css'
import {Dropdown, Input, Layout, Typography, Menu, Button} from 'antd'
import logo from '../../assets/logo.svg'
import { GlobalOutlined } from '@ant-design/icons';
export const Header: React.FC = () =>{
    return (
          <div className={styles.App} >

      <div className={styles['app-header']}>
        {/* top-header */}
       <div className={styles.inner}>
          <div className={styles['top-header']}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button style={{marginLeft:15}} overlay={
            <Menu>
            <Menu.Item>中文</Menu.Item>
            <Menu.Item>English</Menu.Item>
            </Menu>
          } 
          icon= {<GlobalOutlined/>} 
          >语言</Dropdown.Button>
          <Button.Group className={styles['button-group']}>
           <Button>注册</Button>
           <Button>登录</Button>
          </Button.Group>
        </div>
       </div>

        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']}/>
          <Typography.Title level={3} className={styles.title}>React Travel Now</Typography.Title>
          <Input.Search placeholder='{请输入旅游目的地、主题或关键字}' className={styles['search-input']}></Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>首页</Menu.Item>
          <Menu.Item key={2}>周末游</Menu.Item>
           <Menu.Item key={3}>跟团游</Menu.Item>
          <Menu.Item key={4}>自由行</Menu.Item>
          <Menu.Item key={5}>私家团</Menu.Item>
          <Menu.Item key={6}>邮轮</Menu.Item>
          <Menu.Item key={7}>酒店</Menu.Item>
          <Menu.Item key={8}>当地游</Menu.Item>
          <Menu.Item key={9}>主题游</Menu.Item>
          <Menu.Item key={10}>游学</Menu.Item>
          <Menu.Item key={11}>签证</Menu.Item>
          <Menu.Item key={12}>企业游</Menu.Item>
          <Menu.Item key={13}>高端游</Menu.Item>
          <Menu.Item key={14}>户外游</Menu.Item>
          <Menu.Item key={15}>保险</Menu.Item>
        </Menu>
      </div>
      <Layout.Footer><Typography.Title level={3} 
      style={{textAlign:'center'}}>版权所有 @React Travel compony</Typography.Title>
      </Layout.Footer>
    </div>
    )
}

export Header