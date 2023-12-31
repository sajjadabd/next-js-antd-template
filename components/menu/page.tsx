
import { useState } from 'react';

import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu , Switch } from 'antd';

import { 
    AppstoreOutlined,
    MailOutlined, 
    SettingOutlined ,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';

import Link from 'next/link'

import styles from './page.module.css';


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


const section = 'سکشن'

const barmill = 'بار میل'

const items: MenuProps['items'] = [
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),

  getItem('ایجاد غلطک', 'sub1', <AppstoreOutlined />, [
    getItem( <Link href="/createroller/section">{section}</Link>, '1'),
    getItem(<Link href="/createroller/barmill">{barmill}</Link>, '2'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  // { type: 'divider' },

  getItem('تعریف خط', 'sub2', <SettingOutlined />, [
    getItem(<Link href="/defineline/section">{section}</Link>, '3'),
    getItem(<Link href="/defineline/barmill">{barmill}</Link>, '4'),
  ]),

  getItem('مدیریت خط', 'sub3', <SettingOutlined />, [
    getItem(<Link href="/manageline/section">{section}</Link>, '5'),
    getItem(<Link href="/manageline/barmill">{barmill}</Link>, '6'),
  ]),

  getItem('ثبت تراش غلطک ها', 'sub4', <SettingOutlined />, [
    getItem(<Link href="/tarashroller/section">{section}</Link>, '7'),
    getItem(<Link href="/tarashroller/barmill">{barmill}</Link>, '8'),
  ]),

  getItem('تغییر وضعیت غلطک ها', 'sub5', <SettingOutlined />, [
    getItem(<Link href="/changeroller/section">{section}</Link>, '9'),
    getItem(<Link href="/changeroller/barmill">{barmill}</Link>, '10'),
  ]),

  getItem('مدیریت استند ها', 'sub6', <SettingOutlined />, [
    getItem(<Link href="/managestand/section">{section}</Link>, '11'),
    getItem(<Link href="/managestand/barmill">{barmill}</Link>, '12'),
  ]),



  //getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];



export default function CustomMenu() {
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
        console.log('click ', e);
    };


    return (
        <nav className={styles.navigation}>
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          // theme={theme}
          inlineCollapsed={collapsed}
          theme="light"
          items={items}
          className={styles.menu}
        />
      </nav>
    );


}