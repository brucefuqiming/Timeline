

angular.module('timeline',[])
.controller('ctrl',function($scope){
	var $s=$scope;

	$s.zoom=0.3;
	$s.periodHeight=30;

	// var timeline={
	// 	'夏朝':{from:-2100,to:-1600},
	// 	'商朝':{from:-1600,to:-1050},
	// 	'周朝':{from:-1046,to:-256},
	// 	'秦朝':{from:-221,to:-206},
	// 	'汉朝':{from:-206,to:220},
	// 	'晋朝':{from:265,to:420},
	// 	'隋朝':{from:581,to:618},
	// 	'唐朝':{from:618,to:906},
	// 	'宋朝':{from:960,to:1279},
	// 	'元朝':{from:1279,to:1368},
	// 	'明朝':{from:1368,to:1644},
	// 	'清朝':{from:1644,to:1912}
	// }

	var timeline={//sjudo
		data:[
			{name:'商朝',from:-1600,to:-1050},
			{name:'秦朝',from:-1100,to:-228},
			{name:'唐朝',from:618,to:906},
			{name:'汉朝',from:-206,to:220},
			{name:'夏朝',from:-2100,to:-1500},
			{name:'周朝',from:-1846,to:-256},
			{name:'晋朝',from:265,to:420},
			{name:'隋朝',from:581,to:638},
			{name:'元朝',from:1100,to:1368},
			{name:'明朝',from:1390,to:1700},
			{name:'清朝',from:1644,to:1912},
			{name:'宋朝',from:800,to:1279},
			{name:'aaa',from:-300,to:300}
		]
	}

	timeline.data.sort(function(a,b){return a.from-b.from});//排序


	for(var i=0;i<timeline.data.length;i++){//算出各项参数
		var period=timeline.data[i];
		if(!timeline.min){
			timeline.min=period.from;
		}
		else{
			if(period.from<timeline.min){
				timeline.min=period.from;
			}
		}
		if(!timeline.max){
			timeline.max=period.to;
		}
		else{
			if(period.to>timeline.max){
				timeline.max=period.to;
			}
		}
		period.span=period.to-period.from;
		period.color='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.5)';
		period.row=0;
	}

	//set row
	timeline.rows=[];
	function setRow(row){
		var arr=[];
		arr.push(timeline.data.splice(0,1)[0]);
		var length=timeline.data.length;
		for(var i=0;i<length;){
			if(timeline.data[i].from>=arr[arr.length-1].to){
				arr.push(timeline.data.splice(i,1)[0]);
				length--;
			}
			else{
				i++;
			}
		}
		timeline.rows.push(arr);
		if(timeline.data.length>0){
			setRow(++row);
		}
	}
	setRow(0);


	if(timeline.min<0){
		$s.bias=-timeline.min;
	}
	else{
		$s.bias=0;
	}

	console.log(timeline);
	$s.timeline=timeline;

})