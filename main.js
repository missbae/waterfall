var waterfall = {
	data: [{'src':'P_015.jpg'},{'src':'P_015.jpg'},{'src':'P_015.jpg'},{'src':'P_015.jpg'}],
	box : document.getElementById('waterfall'),
	imgGap : 20,
	minCols : 5,

	loadImg : function(){
		var _this = this;
		this.data.forEach(function(item,index){
			var imgContainer = document.createElement('div');
			imgContainer.className = 'img-container';
			var a = document.createElement('a');
			var img = document.createElement('img');
			img.src = 'images/'+item.src;
			a.appendChild(img);
			imgContainer.appendChild(a);
			_this.box.appendChild(imgContainer);
		})
	},

	waterfallImg: function(){
		//取得所有的img元素
		var imgs = document.getElementsByClassName('img-container');
		//判断浏览器宽度，计算每行显示几张图片
		var winW = document.documentElement.clientWidth || document.body.clientWidth;
		var imgW = imgs[0].offsetWidth;
		var cols = Math.floor(winW/(imgW+this.imgGap));
		//自适应布局，结合css中的min-widht来限定最小列数mincols。
		cols<this.minCols?cols=this.minCols:cols;
		this.box.style.width = cols *(imgW+this.imgGap)-this.imgGap + 'px';
		var arrH = [];
		for(var i=0;i<imgs.length;i++){
			if(i<cols){
				imgs[i].style.left = (imgW +this.imgGap) * i + 'px';
				imgs[i].style.top = 0;
				arrH.push(imgs[i].offsetHeight);
			}else{
				var minH = Math.min.apply(null,arrH);
				var index = this.getIndex(arrH,minH);
				imgs[i].style.left = (imgW + this.imgGap) * index + 'px';
				imgs[i].style.top = minH + this.imgGap +'px';
				arrH[index] += imgs[i].offsetHeight + this.imgGap;
			}
		}
	},

	isLoadImg:function(){
			var imgs = document.getElementsByClassName('img-container');
			var maxH = imgs[imgs.length-1].offsetHeight/2 + imgs[imgs.length-1].offsetTop;
			var winH = document.documentElement.clientHeight || document.body.clientHeight;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		/*	if(maxH < scrollTop + winH){
				return true;
			}else{
				return false;
			}
		*/	return (maxH<scrollTop+winH)?true:false;

	},

	getIndex:function(arr,value){
		for(var i in arr){
			if(arr[i] == value){
				return i;
			}
		}

	},

	/*浏览器窗口大小调整触发waterfall，重新排列*/
	resizeEvent:function(){
		var _this = this;
		window.onresize = function(){
			_this.waterfallImg();
		}
	},

	/*添加滚动事件*/
	scrollEvent:function(){
		var _this = this;
		window.onscroll = function(){
			if(_this.isLoadImg()){
				_this.loadImg();
				_this.waterfallImg();	
			 }
		}

	},

	init:function(){
		this.waterfallImg();
		this.scrollEvent();
		this.resizeEvent();

	}
}

waterfall.init();













