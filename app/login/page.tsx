"use client"

import React , { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import styles from './page.module.css';

import styled from 'styled-components'

const Header = styled.h1`
    margin-bottom : 2em;
`

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");


    return (
        <>

          <Header>
              نرم افزار مدیریت غلطک ها
          </Header>

          <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 , margin : 0 , padding : 0 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
              <Form.Item
                label="نام کاربری"
                name="username"
                rules={[{ 
                    required: true, 
                    message: 'لطفا نام کاربری خود را وارد کنید'
                }]}
              >

                  <Input 
                    placeholder="نام کاربری"
                    style={{ minWidth : '20vw' }} 
                  />
              
              </Form.Item>
      
              <Form.Item
                label="رمز عبور"
                name="password"
                rules={[{ 
                    required: true, 
                    message: 'لطفاً رمز عبور خود را وارد کنید' 
                }]}
              >
              <Input.Password 
                placeholder="رمز عبور"
                style={{ minWidth : '20vw' }} 
              />
              </Form.Item>
      
              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
              </Form.Item>
      
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                      ورود
                  </Button>
              </Form.Item>
          </Form>
        </>
    )
};


