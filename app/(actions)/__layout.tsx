"use client"

import '../globals.css'

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

  const [menus , setMenus] = useState<eachItem[]>([]);

  const [routeLinks , setRouteLinks] = useState([
    "/admin/menus" ,
    "/admin/users" ,
    "/admin/roles" ,
    "/admin/permissions" ,
  ]);

  
  const [menuItemLinks , setMenuItemList]  = useState([
    getItem('ادمین', 'sub00', <SettingOutlined />, [
      getItem(<Link href={routeLinks[0]}>مدیریت منوها</Link>, '00'),
      getItem(<Link href={routeLinks[1]}>مدیریت کاربران</Link>, '01'),
      getItem(<Link href={routeLinks[2]}>مدیریت نقش ها</Link>, '02'),
      getItem(<Link href={routeLinks[3]}>مدیریت دسترسی ها</Link>, '03'),
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
              getItem(<Link href={child.path}> {child.title} </Link> , 'sub' + value.id + child.id  , returnIcon(child.icon) )
            );
          } else {
            children.push(
              getItem(child.title , 'sub' + value.id + child.id , returnIcon(child.icon) )
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
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + value.id , returnIcon(value.icon) , [...children])
          )
        }
        else {
          subcategory.push( 
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + value.id , returnIcon(value.icon) )
          )
        }
      } else {
        if(children.length > 0) {
          subcategory.push( 
            getItem(value.title , 'sub' + value.id  , returnIcon(value.icon) , [...children])
          )
        }
        else {
          subcategory.push( 
            getItem(value.title , 'sub' + value.id  , returnIcon(value.icon) )
          )
        }
      }
      



    });
  }




  const queryMenuItems = () => {
    if(routeLinks.length == 4) {
      axios.get(getAllMenusPath)
      .then(function (response) {


        response.data = response.data.filter( (value : any) => 
          value.parent == null
        )

        response.data = deleteEmptyChildrenRecursively(response.data);
        


        setMenus(response.data);
        createSubCategoriesRecursively(response.data);

        
      
      
        setRouteLinks([ ...routeLinks , ...addedRoutes ]);
        setMenuItemList([ ...menuItemLinks , ...subcategory ]);


        //console.log(menuItemLinks);
        
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

    //console.log(themeJson);
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

  //console.log(routePath);
  

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


  
  
  const findRouteMatch = (menusArray : eachItem[] , route : string) : any => {

    for(let i=0;i<menusArray.length;i++) {
        if(menusArray[i].path == route) {
            //console.log('route : ' ,  i);
            return menusArray[i].id.toString();
        } else if ( "children" in menusArray[i] ) {
            //return menusArray[i].id.toString() + findRouteMatch( menusArray[i].children , route)
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
              //defaultOpenKeys={['sub' + findRouteMatch(routePath)  ]}
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
                {/* <Button type="primary" onClick={() => console.log(menus)}>
                  Click
                </Button> */}
            </MainContent>
        </Content>
    </Wrapper>
  );
};