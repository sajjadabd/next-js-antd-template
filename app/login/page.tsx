"use client"

import React , { useState , useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { useRouter , usePathname } from 'next/navigation';

import styles from './page.module.css';

import styled from 'styled-components'

import axios from 'axios';

import {
  UserLoginPath ,
  CheckUserAuthentication
} from '../../api/request';


import {
  LoginWrapper ,
  CenterForLayout ,
  CenterForLogin ,
  Center ,
} from '../../components/styled/styled';


import { Space, Spin } from 'antd';
import { Modal } from 'antd';



const Header = styled.h1`
    margin-bottom : 2em;
`

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


enum LoginState {
  Waiting = 'Waiting',
  Success = "Success",
  Failure = "Failure",
};


export default function Login() {


    const [mounted , setMounted] = useState(false);

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const [success , setSuccess] = useState<LoginState>(LoginState.Waiting);

    const router = useRouter();


    const errorAuth = () => {
      Modal.error({
        title: 'خطا',
        content: 'لطفاً فیلد ها را به درستی پر کنید' ,
        okText:"مرسی"
      });
    };



    const checkUserAuthentication = () => {

      let user = localStorage.getItem('user') ?? "{}";
      console.log(user);
      let userJson = JSON.parse(user);
      console.log(user);
      axios.post(CheckUserAuthentication, {
        username : userJson.username ?? "" ,
        password : userJson.password ?? "" ,
        token : userJson.token ?? "" ,
      })
      .then(function (response) {

        const { success } = response.data;
        console.log(success);

        if(success) {
          router.replace('/');
          setTimeout(() => setSuccess(LoginState.Success), 2000)
        } else {
          setSuccess(LoginState.Failure);
        }

        
        //router.replace('/')

        //getAllUsers();
        //setCreateLoading(false);
        
      })
      .catch(function (error) {
        console.log(error);

        
        //setCreateLoading(false);
      })
      .finally(function() {
        
      }) ;
    }



    const handleSubmit = () => {


      console.log({
        username,
        password
      });


      axios.post(UserLoginPath, {
        username: username ,
        password : password ,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data.token);

        localStorage.setItem('user', JSON.stringify({ 
          username : username ,
          password : password ,
          token : response.data.token ,
        }));

        router.push('/')

        //getAllUsers();
        //setCreateLoading(false);
      })
      .catch(function (error) {
        console.log(error);

        errorAuth();
        //setCreateLoading(false);
      });
      

    }



    checkUserAuthentication();


    useEffect(() => {
        
      setMounted(true);

      return () => {
        // Clean up resources or cancel any pending operations.
      };


    }, []);


    if( success == LoginState.Waiting ) return (
      <CenterForLogin>
        <Spin size="large" />
      </CenterForLogin>
    );


    return (
        <LoginWrapper>

          <Header>
                مدیریت غلطک ها
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
                    onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              </Form.Item>
      
              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
              </Form.Item>
      
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button 
                  onClick={() => handleSubmit()}
                  type="primary" >
                      ورود
                  </Button>
              </Form.Item>
          </Form>
        </LoginWrapper>
    )
};


