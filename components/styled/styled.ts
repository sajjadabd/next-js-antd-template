import styled from 'styled-components'

import {Button} from 'antd';



/*
 admin / menus / body
*/



export const ContentWrapper = styled.div`
  margin-top : 1em;
  margin-bottom : 6em;
`


export const LoginWrapper = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  min-height : 100vh;
  
`


export const FormWrapper = styled.div`
  display : flex;
  margin-top : 1em;
  margin-bottom : 1em;
`


export const MenuCreationFormWrapper = styled.div`
  background-color : white;
  padding : 20px;
  border-radius : 10px;
  background-color : #e0e1dd;
  margin-bottom : 30px;
`


export const RoleCreationFormWrapper = styled.div`
  background-color : white;
  padding-top : 10px;
  padding-bottom : 10px;
  border-radius : 10px;
  background-color : #e0e1dd;
  margin-bottom : 30px;
`


export const MarginBottomDIV = styled.div`
  margin-bottom : 6em;
`


export const RightToLeft = styled.div`
  direction : rtl;
  .ant-select-item-option-content {
    direction : rtl;
  }
`

export const LeftToRight = styled.div`
  direction : ltr;
  .ant-select-item-option-content {
    direction : ltr;
  }
`


export const BreadCrumbs = styled.div`
  margin-bottom : 3em;
  span {
    margin-left : 5px;
    margin-right : 5px
  }
`


export const EditButton = styled(Button)`
  background-color : #058c42
  &:hover {
    background-color : black
  }
`




/*

 __layout

*/





export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    max-height: 100vh;
    min-height : 100vh;
`



export const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;
    max-height: 100vh;
    min-height : 100vh;
    background-color : white;
`


export const Content = styled.div`
    flex : 1;
    display : flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height : 100vh;
    min-height : 100vh;
    overflow-y: scroll; 
    scrollbar-width: none;
`


export const Gadgets = styled.div`
    display : flex;
    flex-direction: row;
    justify-content : space-between ;
    align-items: center;
    padding : 10px;
    padding-left : 15px;
`

export const NavigationResponsiveButton = styled.div`
    position : relative;
    top : 5px;
`

export const MainContent = styled.div`
    display : flex;
    flex-direction: column;
    flex : 1;
    margin : 20px;
`





/*
 create roll
*/



export const CreateRollWrapper = styled.div`
  margin : 30px;
  display : flex;
  flex-direction : column;
`

export const Preview = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  flex : 1;
  max-height : 100vh;
  margin-top : 100px;
  //position : fixed;
  //left : 30%;
  //top : 50%;
  //transform : translate(-50% , -50%);
`

export const FormItem = styled.div`
  margin-left : 30px;
  margin-right : 30px;
  min-width : 130px;
`





/*
  calibre tonag
*/


export const Column = styled.div`
    display : flex;
    flex-direction : column;
`


export const CenterForLayout = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    min-width : 100vw;
    min-height : 100vh;
    box-sizing : border-box;
    position : relative;
`


export const CenterForLogin = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex : 1;
    position : relative;
    min-width : 100vw;
    min-height : 100vh;
    box-sizing : border-box;
`

export const Center = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 1;
    box-sizing : border-box;
    position : relative;
`


export const AvatarContainer = styled.div`
  background-color : #001427;
  color : white;
  display : flex;
  justify-content : center;
`

export const AvatarImage = styled.div`
  background-color : #001427;
  color : white;
  display : flex;
  justify-content : center;
  padding-top : 2em;
  padding-bottom : 2em;
`