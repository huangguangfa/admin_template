module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/':{
                target:'http://192.168.0.17:8889/',
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                }
            }
        }
    }
}