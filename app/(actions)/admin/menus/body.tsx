"use client"

import React , { useEffect, useState } from 'react';

import {  useQuery } from 'react-query';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Button, Form, Input, Radio , InputNumber } from 'antd';

import { Space } from 'antd';



import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';


import axios, {isCancel, AxiosError} from 'axios';



import { useSelector, useDispatch } from 'react-redux';

import { updateMenuItems } from '../../../../store/reducers';




import URL , { 
  MenuCreationPath , 
  getAllMenusPath ,
  deleteMenuPath ,
} from '../../../../api/request';

import styled from 'styled-components'






const FormWrapper = styled.div`
  margin-top : 2em;
  margin-bottom : 6em;
`



const MarginBottomDIV = styled.div`
  margin-bottom : 6em;
`



type LayoutType = Parameters<typeof Form>[0]['layout'];



interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 25,
    // address: '123 ABC Street',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 32,
    // address: '456 XYZ Street',
  },
];


const columns = [
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'والد',
    dataIndex: 'parent',
    key: 'parent',
  },
  {
    title: 'عنوان منو',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'مسیر',
    dataIndex: 'path',
    key: 'path',
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
];






//  =========================================




const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];




// ================================





import { AppState , eachItem } from '../../../../store/reducers';

interface StateType {
  menuItems : eachItem[]
}


export default function Body () {



  //const data : string = useSelector((state : any) => state.data);

  let menuItemList = useSelector((state : StateType) => state.menuItems);

  menuItemList = menuItemList.filter( (value , index) => {
    if ('id' in value) {
      return value;
    }
  })

  
  

  const dispatch = useDispatch();

  console.log(`body : ` , menuItemList);


  const getAllMenus = () => {
    axios.get(getAllMenusPath)
    .then(function (response) {
      // handle success
      //setMenus();
      
      console.log(response.data);

      response.data.forEach( (value : any) => 
        value.key = value.id 
      )

      response.data.forEach( (value : any) => {
        if(value.children.length == 0) {
          delete value.children;
        }
      })


      response.data.forEach( (value : any) => 
        value.parent = (value.parent == null ? '-' : value.parent)
      )

      response.data = response.data.filter( (value : any) => 
        value.parent == '-' 
      )



      setMenus(response.data);

      setTreeData(response.data);

      dispatch(updateMenuItems({ payload : response.data }))


    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }


  useEffect( () => {
    //console.log(`running useEffect ...`);
    getAllMenus();
    
    console.log(`body : ` , menuItemList);


    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );


  /*
    form
  */

  const [parent, setParent] = useState(0);
  const [menuTitle , setMenuTitle] = useState("");
  const [menuPath , setMenuPath] = useState("");

  const [menus , setMenus] = useState<eachItem[]>(menuItemList);
  const [treeData , setTreeData] = useState<eachItem[]>(menuItemList);


  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };



  /*
  for Tree
  */


  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };



  /*
   for Table
  */


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    
  };

  const rowSelection = {
    selectedRowKeys ,
    onChange: onSelectChange ,
  };

  const hasSelected = selectedRowKeys.length > 0;


  const { isLoading, error, data } = useQuery('repoData', () => 
    //'admin / menus'
    fetch(URL).then(res =>
      res.json()
    )
  )






  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error




  const handleDelete = () => {

    axios.post(deleteMenuPath, {
      array : selectedRowKeys
    })
    .then(function (response) {
      console.log(response);
      getAllMenus();
      // dispatch(updateMenu(''));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  


  const handleForm = () => {
    console.log({
      parent ,
      menuTitle ,
      menuPath 
    });

    axios.post(MenuCreationPath, {
      parent : parent ,
      title: menuTitle,
      path: menuPath
    })
    .then(function (response) {
      console.log(response);
      getAllMenus();

      
      setMenuTitle('');
      setMenuPath('');
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  return (
    <FormWrapper>
        

        <div>
          admin / menus
        </div>


        <div>

        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 , marginTop : '20px' }}
          autoComplete="off"
        >
          {/* <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item label="والد">
            <InputNumber placeholder="والد" value={parent} onChange={(value) => setParent(Number(value))} />
          </Form.Item>

          <Form.Item label="عنوان منو">
            <Input placeholder="عنوان منو" value={menuTitle} onChange={(e) => setMenuTitle(e.target.value)} />
          </Form.Item>


          <Form.Item label="مسیر">
            <Input placeholder="path" value={menuPath} onChange={(e) => setMenuPath(e.target.value)}  style={{ direction : 'ltr' }} />
          </Form.Item>


          <Form.Item {...buttonItemLayout}>
            <Button onClick={handleForm} type="primary">
              ایجاد منو
            </Button>
          </Form.Item>


        </Form>

        </div>
        
        
        

        <div>
          <div style={{ marginBottom: 16 }}>
            {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button> */}
            {/* <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span> */}
          </div>
          <Table rowSelection={rowSelection} dataSource={menus} columns={columns} />
        </div>


        {
          selectedRowKeys.length > 0 ?
          <FormWrapper>
            <div className="deleteForm">
              <Button 
              onClick={() => handleDelete()}
              type={"primary"}  
              danger
              >
                حذف
              </Button>
            </div>
          </FormWrapper>
          : ""
        }
        



        <div>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            //defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>


    </FormWrapper>
  );
};
