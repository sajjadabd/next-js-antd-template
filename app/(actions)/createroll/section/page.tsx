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
  max-height : 100vh;
  position : fixed;
  left : 30%;
  top : 50%;
  transform : translate(-50% , -50%);
`

const FormItem = styled.div`
  margin-bottom : 30px;
`

export default function App () {

  const [rollType , setRollType] = useState(0);
  const [rollModel , setRollModel] = useState(0);
  const [rollCode , setRollCode] = useState("");
  const [rollPosition , setRollPosition] = useState("");

  const [rollGender , setRollGender] = useState("");
  const [rollDiameter , setRollDiameter] = useState(0);
  const [rollWidth , setRollWidth] = useState(0);
  const [numberOfCalibres , setNumberOfCalibres] = useState(0);
  const [calibreWidth , setCalibreWidth] = useState(0);



  const drawCalibres = () => {
    let result = Array.from(Array(numberOfCalibres)).map( (value , index) => {
		let calibrWidthVariable ;

		if( calibreWidth != undefined && calibreWidth != 0 ) {
		  calibrWidthVariable = calibreWidth;
		} else {
		  calibrWidthVariable = rollWidth/(6 + (numberOfCalibres / 2))
		}

      return (
        <div
		key={index}
        style={{
          'width' : `${calibrWidthVariable}px` ,
          'height' : `${rollDiameter+40}px` ,
          borderWidth : `1` ,
          borderColor : 'black' ,
          borderStyle : 'solid' ,
          zIndex : 10,
          backgroundColor : 'white',
        }}
        >

        </div>
      )
    } )

    return result;
  }
  

  const drawRoll = () => {
    if(rollWidth == 0 && rollDiameter == 0 ) 
      return '';

    return (
      <>
          { /* head */  } 
          <div 
          style={{ 
            'width' : `${rollWidth/6}px` ,
            'height' : `${rollDiameter/3}px` ,
            borderWidth : `1` ,
            borderColor : 'black' ,
            borderStyle : 'solid' ,
            borderLeftWidth : 0 ,
          }}
          ></div>
          { /* body */  } 
          <div
          style={{ 
            'width' : `${rollWidth}px` ,
            'height' : `${rollDiameter}px` ,
            borderWidth : `1` ,
            borderColor : 'black' ,
            borderStyle : 'solid' ,
            position : 'relative' ,
            display : 'flex' ,
            justifyContent : 'space-evenly',
            alignItems : 'center',
          }}
          >
            {drawCalibres()}
          </div>
          { /* tail */  } 
          <div 
          style={{ 
            'width' : `${rollWidth/6}px` ,
            'height' : `${rollDiameter/3}px` ,
            borderWidth : `1` ,
            borderColor : 'black' ,
            borderStyle : 'solid' ,
            borderRightWidth : 0 ,
          }}
          ></div>
        </>
    )
  }


  return (
    <Wrapper>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
            <FormItem>
                <label htmlFor="">تیپ غلطک : </label>
                <Form.Item>
                    <Select onChange={(value) => setRollType(value)}>
                        <Select.Option value="section">{section}</Select.Option>
                        <Select.Option value="barmill">{barmill}</Select.Option>
                    </Select>
                </Form.Item>
            </FormItem>

            <FormItem>
                <label>کد غلطک : </label>
                <Form.Item>
                    <Input 
                    onChange={(e) => setRollCode(e.target.value)}
                    placeholder='کد'
                     />
                </Form.Item>
            </FormItem>

            
            <Form.Item name="size">
                <label>جایگاه غلطک : </label>
                <Radio.Group  
                onChange={(e) => setRollPosition(e.target.value)}
                style={{ display : 'flex' , flexDirection : 'row'}}>
                    <Radio.Button value="beginning">مقدماتی</Radio.Button>
                    <Radio.Button value="intermediate">میانی</Radio.Button>
                    <Radio.Button value="finishing">پایانی</Radio.Button>
                </Radio.Group>
            </Form.Item> 


            <FormItem>
                <label htmlFor="">جنسیت غلطک : </label>
                <Form.Item>
                    <Select 
                    onChange={(value) => setRollGender(value)}
                    >
                        <Select.Option value="male">نری</Select.Option>
                        <Select.Option value="female">مادگی</Select.Option>
                    </Select>
                </Form.Item>
            </FormItem>



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



            <FormItem>
                <label htmlFor="">عرض کالیبر : </label>
                <Form.Item>
                    <InputNumber 
                    onChange={ (value) => setCalibreWidth(Number(value)) } 
                    placeholder='عرض' 
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
          {
            drawRoll()
          }
        </Preview>

    </Wrapper>
  );
};

