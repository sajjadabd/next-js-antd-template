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
import { 
  AppstoreOutlined,
  MailOutlined, 
  SettingOutlined ,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu, Switch } from 'antd';

import Link from 'next/link'

import styled from 'styled-components'

import { useRouter , usePathname } from 'next/navigation';

import { section , barmill } from '../../components/lines/page';


import { MenuCreationPath , getAllMenusPath } from '../../api/request';


import axios, {isCancel, AxiosError} from 'axios';




const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    max-height: 100vh;
    min-height : 100vh;
`



const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 100vh;
    min-height : 100vh;
    background-color : white;
`


const Content = styled.div`
    flex : 1;
    display : flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height : 100vh;
    min-height : 100vh;
    overflow-y: scroll; 
`


const Gadgets = styled.div`
    display : flex;
    flex-direction: row;
    align-items: center;
`

const NavigationResponsiveButton = styled.div`
    right : 10px;
    top : 10px;
`

const MainContent = styled.div`
    display : flex;
    flex-direction: column;
    flex : 1;
    margin : 20px;
`


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
= [

    "/createroll/section" ,
    "/createroll/barmill" ,

    "/createstand/section" ,
    "/createstand/barmill" ,

    "/listroll/section" ,
    "/listroll/barmill" ,

    "/liststand/section" ,
    "/liststand/barmill" ,

    "/defineline/section" ,
    "/defineline/barmill" ,

    "/manageline/section" ,
    "/manageline/barmill" ,

    "/calibrtonag/section" ,
    "/calibrtonag/barmill" ,

    "/tarashroll/section" ,
    "/tarashroll/barmill" ,

    // "/changeroll/section" ,
    // "/changeroll/barmill" ,

    "/rollstatus/section" ,
    "/rollstatus/barmill" ,

    "/managestand/section" ,
    "/managestand/barmill" ,

    "/admin/menus" ,

]
*/









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









export default function MainLayout({
    children 
}: {
    children: React.ReactNode 
}) {



  const [routeLinks , setRouteLinks] = useState([
    "/admin/menus" ,
  ]);

  const [menuItemList , setMenuItemList]  = useState([
    getItem('ادمین', 'sub1', <SettingOutlined />, [
      getItem(<Link href={routeLinks[0]}>مدیریت منوها</Link>, '0'),
    ]),
  ]);


  useEffect( () => {
    if( routeLinks.length == 1 ) {
      axios.get(getAllMenusPath)
      .then(function (response) {
        
        let addedRoutes : string[] = [];
        let addedMenuLinks : any = [];

        response.data = response.data.filter( (value : any) => 
          value.parent == null
        )
      
        response.data.forEach( (value : any) => {
          addedRoutes.push(value.path);

          let children : any[] = [];

          value.children.forEach( (child : any) => {
            children.push(
              getItem(<Link href={child.path}> {child.title} </Link> , 'sub' + (Number(child.id) + 1), <SettingOutlined />)
            );
          } ) 
      
          addedMenuLinks.push( 
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + (Number(value.id) + 1), <SettingOutlined /> , [...children])
          )
      
        } ); 
      
        setRouteLinks([ ...routeLinks , ...addedRoutes ]);
        setMenuItemList([ ...menuItemList , ...addedMenuLinks ]);
    
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }

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
                    {/* <Switch
                    checked={theme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    className={styles.switch}
                    /> */}
                    <Menu
                    onClick={onClick}
                    style={{ width : menuWidth , minHeight : '100vh' }}
                    //openKeys={openKeys}
                    //onOpenChange={onOpenChange}
                    defaultSelectedKeys={[findRouteMatch(routePath.toString())]}
                    defaultOpenKeys={['sub' + ( Number( findRouteMatch(routePath)) / 2 + 1 )  ]}
                    mode="inline"
                    // theme={theme}
                    inlineCollapsed={collapsed}
                    theme="light"
                    items={menuItemList}
                    />
                </Navigation>

                <Content>
                    <Gadgets>
                        <NavigationResponsiveButton>
                            <Button type={"text"} onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </Button>
                        </NavigationResponsiveButton>
                        {/* <Switch
                        checked={theme === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        className={styles.switch}
                        /> */}
                    </Gadgets>
                    <MainContent>
                        {children}
                    </MainContent>
                </Content>
            </Wrapper>

  );
};


