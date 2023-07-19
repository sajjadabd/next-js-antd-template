let baseUrl : string = "http://127.0.0.1:8000"

let baseServer : string = "http://80.82.68.126"


let URL = baseServer;

let MenuCreationPath = URL + "/menu/create"

let getAllMenusPath = URL + "/menu/getall"

export default URL;

export { MenuCreationPath , getAllMenusPath } ;