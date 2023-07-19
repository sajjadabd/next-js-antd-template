"use client"

import React , { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Button, Form, Input, Radio } from 'antd';



import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';


import axios, {isCancel, AxiosError} from 'axios';


import URL , { MenuCreationPath , getAllMenusPath } from '../../../../api/request';


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










export default function Body () {

  const getAllMenus = () => {
    axios.get(getAllMenusPath)
    .then(function (response) {
      // handle success
      //setMenus();
      
      console.log(response);

      response.data.forEach( (value : any) => 
        value.key = value.id  
      )

      console.log(response.data);

      setMenus(response.data)
      setTreeData(response.data);
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
    console.log(`running useEffect ...`);
    getAllMenus();
  } , [] );


  /*
    form
  */

  const [menuTitle , setMenuTitle] = useState("");
  const [menuPath , setMenuPath] = useState("");

  const [menus , setMenus] = useState([]);
  const [treeData , setTreeData] = useState([]);


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
    selectedRowKeys,
    onChange: onSelectChange,
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


  


  const handleForm = () => {
    console.log({
      menuTitle ,
      menuPath 
    });

    axios.post(MenuCreationPath, {
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
    <div>
        

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
        



        <div>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>


    </div>
  );
};
