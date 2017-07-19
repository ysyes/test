//加载洲
$.getJSON("../../js/map.json","",function (data) {
	var continent = "<option value=''>请选择洲</option>";
	for (i in data) {
		continent+='<option value="'+i+'">'+i+'</option>';
	}
	$("#continent").html(continent);
	continentFn();
})
//点击洲触发
$("#continent").change(function (){
	continentFn();
})
function continentFn(){
	var checked = $("#continent option:checked").html();
	country(checked);
}
//加载国家
//country("亚洲")
function country(continent) {
	$.ajax({
		url:'../../js/map.json',
		type:'get',
		async:true,
		success:function(data){
			var country = "<option value=''>请选择国家</option>";
			for (i in data[continent]) {
				country+='<option value="'+i+'">'+i+'</option>';
			}
			$("#country").html(country);
			countryFn();
		}
	})
//	$.getJSON("../../js/map.json","",function (data) {
//		var country = "<option value=''>请选择国家</option>";
//		for (i in data[continent]) {
//			country+='<option value="'+i+'">'+i+'</option>';
//		}
//		$("#country").html(country);
//		countryFn();
//	})
}
//点击国家触发
$("#country").change(function (){
	countryFn();
})
function countryFn(){
	var continentChecked = $("#continent").val();
	var countryChecked = $("#country").val();
	cityFn(continentChecked,countryChecked);
}
//加载省市
//city("中国")
function cityFn(continentChecked,countryChecked) {
	$.getJSON("../../js/map.json","",function (data) {
		var city = "<option value=''>请选择省市</option>";
		if(data[continentChecked]!==undefined){
			for (i in data[continentChecked][countryChecked]) {
				city+='<option value='+data[continentChecked][countryChecked][i]+'>'+data[continentChecked][countryChecked][i]+'</option>';
			}
		}
		$("#city").html(city);
	})
}