"use client"

import React , { useEffect, useState , useId } from 'react';

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
  MenuCreationPath , 
  getAllMenusPath ,
  deleteMenuPath ,
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




type LayoutType = Parameters<typeof Form>[0]['layout'];





const columns = [
  {
    key: 'sort',
  },
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
    width : 100 ,
  },
  {
    title: 'والد',
    dataIndex: 'parent',
    key: 'parent',
    width : 200 ,
  },
  {
    title: 'عنوان منو',
    dataIndex: 'title',
    key: 'title',
    width : 300 ,
  },
  {
    title: 'نمایه',
    dataIndex: 'iconXML',
    key: 'icon',
    width : 100 ,
  },
  {
    title: 'مسیر',
    dataIndex: 'path',
    key: 'path',
    width : 300 ,
  },
];








import { AppState , eachItem } from '../../../../store/reducers';



interface StateType {
  menuItems : eachItem[]
}




//const parentOptions: SelectProps['options'] = [];




const iconOptions = [
  { value : 'AppstoreOutlined' , label : <AppstoreOutlined />  } ,
  { value : 'MailOutlined' , label : <MailOutlined />  } ,
  { value : 'SettingOutlined' , label : <SettingOutlined /> } ,
  { value : 'MenuUnfoldOutlined' , label : <MenuUnfoldOutlined />  } ,
  { value : 'DownOutlined' , label : <DownOutlined /> } ,
  { value : 'MenuFoldOutlined' , label : <MenuFoldOutlined />} ,
  { value : 'InfoCircleOutlined' , label : <InfoCircleOutlined /> } ,
  { value : 'FormOutlined' , label : <FormOutlined /> } ,
  { value : 'UnorderedListOutlined' , label : <UnorderedListOutlined /> } ,
  { value : 'AreaChartOutlined' , label : <AreaChartOutlined /> } ,
  { value : 'CodepenOutlined' , label : <CodepenOutlined />  } ,
  { value : 'SlackOutlined' , label : <SlackOutlined />  } ,
  { value : 'ApartmentOutlined' , label : <ApartmentOutlined /> } ,
  { value : 'CalculatorOutlined' , label : <CalculatorOutlined />  } ,
  { value : 'CloudDownloadOutlined' , label : <CloudDownloadOutlined /> } ,
  { value : 'GlobalOutlined' , label : <GlobalOutlined /> } ,
]



const routeOptions = [
  { value: "/createroll/section" },
  { value: "/createroll/barmill" },

  { value: "/createstand/section" },
  { value: "/createstand/barmill" },

  { value: "/listroll/section" },
  { value: "/listroll/barmill" },

  { value: "/liststand/section" },
  { value: "/liststand/barmill" },

  { value: "/defineline/section" },
  { value: "/defineline/barmill" },

  { value: "/manageline/section" },
  { value: "/manageline/barmill" },

  { value: "/calibrtonag/section" },
  { value: "/calibrtonag/barmill" },

  { value: "/tarashroll/section" },
  { value: "/tarashroll/barmill" },

  { value: "/rollstatus/section" },
  { value: "/rollstatus/barmill" },

  { value: "/managestand/section" },
  { value: "/managestand/barmill" },


];



interface parentType {
  value : string , 
  label : string 
}



const returnIcon = (icon : string) : any => {
  for(let i=0;i<iconOptions.length;i++) {
    if(iconOptions[i].value == icon) {
      return iconOptions[i].label ;
    }
  }

  return '';
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}


