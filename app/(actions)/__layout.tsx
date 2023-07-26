"use client"

import '../globals.css'


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" dir="rtl">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }


import React , { useEffect, useState  } from 'react';

import { createContext, useContext } from 'react';



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
} from '@ant-design/icons';


import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu, Switch } from 'antd';

import Link from 'next/link'


import { useRouter , usePathname } from 'next/navigation';

import { section , barmill } from '../../components/lines/page';


import { MenuCreationPath , getAllMenusPath } from '../../api/request';


import axios, {isCancel, AxiosError} from 'axios';

import { useQuery } from 'react-query';


import { useSelector , useDispatch  } from 'react-redux';

import { updateMenuItems } from '../../store/reducers';


import styles from './page.module.css';


import {
  Wrapper ,
  Navigation ,
  Content ,
  Gadgets ,
  NavigationResponsiveButton ,
  MainContent
} from '../../components/styled/styled'




type MenuItem = Required<MenuProps>['items'][number];



function getItem(
  label: React.ReactNode,
  key: React.Key,  
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  theme?: 'light' | 'dark',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    theme,
  } as MenuItem;
}




/*
[
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),

  getItem('ایجاد غلطک', 'sub1', <AppstoreOutlined />, [
    getItem(<Link href={routeLinks[0]}>{section}</Link>, '0'),
    getItem(<Link href={routeLinks[1]}>{barmill}</Link>, '1'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),


  getItem('ایجاد استند', 'sub2', <AppstoreOutlined />, [
    getItem(<Link href={routeLinks[2]}>{section}</Link>, '2'),
    getItem(<Link href={routeLinks[3]}>{barmill}</Link>, '3'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),


  getItem('لیست غلطک ها', 'sub3', <AppstoreOutlined />, [
    getItem(<Link href={routeLinks[4]}>{section}</Link>, '4'),
    getItem(<Link href={routeLinks[5]}>{barmill}</Link>, '5'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),


  getItem('لیست استند ها', 'sub4', <AppstoreOutlined />, [
    getItem(<Link href={routeLinks[6]}>{section}</Link>, '6'),
    getItem(<Link href={routeLinks[7]}>{barmill}</Link>, '7'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  // { type: 'divider' },

  getItem('تعریف خط', 'sub5', <SettingOutlined />, [
    getItem(<Link href={routeLinks[8]}>{section}</Link>, '8'),
    getItem(<Link href={routeLinks[9]}>{barmill}</Link>, '9'),
  ]),

  getItem('مدیریت خط', 'sub6', <SettingOutlined />, [
    getItem(<Link href={routeLinks[10]}>{section}</Link>, '10'),
    getItem(<Link href={routeLinks[11]}>{barmill}</Link>, '11'),
  ]),

  getItem('ثبت تناژ کارکرد کالیبر ها', 'sub7', <SettingOutlined />, [
    getItem(<Link href={routeLinks[12]}>{section}</Link>, '12'),
    getItem(<Link href={routeLinks[13]}>{barmill}</Link>, '13'),
  ]),

  getItem('ثبت تراش غلطک ها', 'sub8', <SettingOutlined />, [
    getItem(<Link href={routeLinks[14]}>{section}</Link>, '14'),
    getItem(<Link href={routeLinks[15]}>{barmill}</Link>, '15'),
  ]),

//   getItem('تغییر وضعیت غلطک ها', 'sub9', <SettingOutlined />, [
//     getItem(<Link href={routeLinks[16]}>{section}</Link>, '16'),
//     getItem(<Link href={routeLinks[17]}>{barmill}</Link>, '17'),
//   ]),

  getItem('وضعیت غلطک ها', 'sub9', <SettingOutlined />, [
    getItem(<Link href={routeLinks[16]}>{section}</Link>, '16'),
    getItem(<Link href={routeLinks[17]}>{barmill}</Link>, '17'),
  ]),

  getItem('مدیریت استند ها', 'sub10', <SettingOutlined />, [
    getItem(<Link href={routeLinks[18]}>{section}</Link>, '18'),
    getItem(<Link href={routeLinks[19]}>{barmill}</Link>, '19'),
  ]),



  
  getItem('ادمین', 'sub11', <SettingOutlined />, [
    getItem(<Link href={routeLinks[20]}>مدیریت منوها</Link>, '20'),
  ]),

  //getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

*/




