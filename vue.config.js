module.exports = {
    devServer:{
        host:'localhost',
        port:8081,
        hotOnly: true, // 热更新
        proxy: {
            '/api': {
                target: 'http://106.52.255.182:8080',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}