export default function Body () {




  const [ mounted , setMounted ] = useState(false);



  //const data : string = useSelector((state : any) => state.data);

  let menuItemList = useSelector((state : StateType) => state.menuItems);

  menuItemList = menuItemList.filter( (value , index) => {
    if ('id' in value) {
      return value;
    }
  })



  



  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<eachItem>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  }

  
  

  const dispatch = useDispatch();


  const setIDandIconsRecursively = (arr : any[]) => {


    arr.forEach( (value : any) => {
      if(value.children != undefined) {
        setIDandIconsRecursively(value.children);
      }
      value.key = value.id 
      value.iconXML = returnIcon(value.icon);
    })

    return arr

  }



  const deleteEmptyChildrenRecursively = ( arr : any[] ) => {

  }



  const getAllMenus = () => {
    axios.get(getAllMenusPath)
    .then(function (response) {
      // handle success
      //setMenus();
      

      response.data = setIDandIconsRecursively(response.data);
      /*
      response.data.forEach( (value : any) => {
        value.key = value.id 
        value.iconXML = returnIcon(value.icon);
      })
      */




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

      let parentArray = response.data.map( (value : any) => {
        if( value.parent == '-' ) {
          return {
            value : value.id + "" ,
            label : value.title 
          }
        } 
      })



      setParentOptions(parentArray);



      setMenus(response.data);

      //setTreeData(response.data);

      //dispatch(updateMenuItems({ payload : response.data }))


    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }


  


  const dndID = useId();

  /*
    form
  */

  const [parent, setParent] = useState(0);
  const [parentText, setParentText] = useState('');
  const [parentOptions , setParentOptions] = useState<parentType[]>([]);

  const [icon , setIcon]= useState('');

  const [menuTitle , setMenuTitle] = useState("");

  const [menuPath , setMenuPath] = useState("");

  const [menus , setMenus] = useState<eachItem[]>(menuItemList);
  const [treeData , setTreeData] = useState<eachItem[]>(menuItemList);

  const [pageSize , setPageSize] = useState(3);


  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: pageSize,
    },
  });


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

  /*
  const { isLoading, error, data } = useQuery('repoData', () => 
    //'admin / menus'
    fetch(URL).then(res =>
      res.json()
    )
  )
  
  

  if (error) return 'An error has occurred: ' + error

  */

  


  const sendDeleteRequest = () : void => {
    
    axios.post(deleteMenuPath, {
      array : selectedRowKeys
    })
    .then(function (response) {
      console.log(response);
      getAllMenus();
      setDeleteLoading(false);
      successMenuDeletion();
      // dispatch(updateMenu(''));
    })
    .catch(function (error) {
      console.log(error);
      setDeleteLoading(false);
      errorMenuDeletion();
    });


  }




  const handleDelete = () => {
    setDeleteLoading(true);
    setTimeout( () => {
      sendDeleteRequest()
    } , 1000 )
  }


  const handleParentChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  


  const handleForm = () => {

    setCreateLoading(true);

    console.log({
      parent ,
      menuTitle ,
      icon ,
      menuPath 
    });

    axios.post(MenuCreationPath, {
      parent : parent ,
      title: menuTitle,
      icon : icon ,
      path: menuPath
    })
    .then(function (response) {
      console.log(response);
      getAllMenus();

      setParent(0);
      setParentText('');
      setIcon('');
      setMenuTitle('');
      setMenuPath('');

      successMenuCreation();
      setCreateLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      errorMenuCreation();
      setCreateLoading(false);
    });
  }


  const returnParentText = (id : string) : string => {
    for(let i=0;i<parentOptions.length;i++) {
      if(parentOptions[i].value == id) {
        return parentOptions[i].label;
      }
    }

    return '';
  }



  const successMenuCreation = () => {
    Modal.success({
      title : 'ایجاد منوی جدید' ,
      content: 'منوی جدید با موفقیت ایجاد شد',
      okText:"مرسی"
    });
  };
  
  const errorMenuCreation = () => {
    Modal.error({
      title: 'خطا',
      content: 'لطفاً فیلد ها را به درستی پر کنید' ,
      okText:"مرسی"
    });
  };



  const successMenuDeletion = () => {
    Modal.success({
      title : 'حذف منو' ,
      content: 'منو با موفقیت حذف شد',
      okText:"مرسی"
    });
  };
  
  const errorMenuDeletion = () => {
    Modal.error({
      title: 'خطا',
      content: 'مشکلی در حذف منو به وجود آمد',
      okText:"مرسی"
    });
  };




  const handleTablePageSizeChange = (value : string) => {
    setPageSize(Number(value));
    //console.log(value);
  }


  interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
  }


  const Row = ({ children, ...props }: RowProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });
  
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 3 } : {}),
    };
  
    return (
      <tr 
      {...props} 
      ref={setNodeRef} 
      style={style} 
      { ...attributes  }
      aria-describedby={""}
      >
        {React.Children.map(children, (child) => {
        

          if ( (child as React.ReactElement).key === 'sort') {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  {...listeners}
                />
              ),
            });
          }
          
          return child;
        })}
      </tr>
    );
  };




  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setMenus((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };






  useEffect( () => {
    //console.log(`running useEffect ...`);
    getAllMenus();
    
    setMounted(true);


    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );




  if (mounted == false) return 'loading...'



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
            مدیریت منوها
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



          <Form.Item label="عنوان منو">
            <Input placeholder="عنوان منو" value={menuTitle} onChange={(e) => setMenuTitle(e.target.value)} />
          </Form.Item>


          <Form.Item label="نمایه">
            {/* <Input placeholder="path" value={menuPath} onChange={(e) => setMenuPath(e.target.value)}  style={{ direction : 'ltr' }} /> */}
              <div className="allChildrenLeftAlign">
              <Select
                allowClear
                style={{ width: '100%'  }}
                placeholder="نمایه را انتخاب کنید"
                value={icon == '' ? null : icon}
                options={iconOptions}
                onChange={(value) => setIcon(value)}
              />
              </div>
          </Form.Item>


          <Form.Item label="والد">
            {/* <InputNumber placeholder="والد" value={parent} onChange={(value) => setParent(Number(value))} /> */}
              <RightToLeft>
              <Select
                allowClear
                style={{ width: '100%'  }}
                placeholder="والد را انتخاب کنید"
                value={parent == 0 ? null : returnParentText(parent.toString())}
                onChange={(value) => {
                  console.log(value);
                  if(value == undefined) {
                    setParent(0);
                    setParentText("");
                  } else {
                    setParent(Number(value));
                    setParentText(value + "");
                  }
                }}
                options={parentOptions}
              />
              </RightToLeft>
          </Form.Item>
          


          <Form.Item label="مسیر">
            {/* <Input placeholder="path" value={menuPath} onChange={(e) => setMenuPath(e.target.value)}  style={{ direction : 'ltr' }} /> */}
              <div className="allChildrenLeftAlign">
              <AutoComplete
                options={routeOptions}
                value={menuPath}
                onChange={(value) => setMenuPath(value)}  
                style={{ width: 200 , direction : 'ltr' }}
                placeholder="path"
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              </div>
          </Form.Item>


          <Form.Item {...buttonItemLayout}>
            <Button 
            onClick={handleForm} 
            loading={createLoading}
            //disabled={createLoading}
            type="primary"
            >
              ایجاد منو
            </Button>
          </Form.Item>


        </Form>

        </MenuCreationFormWrapper>
        
        
        

        <div>
          <div style={{ marginBottom: 16 , marginTop : 16 , justifyContent : 'flex-start'  }}>
            {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button> */}
            {/* <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span> */}
            <Select
              labelInValue
              defaultValue={{ value: '3', label: 'صفحه / 3' }}
              style={{ width: 120 }}
              onChange={(e) => handleTablePageSizeChange(e.value)}
              options={[
                {
                  value: '3',
                  label: 'صفحه / 3',
                },
                {
                  value: '6',
                  label: 'صفحه / 6',
                },
              ]}
            />
          </div>



          <DndContext 
            id={dndID}
            modifiers={[restrictToVerticalAxis]} 
            onDragEnd={onDragEnd}
          >
            <SortableContext
              // rowKey array
              items={menus.map((i) => i.key)}
              strategy={verticalListSortingStrategy}
            >

              <Table 
                rowKey="id"
                components={{
                  body: {
                    row: Row,
                  },
                }}
                rowSelection={rowSelection} 
                dataSource={menus}
                columns={columns} 
                pagination={{ pageSize: pageSize }}
                scroll={{ x: 500 }}
                //onChange={handleTableChange}
              />
            
            </SortableContext>
          </DndContext>

          
        </div>


        {
          selectedRowKeys.length > 0 ?
          <FormWrapper>
            <div className="deleteForm">
              <Button 
              onClick={() => handleDelete()}
              type={"primary"}  
              style={{ marginRight : '20px' , marginLeft : '20px' }}
              danger={!deleteLoading}
              loading={deleteLoading}
              //disabled={deleteLoading}
              >
                حذف
              </Button>
            </div>

            {
             selectedRowKeys.length == 1 ?
            <div className="editForm">
              <Button 
              onClick={ () => {} }
              type={"primary"}  
              //loading={deleteLoading}
            >
                ویرایش
              </Button>
            </div> : "" 
            }

          </FormWrapper>
          : ""
        }
        


      {/* 
        <div>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            //defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div> */}


      {/* <Button type="primary" onClick={() => console.log(menus)}>
        Click
      </Button> */}


    </ContentWrapper>
  );
};