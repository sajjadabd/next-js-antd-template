"use client"

import React , { useState } from 'react';

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';


import styled from 'styled-components'


import { section , barmill } from '../../../../components/lines/page';


const FormItem = styled.div`
  margin-bottom : 30px;
`

export default function App () {
  return (
    <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
            <FormItem>
              <label htmlFor="">انتخاب کنید : </label>
              <Form.Item>
                <Select>
                  <Select.Option value="section">{section}</Select.Option>
                  <Select.Option value="barmill">{barmill}</Select.Option>
                </Select>
              </Form.Item>
            </FormItem>

            <FormItem>
              <label>متن ورودی : </label>
              <Form.Item>
                <Input placeholder='متن' />
              </Form.Item>
            </FormItem>
            
            <FormItem>
              <label htmlFor="">شماره : </label>
              <Form.Item>
                <InputNumber placeholder='شماره' dir="ltr" style={{ paddingLeft : '15px' }} />
              </Form.Item>
            </FormItem>


            <Form.Item>
              <Button type="primary">ایجاد غلطک</Button>
            </Form.Item>


        </Form>
    </div>
  );
};

