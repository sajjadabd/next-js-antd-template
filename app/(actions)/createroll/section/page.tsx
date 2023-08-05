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


import { due , universal } from '../../../../components/lines/page';


import {
  CreateRollWrapper ,
  Preview ,
  FormItem ,
  ContentWrapper ,
  BreadCrumbs , 
  Center
} from '../../../../components/styled/styled';


import axios, {isCancel, AxiosError} from 'axios';

import { Table } from 'antd';

import URL , { 
  RollerCreationPath , 
  getAllRollersPath ,
  deleteRollerPath ,
} from '../../../../api/request';

import { Modal } from 'antd';


import { Space, Spin } from 'antd';




const rollerColumns = [
  // {
  //   key: 'sort',
  // },
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
    width: 10,
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

  const [rollType , setRollType] = useState(-1);
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

      setMounted(true);
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

      setRollType(-1);
      setRollCode("");
      setRollPosition("");
      setRollGender("");
      setRollDiameter(0);
      setRollWidth(0);
      setNumberOfCalibres(0);
      setCalibreWidth(0);

      form.resetFields();

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





  const handleRollType = (value : any) => {

    console.log(value);

    if( value == universal ) {
      setNumberOfCalibres(1) ;
    } else {
      setNumberOfCalibres(0) ;
    }

    setRollType(value)
  }






  useEffect( () => {
    //console.log(`running useEffect ...`);
    getAllRollers();
    
    


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


  const [form] = Form.useForm();



  if(mounted == false) return (
      <Spin size="large" />
  ) ;


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
          form={form}
          initialValues={{ 
            type: null ,
            code : null ,
            position : null ,
            gender : null ,
            calibreDiameter : null ,
            RollWidth : null ,
            numberOfCalibr : null ,
            calibrWidth : null ,
          }}
        >

            <FormItem>
                <label htmlFor="text">تیپ غلطک : </label>
                <Form.Item
                name="type"
                >
                    <Select 
                    onChange={(value) => handleRollType(value)} 
                    value={rollType == -1 ? null : rollType}
                    >
                        <Select.Option value={due}>{due}</Select.Option>
                        <Select.Option value={universal}>{universal}</Select.Option>
                    </Select>
                </Form.Item>
            </FormItem>

            <FormItem>
                <label htmlFor='code'>کد غلطک : </label>
                <Form.Item
                name="code"
                >
                    <Input 
                    
                    onChange={(e) => setRollCode(e.target.value)}
                    placeholder='کد'
                    value={rollCode}
                     />
                </Form.Item>
            </FormItem>

            <FormItem>
            <label htmlFor='position'>جایگاه غلطک : </label>
            <Form.Item 
            name="position"
            >
                <Radio.Group  
                  
                  onChange={(e) => setRollPosition(e.target.value)}
                  style={{ display : 'flex' , flexDirection : 'row'}}
                  value={rollPosition == "" ? null : rollPosition}
                  buttonStyle="solid"
                >
                    <Radio.Button value="roughing">Roughing</Radio.Button>
                    <Radio.Button value="intermediate">Intermediate</Radio.Button>
                    <Radio.Button value="finishing">Finishing</Radio.Button>
                </Radio.Group>
            </Form.Item> 
            </FormItem>


            <FormItem>
                <label htmlFor="text">جنسیت غلطک : </label>
                <Form.Item
                name="gender"
                >
                    <Select 
                    onChange={(value) => setRollGender(value)}
                    value={rollGender}
                    >
                        <Select.Option value="male">نری</Select.Option>
                        <Select.Option value="female">مادگی</Select.Option>
                    </Select>
                </Form.Item>
            </FormItem>



            <FormItem>
                <label htmlFor="calibreDiameter">قطر غلطک : </label>
                <Form.Item
                name="calibreDiameter"
                >
                    <InputNumber 
                    
                    onChange={ (value) => setRollDiameter(Number(value)) } 
                    placeholder='قطر' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    value={rollDiameter == 0 ? null : rollDiameter}
                    />
                </Form.Item>
            </FormItem>


            <FormItem>
                <label htmlFor="calibrWidth">عرض غلطک : </label>
                <Form.Item
                name="RollWidth"
                >
                    <InputNumber 
                    
                    onChange={ (value) => setRollWidth(Number(value)) } 
                    placeholder='عرض' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    value={rollWidth == 0 ? null : rollWidth}
                    />
                </Form.Item>
            </FormItem>

            
            <FormItem>
                <label htmlFor="numberOfCalibr">تعداد کالیبر : </label>
                <Form.Item
                name="numberOfCalibr"
                >
                    <InputNumber 
                    
                    onChange={(value) => setNumberOfCalibres(Number(value))} 
                    placeholder='تعداد' 
                    dir="ltr" 
                    style={{ paddingLeft : '15px' }} 
                    value={numberOfCalibres == 0 ? null : numberOfCalibres}
                    />
                </Form.Item>
            </FormItem>



            <FormItem>
                <label htmlFor="calibrWidth">عرض کالیبر : </label>
                <Form.Item
                name="calibrWidth"
                >
                    <InputNumber
                      
                      onChange={ (value) => setCalibreWidth(Number(value)) }
                      placeholder='عرض'
                      dir="ltr"
                      style={{ paddingLeft : '15px' }}
                      value={calibreWidth == 0 ? null : calibreWidth}
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


            {/* <Form.Item>
              <Button 
                htmlType='reset'
              >
                reset form
              </Button>
            </Form.Item> */}


        </Form>




        </CreateRollWrapper>


        {/*       
        <Preview style={{marginBottom : '100px'}}>
          {drawRoll()}
        </Preview> 
        */}




        <Table 
          rowSelection={rowSelection} 
          dataSource={rollers}
          columns={rollerColumns} 
          pagination={{ pageSize: pageSize }}
          scroll={{ x: 1000 }}
          //onChange={handleTableChange}
        />



        


    




    
    </ContentWrapper>

    
  );
};

