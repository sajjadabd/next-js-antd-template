"use client"


import React , { useEffect, useState } from 'react';

import {  useQuery } from 'react-query';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Button, Form, Input, Radio , InputNumber } from 'antd';

import { Modal } from 'antd';

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
  Center
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


import { Space, Spin } from 'antd';

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
    title: 'عنوان نقش',
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







  

  const successRoleCreation = () => {
    Modal.success({
      title : 'ایجاد نقش جدید' ,
      content: 'نقش جدید با موفقیت ایجاد شد',
      okText:"مرسی"
    });
  };
  
  const errorRoleCreation = () => {
    Modal.error({
      title: 'خطا',
      content: 'لطفاً فیلد ها را به درستی پر کنید' ,
      okText:"مرسی"
    });
  };



  const successRoleDeletion = () => {
    Modal.success({
      title : 'حذف نقش' ,
      content: 'نقش با موفقیت حذف شد',
      okText:"مرسی"
    });
  };
  
  const errorRoleDeletion = () => {
    Modal.error({
      title: 'خطا',
      content: 'مشکلی در حذف نقش به وجود آمد',
      okText:"مرسی"
    });
  };






  const handleForm = () => {

    setCreateLoading(true);

    console.log({
      title : role ,
    });

    axios.post(RoleCreationPath, {
      title : role,
    })
    .then(function (response) {
      console.log(response);
      getAllRoles();

      setRole("");

      successRoleCreation();
      setCreateLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      errorRoleCreation();
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

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );


  if(mounted == false) return (
      <Spin size="large" />
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

