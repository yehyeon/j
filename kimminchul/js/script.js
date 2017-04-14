$(function(){

    var $menu = $('nav li')

    $menu.on({ // nav li 한테 이벤트를 줄건데
        "mouseenter":function(){  //마우스가 올라오면 실행해
            //A문제 1안
            $(this).addClass('on').siblings().removeClass('on')
            //마우스 올린놈한테 onclass 넣고 그형제 자매는 on class 지워
        },
        "click":function(event){
            //B문제
            event.preventDefault();
            // console.log(event.offsetX)

            var idx = $(this).index();
            var st = $(".content section").eq(idx).offset().top;

            $('html, body').animate({
                'scrollTop':st
            })

        }
    })
    //2안
    // $('nav li').hover(function(){
    //     $(this).addClass('on').siblings().removeClass('on')
    //         //마우스 올린놈한테 onclass 넣고 그형제 자매는 on class 지워
    // })

    // 3안
    // "mouseenter":function(){
    //     $(this).css({'backgroundColor':'#F00'}).children('a').css('color','#FFF')
    // },
    // "mouseleave":function(){
    //     $(this).css({
    //         'backgroundColor':'#CCC',
    //         'color':'#000'
    //     })
    // }

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
       },2500)

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







})
