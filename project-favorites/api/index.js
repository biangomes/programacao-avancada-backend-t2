const http = require('http');
const data = require('./urls.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    /*
        GET: http://localhost:3000/
        CREATE: http://localhost:3000/?name=linkedin&url=https://www.linkedin.com
        DELETE: http://localhost:3000/?name=linkedin&url=https://www.linkedin.com/&del=1
    */
    const { name, url, del } = URL.parse(req.url, true).query

    function writeFile(cb) {
        fs.writeFile(
            path.join(__dirname, 'urls.json'),
            JSON.stringify(data, null, 2),
            err => {
                if (err) throw err
                res.end('Operação realizada com sucesso!')
            }
        )
    }
    
    if(!name || !url) {
        return res.end(JSON.stringify(data,null,2))
    }
    if(del) {
        // TODO implementar validacao de nome e url
        data.urls = data.urls.filter(item => (item.name != name && item.url!=url))
        

        //return res.end('delete')
        return writeFile(message => res.end(message))
    }

    // TODO implementar o metodo CREATE
    data.urls.push({name,url})
    console.log(data.urls)
    return writeFile(message => res.end(message))

}).listen(3000, () => {console.log("API is running")});