import { AppState , eachItem } from '../../store/reducers';

interface StateType {
  menuItems : eachItem[]
}


type Action = {
  type : string ,
  payload : eachItem[],
};





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





const returnIcon = (icon : string) : any => {
  for(let i=0;i<iconOptions.length;i++) {
    if(iconOptions[i].value == icon) {
      return iconOptions[i].label ;
    }
  }

  return '';
}






export default function MainLayout({
    children 
}: {
    children: React.ReactNode 
}) {


  const menuItemList = useSelector((state : StateType) => state.menuItems);

  const dispatch = useDispatch();


  const [darkMode, setDarkMode] = useState(false);



  const [routeLinks , setRouteLinks] = useState([
    "/admin/menus" ,
  ]);

  
  const [menuItemLinks , setMenuItemList]  = useState([
    getItem('ادمین', 'sub1', <SettingOutlined />, [
      getItem(<Link href={routeLinks[0]}>مدیریت منوها</Link>, '0'),
    ]),
  ]);
  

  


  const deleteEmptyChildrenRecursively = ( arr : any[] ) => {

    arr.forEach( (value : any) => {
      if (value.children != undefined) {
        deleteEmptyChildrenRecursively(value.children);
        if(value.children.length == 0) {
          delete value.children;
        }
      }
    })

    return arr;
  }

  

  let addedRoutes : string[] = [];
  let addedMenuLinks : any = [];

  
  let subcategory : any[] = [];

  const createSubCategoriesRecursively = (arr : any[]) => {
    arr.forEach( (value : any) => {

      addedRoutes.push(value.path);

      let children : any[] = [];
      //let subcategory : any[] = [];
      
      if(value.children != undefined) {
        createSubCategoriesRecursively(value.children);
      }

      if(value.children != undefined) {
        value.children.forEach( (child : any) => {
          if(child.path != null) {
            children.push(
              getItem(<Link href={child.path}> {child.title} </Link> , 'sub' + ( value.id + child.id + 1 ), returnIcon(child.icon) )
            );
          } else {
            children.push(
              getItem(child.title , 'sub' + ( value.id + child.id + 1 ) , returnIcon(child.icon) )
            );
          }
        }) 
      }


      if( value.children == undefined && value.parent != null ) {
        return ;
      }

      
      if( value.path != null ) {
        if(children.length > 0) {
          subcategory.push( 
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (value.id + 1), returnIcon(value.icon) , [...children])
          )
        }
        else {
          subcategory.push( 
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (value.id + 1), returnIcon(value.icon) )
          )
        }
      } else {
        if(children.length > 0) {
          subcategory.push( 
            getItem(value.title , 'sub' + (value.id + 1) , returnIcon(value.icon) , [...children])
          )
        }
        else {
          subcategory.push( 
            getItem(value.title , 'sub' + (value.id + 1) , returnIcon(value.icon) )
          )
        }
      }
      


      /*
      if(value.parent == null) {
        if( value.path != null ) {
          if( subcategory.length > 0 ) {
            category.push( 
              getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (value.id + 1), returnIcon(value.icon) , [...subcategory])
            )
          } else {
            category.push( 
              getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (value.id + 1), returnIcon(value.icon) , )
            )
          }
        } else {
          if( subcategory.length > 0 ) {
            category.push( 
              getItem(value.title , 'sub' + (value.id + 1), returnIcon(value.icon) , [...subcategory])
            )
          } else {
            category.push( 
              getItem(value.title , 'sub' + (value.id + 1), returnIcon(value.icon) , )
            )
          }
        }
      }
      */


    });
  }




  const queryMenuItems = () => {
    if( routeLinks.length == 1 ) {
      axios.get(getAllMenusPath)
      .then(function (response) {


        response.data = response.data.filter( (value : any) => 
          value.parent == null
        )

        response.data = deleteEmptyChildrenRecursively(response.data);
        

        /*
        response.data.map( (value : any) => {
          if (value.children != undefined) {
            if(value.children.length == 0) {
              delete value.children;
            }
          }
        })
        */


        createSubCategoriesRecursively(response.data);

        
        

        /*
        response.data.forEach( (value : any) => {

          addedRoutes.push(value.path);

          let children : any[] = [];
          
          if(value.children != undefined) {
            value.children.forEach( (child : any) => {
              if(child.path != null) {
                children.push(
                  getItem(<Link href={child.path}> {child.title} </Link> , 'sub' + (Number(child.id) + 1), returnIcon(child.icon) )
                );
              } else {
                children.push(
                  getItem(child.title , 'sub' + (Number(child.id) + 1), returnIcon(child.icon) )
                );
              }
            }) 
          }
          
          

          if( value.path != null ) {
            if( children.length > 0 ) {
              addedMenuLinks.push( 
                getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (Number(value.id) + 1), returnIcon(value.icon) , [...children])
              )
            } else {
              addedMenuLinks.push( 
                getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (Number(value.id) + 1), returnIcon(value.icon) )
              )
            }
            
          } else {
            if( children.length > 0 ) {
              addedMenuLinks.push( 
                getItem(value.title , 'sub' + (Number(value.id) + 1), returnIcon(value.icon) , [...children])
              )
            } else {
              addedMenuLinks.push( 
                getItem(value.title , 'sub' + (Number(value.id) + 1), returnIcon(value.icon) )
              )
            }
          }


        } ); 

        */
      
        setRouteLinks([ ...routeLinks , ...addedRoutes ]);
        setMenuItemList([ ...menuItemLinks , ...subcategory ]);
        
        dispatch(updateMenuItems({ payload : response.data }));

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }
  }


  const fetchTheme = () => {
    let themeString = localStorage.getItem('theme') ?? "{}";
    const themeJson = JSON.parse(themeString);
    setLayoutTheme(themeJson.darkMode);

    console.log(themeJson);
  }

  
  useEffect( () => {
    
    queryMenuItems();

    fetchTheme();

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , []);
  

  


  //const { routeLinks , menuItemList } = await getData();

  //const [menuRouteLinks , setMenuRouteLinks] = useState(routeLinks);
  //const [menuItems , setMenuItems] = useState(menuItemList);

  const router = useRouter();
  const routePath = usePathname();
  

  const [collapsed, setCollapsed] = useState(false);
  const [menuWidth, setMenuWidth] = useState(256);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    {collapsed ? setMenuWidth(256) : setMenuWidth(56)}
  };


  

  const [theme, setTheme] = useState<MenuTheme>('light');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
    setDarkMode(!darkMode);
    localStorage.setItem('theme', JSON.stringify({ darkMode : !darkMode }));
  };


  const setLayoutTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
    setDarkMode(value);
    localStorage.setItem('theme', JSON.stringify({ darkMode : value }));
  };



  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e);
  };


  
  
  const findRouteMatch = (route : string) => {
    for(let i=0;i<routeLinks.length;i++) {
        if(routeLinks[i] == route) {
            //console.log('route : ' ,  i);
            return i.toString();
        }
    }

    return '1';
  }
  


  /*
  const [openKeys, setOpenKeys] = useState(['sub1']);
  
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  */


  return (
    <Wrapper>
        {/*  */}
        <Navigation>
            <Menu
              onClick={onClick}
              style={{ width : menuWidth , minHeight : '100vh' }}
              //openKeys={openKeys}
              //onOpenChange={onOpenChange}
              //defaultSelectedKeys={[findRouteMatch(routePath.toString())]}
              //defaultOpenKeys={['sub' + ( Number( findRouteMatch(routePath)) / 2 + 1 )  ]}
              mode="inline"
              theme={theme}
              inlineCollapsed={collapsed}
              items={menuItemLinks}
            />
        </Navigation>

        <Content>
            <Gadgets>
                <NavigationResponsiveButton>
                    <Button type={"text"} onClick={toggleCollapsed} >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </NavigationResponsiveButton>
                <Switch
                  checked={theme === 'dark'}
                  onChange={changeTheme}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                  className={styles.switch}
                />
            </Gadgets>
            <MainContent>
                {children}
                {/* <Button type="primary" onClick={() => console.log(menuItemLinks)}>
                  Click
                </Button> */}
            </MainContent>
        </Content>
    </Wrapper>
  );
};

