let baseUrl : string = "http://127.0.0.1:8000"

let baseServer : string = "https://site.sjabd.ir"


let URL = baseUrl;

let MenuCreationPath = URL + "/menu/create"

let getAllMenusPath = URL + "/menu/getall"

let deleteMenuPath = URL + "/menu/delete"

let getAllUsersPath = URL + "/users/getall"


let RollerCreationPath = "/rollers/create";
let getAllRollersPath = "/rollers/getall";
let deleteRollerPath = "/rollers/delete";

export default URL;

export { 
  MenuCreationPath , 
  getAllMenusPath ,
  deleteMenuPath ,
  getAllUsersPath ,
  RollerCreationPath ,
  getAllRollersPath ,
  deleteRollerPath
} ;