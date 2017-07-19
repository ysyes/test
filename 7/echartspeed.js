option = {
	title: {
		text: ''
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['浩林', '国字号球员', '联盟标准'],
		show :false
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	/*toolbox: {
		feature: {
			saveAsImage: {} //存储图片
		}
	},*/
	xAxis: {
		type: 'category',
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: '#e2e2e2',
				width: 2
			}
		},
		axisLabel: {
			margin : 8,
			textStyle: {
				color: '#595959',
				fontSize:16
			}
		},
		splitArea: {
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		splitLine : {
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		data: ['13岁', '14岁', '15岁', '16岁', '17岁', '18岁']
	},
	yAxis: {
		type: 'value',
		interval: 0.5,
		max: 14,
		min: 11,
		axisLabel: {
			margin : 8,
			textStyle: {
				color: '#808080',
				fontSize:16
			}
		},
		splitLine : {
			show : true,
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: '#e2e2e2',
			}
		}
	},
	series: [{
		name: '浩林',
		type: 'line',
		data: [13.53, 13.54, 13.7, 13.71, 13.72, 13.75, 13.8],
		itemStyle: {
			normal: {
				color: '#eea66c',
				lineStyle: {
					color: '#eea66c'
				}
			}
		},
	}, {
		name: '国字号球员',
		type: 'line',
		data: [13.25, 13.45, 13.26, 13.45, 13.45, 13.6, 13.36],
		itemStyle: {
			normal: {
				color: '#00a084',
				lineStyle: {
					color: '#00a084'
				}
			}
		},
	}, {
		name: '联盟标准',
		type: 'line',
		data: [13.1, 13.2, 13, 13.25, 13.25, 13.3, 13.2],
		itemStyle: {
			normal: {
				color: '#a3b5c5',
				lineStyle: {
					color: '#a3b5c5'
				}
			}
		},
	}]
};

option1 = {
	title: {
		text: ''
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['浩林', '国字号球员', '联盟标准'],
		show :false
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: '#e2e2e2',
				width: 2
			}
		},
		axisLabel: {
			margin : 8,
			textStyle: {
				color: '#595959',
				fontSize:16
			}
		},
		splitArea: {
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		splitLine : {
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		data: ['13岁', '14岁', '15岁', '16岁', '17岁', '18岁']
	},
	yAxis: {
		type: 'value',
		interval: 1000,
		max: 6000,
		min: 0,
		axisLabel: {
			margin : 8,
			textStyle: {
				color: '#808080',
				fontSize:16
			}
		},
		splitLine : {
			show : true,
			lineStyle: {
				color: '#e2e2e2'
			}
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: '#e2e2e2',
			}
		}
	},
	series: [{
		name: '浩林',
		type: 'line',
		data: [4500,4680 , 4881, 5200,5467, 5630, 5800],
		itemStyle: {
			normal: {
				color: '#eea66c',
				lineStyle: {
					color: '#eea66c'
				}
			}
		},
	}, {
		name: '国字号球员',
		type: 'line',
		data: [4200,4480 , 4581, 4800,5067, 5130, 5200],
		itemStyle: {
			normal: {
				color: '#00a084',
				lineStyle: {
					color: '#00a084'
				}
			}
		},
	}, {
		name: '联盟标准',
		type: 'line',
		data: [3900,4180 , 4381, 4400,4667, 4870, 4900],
		itemStyle: {
			normal: {
				color: '#a3b5c5',
				lineStyle: {
					color: '#a3b5c5'
				}
			}
		},
	}]
};


var echartSpeed = echarts.init(document.getElementById('echart-speed'));
echartSpeed.setOption(option)
var echartSpeed2 = echarts.init(document.getElementById('echart-speed2'));
echartSpeed2.setOption(option)
var echartSpeed3 = echarts.init(document.getElementById('echart-speed3'));
echartSpeed3.setOption(option1)