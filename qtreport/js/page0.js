var language='en',leagueyear=2017,leagueid=1;
$.ajax({
    url:'../v1/scout/report/player/'+language+'/'+leagueyear+'/'+leagueid,
    type:'get',
    success:function(data){
        if(data.resultcode==1000){

        }
    }
})
/*
var vm=new Vue({
    el:'#box',
    data:{
        code:'2017-0001',
        name:'XXXX',
        createtime:'2017-12-25'
    },
    methods:{
        load:function(){
            this.$http.get('../v1/scout/report/player/'+language+'/'+leagueyear+'/'+leagueid).then(function(res){
                if(res.data.resultcode==1000){
                    this.code=res.data.resobj.code;
                    this.name=res.data.resobj.name;
                    this.createtime=res.data.resobj.createtime;
                }

            },function(){
                console.log('失败了')
            })
        }
    },
    created:function(){
        this.load()
    }
})
*/
