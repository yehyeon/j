$(function(){
    //hover Menu

    var $Navli = $('nav ul li');
    $Navli.hover(function(){
      $(this).find('a').css({
        'background-color' : '#fff',
        'color' : '#f00'
      })},function(){
        $(this).find('a').css({
          'background-color' : '#CCC',
          'color' : '#000'
        })
      }
    )

    //scroll Menu

    var scrT = [];
    $('.content section').each(function(){
      scrT.push($(this).offset().top);
    })

    $Navli.click(function(){
      var idx = $(this).index();
      $('html, body').animate({
        'scrollTop' : scrT[idx]
      })
    })

    //Slide Banner

    var idx = Math.floor(Math.random() * $('.slidebanner li').length);
    var slideWidth = $('.slidebanner').width();
    var slideAuto = function(){
      $('.slidebanner .next').trigger('click')
    };
    var speed = 4500;
    var autoMove = setInterval(slideAuto,speed);

    function nextClick(remove, add, center){
      $('.slidebanner li').eq(idx).removeClass('on').find('img').animate({
        'left' : remove
      }).parent().next().addClass('on').find('img').css({
        'display' : 'block',
        'left' : add
      }).stop().animate({
        'left' : center
      })
    }

    function prevClick(remove, add, center){
      $('.slidebanner li').eq(idx).removeClass('on').find('img').animate({
        'left' : remove
      }).parent().prev().addClass('on').find('img').css({
        'display' : 'block',
        'left' : add
      }).stop().animate({
        'left' : center
      })
    }

    $('.slidebanner li').eq(idx).addClass('on').find('img').css('display','block');
    $('.slidebanner li').eq(idx).siblings().removeClass('on');

    $('.slidebanner .next').click(function(){
      nextClick(-slideWidth, slideWidth, 0);
      idx++;
      if(idx == $('.slidebanner li').length){
        idx = 0;
        $('.slidebanner li').eq(idx).addClass('on').find('img').css({
          'display' : 'block',
          'left' : slideWidth
        }).stop().animate({
          'left' : 0
        })
      }
    })

    $('.slidebanner .prev').click(function(){
      prevClick(slideWidth, -slideWidth, 0)
      idx--;
      if(idx < 0){
        idx = $('.slidebanner li').length - 1;
        $('.slidebanner li').eq(idx).addClass('on').find('img').css({
          'display' : 'block',
          'left' : -slideWidth
        }).stop().animate({
          'left' : 0
        })
      }
    })


    $('.slidebanner li').mouseenter(function(){
      clearInterval(autoMove);
    }).mouseleave(function(){
      autoMove = setInterval(slideAuto,speed);
    })


    $('.slidebanner li a').click(function(){
      var selA = $(this).parent().index();
      var selB = $('.slidebanner li.on').index();

      if(selA > selB){
        $('.slidebanner li').eq(selB).removeClass('on').find('img').animate({
          'left' : -slideWidth
        }).parent().parent().find('li').eq(selA).addClass('on').find('img').css({
          'display' : 'block',
          'left' : slideWidth
        }).stop().animate({
          'left' : 0
        })
      }else if(selA < selB){
        $('.slidebanner li').eq(selB).removeClass('on').find('img').animate({
          'left' : slideWidth
        }).parent().parent().find('li').eq(selA).addClass('on').find('img').css({
          'display' : 'block',
          'left' : -slideWidth
        }).stop().animate({
          'left' : 0
        })
      }

    })

    //Fade slide
    var fade_idx = 0;
    var $fade_length = $('.fadebanner li').length;
    var speed2 = 4800;
    function fadeFunction(x, y){
      $('.fadebanner li').eq(x).removeClass('on').find('img').fadeOut();
      $('.fadebanner li').eq(y).addClass('on').find('img').fadeIn();
    }
    var fadeMove = function(){
      fadeFunction(fade_idx, fade_idx+1);
      fade_idx++;
      if(fade_idx == $fade_length){
        fade_idx = 0;
        fadeFunction($fade_length, fade_idx);
      }
    }

    var fadeAuto = setInterval(fadeMove, speed2);

    $('.fadebanner').hover(function(){
      clearInterval(fadeAuto)
    },function(){
      fadeAuto = setInterval(fadeMove, speed2);
    })

    $('.fadebanner li a').click(function(e){
      e.preventDefault();
      var selA = $(this).parent().index();
      var selB = $('.fadebanner li.on').index();
      fadeFunction(selB, selA);
    })

    //SNS Movie List
    $('.movie-view li').click(function(e){
      e.preventDefault();
      var attr = $(this).find('a').attr('href');
      $('.movie-view iframe').attr('src',"https://www.youtube.com/embed/"+attr+"?rel=0&amp;controls=0&amp;showinfo=0");

      $('.movie-view li.on').removeClass('on').find('img').css('opacity', '1');
      $(this).addClass('on').find('img').css('opacity','0.5');
    })

    //Wing Banner
    $(window).scroll(function(){
      var wingTop = $(this).scrollTop();
      $('.wing').stop().animate({
        'top' : wingTop
      })
    })

    //layout popup
    var eventDiv = [];
    for(i=0; i<$('.btngroup div').length; i++){
      eventDiv.push($('.btngroup div').eq(i).clone());
    }
    $('.btngroup div').remove();
    $('.h-type .btngroup button').click(function(){
      var btnIdx = $(this).index();
      var popOpen = eventDiv[btnIdx];

      $('body').append('<div class="blind"></div>');
      $('.blind').css('opacity','0.5').fadeTo(500,0.5);
      $('.btngroup').append(popOpen);
      $(popOpen).slideDown();

    })

})
