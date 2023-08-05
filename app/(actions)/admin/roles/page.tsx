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
  RoleCreationPath ,
  getAllRolesPath ,
  deleteRolePath
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
  RoleCreationFormWrapper ,
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


type LayoutType = Parameters<typeof Form>[0]['layout'];


interface User {
  id : number ,
  admin : number ,
  username : string ,
}





const roleColumns = [
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
    title: 'عنوان منو',
    dataIndex: 'title',
    key: 'title',
    width : 300 ,
  },
];




export default function App () {


  const [mounted , setMounted] = useState(false);
  const [roles , setRoles] = useState<User[]>([]);


  const getAllRoles = () => {
    axios.get(getAllRolesPath)
    .then(function (response) {

      setRoles(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }





  const [role , setRole] = useState("");


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
      role ,
    });

    axios.post(RoleCreationPath, {
      role: role,
    })
    .then(function (response) {
      console.log(response);
      //getAllUsers();

      setRole("");

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
    
    getAllRoles(); 
    
    setMounted(true);

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );


  if(mounted == false) return 'Loading ...';


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
            مدیریت نقش ها
          </span>
        </BreadCrumbs>




        <RoleCreationFormWrapper>

          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 , marginTop : '20px' }}
            autoComplete="off"
          >



            <Form.Item label="نام نقش">
              <Input 
                placeholder="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
              />
            </Form.Item>





            <Form.Item {...buttonItemLayout}>
              <Button 
                onClick={handleForm} 
                loading={createLoading}
                disabled={createLoading}
                type="primary"
              >
                ایجاد نقش
              </Button>
            </Form.Item>


          </Form>

        </RoleCreationFormWrapper>



        <Table 
          // rowKey="id"
          // components={{
          //   body: {
          //     row: Row,
          //   },
          // }}
          rowSelection={rowSelection} 
          dataSource={roles}
          columns={roleColumns} 
          pagination={{ pageSize: pageSize }}
          scroll={{ x: 500 }}
          //onChange={handleTableChange}
        />



        
    </ContentWrapper>
  );
};

