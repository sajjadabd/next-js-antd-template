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
  const [rollWidth , setRollWidth] = useState(0);
  const [rollDiameter , setRollDiameter] = useState(0);

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
              <label>کد غلطک : </label>
              <Form.Item>
                <Input placeholder='کد' />
              </Form.Item>
            </FormItem>

            
            <Form.Item name="size">
              <label>جایگاه غلطک : </label>
              <Radio.Group  style={{ display : 'flex' , flexDirection : 'row'}}>
                <Radio.Button value="small">مقدماتی</Radio.Button>
                <Radio.Button value="default">میانی</Radio.Button>
                <Radio.Button value="large">پایانی</Radio.Button>
              </Radio.Group>
            </Form.Item> 



            <FormItem>
              <label htmlFor="">قطر غلطک : </label>
              <Form.Item>
                <InputNumber 
                onChange={ (value) => setRollDiameter(Number(value)) } 
                placeholder='قطر' 
                dir="ltr" 
                style={{ paddingLeft : '15px' }} 
                />
              </Form.Item>
            </FormItem>


            <FormItem>
              <label htmlFor="">عرض غلطک : </label>
              <Form.Item>
                <InputNumber 
                onChange={ (value) => setRollWidth(Number(value)) } 
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
              <Button 
              onClick={() => console.log('clicked')} 
              type="primary"
              >
                ایجاد غلطک
              </Button>
            </Form.Item>


        </Form>

        <Preview>
          {numberOfCalibres}
        </Preview>
    </Wrapper>
  );
};

