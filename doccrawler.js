const fs = require('fs')
const cheerio = require('cheerio')
const http = require('https')
let url = 'https://movie.douban.com/'
let str
http.get(url,(res)=>{
    const {statusCode} = res
    const contentType = res.headers['content-type']
    let err = null;
    if(statusCode !== 200){
       err = new Error('请求资源失败')
    }else if(!/^text\/html/.test(contentType)){
       err = new Error('请求格式错误')
    }

     if(err){
        console.log(err)
        res.resume()
    }
    res.on('data',(chunk)=>{
       str += chunk.toString('utf8')
       })
    
    res.on('end',()=>{
        let $ = cheerio.load(str)
       
        $('img').each((index,item)=>{
            
            const app = $(item).attr('src')
            console.log(app)
            fs.appendFile('./name.txt',app+'\r\n',()=>{
             console.log('写入成功！')
         })
        console.log('数据传输成功')
    })
})
}).on('error',(err)=>{
    console.log(err)
})