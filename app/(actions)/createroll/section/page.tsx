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
import { valueType } from 'antd/es/statistic/utils';


const Wrapper = styled.div`
  display : flex;
`

const Preview = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  flex : 1;
`

const FormItem = styled.div`
  margin-bottom : 30px;
`

export default function App () {

  const [numberOfCalibres , setNumberOfCalibres] = useState(0);

  return (
    <Wrapper>
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
              <label htmlFor="">عرض غلطک : </label>
              <Form.Item>
                <InputNumber 
                onChange={ (value) => {} } 
                placeholder='عرض' 
                dir="ltr" 
                style={{ paddingLeft : '15px' }} 
                />
              </Form.Item>
            </FormItem>

            
            <FormItem>
              <label htmlFor="">تعداد کالیبر : </label>
              <Form.Item>
                <InputNumber 
                onChange={(value) => setNumberOfCalibres(Number(value))} 
                placeholder='تعداد' 
                dir="ltr" 
                style={{ paddingLeft : '15px' }} 
                />
              </Form.Item>
            </FormItem>


            <Form.Item>
              <Button type="primary">ایجاد غلطک</Button>
            </Form.Item>


        </Form>

        <Preview>
          {numberOfCalibres}
        </Preview>
    </Wrapper>
  );
};

