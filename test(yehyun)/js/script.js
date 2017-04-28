//A문제
$(function(){

  $('nav li').on({
 "mouseenter":function(){
     $(this).css({'backgroundColor':'#F00'}).children('a').css('color','#FFF')
 },
 "mouseleave":function(){
     $(this).css({'backgroundColor':'#CCC'}).children('a').css('color','#000')
    }
  })
//B문제
  var $menu = $('nav li')
$menu.on({  "click":function(event){
  event.preventDefault();
// console.log(event.offsetX)

      var idx = $(this).index();
      var st = $(".content section").eq(idx).offset().top;

      $('html, body').animate({
          'scrollTop':st
      })

  }
})

//c문제
var slideIdx =  Math.floor(Math.random() * $('.slidebanner li').size())
   $('.slidebanner li').eq(slideIdx).addClass('on').children('img').show()


   function slideMove(start,end,idx){
        $('.slidebanner li').eq(idx).addClass('on').children('img').css({
            "left":start,
            "display":'block'
        }).animate({
            'left':end
        }).parent().siblings().removeClass('on')
   }

   var slideInter = setInterval(function(){
       $('.next').click();
   },4500) // 자동으로 4.5초당 돌아가기

   $('.slidebanner').mouseenter(function(){

       clearInterval(slideInter)
   }).mouseleave(function(){

       slideInter = setInterval(function(){
           $('.next').click();
       },2500)
   })

   $('.slidebanner li a').click(function(){
       slideIdx = $(this).parent('li').index();
       var hisNum = $('.slidebanner li.on').index();
      console.log(slideIdx)
       if(slideIdx > hisNum){
           slideMove("0","-100%",hisNum)
           slideMove("100%","0",slideIdx)
       }else if(slideIdx < hisNum){
           slideMove("0","100%",hisNum)
           slideMove("-100%","0",slideIdx)
       }

   })

   $('.slidebanner .next').on({
       'click':function(){
           slideMove("0","-100%",slideIdx)
           slideIdx ++
           slideMove("100%","0",slideIdx)

           if(slideIdx == $('.slidebanner li').size()){
               slideIdx = 0
               slideMove("100%","0",slideIdx)
           }
       }
   })

   $('.slidebanner .prev').on({
       'click':function(){
           slideMove("0","100%",slideIdx)
           slideIdx --
           slideMove("-100%","0",slideIdx)

           if(slideIdx < 0){
               slideIdx = $('.slidebanner li').size() -1;
               slideMove("-100%","0",slideIdx)
           }
       }
   })
//D문제
   var fadeIdx = 0;
 //하얀 바탕 없이 바로 다음 이미지 나오게 하기
   fadeBenner = function(){
   $('.fadebanner li').eq(fadeIdx).removeClass('on').children('img').fadeOut()
   fadeIdx++
   $('.fadebanner li').eq(fadeIdx).addClass('on').children('img').fadeIn()
   if(fadeIdx == $('.fadebanner li').length){ // 다 돌아간 후 다시
    fadeIdx = 0
    $('.fadebanner li').eq(fadeIdx).addClass('on').children('img').fadeIn(2400)

  }}
  var fadeInter = setInterval(fadeBenner,4800)


  $('.fadebanner').mouseenter(function(){ //자동 이미지 넘기기
      clearInterval(fadeInter)
  })
  $('.fadebanner').mouseleave(function(){
       fadeInter = setInterval(fadeBenner,4800)
  })


 $('.fadebanner li a').click(function(e){ //번호 누르면 해당 이미지로 이동
     e.preventDefault();
     fadeIdx = $(this).parent().index()
     var hisNum = $('.fadebanner li.on').index()

     $('.fadebanner li').eq(hisNum).removeClass('on').children('img').fadeOut()
     $('.fadebanner li').eq(fadeIdx).addClass('on').children('img').fadeIn();

     }
   )

//E문제
   $('.movie-view li a').click(function(e){
       e.preventDefault();
       var url = $(this).attr('href')
       url  = "https://www.youtube.com/embed/"+url+"?rel=0&amp;controls=0&amp;showinfo=0"
       $('.movie-view iframe').attr('src',url);
       $(this).children('img').fadeTo(500,0.5).parent().parent().siblings().find('img').fadeTo(500,1)
   })

//F문제
   $(window).scroll(function(){
       var sct = $(this).scrollTop()
       $('.wing').stop().animate({
           'top':sct
       })
   })


})
