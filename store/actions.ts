export const updateMenu = (data : string) => {
  return {
    type: 'UPDATE_MENU',
    payload: data,
  };
};