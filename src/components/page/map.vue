<template>
    <div class="MapBox">
        <div id="Map"></div>
        <div  class="mapInput">
            <i class="iconfont icondiliweizhi"></i>
            <input type="text " placeholder="搜索关键字" id="complete">
            <i class="iconfont iconsousuo"></i>
        </div>
    </div>
</template>

<script>
    export default{
        
        data(){
            return {
                markerObj:null,
                infoWindow:null,
                map:null,
            }
        },
        mounted(){
            this.map = new AMap.Map('Map', {
                zoom:17,             //级别
                resizeEnable: true, //可调整大小
                rotateEnable:true,  //可旋转
                pitchEnable:true,   //旋转角
                expandZoomRange:true,  //变焦范围扩大 
                zooms:[3,20],       //地图显示的缩放级别范围
                center:[114.070846,22.62749],//中心点坐标
                resizeEnable: true //定位到当前城市
            });
            //地图点击事件
            this.map.on('click', this.mapClickFun);
            //搜索
            let _this = this;
            AMap.plugin('AMap.Autocomplete',function(){     //回调函数
                let autoOptions = {
                    input:"complete"    //使用联想输入的input的id
                };
                let autocomplete= new AMap.Autocomplete(autoOptions);
                AMap.event.addListener(autocomplete, "select", _this.select); 
            });
        },
        methods:{
            AddMarker(coordinate,name){
                if(this.markerObj){this.remove()}
                this.markerObj = new AMap.Marker({
                    position: new AMap.LngLat(coordinate[0],coordinate[1]),
                    content:`<div class="deviceMarker">
                                <i class="iconfont icondiliweizhi"></i>
                                <span>${name} ${ coordinate }</span>
                            </div>`,
                    offset : new AMap.Pixel(-95,-70), //自定义marker位置
                });
                this.map.add([this.markerObj]);
                this.$emit('location',{
                    name:name,
                    lnglat:coordinate
                })
            },
            //查询选择设备位置
            select(data){
                this.AddMarker([data.poi.location.lng,data.poi.location.lat],data.poi.name)
                this.map.setCenter([data.poi.location.lng,data.poi.location.lat]);          //设置地图中心点
            },
            remove(){
                this.markerObj && this.map.remove(this.markerObj)
            },
            //地图点击事件
            mapClickFun(e){
                // let text = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat()+' ] 的位置单击了地图！';
                this.$emit('mapClick',e);
            },
            toPlace(data){
                this.map.setCenter([data.longitude,data.latitude]);
            }
        }
    }
</script>
<style lang="less">
    .MapBox{width: 100%; height: 100%; position: relative;
        .mapInput{
            display: flex; align-items: center;
            position: absolute; 
            width:225px;
            height:29px;
            background:rgba(255,255,255,1);
            box-shadow:0px -3px 61px 4px rgba(187,182,182,0.16);
            border-radius:2px 0px 0px 2px;
            top:11px; left: 10px; 
            input{
                outline: none; text-indent: 5px;height:29px; display: block; width: 175px; font-size: 12px;
            }
            .icondiliweizhi{color:#858585 ; margin-left: 10px; font-size: 15px;}
            .iconsousuo{color: #cecece;}
        }
    }
    #Map{width: 100%; height: 100%; }
    .deviceMarker{
        width: 167px; height: 25px; background: #fff; display: flex; align-items: center;
        padding: 5px 10px;color:#1CA15B; margin-top: 10px; position: relative;box-shadow:0px 10px 5px rgba(28,161,91,0.2);
        .icondiliweizhi{font-size: 20px;}
        span{font-size: 12px;margin-left: 5px; font-weight: 700;}
    }
    .deviceMarker::after{
        content: "";
        width: 0;
        height: 0;
        border: 10px solid;
        border-color: transparent transparent #fff;
        position: absolute; 
        left: 50%; bottom: -20px;
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg); 	/* Opera */
        margin-left: -10px;
    }
</style>