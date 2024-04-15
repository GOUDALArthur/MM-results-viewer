const utils = {
    
    parseRequestURL : () => {
        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource : null,
            id_cat : null,
            id : null,
            verb : null
        }
        request.resource = r[1]
        request.id_cat = r[2]
        request.id = r[3]
        request.verb = r[4]

        return request
    }, 
    
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default utils;