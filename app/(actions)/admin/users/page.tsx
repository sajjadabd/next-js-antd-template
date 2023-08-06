"use client"


import React , { useEffect, useState } from 'react';

import {  useQuery } from 'react-query';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Button, Form, Input, Radio , InputNumber } from 'antd';

import { Modal, Space } from 'antd';

import { AutoComplete } from 'antd';


import { 
  AppstoreOutlined ,
  MailOutlined , 
  SettingOutlined ,
  MenuUnfoldOutlined ,
  DownOutlined ,
  MenuFoldOutlined ,
  InfoCircleOutlined ,
  FormOutlined ,
  UnorderedListOutlined ,
  AreaChartOutlined ,
  CodepenOutlined ,
  SlackOutlined ,
  ApartmentOutlined ,
  CalculatorOutlined ,
  CloudDownloadOutlined ,
  GlobalOutlined ,
  LeftOutlined ,
} from '@ant-design/icons';


import { Tree } from 'antd';

import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';


import { Select } from 'antd';
import type { SelectProps } from 'antd';

import type { DataNode, TreeProps } from 'antd/es/tree';


import axios, {isCancel, AxiosError} from 'axios';



import { useSelector, useDispatch } from 'react-redux';

import { updateMenuItems } from '../../../../store/reducers';


import URL , { 

  getAllRolesPath ,
  
  UserCreationPath ,
  deleteUserPath ,
  getAllUsersPath ,

} from '../../../../api/request';



import { 
  ContentWrapper ,
  FormWrapper ,
  MenuCreationFormWrapper ,
  MarginBottomDIV ,
  RightToLeft ,
  LeftToRight ,
  BreadCrumbs ,
  EditButton ,
} from '../../../../components/styled/styled' ;




import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


import Loader from '../../../../components/loader/loader';




type LayoutType = Parameters<typeof Form>[0]['layout'];


interface User {
  id : number ,
  admin : number ,
  username : string ,
}




const userColumns = [
  // {
  //   key: 'sort',
  // },
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
    width : 100 ,
  },
  {
    title: 'نام کاربری',
    dataIndex: 'username',
    key: 'username',
    width : 100 ,
  },
  {
    title: 'نقش',
    dataIndex: 'role',
    key: 'role',
    width : 100 ,
  },
];








export default function App () {


  const [mounted , setMounted] = useState(false);
  const [users , setUsers] = useState<User[]>([]);


  const getAllUsers = () => {
    axios.get(getAllUsersPath)
    .then(function (response) {

      console.log(response.data);

      response.data.forEach( (value : any , index : number) => {
        value.role = value.role.title;
        value.value = index + 1;
      })

      setUsers(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }




  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

  const [role , setRole] = useState("");

  const [roles , setRoles] = useState<User[]>([]);


  const getAllRoles = () => {
    axios.get(getAllRolesPath)
    .then(function (response) {

      response.data.forEach( (value : any , index : number) => {
        value.label = value.title;
        value.value = index + 1;
      })

      //console.log(response.data);

      setRoles(response.data);



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


  // const roleOptions = [
  //   {
  //     label : "ادمین",
  //     value : "1"
  //   },
  //   {
  //     label : "مدیر سکشن",
  //     value : "2"
  //   },
  //   {
  //     label : "مدیر بارمیل",
  //     value : "3"
  //   },
  //   {
  //     label : "تراشکاری",
  //     value : "4"
  //   },
  // ]




  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');



  const[createLoading , setCreateLoading] = useState(false);
  const[deleteLoading , setDeleteLoading] = useState(false);

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };







  

  const successUserCreation = () => {
    Modal.success({
      title : 'ایجاد منوی جدید' ,
      content: 'منوی جدید با موفقیت ایجاد شد',
      okText:"مرسی"
    });
  };
  
  const errorUserCreation = () => {
    Modal.error({
      title: 'خطا',
      content: 'لطفاً فیلد ها را به درستی پر کنید' ,
      okText:"مرسی"
    });
  };



  const successUserDeletion = () => {
    Modal.success({
      title : 'حذف منو' ,
      content: 'منو با موفقیت حذف شد',
      okText:"مرسی"
    });
  };
  
  const errorUserDeletion = () => {
    Modal.error({
      title: 'خطا',
      content: 'مشکلی در حذف منو به وجود آمد',
      okText:"مرسی"
    });
  };






  const handleForm = () => {

    setCreateLoading(true);

    console.log({
      username ,
      password ,
      role ,
    });



    axios.post(UserCreationPath, {
      username: username ,
      password : password ,
      role_id : role ,
    })
    .then(function (response) {
      console.log(response);
      
      getAllUsers();

      setUsername("");
      setRole("");
      setPassword("");

      successUserCreation();
      setCreateLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      errorUserCreation();
      setCreateLoading(false);
    });



  }





  const [pageSize , setPageSize] = useState(3);


  const handleTablePageSizeChange = (value : string) => {
    setPageSize(Number(value));
    //console.log(value);
  }



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





  useEffect( () => {
    

    getAllUsers();
    getAllRoles();

    

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );


  if (mounted == false) return (
    <Loader />
  ) ;


  return (
    <ContentWrapper>

        <BreadCrumbs>
          <span>
            ادمین
          </span>
          <span>
            &gt;
          </span>
          <span>
            مدیریت کاربران
          </span>
        </BreadCrumbs>




        <MenuCreationFormWrapper>

        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 , marginTop : '20px' }}
          autoComplete="off"
        >


          <Form.Item label="نام کاربری">
            <Input 
              placeholder="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              //style={{ textAlign : 'left' }}
            />
          </Form.Item>



          <Form.Item label="نقش">
            {/* <InputNumber placeholder="والد" value={parent} onChange={(value) => setParent(Number(value))} /> */}
              <RightToLeft>
              <Select
                allowClear
                style={{ width: '100%'  }}
                placeholder="نقش را انتخاب کنید"
                value={role == '' ? null : role}
                onChange={(value) => {
                  console.log(value);
                  setRole(value);
                }}
                options={roles}
              />
              </RightToLeft>
          </Form.Item>



          <Form.Item label="رمز عبور">
            <Input.Password
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              //style={{ textAlign : 'left' }}
            />
          </Form.Item>




          <Form.Item {...buttonItemLayout}>
            <Button 
              onClick={handleForm} 
              loading={createLoading}
              disabled={createLoading}
              type="primary"
            >
              ایجاد کاربر
            </Button>
          </Form.Item>


        </Form>

        </MenuCreationFormWrapper>








        <Table 
          // rowKey="id"
          // components={{
          //   body: {
          //     row: Row,
          //   },
          // }}
          rowSelection={rowSelection} 
          dataSource={users}
          columns={userColumns} 
          pagination={{ pageSize: pageSize }}
          scroll={{ x: 500 }}
          //onChange={handleTableChange}
        />







        
    </ContentWrapper>
  );
};

