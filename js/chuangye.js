;$(function(){
// 盒子
    var box = $('#box');
    var shade = $('#shade');
// *************************header********************************
    // 头部导航
    var aHeaderToggle = $('.header-nav ul li .header-toggle');
    var aHeaderMenu = $('.header-menu');
    var navBtn = $('#navBtn');
    var oHeaderNav = $('header .container-fluid .header-nav');
    // 头部右侧
    var oHeaderR = $('header .container-fluid .header-right');
    var oHeaderDropdown = $('.header-right .dropdown a');

    // *************************导航下拉菜单*********************************
    var navTimer=null;
    $.each(aHeaderToggle,function (i,v){
        aHeaderMenu.eq(i).find('ul').css('width',aHeaderMenu.eq(0).find('li').outerWidth()*aHeaderMenu.eq(i).find('li').length+'px');
        var _this=$(this);
        _this.hover(function(){
            _this.find('span').css('animation','0.3s spanUp linear forwards');
            aHeaderMenu.eq(i).stop().slideDown();
            _this.siblings().css('height','7px');
        },function(){
            navTimer=setTimeout(function () {
                _this.find('span').css('animation','0.3s spanDown linear forwards');
                aHeaderMenu.eq(i).stop().slideUp();
                _this.siblings().css('height','0px');
            },200)
        });
        aHeaderMenu.eq(i).hover(function(){
            clearTimeout(navTimer);
            $(this).show();
        },function(){
            _this.find('span').css('animation','0.3s spanDown linear forwards');
            $(this).stop().slideUp();
            _this.siblings().css('height','0px');
        });
        clearTimeout(navTimer);
    });

    // *************************移动端右侧导航*********************************
    navBtn.click(function(){
        oHeaderNav.css('right','0');
        oHeaderR.css('right','0');
        box.css('left','-130px');
        shade.show();
    });
    shade.click(function(){
        oHeaderNav.css('right','-130px');
        oHeaderR.css('right','-130px');
        box.css('left','0');
        shade.hide();
    });

// *************************banner*********************************
    // 轮播图
    var oBannerBox = $('#bannerBox');
    var pic = $('.banner .pic');
    var aDiv = pic.children();
    var oPre = $('.banner .pre-next .pre');
    var oNext = $('.banner .pre-next .next');
    var now = 0;

    // 获取可视区宽度
    var clientW = $(window).outerWidth();
    pic.css({width:clientW*aDiv.length, left: -clientW});
    $.each(aDiv,function (i,v){
        aDiv.eq(i).css('width',clientW);
    });

    // 页面改变而改变宽度
    $(window).resize(function(){
        clientW = $(window).outerWidth();
        pic.css('width',clientW*aDiv.length+'px');
        $.each(aDiv,function (i,v){
            aDiv.eq(i).css('width',clientW);
        });
    });

    // 下一页
    oNext.on('click', nextPage);
    function nextPage(){
        now++;
        if(now == aDiv.length-2){
            oNext.off();
            pic.stop().animate({left: -clientW*(now+1)},function(){
                pic.css({left: -clientW});
                oNext.on('click', nextPage);
            });
            now = 0;
        }else{
            pic.stop().animate({left: -clientW*(now+1)});
        }
    }

    // 上一页
    oPre.on('click', prePage);
    function prePage(){
        now--;
        if(now<0){
            oPre.off();
            pic.stop().animate({left: -clientW*(now+1)},function(){
                pic.css({left: -clientW * aLi.length});
                oPre.on('click', prePage);
            });
            now = aDiv.length -3;
        }else{
            pic.stop().animate({left: -clientW*(now+1)});
        }
    }

    // 自动播放
    var timer = setInterval(function(){
        nextPage();
    },5000);
    oBannerBox.hover(function(){
        clearInterval(timer);
        oPre.stop().animate({marginLeft: 0});
        oNext.stop().animate({marginRight: 0});
    },function(){
        clearInterval(timer);
        timer = setInterval(function(){
            nextPage();
        },2000);
        oPre.stop().animate({marginLeft: -oPre.outerWidth()});
        oNext.stop().animate({marginRight: -oPre.outerWidth()});
    });
// *************************内容部分*********************************
// ***********************旅行保险目的地*****************************
    var aConNav=$('.destination .conNav li');
    var aConList=$('.conList li');
    $.each(aConNav,function (i,v) {
        $(v).click(function () {
            aConNav.removeClass('active');
            $(this).addClass('active');
            aConList.hide();
            aConList.eq(i).show();
        })
    })
});