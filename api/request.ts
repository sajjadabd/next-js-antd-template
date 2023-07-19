let baseUrl : string = "http://127.0.0.1:8000"

let baseServer : string = "http://146.19.212.16"


let URL = baseServer;

let MenuCreationPath = URL + "/menu/create"

let getAllMenusPath = URL + "/menu/getall"

export default URL;

export { MenuCreationPath , getAllMenusPath } ;