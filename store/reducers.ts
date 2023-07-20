import axios from 'axios';

import URL , { getAllMenusPath } from '../api/request';

import { 
  AppstoreOutlined,
  MailOutlined, 
  SettingOutlined ,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import type { MenuProps, MenuTheme } from 'antd';

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


interface AppState {
  routeLinks : string[] ,
  menuItems : any[] ,
}


const initialState : AppState = {
  routeLinks : [ "/admin/menus" ] ,
  menuItems : [ 
    { id : 1 , key : 1 , title : "admin" , path : "/admin/menus" , parent : 0 }
  ]
};




interface Action {
  type : string ,
  payload : {
    routeLinks : string[] ,
    menuItems : any[],
  }
};



const rootReducer = (state = initialState, action : Action) => {
  switch (action.type) {
    case 'UPDATE_MENU':
      return {
        ...state,
        routeLinks : action.payload.routeLinks ,
        menuItems : action.payload.menuItems 
      };
    default:
      return state;
  }
};




export default rootReducer;