/*


    1. GLOBAL
        1.1 DO AFTER RESIZE
        1.2 DO AFTER WINDOW LOAD
    2. PAGE PRELOADER
    3. PAGE HEADER
    4. NAVIGATION
    5. SCROLL DOWN BUTTON
    6. PORTFOLIO
        6.1 PORTFOLIO GRID SIZE
        6.2 OPEN PROJECT DETAILS
        6.3 PORTFOLIO NAVIGATION CONTROLS
        6.4 LOAD MORE PORTFOLIO ITEMS
    7. BLOG
        7.1 SET BLOG
        7.2 OPEN BLOG DETAILS
        7.3 BLOG CONTROLS
        7.4 LOAD MORE BLOG ITEMS
    8. SKILLS (SHORTCODES)
    9. COUNTER (SHORTCODES)
    10. ACCORDION AND TOGGLE (SHORTCODES)
    11. TAB BOX (SHORTCODES)
    12. ALERT BOXES (SHORTCODES)
    13. TIMELINE (SHORTCODES)


*/

(function ($) {

    'use strict';

    /* --------------------------------------------------------------------- */
    /* 1. GLOBAL
    /* --------------------------------------------------------------------- */
	
	var windowHeight    = $(window).height(),
        windowWidth     = $(window).width(),
        resizeTimeout;

	$(window).resize(function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){
            doafterresize();
        },300);
	});


    /* ==== 1.1 DO AFTER RESIZE ==== */

    function doafterresize()
    {
        windowHeight    = $(window).height();
        windowWidth     = $(window).width();
        removePortfolioDetails();
        sizePortfolio();
        setTimeline();
        removeBlogPost();
    }


    /* ==== 1.2 DO AFTER WINDOW LOAD ==== */

    $(window).load(function(){
        sizePortfolio();
        setTimeline();
        setBlog();
        removePreloader();
    });




    /* --------------------------------------------------------------------- */
    /* 2. PAGE PRELOADER
    /* --------------------------------------------------------------------- */

    var pagePreloader =  $("#page-preloader");

    function removePreloader()
    {
        pagePreloader.animate({
            height: '0px'
        }, 700, 'easeInOutQuart');
    }




    /* ----------------------------------------- */
    /* 3. PAGE HEADER
    /* ----------------------------------------- */

    var logo        = $("#logo img"),
        checkHeader = 0;

    $(document).scroll(function(){
        if($(this).scrollTop() > 250)
        {

            if(checkHeader == 0)
            {
                checkHeader = 1;
                pageHeader.clearQueue().animate({
                    height: '50px',
                    lineHeight: '50px'
                }, 300, 'easeInOutQuart');
                logo.clearQueue().animate({
                    maxHeight: '50px'
                }, 300, 'easeInOutQuart');
            }

        } else {

            if(checkHeader == 1)
            {
                checkHeader = 0;
                pageHeader.clearQueue().animate({
                    height: '80px',
                    lineHeight: '80px'
                }, 300, 'easeInOutQuart');
                logo.clearQueue().animate({
                    maxHeight: '80px'
                }, 300, 'easeInOutQuart');
            }

        }
    });




    /* ----------------------------------------- */
    /* 4. NAVIGATION
    /* ----------------------------------------- */

    var openNavi            = $("#open-navi"),
        pageWrapper         = $("#pagewrapper"),
        navigationContainer = $("#navigation-container"),
        mainNavigation      = $("#main-navigation"),
        pageHeader          = $("#page-header"),
        scrollDown          = $(".scroll-down");


    openNavi.click(function(){

        if(pageWrapper.css("right") != '0px')
        {
            foldHeader();
        } else {
            expandHeader();
        }
    });

    navigationContainer.mouseleave(function(){
        foldHeader();
    });


    function foldHeader()
    {
        scrollDown.fadeIn(200);

        pageWrapper.animate({
            right: '0'
        }, 500, 'easeInOutQuart');
        pageHeader.animate({
            right: '0'
        }, 500, 'easeInOutQuart');

        openNavi.removeClass("active");
    }


    function expandHeader()
    {
        var navWidth = navigationContainer.width();
        scrollDown.fadeOut(200);

        pageWrapper.animate({
            right: navWidth + 'px'
        }, 500, 'easeInOutQuart');
        pageHeader.animate({
            right: navWidth + 'px'
        }, 500, 'easeInOutQuart');

        openNavi.addClass("active");
    }




    /* --------------------------------------------------------------------- */
    /* 5. SCROLL DOWN BUTTON
    /* --------------------------------------------------------------------- */

    $("a.scroll-down").click(function(){
        $('html, body').clearQueue().animate({
            scrollTop: $('html, body').offset().top + windowHeight - 80
        }, 1800, 'easeInOutQuart');
        return false;
    });


    var scrollContainer = $(".scroll-down-container");

    $(document).scroll(function(){
        if($(this).scrollTop() >60)
        {
            if(scrollContainer.is(":visible"))
            {
                scrollContainer.fadeOut(300);
            }

        } else {
            if(scrollContainer.is(":hidden"))
            {
                scrollContainer.fadeIn(300);
            }
        }
    });




    /* ----------------------------------------- */
    /* 6. PORTFOLIO
    /* ----------------------------------------- */

    var portfolioSection    = $("#portfolio"),
        potfolioGrid        = $("#portfolio-grid"),
        portfolioDetails    = $("#portfolio-details"),
        loadContent         = $("#portfolio-loaded-content"),
        preLoader           = $("#page-preloader"),
        portfolioControls   = $("#portfolio-controls"),
        folder,
        hash,
        url,
        openProject,
        portfolioCarousel;


    /* ==== 6.1 PORTFOLIO GRID SIZE ==== */

    function sizePortfolio()
    {
        var i           = 0,
            minHeight   = 0;

        if(windowWidth > 580)
        {
            potfolioGrid.children("li").each(function(){
                var imgHeight = $(this).children("img").height();

                if(i == 0)
                {
                    minHeight = imgHeight - 1;
                    i = i + 1;
                } else {
                    if(imgHeight < minHeight)
                    {
                        minHeight = imgHeight - 1;
                    }
                }

                potfolioGrid.children("li").css({
                    height: minHeight + 'px'
                });
            });
        } else {
            potfolioGrid.children("li").css({
                height: 'auto'
            });
        }
    }


    function removePortfolioDetails()
    {
        if(windowWidth > 1040)
        {
            if(portfolioDetails.is(":visible"))
            {
                portfolioDetails.hide();
                loadContent.html("");
                portfolioSection.show();
            }
        }
    }


    /* ==== 6.2 OPEN PROJECT DETAILS ==== */


    /* ==== PORTFOLIO CAROUSEL SIZE ==== */

    function sizePortfolioCarousel()
    {
        if(portfolioCarousel.length)
        {
            var headerHeight    = '80',
                carouselItem    = portfolioCarousel.children(".item"),
                newHeight       = windowHeight - headerHeight;

            carouselItem.css({
                height: newHeight + 'px'
            });
        }
    }


    function openPortfolioProject()
    {
        loadContent.load(folder+url, function(){

            /* ==== DO AFTER LOAD ==== */

            portfolioSection.hide();
            portfolioDetails.show();

            $("html, body").animate({ scrollTop: 0 }, 0);

            var detailCarousel      = $(".detail-carousel"),
                video               = $("iframe");
                portfolioCarousel   = $(".portfolio-carousel");


            /* ==== START BIG IMAGE CAROUSEL ==== */

            if(portfolioCarousel.length)
            {
                sizePortfolioCarousel();

                portfolioCarousel.owlCarousel({
                    slideSpeed: 1000,
                    paginationSpeed: 1200,
                    navigation : false,
                    singleItem: true,
                    pagination: true
                });

            }


            /* ==== START SMALL IMAGE CAROUSEL ==== */

            if(detailCarousel.length)
            {
                detailCarousel.owlCarousel({
                    navigation : false,
                    pagination: true,
                    items : 3
                });
            }


            /* ==== RESIZE VIDEO ==== */

            if(video.length)
            {
                $("#portfolio-details").fitVids();
            }

            preLoader.animate({
                height: '0px'
            }, 600, 'easeInOutQuart');

        });
    }


    $(document).on('click', '#portfolio-grid li a', function(){

        folder      = 'portfolio/',
        hash        = $(this).attr('data-portfolio-link'),
        url         = hash.replace(/[#\#]/g, ''),
        openProject = hash;

        preLoader.animate({
            height: '100%'
        }, 700, 'easeInOutQuart', function(){

            openPortfolioProject();

        });
    });


    /* ==== 6.3 PORTFOLIO NAVIGATION CONTROLS ==== */

    portfolioControls.children(".grid").click(function(){
        preLoader.animate({
            height: '100%'
        }, 600, 'easeInOutQuart', function(){

            portfolioDetails.hide();
            loadContent.html("");
            portfolioSection.show();

            preLoader.animate({
                height: '0px'
            }, 600, 'easeInOutQuart');
        });
    });


    function goToProject(direction)
    {
        preLoader.animate({
            height: '100%'
        }, 600, 'easeInOutQuart', function(){

            loadContent.html("");

            var portfolioArray = [];
            potfolioGrid.children("li").each(function(){
                var addToArray = $(this).children("a").attr('data-portfolio-link');
                portfolioArray.push(addToArray);
            });

            var next = portfolioArray[($.inArray(openProject, portfolioArray) + 1) % portfolioArray.length];
            var prev = portfolioArray[($.inArray(openProject, portfolioArray) - 1 + portfolioArray.length) % portfolioArray.length];


            if(direction == 'next')
            {
                hash = next;
            }
            else {
                hash = prev;
            }

            folder      = 'portfolio/';
            openProject = hash;
            url         = hash.replace(/[#\#]/g, '');
            openPortfolioProject();


            preLoader.animate({
                height: '0px'
            }, 600, 'easeInOutQuart');
        });
    }


    portfolioControls.children(".next").click(function(){
        goToProject('next');
    });

    portfolioControls.children(".previous").click(function(){
        goToProject('previous');
    });



    /* ==== 6.4 LOAD MORE PORTFOLIO ITEMS ==== */

    var loadMoreWork    = 1,
        loadMoreButton  = $( "#portfolio-load-more"),
        loadMoreIcon    = loadMoreButton.children("i");

    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }


    loadMoreButton.click( function( e ) {

        loadMoreIcon.addClass("rotate");
        e.preventDefault();

        var load = pad( loadMoreWork, 2 );

        var protocol = $(location).attr('protocol');

        if( protocol == 'file:') {
            alert('"The Buttons "Load More" not working if you open the index.html by double click and have a URL like file://../../index.html\n\nRun it on your localhost or online server and it will work.\n\nReason:\nBrowsers implement strong security measures to prevent downloaded web pages from accessing arbitrary files on the file system.');
        }

        $.get('portfolio/load-more-' + load + '.html', function(data){

            $(data).appendTo("#portfolio-grid");

        }).done(function(){

            loadMoreIcon.removeClass("rotate");

        });

        loadMoreWork = loadMoreWork + 1;
        load = pad( loadMoreWork, 2 );

        $.get( 'portfolio/load-more-' + load + '.html' ).fail(function() {
            loadMoreButton.hide();
        });
    } );





    /* ----------------------------------------- */
    /* 7. BLOG
    /* ----------------------------------------- */

    var blogSection     = $("#blog"),
        blogGrid        = $("#blog-grid"),
        blogDetails     = $("#blog-details"),
        loadBlogContent = $("#blog-loaded-content"),
        blogControls    = $("#blog-controls"),
        blogFolder,
        blogHash,
        blogUrl,
        openBlogPostVar,
        blogCarousel;


    /* ==== 7.1 SET BLOG ==== */

    function setBlog()
    {
        if(blogGrid.length) // CHECK IF ELEMENT EXIST
        {
            blogGrid.gridalicious({
                selector: 'li',
                width: 400,
                gutter: 2
            });
        }
    }


    function removeBlogPost()
    {
        if(blogDetails.length)
        {
            if(blogDetails.is(":visible"))
            {
                blogDetails.hide();
                loadBlogContent.html("");
                blogSection.show();
                setBlog();
            }
        }
    }


    /* ==== 7.2 OPEN BLOG DETAILS ==== */


    /* ==== BLOG CAROUSEL SIZE ==== */

    function sizeBlogCarousel()
    {
        if(blogCarousel.length)
        {
            var headerHeight    = '80',
                carouselItem    = blogCarousel.children(".item"),
                newHeight       = windowHeight - headerHeight;

            carouselItem.css({
                height: newHeight + 'px'
            });
        }
    }


    function openBlogPost()
    {
        loadBlogContent.load(blogFolder+blogUrl, function(){

            /* ==== DO AFTER LOAD ==== */

            blogSection.hide();
            blogDetails.show();

            $("html, body").animate({ scrollTop: 0 }, 0);

            var video       = $("iframe");
            blogCarousel    = $(".blog-carousel");


            /* ==== START BIG IMAGE CAROUSEL ==== */

            if(blogCarousel.length)
            {
                sizeBlogCarousel();

                blogCarousel.owlCarousel({
                    slideSpeed: 1000,
                    paginationSpeed: 1200,
                    navigation : false,
                    singleItem: true,
                    pagination: true
                });

            }


            /* ==== RESIZE VIDEO ==== */

            if(video.length)
            {
                $("#blog-details").fitVids();
            }

            preLoader.animate({
                height: '0px'
            }, 600, 'easeInOutQuart');

        });
    }


    $(document).on('click', '#blog-grid li a', function(){

        blogFolder      = 'blog/',
        blogHash        = $(this).attr('data-blog-link'),
        blogUrl         = blogHash.replace(/[#\#]/g, ''),
        openBlogPostVar = blogHash;

        preLoader.animate({
            height: '100%'
        }, 600, 'easeInOutQuart', function(){

            openBlogPost();

        });
    });


    /* ==== 7.3 BLOG CONTROLS ==== */

    blogControls.children(".grid").click(function(){
        preLoader.animate({
            height: '100%'
        }, 600, 'easeInOutQuart', function(){

            blogDetails.hide();
            loadBlogContent.html("");
            blogSection.show();

            preLoader.animate({
                height: '0px'
            }, 600, 'easeInOutQuart');
        });
    });



    /* ==== 7.4 LOAD MORE BLOG ITEMS ==== */

    var loadMorePost        = 1,
        loadMoreBlogButton  = $( "#blog-load-more"),
        loadMoreBlogIcon    = loadMoreBlogButton.children("i");

    function padBlog (str, max) {
        str = str.toString();
        return str.length < max ? padBlog("0" + str, max) : str;
    }


    loadMoreBlogButton.click( function( e ) {

        loadMoreBlogIcon.addClass("rotate");
        e.preventDefault();

        var load = padBlog( loadMorePost, 2 );

        var protocol = $(location).attr('protocol');

        if( protocol == 'file:') {
            alert('"The Buttons "Load More" not working if you open the index.html by double click and have a URL like file://../../index.html\n\nRun it on your localhost or online server and it will work.\n\nReason:\nBrowsers implement strong security measures to prevent downloaded web pages from accessing arbitrary files on the file system.');
        }

        $.get('blog/load-more-' + load + '.html', function(data){

            $(data).appendTo("#blog-grid");

        }).done(function(){

                blogGrid.gridalicious('append', blogGrid.children("li"));
                loadMoreBlogIcon.removeClass("rotate");

            });

        loadMorePost = loadMorePost + 1;
        load = padBlog( loadMorePost, 2 );

        $.get( 'blog/load-more-' + load + '.html' ).fail(function() {
            loadMoreBlogButton.hide();
        });
    } );




    /* --------------------------------------------------------------------- */
    /* 8. SKILLS (SHORTCODES)
    /* --------------------------------------------------------------------- */

    $('.skill-outer').waypoint(function(direction) {

        var percent         = $(this).attr("data-percent"),
            bgelement       = $(this).children(".skill-inner"),
            percentInner    = bgelement.children(".percent"),
            checkvalue      = bgelement.width();

        if(checkvalue==0)
        {
            percentInner.html(percent + '%');

            bgelement.animate({
                width: percent + '%'
            }, 1000, 'easeInOutQuart', function() {
                percentInner.fadeIn(400);
            });
        }

    },{ offset: windowHeight });




    /* --------------------------------------------------------------------- */
    /* 9. COUNTER (SHORTCODES)
    /* --------------------------------------------------------------------- */

    $.fn.countTo = function(options) {
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 2500,  // how long it should take to count between the target numbers
        refreshInterval: 50,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null  // callback method for when the element finishes updating
    };


    $('.counter li').waypoint(function(direction) {

        var data_counter    = $(this).attr("data-counter"),
            counterelement  = $(this).children(".number"),
            checkNumber     = counterelement.html();

        if(checkNumber < 1)
        {
            counterelement.countTo({
                to: data_counter
            });
        }

    },{ offset: windowHeight });




    /* --------------------------------------------------------------------- */
    /* 10. ACCORDION AND TOGGLE (SHORTCODES)
    /* --------------------------------------------------------------------- */

    $(".accordion .title").click(function(){
        var eachtitle = $(this).parent(".accordion").children(".title");
        eachtitle.children(".fa-minus").css("display","none");
        eachtitle.children(".fa-plus").css("display","block");
        $(this).parent(".accordion").children(".content").slideUp(250);

        if($(this).next(".content").is(":hidden"))
        {
            $(this).children(".fa-plus").css("display","none");
            $(this).children(".fa-minus").css("display","block");
            $(this).next(".content").slideDown(250);
        }
    });

    $(".toggle .title").click(function(){
        var content = $(this).next(".content");
        if(content.is(":hidden"))
        {
            content.slideDown(250);
        } else {
            content.slideUp(250);
        }
    });




    /* --------------------------------------------------------------------- */
    /* 11. TAB BOX (SHORTCODES)
    /* --------------------------------------------------------------------- */

    $(".tab-navi").each(function(){
        var firstchild = $(this).children("li:first-child").children("a");
        firstchild.addClass("active");

        var openContent = firstchild.attr("data-content");
        $('#'+openContent).css("display","block");
    });


    $(".tab-navi li a").click(function(){

        var parent = $(this).parent("li").parent(".tab-navi");
        parent.children("li").children("a").each(function(){
            var displayNone = $(this).attr("data-content");
            $("#"+displayNone).css("display","none");
        });

        parent.find(".active").removeClass("active");
        $(this).addClass("active");
        var openContent = $(this).attr("data-content");
        $('#'+openContent).css("display","block");

    });




    /* --------------------------------------------------------------------- */
    /* 12. ALERT BOXES (SHORTCODES)
    /* --------------------------------------------------------------------- */

    $(".alert-box .close").click(function(){
        $(this).parent(".alert-box").fadeOut(350);
    });




    /* --------------------------------------------------------------------- */
    /* 13. TIMELINE (SHORTCODES)
    /* --------------------------------------------------------------------- */

    var timelineContainer   = $(".timeline"),
        timlineGrid         = timelineContainer.children(".timeline-grid"),
        maxRightPosi,
        position,
        oldPosition = 0;

    function setTimeline()
    {
        if(timelineContainer.length)
        {

            /* === SET WIDTH === */

            var newGridWidth    = 0,
                getPadding      = 0,
                paddingLeft     = 0,
                paddingRight    = 0,
                getWidth;

            oldPosition     = 0;
            position        = 0;

            timelineContainer.find("li").each(function(){
                getWidth        = $(this).outerWidth(true);
                newGridWidth    = newGridWidth + getWidth;
            });

            paddingLeft     = timlineGrid.css("paddingLeft");
            paddingLeft     = parseInt(paddingLeft.replace("px", ""));
            paddingRight    = timlineGrid.css("paddingRight");
            paddingRight    = parseInt(paddingRight.replace("px", ""));

            newGridWidth    = newGridWidth + paddingLeft + paddingRight;

            timlineGrid.css({
                width: newGridWidth + 'px',
                right: 0
            });


            /* === SET HIGHT === */

            var gridLi      = timlineGrid.find(".inner");
            var bottomPx    = 0;
            var newHeight   = 0;
            var gridBottom  = 0;

            gridLi.each(function () {

                if($(this).outerHeight() > newHeight)
                {
                    newHeight    = $(this).outerHeight();
                    bottomPx     = $(this).css("bottom");
                    bottomPx     = parseInt(bottomPx.replace("px", ""));
                }
            });

            gridBottom      = timlineGrid.css("bottom");
            gridBottom      = parseInt(gridBottom.replace("px", ""));

            newHeight = newHeight + bottomPx + gridBottom;

            timelineContainer.css({
                height: newHeight + 'px'
            });


            /* === SET MAX RIGHT === */

            var timelineWidth   = timelineContainer.width();
            maxRightPosi = newGridWidth - timelineWidth;
        }
    }

    if(timelineContainer.length)
    {

        timelineContainer.swipe(function( direction, offset, endTrue, startTrue ) {

            if(startTrue == 1)
            {
                timelineContainer.addClass("grabbing");
            }

            position    = timlineGrid.css("right");
            position        = parseInt(position.replace("px", ""));

            if(direction.x=='right')
            {
                position = oldPosition - offset.x;
                if(position < -maxRightPosi)
                {
                    position = -maxRightPosi;
                }
            }

            if(direction.x=='left')
            {
                position = oldPosition - offset.x;
                if(position > 0)
                {
                    position = 0;
                }
            }

            timlineGrid.css({
                right: position+'px'
            });

            if(endTrue == 1)
            {
                oldPosition = position;
                timelineContainer.removeClass("grabbing");
            }
        });
    }



})(jQuery);

