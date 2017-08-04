

<style scoped>
	.jumpinput{ padding:0 15px; }
</style>

<template>
	<!-- 分页 -->
	<nav class="pull-right">
		<ul class="pagination form-inline">
			<li><a v-on:click="prevpage">&laquo;</a></li>
			<li v-bind:class="{'active':pg.num == page}" v-for="pg in pages"><a v-on:click="jumppage(pg.num)">{{pg.num}}</a></li>
			<li><a v-on:click="nextpage">&raquo;</a></li>

			<li class="pull-left jumpinput"><input type="text" class="form-control" style="width:60px;" v-model="page" v-on:keyup.13="jumppage(page)"> / {{pagelen}}</li>
		</ul>
	</nav>
</template>



<script>
	export default {
		data () {
			return {
				pages:[
					{num:1}
				],
				pagelen:1,
				total:0,
				page:this.$parent.page
			}
		},

		methods:{
			initpage:function(total,page){
				var _t = this;
				_t.total = total;
				_t.page = page+1;

			  	_t.pagelen = parseInt(_t.total/_t.$parent.limit);
			  	if(_t.total%_t.$parent.limit != 0){
			  		_t.pagelen+=1;
			  	}

			  	if(_t.pagelen == 0){
			  		_t.pagelen = 1;
			  	}
			  	_t.pages = [];
			  	if(_t.pagelen > 10){
			  		var d = parseInt((_t.page-1)/5)*5;
			  		if(parseInt((_t.page-1)/5)*5+10 > _t.pagelen-1){
			  			d = parseInt((_t.page-1)/5)*5 - (parseInt((_t.page-1)/5)*5+10 - (_t.pagelen ));
			  		}
			  		
			  		for(var j = 0; j < 10; j++,d++){
				  		_t.pages.$set(j,{num:d+1});
				  	}

			  	}else{
			  		for(var j = 0; j < _t.pagelen; j++){
				  		_t.pages.$set(j,{num:j+1});
				  	}
			  	}

			  	
			  	
			},

			recountpage:function(){
				var _t = this;

				for(var j = parseInt(_t.page/5); j < parseInt(_t.page/5)+10; j++){
			  		_t.pages.$set(j,{num:j+1});
			  	}
			},

			prevpage:function(){
				if(this.page - 1 > 0){
					this.$parent.page-=1;
					this.$parent.getData();
				}
			},

			nextpage:function(){
				if(this.page < this.pagelen){
					this.$parent.page+=1;
					this.$parent.getData();
				}
			},
			
			jumppage:function(pagenum){

				if(pagenum > this.pagelen){
					bootbox.alert('页码超出范围');
					return false;
				}

				if(pagenum != this.$parent.page + 1){
					this.$parent.page = pagenum - 1;
					this.$parent.getData();
				}

			},
		}
	}
</script>