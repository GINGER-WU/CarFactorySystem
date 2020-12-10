module.export = {
    devServer:{
        port:8081,
        hotOnly: true, // 热更新
    },
    configureWebpack: {
        resolve:{
            alise:{
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        },
    }
}