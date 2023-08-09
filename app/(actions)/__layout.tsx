"use client"

import '../globals.css'

import React , { useEffect, useState  } from 'react';

import { createContext, useContext } from 'react';

import natsort from 'natsort';

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
  UserOutlined ,
  SmileOutlined ,
  PoweroffOutlined ,
} from '@ant-design/icons';

import { Avatar } from 'antd';
import { Dropdown } from 'antd';

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

import { Space, Spin } from 'antd';



import {
  Wrapper ,
  Navigation ,
  Content ,
  Gadgets ,
  NavigationResponsiveButton ,
  MainContent , 
  Center , 
  CenterForLayout ,
  AvatarContainer ,
  AvatarImage ,
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
import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers';

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



  const settingsMenu: MenuProps['items'] = [
    // {
    //   key: '1',
    //   label: (
    //     <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //       1st menu item
    //     </a>
    //   ),
    // },
    {
      key: '1',
      label: (
        <a>
          خروج
        </a>
      ),
      danger: true,
      icon: <PoweroffOutlined /> ,
    },
    // {
    //   key: '3',
    //   label: (
    //     <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
    //       3rd menu item (disabled)
    //     </a>
    //   ),
    //   disabled: true,
    // },
    // {
    //   key: '4',
    //   danger: true,
    //   label: 'a danger item',
    // },
  ];




  const [routeLinks , setRouteLinks] = useState([
    "/admin/menus" ,
    "/admin/roles" ,
    "/admin/users" ,
    "/admin/permissions" ,
  ]);

  const [subs , setSubs] = useState([
    "00" ,
    "01" ,
    "02" ,
    "03" ,
  ]);

  

  
  const [menuItemLinks , setMenuItemList]  = useState([
    getItem('ادمین', 'sub0', <SettingOutlined />, [
      getItem(<Link href={routeLinks[0]}>مدیریت منوها</Link>, '00'),
      getItem(<Link href={routeLinks[1]}>مدیریت نقش ها</Link>, '01'),
      getItem(<Link href={routeLinks[2]}>مدیریت کاربران</Link>, '02'),
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
  let addedSubs : string[] = [];

  
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
              getItem(<Link href={child.path}> {child.title} </Link> , '' +  value.id + child.id  , returnIcon(child.icon) )
            );
            addedSubs.push('' + value.id + child.id)
          } else {
            children.push(
              getItem(child.title , '' +  value.id + child.id , returnIcon(child.icon) )
            );
            addedSubs.push('' + value.id + child.id)
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
          addedSubs.push('sub' + value.id)
        }
        else {
          subcategory.push( 
            getItem(<Link href={value.path}> {value.title} </Link> , 'sub' + value.id , returnIcon(value.icon) )
          )
          addedSubs.push('sub' + value.id)
        }
      } else {
        if(children.length > 0) {
          subcategory.push( 
            getItem(value.title , 'sub' + value.id  , returnIcon(value.icon) , [...children])
          )
          addedSubs.push('sub' + value.id)
        }
        else {
          subcategory.push( 
            getItem(value.title , 'sub' + value.id  , returnIcon(value.icon) )
          )
          addedSubs.push('sub' + value.id)
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

        
        addedSubs = addedSubs.sort( (a,b) => {
          if (a.replace('sub','') > b.replace('sub','') ) return 1 ;
          else return -1
          return 0
        } );
      
        setRouteLinks([ ...routeLinks , ...addedRoutes ]);
        setMenuItemList([ ...menuItemLinks , ...subcategory ]);
        setSubs([ ...subs , ...addedSubs ]);


        
        
        dispatch(updateMenuItems({ payload : response.data }));

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
  }


  const fetchTheme = () => {
    let themeString = localStorage.getItem('theme') ?? "{}";
    const themeJson = JSON.parse(themeString);
    setLayoutTheme(themeJson.darkMode);


    //console.log(themeJson);
  }


  



  


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


  

  const [theme, setTheme] = useState<MenuTheme>('dark');

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



  const findOpenKeys = (route : string) : any => {

    //console.log(routeLinks)
    //console.log(subs)
    //console.log(menuItemLinks);

    for(let i=0;i<routeLinks.length;i++) {

        if(routeLinks[i] == route) {
            //console.log('sub' + subs[i].replace('sub','').charAt(0));
            return 'sub' + subs[i].replace('sub','').charAt(0) ;
        }
        //} else if ( "children" in menusArray[i] ) {
            //return menusArray[i].id.toString() + findRouteMatch( menusArray[i].children , route)
        //}
    }

    return '1';
  }
  
  
  const findRouteMatch = (route : string) : any => {

    for(let i=0;i<routeLinks.length;i++) {

        if(routeLinks[i] == route) {
            return subs[i] ;
        }
        //} else if ( "children" in menusArray[i] ) {
            //return menusArray[i].id.toString() + findRouteMatch( menusArray[i].children , route)
        //}
    }

    return '1';
  }
  


  
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  

  const onOpenChange = (keys : string[]) => {
    setOpenKeys(keys);
  }


  const [selectedKeys , setSelectedKeys] = useState<string[]>([]);

  const onSelectCapture = (key : any) => {
    setSelectedKeys(key.key);
  }

  /*
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (subs.indexOf(latestOpenKey!) === -1) {
      setOpenKeys([ ...openKeys , ...latestOpenKey ]);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  */
  

  


  const [ mounted , setMounted ] = useState(false);

  
  useEffect( () => {

    queryMenuItems();
    fetchTheme();

    //setTimeout(() => setMounted(true) , 2000);

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , []);
  


  if( mounted == false ) return (
    <CenterForLayout>
      <Spin size="large" />
    </CenterForLayout>
  ) ;



  return (
    <Wrapper>
        {/*  */}
        <Navigation>
            <AvatarContainer
            style={{ 
              display : collapsed ? 'none' : 'block' ,
              backgroundColor : theme == 'dark' ? '#001529' : '#FFFFFF' 
            }}
            >
              <AvatarImage
              style={{ backgroundColor : theme == 'dark' ? '#001529' : '#FFFFFF' }}
              >
                <Avatar 
                size={128} 
                icon={<UserOutlined />} 
                style={{ backgroundColor : theme == 'dark' ? '#475059' : '#242d36' }}
                />
              </AvatarImage>
            </AvatarContainer>
            <Menu
              onClick={onClick}
              style={{ width : menuWidth , minHeight : '100vh' , overflowY : 'scroll' }}
              //openKeys={openKeys.length > 0 && !collapsed ? openKeys : [ findOpenKeys(routePath) ]}
              //selectedKeys={selectedKeys.length > 0 && !collapsed ? selectedKeys : [ findRouteMatch(routePath) ]}
              //onSelect={onSelectCapture}
              //onOpenChange={onOpenChange}
              defaultSelectedKeys={[ findRouteMatch( routePath ) ]}
              defaultOpenKeys={[ findOpenKeys(routePath)  ]}
              mode="inline"
              theme={theme}
              inlineCollapsed={collapsed}
              items={menuItemLinks}
            />
        </Navigation>

        <Content>
            <Gadgets
            style={{ 
              backgroundColor : theme == 'dark' ? '#001529' : '#FFFFFF' 
            }}
            >
                <NavigationResponsiveButton>
                    <Button 
                    type={"text"} 
                    onClick={toggleCollapsed} 
                    >
                    {collapsed ? 
                    <MenuUnfoldOutlined 
                      style={{ color : '#fff'}}
                    /> : 
                    <MenuFoldOutlined 
                      style={{ color : '#fff'}}
                    />}
                    </Button>
                </NavigationResponsiveButton>



                <Dropdown 
                menu={{ items : settingsMenu }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space
                    style={{ color : '#fff' }}
                    >
                      <SettingOutlined />
                    </Space>
                  </a>
                </Dropdown>
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
                {/* <Button type="primary" onClick={() => console.log(menus)}>
                  Click
                </Button> */}
            </MainContent>
        </Content>
    </Wrapper>
  );
};