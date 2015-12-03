var $ = require('jquery'),
    googleMaps = require('google-maps');

$(function() {
    var $body = $('body'),
        $window = $(window),
        $map = $('#google-maps');

    $window.on('scroll', function() {
        if ($window.scrollTop() > 60) {
            $body.addClass('has-scrolled');
        } else {
            $body.removeClass('has-scrolled');
        }
    });

    var openMenu = (function() {
        var timeWindow = 300; // time in ms
        var lastExecution = new Date((new Date()).getTime() - timeWindow);
        var openMenu = function(args) {
            $body.toggleClass('is-menu-open');
        }

        return function() {
            if ((lastExecution.getTime() + timeWindow) <= (new Date()).getTime()) {
                lastExecution = new Date();
                return openMenu.apply(this, arguments);
            }
        }
    }());

    $('.glyphicon-menu-hamburger, .glyphicon-chevron-left').on('touchend', function() {
        openMenu();
    });

    if (!!$map.length) {
        googleMaps.load(function(google) {
            var myLatlng = new google.maps.LatLng(-22.91109, -43.17641);
            var mapOptions = {
                zoom: 16,
                center: myLatlng,
                scrollwheel: false
            }
            var map = new google.maps.Map($map[0], mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Linhares'
            });
        });
    }
});