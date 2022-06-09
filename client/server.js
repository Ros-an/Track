/**
 * Nextjs setup custom server
 * to use cookie based auth system we need to have both client and server running on same origin/domain
 * we need to use proxy for that because our client/nextjs is running on 3000
 * and our server is running on 8000
 */

/**
 * use proxy in nextjs
 * to use proxy we need to create custom server
 * this is only for development mode
 * in production, we will use same origin/domain so we don't have to worry about it
 * we can simply run build then start next app
 */
const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app
.prepare()
.then(()=> {
    const server = express();
    // apply proxy in dev mode
    if(dev){
        server.use("/api", createProxyMiddleware({
            target: "http://localhost:8000",
            changeOrigin: true
        }))
    }
    server.all("*", (req, res)=> {
        return handle(req, res);
    })
    server.listen(3000, (err)=> {
        if(err) throw err;
        console.log("> http://localhost:8000")
    })
})

