/*


    1. COMMENT CAROUSEL
    2. CLIENT CAROUSEL
    3. GOOGLE MAP


*/

(function ($) {

    'use strict';


    /* ----------------------------------------- */
    /* 1. COMMENT CAROUSEL
    /* ----------------------------------------- */

    var commentCarousel = $(".comment-carousel");

    if(commentCarousel.length) // CHECK IF ELEMENT EXIST
    {
        commentCarousel.owlCarousel({
            navigation : false,
            singleItem: true
        });
    }



    /* ----------------------------------------- */
    /* 2. CLIENT CAROUSEL
    /* ----------------------------------------- */

    var clientCarousel = $(".client-carousel");

    if(clientCarousel.length) // CHECK IF ELEMENT EXIST
    {
        clientCarousel.owlCarousel({
            navigation : false,
            items : 5
        });
    }



    /* ----------------------------------------- */
    /* 3. GOOGLE MAP
    /* ----------------------------------------- */

    var googleMap = $('#googlemap');

    if(googleMap.length) // CHECK IF ELEMENT EXIST
    {
        googleMap.CustomMap();
    }





})(jQuery);