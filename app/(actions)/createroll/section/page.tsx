"use client"

import React , { useState , useEffect } from 'react';

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


import { section , barmill } from '../../../../components/lines/page';


import {
  CreateRollWrapper ,
  Preview ,
  FormItem ,
  ContentWrapper ,
  BreadCrumbs
} from '../../../../components/styled/styled';


import axios, {isCancel, AxiosError} from 'axios';

import { Table } from 'antd';

import URL , { 
  RollerCreationPath , 
  getAllRollersPath ,
  deleteRollerPath ,
} from '../../../../api/request';

import { Modal } from 'antd';




const rollerColumns = [
  // {
  //   key: 'sort',
  // },
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'جنس غلطک',
    dataIndex: 'gender',
    key: 'gender',
    width: 70,
  },
  {
    title: 'عرض غلطک',
    dataIndex: 'width',
    key: 'width',
    width: 70,
  },
  {
    title: 'قطر غلطک',
    dataIndex: 'diameter',
    key: 'diameter',
    width: 70,
  },
  {
    title: 'تیپ غلطک',
    dataIndex: 'type',
    key: 'type',
    width: 70,
  },
  {
    title: 'کد غلطک',
    dataIndex: 'roller_code',
    key: 'roller_code',
    width: 70,
  },
  {
    title: 'جایگاه غلطک',
    dataIndex: 'position',
    key: 'position',
    width: 70,
  },
];






export default function App () {

  const [mounted , setMounted] = useState(false);

  const [rollType , setRollType] = useState(0);
  const [rollModel , setRollModel] = useState(0);
  const [rollCode , setRollCode] = useState("");
  const [rollPosition , setRollPosition] = useState("");

  const [rollGender , setRollGender] = useState("");
  const [rollDiameter , setRollDiameter] = useState(0);
  const [rollWidth , setRollWidth] = useState(0);
  const [numberOfCalibres , setNumberOfCalibres] = useState(0);
  const [calibreWidth , setCalibreWidth] = useState(0);

  const[createLoading , setCreateLoading] = useState(false);
  const[deleteLoading , setDeleteLoading] = useState(false);



  const [ rollers , setRollers ] = useState([]);


  const [pageSize , setPageSize] = useState(3);


  const successRollerCreation = () => {
    Modal.success({
      title : 'ایجاد غلطک جدید' ,
      content: 'غلطک جدید با موفقیت ایجاد شد',
      okText:"مرسی"
    });
  };
  
  const errorRollerCreation = () => {
    Modal.error({
      title: 'خطا',
      content: 'لطفاً فیلد ها را به درستی پر کنید' ,
      okText:"مرسی"
    });
  };


  const getAllRollers = () => {
    axios.get(getAllRollersPath)
    .then(function (response) {
      setRollers(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  const handleForm = () => {

    setCreateLoading(true);

    console.log({
      rollType ,
      rollModel ,
      rollCode ,
      rollPosition ,
      rollGender ,
      rollDiameter ,
      rollWidth ,
      numberOfCalibres ,
      calibreWidth ,
    });

    
    axios.post(RollerCreationPath, {
      rollType ,
      rollModel ,
      rollCode ,
      rollPosition ,
      rollGender ,
      rollDiameter ,
      rollWidth ,
      numberOfCalibres ,
      calibreWidth ,
    })
    .then(function (response) {
      console.log(response);
      getAllRollers();

      setRollType(0);
      setRollCode("");
      setRollPosition("");
      setRollGender("");
      setRollDiameter(0);
      setRollWidth(0);
      setNumberOfCalibres(0);
      setCalibreWidth(0);


      successRollerCreation();
      setCreateLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      errorRollerCreation();
      setCreateLoading(false);
    });
    


  }



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








  useEffect( () => {
    //console.log(`running useEffect ...`);
    getAllRollers();
    
    setMounted(true);


    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys ,
    onChange: onSelectChange ,
  };

  const hasSelected = selectedRowKeys.length > 0;




  if(mounted == false) return 'loading...'


  return (
    <ContentWrapper>




        <BreadCrumbs>
          <span>
            ایجاد غلطک
          </span>
          <span>
            &gt;
          </span>
          <span>
            سکشن
          </span>
        </BreadCrumbs>





        <CreateRollWrapper>

        <Form
          layout="horizontal"
          className='createRollFormClass'
        >

            <FormItem>
                <label htmlFor="text">تیپ غلطک : </label>
                <Form.Item>
                    <Select 
                    onChange={(value) => setRollType(value)} 
                    >
                        <Select.Option value="section">{section}</Select.Option>
                        <Select.Option value="barmill">{barmill}</Select.Option>
                    </Select>
                </Form.Item>
            </FormItem>

            <FormItem>
                <label htmlFor='code'>کد غلطک : </label>
                <Form.Item>
                    <Input 
                    name="code"
                    onChange={(e) => setRollCode(e.target.value)}
                    placeholder='کد'
                     />
                </Form.Item>
            </FormItem>

            <FormItem>
            <label htmlFor='size'>جایگاه غلطک : </label>
            <Form.Item name="size">
                <Radio.Group  
                name="size"
                onChange={(e) => setRollPosition(e.target.value)}
                style={{ display : 'flex' , flexDirection : 'row'}}>
                    <Radio.Button value="roughing">مقدماتی</Radio.Button>
                    <Radio.Button value="intermediate">میانی</Radio.Button>
                    <Radio.Button value="finishing">پایانی</Radio.Button>
                </Radio.Group>
            </Form.Item> 
            </FormItem>


            <FormItem>
                <label htmlFor="text">جنسیت غلطک : </label>
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
                <label htmlFor="calibreDiameter">قطر غلطک : </label>
                <Form.Item>
                    <InputNumber 
                    name="calibreDiameter"
                    onChange={ (value) => setRollDiameter(Number(value)) } 
                    placeholder='قطر' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    />
                </Form.Item>
            </FormItem>


            <FormItem>
                <label htmlFor="calibrWidth">عرض غلطک : </label>
                <Form.Item>
                    <InputNumber 
                    name="calibrWidth"
                    onChange={ (value) => setRollWidth(Number(value)) } 
                    placeholder='عرض' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    />
                </Form.Item>
            </FormItem>

            
            <FormItem>
                <label htmlFor="numberOfCalibr">تعداد کالیبر : </label>
                <Form.Item>
                    <InputNumber 
                    name="numberOfCalibr"
                    onChange={(value) => setNumberOfCalibres(Number(value))} 
                    placeholder='تعداد' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    />
                </Form.Item>
            </FormItem>



            <FormItem>
                <label htmlFor="calibrWidth">عرض کالیبر : </label>
                <Form.Item>
                    <InputNumber
                      name="calibrWidth"
                      onChange={ (value) => setCalibreWidth(Number(value)) }
                      placeholder='عرض'
                      dir="ltr"
                      style={{ paddingLeft : '15px' }}
                    />
                </Form.Item>
            </FormItem>




            <Form.Item>
              <Button 
              onClick={() => handleForm()} 
              loading={createLoading}
              type="primary"
              >
                ایجاد غلطک
              </Button>
            </Form.Item>


        </Form>




        </CreateRollWrapper>



        <Table 
          rowSelection={rowSelection} 
          dataSource={rollers}
          columns={rollerColumns} 
          pagination={{ pageSize: pageSize }}
          scroll={{ x: 1000 }}
          //onChange={handleTableChange}
        />



        {/* <Preview>
          {drawRoll()}
        </Preview> */}




    




    
    </ContentWrapper>

    
  );
};

