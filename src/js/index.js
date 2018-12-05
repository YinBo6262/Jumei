

        $('.box11').attr("swiper-animate-effect","bounceInUp");
        var mySwiper = new Swiper('.swiper-container', {
            lazy: true,
            init: false,
            on: {
                init: function () {
                    swiperAnimateCache(this); //隐藏动画元素 
                    swiperAnimate(this); //初始化完成开始动画
                },
                slideChangeTransitionEnd: function () {
                    swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                    //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                }
            }
        });
        mySwiper.lazy.load();

        $(document).scroll(function () {
            　　var tt = $(document).scrollTop();
            console.log(tt); //打印滚动条不同高度的位置的值

            　　if (tt >= 50) {
                mySwiper.init();
            　　}
        });