export function helpHttp(){
    
    const customFetch = (endpoint, options) => {

        //Cabeceras como para cors y aceptar json, etc.
        const defaultHeader = { accept:"application/json"};

        //Por si la peticion nunca responde, podemos abortar en la UI
        const controller = new AbortController();
        options.signal = controller.signal;

        //Si no te envia el usuario el metodo, por default es get
        options.method = options.method || "GET";
        //Si la api requiere de autenticacion o otro header, mezclame las headers que tengo aqui mas las que me traes, si no traeme nadamas las mias
        options.headers = options.headers ? {...defaultHeader,...options.headers} : defaultHeader;

        //Si el body regresa convierteme el objeto a cadena de texto
        options.body = JSON.stringify(options.body) || false;
        //Si es falso (osea no trae nada, borramelo)
        if(!options.body){ delete options.body}

        console.log(options);
        //Si la peticion no me responde en 3 segundos, abortala
        setTimeout(() => controller.abort(),3000);

        return fetch(endpoint,options)
        .then((res) => res.ok ? res.json() : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrio un error"
        })) 
        .catch((err) => err);
    };
    
    const get = (url,options = {}) => customFetch(url,options);
    
    const post = (url,options = {}) => {
        options.method = "POST";
        return customFetch(url,options);
    };
    
    const put = (url,options = {}) => {
        options.method = "PUT";
        return customFetch(url,options);
    };

    const del = (url,options = {}) => {
        options.method = "DELETE";
        return customFetch(url,options);
    };
    
    return {get,post,put,del}
}