
import { createSlice } from '@reduxjs/toolkit'

interface eachItem {
  id : number ,
  key : number ,
  title : string ,
  path : string ,
  parent : number ,
  created_at ?: string ,
  updated_at ?: string ,
  children ?: eachItem[]
}

interface AppState {
  menuItems : eachItem[] ,
}


export type {AppState , eachItem};


interface Action {
  type : string ,
  payload : any[],
};




const todosSlice = createSlice({
  name: 'menuItems',
  initialState : {
    menuItems : [ { } ]  
  },
  reducers: {
    updateMenuItems : ( state , action ) => {
      //console.log('inside redux');
      //console.log(`state.menuItems` , state.menuItems);
      //console.log(`action.payload` , action.payload);
      let newMenuItems = [];
      newMenuItems = [ ...action.payload.payload ]
      return {
        menuItems : newMenuItems
      }
    }
  }
})

export const { updateMenuItems } = todosSlice.actions

export default todosSlice.reducer
