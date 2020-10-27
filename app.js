// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
//创建服务器实例
const server = require('express')()
// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

//服务器设置路由
server.get('*', (req, res) => {

    //创建vue 实例
    const app = new Vue({
        data: {
            msg:"hello ssr"
        },
        template: `<div>访问的 URL 是： {{ msg }}</div>`
    })

    // 创建一个render

    // html:被渲染成的字符串
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset='utf-8'></meta>
            <title >Hello</title>
          </head>
          <body>${html}</body>
        </html>
      `)
    })
})

server.listen(8080)