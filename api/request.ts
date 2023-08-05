let baseUrl : string = "http://127.0.0.1:8000"

let baseServer : string = "https://site.sjabd.ir"


let URL = baseUrl;

let MenuCreationPath = URL + "/menu/create"
let getAllMenusPath = URL + "/menu/getall"
let deleteMenuPath = URL + "/menu/delete"

let UserCreationPath = URL + "/users/create"
let getAllUsersPath = URL + "/users/getall"
let deleteUserPath = URL + "/users/delete"

let RollerCreationPath = URL + "/rollers/create";
let getAllRollersPath = URL + "/rollers/getall";
let deleteRollerPath = URL + "/rollers/delete";


let RoleCreationPath = URL + "/roles/create";
let getAllRolesPath = URL + "/roles/getall";
let deleteRolePath = URL + "/roles/delete";

export default URL;

export { 
  MenuCreationPath , 
  getAllMenusPath ,
  deleteMenuPath ,

  UserCreationPath ,
  getAllUsersPath ,
  deleteUserPath ,

  RollerCreationPath ,
  getAllRollersPath ,
  deleteRollerPath ,

  RoleCreationPath ,
  getAllRolesPath ,
  deleteRolePath
} ;