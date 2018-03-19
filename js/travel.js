// MOD 設定
var selectlist = document.querySelector('#selectlist');
var title = document.querySelector('.title');
var hotbox = document.querySelector('.hotbox');
var travelbox = document.querySelector('.travelbox');
// 資料 設定
var data = [0,0];
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction();
      travelbox.innerHTML ="";
    }else{
      travelbox.innerHTML = "沒法連接資料庫 status: " + xhr.status + " readyState: " + xhr.readyState;
    }
  };
function myFunction() {
  // if(xhr.status==200){
    var area= [];
    var arealist= [];
      data = JSON.parse(xhr.responseText);
      data = data.result.records;
      for (var i = 0; data.length > i; i++) {
      arealist.push(data[i].Zone);
    }
    // 判斷是否重覆
    arealist.forEach(function (value) {
      if (area.indexOf(value) == -1) {
        area.push(value);
      }
    });
    areaUpdated(area);
  }
// 功能與更新
selectlist.addEventListener('change', updatedList);
hotbox.addEventListener('click', hotlist);

//下拉選單
function areaUpdated(items) {
  var str = '';
  for (var i = -1; i < items.length; i++) {
  	if(i==-1){
  		str += '<option selected="selected" disabled="disabled" value=""> -- 請選擇行政區 -- </option>'
  	}else{
    	str += '<option value="' + items[i]+ '">' + items[i] + '</option>'
    }
  }
  selectlist.innerHTML = str;
}
//熱門行政區
function hotlist(e) {
  if (e.target.nodeName !== 'INPUT') {
    return;
  }
  updatedList(e);
}

//更新網頁
function updatedList(e) {
  var str = '';
  $('html,body').animate({scrollTop:$('.title').offset().top}, 1500);
  for (var i = 0; i < data.length; i++) {
    if (data[i].Zone == e.target.value) {
      title.textContent = data[i].Zone;
      if(data[i].Ticketinfo==""){
      	str += '<li><div class="pic" style="background:url(' + data[i].Picture1 + ');background-size: cover;background-position: center;"></div><h3>' + data[i].Name + '</h3><h2>' + data[i].Zone + '</h2><div class="about"><div class="opentime">' + data[i].Opentime + '</div><div class="address">' + data[i].Add + '</div><div class="telephone">' + data[i].Tel +'</div>'
      }else{
      	str += '<li><div class="pic" style="background:url(' + data[i].Picture1 + ');background-size: cover;background-position: center;"></div><h3>' + data[i].Name + '</h3><h2>' + data[i].Zone + '</h2><div class="about"><div class="opentime">' + data[i].Opentime + '</div><div class="address">' + data[i].Add + '</div><div class="telephone">' + data[i].Tel + '</div><div class="toll">' + data[i].Ticketinfo + '</div></div></li>'
    	}
    }
    travelbox.innerHTML = str;
  }
}
//gotoandtop
$(function(){
            $("#gototop").click(function(){
                jQuery("html,body").animate({
                    scrollTop:0
                },1000);
            });
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 100){
                    $('#kcgototop').fadeIn("fast");
                } else {
                    $('#kcgototop').stop().fadeOut("fast");
                }
            });
        });