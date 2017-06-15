/**
 * Created by Citrus on 2017/6/13.
 */
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const port = 3000;


/*
* 根据 page 返回 html
* @param page
* */
function render(page){
    return new Promise((resolve, reject) => {
        let loadPage = `./views/${page}`;
        fs.readFile(loadPage, 'binary', (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

/*
* 根据 url 获取内容
* @param 加载的 url
* */
async function router(url){
    let loadUrl = `${url}.html`;
    let html;
    try{
        html = await render(loadUrl);
    }catch(err){
        html = await render('404.html');
    }
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    let html = await router(url);

    ctx.body = html;
});

app.listen(port);
console.log(`listen port ${port}`);