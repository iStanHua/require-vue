<style>
	.dateinput{  max-width: 220px; min-width: 210px}
	.datepicker{ display: inline-block; }
	#datepickpanel{position: fixed; z-index: 5; left: 262px; right: 0; top: 110px; bottom: 80px; background: rgba(0,0,0,0.5); display: none; overflow-y: auto;}
	#datepickmask{z-index: 2; opacity: 0; position: absolute; width:100%; height: 100%; left:0; top:0;}
	#datepickpanel .picker{ width:400px; min-height: 400px; position:absolute; z-index:6; left:50%;top:50%; margin-left:-200px; margin-top:-200px;  }
	.p20{ padding:20px; }
	#datepickpanel table td { cursor: pointer;}
	#datepickpanel table th{ text-align: center; }
	#monthbody td,#yeartable td{ line-height: 3em; }
	td.selected{ background: #0287ca; color: #fff; }
	#prevYears{ position: absolute; left:12px; top:45%; font-size: 26px; z-index: 2;}
	#nextYears{ position: absolute; right: 12px; top:45%; font-size: 26px; z-index: 2;}
</style>

<template>
	<div class="datepicker">
		<input type="text" v-model="selectdate" class="dateinput form-control pointer" v-on:click="showCalendar">
	</div>

	<div id="datepickpanel">
		<div id="datepickmask"></div>
		<div class="picker panel">
			<div class="panel-body">
				<div class="row" style="padding-left:10px;">
					<button class="btn btn-default" v-on:click="selectType('day')" v-bind:class="{'btn-primary':selecttype=='day'}">日</button>
					<button class="btn btn-default" v-on:click="selectType('month')" v-bind:class="{'btn-primary':selecttype=='month'}">月</button>
					<button class="btn btn-default" v-on:click="selectType('year')" v-bind:class="{'btn-primary':selecttype=='year'}">年</button>
				</div>
				<div class="row p20">
					<div v-bind:class="{'hide':selecttype != 'day'}">
						<div class="row">

							<div class="col-sm-6">
								<i class="glyphicon glyphicon-chevron-left pointer" v-on:click="prevYear"></i> 
								&emsp;<span>{{selected_year}}</span>年&emsp;
								<i class="glyphicon glyphicon-chevron-right pointer" v-on:click="nextYear"></i>
							</div>
							<div class="col-sm-6">
								<i class="glyphicon glyphicon-chevron-left pointer" v-on:click="prevMonth"></i> 
								&emsp;<span>{{selected_month+1}}</span>月&emsp;
								<i class="glyphicon glyphicon-chevron-right pointer" v-on:click="nextMonth"></i>
							</div>

							<div class="table-responsive col-sm-12" style="margin-top:20px">
								<table class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>一</th>
											<th>二</th>
											<th>三</th>
											<th>四</th>
											<th>五</th>
											<th>六</th>
											<th>日</th>
										</tr>
									</thead>
									<tbody class="text-center" id="datebody">
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
										<tr><td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
									</tbody>
								</table>
								<p class="small-text">点击分别选择起始时间和结束时间</p>
								<p>已选开始时间：{{(date_start.year ? date_start.year+'-' : '')+(date_start.month ? date_start.month+1+'-' : '')+(date_start.date ? date_start.date : '')}}</p>
								<p>已选结束时间：{{(date_end.year ? date_end.year+'-' : '' )+(date_end.month ? date_end.month+1+'-' : '' )+(date_end.date ? date_end.date : '')}}</p>

								<div class="pull-right">
									<button class="btn btn-primary" v-on:click="makesureDate">确定</button>
								</div>
							</div>

						</div>
					</div>
					<div v-bind:class="{'hide':selecttype != 'month'}">
						<div class="row">
							<div class="col-sm-6">
								<i class="glyphicon glyphicon-chevron-left pointer" v-on:click="prevYear"></i> 
								&emsp;<span>{{selected_year}}</span>年&emsp;
								<i class="glyphicon glyphicon-chevron-right pointer" v-on:click="nextYear"></i>
							</div>

							<div class="table-responsive col-sm-12" style="margin-top:20px">
								<table class="table table-bordered table-striped">
									<tbody class="text-center" id="monthbody">
										<tr><td>1月</td> <td>2月</td> <td>3月</td> </tr>
										<tr><td>4月</td> <td>5月</td> <td>6月</td> </tr>
										<tr><td>7月</td> <td>8月</td> <td>9月</td> </tr>
										<tr><td>10月</td> <td>11月</td> <td>12月</td> </tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div v-bind:class="{'hide':selecttype != 'year'}">
						<div class="row">
							<i class="glyphicon glyphicon-chevron-left pointer" id="prevYears" v-on:click="prevYears"></i>
							<i class="glyphicon glyphicon-chevron-right pointer" id="nextYears" v-on:click="nextYears"></i>
							<div class="table-responsive col-sm-12" style="padding:0 45px;">
								<table class="table table-bordered table-striped" id="yeartable">
									<tbody class="text-center">
										<tr><td></td> <td></td> <td></td> </tr>
										<tr><td></td> <td></td> <td></td> </tr>
										<tr><td></td> <td></td> <td></td> </tr>
										<tr><td></td> <td></td> <td></td> </tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    props: {

	    },
	    data () {
	    	return {
	    		selectdate:'',
	    		selecttype:'day',
	    		selected_year:(new Date()).getFullYear(),
	    		selected_month:(new Date()).getMonth(),
	    		selected_date:(new Date()).getDate(),
	    		yearstep:0,
	    		nowyear:(new Date()).getFullYear(),
	    		datebody:null,
	    		max_year_step:parseInt(((new Date()).getFullYear() - 1900)/12),
	    		nowmonth:(new Date()).getMonth(),
	    		date_start:'未选',
	    		date_end:'未选',
	    		next_date:'start'
	    	}
	    },
	    ready:function(){
	    	var _this = this;
	    	// 一开始就初始化day的
	    	_this.initDate();

	    	// 初始化月份，月份在后面不会改变
	    	_this.initMonth();

	    	// 初始化年份
	    	_this.initYear();

	    	// 初始为昨日的数据
	    	var yesterday = new Date((new Date()).getTime() - 86400000);
	    	_this.selectdate = yesterday.getFullYear() + '-' + (yesterday.getMonth()+1) + '-' + yesterday.getDate();

	    	$('#datebody').find('td').on('click',function(){
	    		if($(this).text() != '' || $(this).text() != null){
	    			$(this).addClass('selected');
	    			if(_this.date_start == '未选'){
	    				_this.date_start = {
	    					year:_this.selected_year,
	    					month:_this.selected_month,
	    					date:$(this).html()
	    				}
	    			}else if(_this.date_end == '未选'){
	    				/* 判断是不是比开始时间大 */
	    				var tempdate = {
	    					year:_this.selected_year,
	    					month:_this.selected_month,
	    					date:$(this).html()
	    				};

	    				var temp_time = new Date();
	    				temp_time.setFullYear(tempdate.year);
	    				temp_time.setMonth(tempdate.month);
	    				temp_time.setDate(tempdate.date);

	    				var start = new Date();
	    				start.setFullYear(_this.date_start.year);
	    				start.setMonth(_this.date_start.month);
	    				start.setDate(_this.date_start.date);

	    				if(temp_time.getTime() > start.getTime()){
	    					/* 如果选中 的时间比开始时间大，则表示是结束时间*/
	    					_this.date_end = tempdate;
	    				}else{
	    					/* 如果比开始时间小，则代表是开始时间，
	    						结束时间就是原本的开始时间，开始时间为新的时间
	    					*/
	    					_this.date_end = _this.date_start;
	    					_this.date_start = tempdate;
	    				}

	    				
	    			}else{
	    				/* 当开始时间和结束时间都选好了的话 */
	    				/* 判断现在选择的时间是大还是小 */
	    				var tempdate = {
	    					year:_this.selected_year,
	    					month:_this.selected_month,
	    					date:$(this).html()
	    				};

	    				var temp_time = new Date();
	    				temp_time.setFullYear(tempdate.year);
	    				temp_time.setMonth(tempdate.month);
	    				temp_time.setDate(tempdate.date);

	    				var start = new Date();
	    				start.setFullYear(_this.date_start.year);
	    				start.setMonth(_this.date_start.month);
	    				start.setDate(_this.date_start.date);

	    				var end = new Date();
	    				end.setFullYear(_this.date_end.year);
	    				end.setMonth(_this.date_end.month);
	    				end.setDate(_this.date_end.date);

	    				if(temp_time.getTime() < start.getTime()){
	    					_this.date_start = tempdate;
	    				}else if(temp_time.getTime() > end.getTime()){
	    					_this.date_end = tempdate;
	    				}else{
	    					if(_this.next_date == 'start'){
	    						_this.next_date = 'end';
	    						_this.date_start = tempdate;
	    					}else{
	    						_this.next_date = 'start';
	    						_this.date_end = tempdate;
	    					}
	    					
	    				}
	    			}
	    		}

	    		_this.refreshSelectedDate();
	    		
	    		
	    		
	    	});

	    	$('#monthbody').find('td').on('click',function(){
	    		var days = 0;

	    		_this.selected_month = parseInt($(this).html()) - 1;

	    		if(_this.selected_year == _this.nowyear){
	    			if(_this.selected_month > _this.nowmonth){
	    				return false;
	    			}
	    		}

	    		$('#datepickpanel').fadeOut(300);
	    		switch(_this.selected_month+1){
	    			case 1 :
	    			case 3 :
	    			case 5 :
	    			case 7 :
	    			case 8 :
	    			case 10 :
	    			case 12 :
	    				days = 31;
	    			 	break;
	    			case 4 :
	    			case 6 :
	    			case 9 :
	    			case 11 :
	    				days = 30;
	    				break;
	    			case 2 :
	    				if(_this.selected_year%400 == 0 || (_this.selected_year%100 != 0 && _this.selected_year%4 == 0)){
	    					days = 29;
	    				}else{
	    					days = 28;
	    				}
	    				break;
	    		}
	    		if(_this.selected_month == _this.nowmonth){
	    			days = _this.selected_date;
	    		}
	    		_this.selectdate = _this.selected_year + '-' + (_this.selected_month+1) + '-1' + ' ~ ' +  _this.selected_year + '-' + (_this.selected_month+1) + '-' + (days);

	    		var start_time = parseInt( (new Date(_this.selected_year + '-' + (_this.selected_month+1) + '-1')).getTime()/1000 );
	    		var end_time = parseInt( (new Date(_this.selected_year + '-' + (_this.selected_month+1) + '-' + (days+1))).getTime()/1000 );
	    		/* 选择了某一月 */
	    		_this.$parent.getDataAjax('day',start_time,end_time);

	    	});

	    	$('#yeartable').find('td').on('click',function(){
	    		_this.selected_year = parseInt($(this).html());
	    		$('#datepickpanel').fadeOut(300);

	    		_this.selectdate = _this.selected_year + '-' + 1 + '-' + 1 + ' ~ ' +  _this.selected_year + '-' + 12 + '-' + 31;

	    		var start_time = parseInt( (new Date(_this.selected_year + '-' + 1 + '-' + 1)).getTime()/1000 );
	    		var end_time = parseInt( (new Date(_this.selected_year + '-' + 12 + '-' + 31)).getTime()/1000 );
	    		/* 选择了某一年 */
	    		_this.$parent.getDataAjax('month',start_time,end_time);
	    	});

	    	$('#datepickmask').on('click',function(){
	    		$('#datepickpanel').fadeOut(300);
	    	})
	    },
	    methods:{
	    	makesureDate:function(){
	    		

	    		var _this = this;

    			if(_this.date_start == '未选' && _this.date_end == '未选'){

    			}else{
    				$('#datepickpanel').fadeOut(300);
    				if(_this.date_start == '未选'){
    					_this.date_start = _this.date_end;
    				}else if(_this.date_end == '未选'){
    					_this.date_end = _this.date_start;
    				}

    				_this.selectdate = _this.date_start.year + '-' + (_this.date_start.month+1) + '-' + _this.date_start.date + ' ~ ' +  _this.date_end.year + '-' +  (_this.date_end.month+1) + '-' +  _this.date_end.date;

    				if((_this.date_start.year == _this.date_end.year) && (_this.date_start.month == _this.date_end.month) && (_this.date_start.date == _this.date_end.date)){

    					var start_time = parseInt( (new Date(_this.date_start.year + '-' + (_this.date_start.month+1) + '-' + _this.date_start.date + ' 0:0:0')).getTime()/1000 );
		    			var end_time = parseInt( (new Date(_this.date_end.year + '-' +  (_this.date_end.month+1) + '-' +  _this.date_end.date + ' 23:59:59')).getTime()/1000 );
    					_this.$parent.getDataAjax('hour',start_time,end_time);
    				}else{
    					var start_time = parseInt( (new Date(_this.date_start.year + '-' + (_this.date_start.month+1) + '-' + _this.date_start.date)).getTime()/1000 );
		    			var end_time = parseInt( (new Date(_this.date_end.year + '-' +  (_this.date_end.month+1) + '-' +  _this.date_end.date)).getTime()/1000 );
		    			_this.$parent.getDataAjax('day',start_time,end_time);

    				}
    				
    			}
	    		
	    		
	    	},
	    	showCalendar:function(){
	    		$('#datepickpanel').fadeIn(300);
	    	},
	    	selectType:function(type){
	    		this.selecttype = type;
	    		if(this.selecttype == 'year'){
	    			this.initYear();
	    		}
	    	},

	    	initMonth:function(){
	    		var td = $('#monthbody').find('td');
	    		for(var i = 0; i <= 11; i++){
	    			if((i+1) > this.selected_month+1){
	    				td.eq(i).addClass('cursor-not-allowed');
	    			}
	    		}
	    	},
	    	
	    	initDate:function(){
	    		var days = 0;
	    		switch(this.selected_month+1){
	    			case 1 :
	    			case 3 :
	    			case 5 :
	    			case 7 :
	    			case 8 :
	    			case 10 :
	    			case 12 :
	    				days = 31;
	    			 	break;
	    			case 4 :
	    			case 6 :
	    			case 9 :
	    			case 11 :
	    				days = 30;
	    				break;
	    			case 2 :
	    				if(this.selected_year%400 == 0 || (this.selected_year%100 != 0 && this.selected_year%4 == 0)){
	    					days = 29;
	    				}else{
	    					days = 28;
	    				}
	    				break;
	    		}
	    		var dayone = this.selected_year+'-'+(this.selected_month+1)+'-1';
	    		var weekday = (new Date(dayone)).getDay();
	    		var td = $('#datebody').find('td');
	    		td.html('');
	    		if(weekday == 0){
	    			weekday = 7;
	    		}
	    		for(var i = weekday-1; i < days+weekday-1; i++){
	    			td.eq(i).html(i-weekday+2);
	    		}

	    		this.refreshSelectedDate();

	    	},

	    	initYear:function(){
	    		var td = $('#yeartable').find('td');
	    		for(var i = 12; i > 0; i--){
	    			td.eq(i-1).html(this.nowyear - 12*this.yearstep - (12-i));
	    		}
	    	},

	    	prevYear:function(){
	    		if(this.selected_year > 1900){
	    			this.selected_year -= 1;
	    		}
	    		if(this.selecttype == 'day'){
	    			this.initDate();
	    		}else if(this.selecttype == 'year'){
	    			this.initYear();
	    		}
	    	},
	    	nextYear:function(){
	    		if(this.selected_year < (new Date()).getFullYear()){
	    			this.selected_year += 1;
	    		}
	    		if(this.selecttype == 'day'){
	    			this.initDate();
	    		}else if(this.selecttype == 'year'){
	    			this.initYear();
	    		}
	    	},
	    	prevMonth:function(){
	    		if(this.selected_month == 0){
	    			this.selected_month = 11;
	    		}else{
	    			this.selected_month -= 1;
	    		}
	    		this.initDate();
	    	},
	    	nextMonth:function(){
	    		if(this.selected_month == 11){
	    			this.selected_month = 0;
	    		}else {
	    			this.selected_month += 1;
	    		}
	    		this.initDate();
	    	},
	    	prevYears:function(){
	    		console.log('max_year_step',this.max_year_step)
	    		if(this.yearstep < this.max_year_step){
	    			this.yearstep+=1;
	    			this.initYear();
	    		}
	    	},
	    	nextYears:function(){
	    		if(this.yearstep > 0){
	    			this.yearstep-=1;
	    			this.initYear();
	    		}
	    	},

	    	refreshSelectedDate:function(){
	    		/*判断是否和当前的开始时间和结束时间相撞
					如果相同的话，就给相应的日期加上样式，
					每次更新table，都要refresh一下
	    		*/
	    		var _this = this;
	    		var td = $('#datebody').find('td');
	    		td.attr('class','');
	    		if(_this.date_start != '未选' || _this.date_end != '未选'){
	    			if(_this.date_start!='未选'){
	    				if(_this.date_start.year == _this.selected_year){
			    			/* 年对了*/
			    			if(_this.date_start.month == _this.selected_month){
			    				// month is right
			    				// 然后就要判断td的日期
			    				for(var i = 0; i < td.length; i++){
			    					if(td.eq(i).html() == _this.date_start.date){
			    						td.eq(i).addClass('selected');
			    					}
			    				}
			    			}
			    		}
	    			}
	    			if(_this.date_end!='未选'){
	    				if(_this.date_end.year == _this.selected_year){
			    			/* 年对了*/
			    			if(_this.date_end.month == _this.selected_month){
			    				// month is right
			    				// 然后就要判断td的日期
			    				for(var i = 0; i < td.length; i++){
			    					if(td.eq(i).html() == _this.date_end.date){
			    						td.eq(i).addClass('selected');
			    					}
			    				}
			    			}
			    		}
	    			}
		    		
	    		}
	    		
	    	}
	    }
	}
</script>