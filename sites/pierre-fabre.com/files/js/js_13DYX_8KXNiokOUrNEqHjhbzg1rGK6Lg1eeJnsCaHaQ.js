(function(Drupal){'use strict';Drupal.behaviors.geolocationMarkerClusterer={attach:function(context,drupalSettings){Drupal.geolocation.executeFeatureOnAllMaps('marker_clusterer',function(map,featureSettings){if(typeof MarkerClusterer==='undefined')return;var imagePath='';if(featureSettings.imagePath){imagePath=featureSettings.imagePath}else imagePath='https://cdn.jsdelivr.net/gh/googlemaps/js-marker-clusterer@gh-pages/images/m';var markerClustererStyles={};if(typeof featureSettings.styles!=='undefined')markerClustererStyles=featureSettings.styles;map.addPopulatedCallback(function(map){if(typeof map.markerClusterer==='undefined')map.markerClusterer=new MarkerClusterer(map.googleMap,map.mapMarkers,{imagePath:imagePath,styles:markerClustererStyles,maxZoom:featureSettings.maxZoom,gridSize:featureSettings.gridSize,zoomOnClick:featureSettings.zoomOnClick,averageCenter:featureSettings.averageCenter,minimumClusterSize:featureSettings.minimumClusterSize});map.addMarkerAddedCallback(function(marker){map.markerClusterer.addMarker(marker)});map.addMarkerRemoveCallback(function(marker){map.markerClusterer.removeMarker(marker)})});map.addUpdatedCallback(function(map,mapSettings){if(typeof map.markerClusterer!=='undefined')map.markerClusterer.clearMarkers()});return true},drupalSettings)},detach:function(context,drupalSettings){}}})(Drupal);
(function(Drupal){'use strict';Drupal.behaviors.geolocationZoomControl={attach:function(context,drupalSettings){Drupal.geolocation.executeFeatureOnAllMaps('control_zoom',function(map,featureSettings){map.addPopulatedCallback(function(map){var options={zoomControlOptions:{position:google.maps.ControlPosition[featureSettings.position],style:google.maps.ZoomControlStyle[featureSettings.style]}};if(featureSettings.behavior==='always'){options.zoomControl=true}else options.zoomControl=undefined;map.googleMap.setOptions(options)});return true},drupalSettings)},detach:function(context,drupalSettings){}}})(Drupal);
// RG-TRV-HD-00
var MOBILE_MAX_SIZE = 1199;

/**
 * Function for show countries block
 * @param $
 */
var showContries = function ($) {
  $('#block-countryblock').fadeIn();
};


var viewportWidth = function () {
  return Math.max(document.documentElement.clientWidth, window.innerWidth);
}

var toucheEvent = 'click';
if ("ontouchstart" in document.documentElement) {
  toucheEvent = 'touchend';
}

/**
 * Function for hide countries block
 * @param $
 */
var hideContries = function ($) {
  $('#block-countryblock').hide();
};

var addMobileCaret = function ($) {
  if (viewportWidth() <= MOBILE_MAX_SIZE) {
    if ($('.menu--main').find('.mobile-caret').length == 0) {
      $('a.first-level').after('<span class="mobile-caret initial icon-arrow-right"></span>');
      $('a.second-level-mobile').after('<span class="mobilecaretsecond icon-arrow-right"></span>');
    }

  }
  else {
    $('.mobile-caret').remove();
    $('.mobilecaretsecond').remove();
  }
};

var skipMenuAnimation = function ($) {
  $('.resize-align').addClass('skip-animation');
}

var findParent = function ($that) {
  parent = $that.parent('li');
  return parent;
};

var initMobileBehavior = function ($, $d) {
  //Don't play animation if the page is loaded on mobile
  if (viewportWidth() <= MOBILE_MAX_SIZE) {
    skipMenuAnimation($);
  }
  var currentLevel = 1;
  var openMobile = false;
  $('.navbar-toggle').click(function () {
    if (viewportWidth() <= MOBILE_MAX_SIZE) {
      if (!openMobile) {
        $('header').addClass('full-height');
        $('body').addClass('overflow-hidden');
        openMobile = true;
      }
      else {
        $('header').removeClass('full-height');
        $('body').removeClass('overflow-hidden');
        openMobile = false;
      }
    }
  });


  $d.on('.mobile-caret-return a', toucheEvent, function (e) {
    if (viewportWidth() <= MOBILE_MAX_SIZE) {
      e.preventDefault();
    }
  });

  if (viewportWidth() <= MOBILE_MAX_SIZE) {
    if ($('.dropdown-menu.language-dropdown li').length <= 0) {
      $('.right-nav-part .icon-arrow-down1').hide();
    }
  }

  $d.on(toucheEvent, '.mobile-caret', function (event) {
    if (viewportWidth() <= MOBILE_MAX_SIZE) {
      currentLevel = 2;
      $('.mobile-submenu-container').fadeIn();
      $('.navbar-collapse .region-navigation-collapsible').hide();
      var parent = findParent($(this)).clone().addClass('mobile-caret-return icon-arrow-validate');
      $('.mobile-submenu-container .for-level-2 ul').html($(this).parent().children('ul').html());
      $('.mobile-submenu-container .for-level-2 ul li:eq(0)').before(parent);
      $('.mobile-submenu-container .for-level-2').fadeIn();
      event.stopPropagation()
    }
  });

  $d.on(toucheEvent, '.for-level-2>ul>li:not(.mobile-caret-return):not(.country-item)', function (e) {
    if (viewportWidth() > MOBILE_MAX_SIZE) {
      return;
    }

    let linkElement = null,
      showSubMenu = function (li) {
        currentLevel = 3;
        $('.mobile-submenu-container .for-level-2').hide();
        let parent = $(li).clone().addClass('mobile-caret-return icon-arrow-validate');
        $('.mobile-submenu-container .for-level-3 ul').html($(li).children('ul').html());
        $('.mobile-submenu-container .for-level-3 ul li:eq(0)').before(parent);
        $('.mobile-submenu-container .for-level-3').fadeIn();
      };

    if (e.target.tagName != 'A') {
      if (e.target.parentNode.tagName == 'A') {
        linkElement = e.target.parentNode;
      }
    }
    else {
      linkElement = e.target;
    }

    // Link clicked.
    if (linkElement && !linkElement.classList.contains('toggle-only')) {
      // Handle normal link click behavior.
      return;
    }

    // Caret clicked
    if (e.target.tagName == 'SPAN') {
      showSubMenu(this);
      return;
    }

    // Empty space clicked.
    let href = ($(this).children('a').length) ? $(this).children('a').first().attr('href') : null,
      hasChildren = (0 !== $(this).children('ul').length);

    if (href != '#' && !hasChildren) {
      window.document.location.href = href;
      return;
    }

    showSubMenu(this);
  });

  $d.on("touchend", '.mobile-caret-return', function () {
    if (viewportWidth() <= MOBILE_MAX_SIZE) {
      if (currentLevel == 3) {
        $('.mobile-submenu-container .for-level-3').hide();
        $('.mobile-submenu-container .for-level-2').fadeIn();
        currentLevel = 2;
        return;
      }
      if (currentLevel == 2) {
        $('.mobile-submenu-container .for-level-2').hide();
        $('.navbar-collapse .region-navigation-collapsible').fadeIn();
        currentLevel = 0;
        return;
      }
    }
  });

  $d.on('click', '.mobile-caret-return a', function (e) {
    e.preventDefault();
  });

  $d.on(toucheEvent, '.icon-international', function () {
    if (viewportWidth() <= MOBILE_MAX_SIZE) {
      currentLevel = 2;
      $('.mobile-submenu-container').fadeIn();
      $('.navbar-collapse .region-navigation-collapsible').hide();
      var htmlCountries = '';
      for (var i = 0; i < $('#block-countryblock > ul').length; i++) {
        htmlCountries += $('#block-countryblock > ul').eq(i).html();
      }
      $('.mobile-submenu-container .for-level-2 ul').html(htmlCountries);
      $('.mobile-submenu-container .for-level-2 ul li:eq(0)').before('<li class="expanded dropdown mobile-caret-return icon-arrow-validate"><a>' + $('.country-menu-title').text() + '</a></li>');
      $('.mobile-submenu-container .for-level-2').fadeIn();
    }
  });

}

var initCarretBehavior = function ($) {

}

function isNavigatorIe() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If
  // Internet
  // Explorer,
  // return
  // version
  // number
  {
    return true;
  }
  else  // If another browser, return 0
  {
    return false;
  }

  return false;
}

var animateDefault = function ($) {
  var myTimeline = anime.timeline({
    direction: 'alternate',
    loop: 0,
    autoplay: true
  });

  var offset = '-=900';

  var i = 0;
  while ($(".anim-" + i).length > 0) {
    var delay = 0;
    if (i == 0) {
      delay = 500;
    }
    myTimeline
      .add({
        targets: ".anim-" + i,
        marginTop: 0,
        delay: delay,
        duration: 1000,
        offset: offset,
        easing: 'easeInOutQuart'
      });
    i++;
  }
}

var animateIE = function ($) {
  $('.navbar-default').find('[class*=" anim-"]')
    .css('opacity', 0)
    .css('margin-top', '0px')
    .animate({'opacity': 1}, 300, 'linear');
}

var initMenuBehavior = function ($) {
  $('.navbar-default, #block-languageblock').delay(1000).animate({'height': '100px'}, 300, 'linear', function () {
    if (!$('.menu-content').hasClass("homepage-menu-open")) {
      $('.menu-content').addClass('homepage-menu-open');
    }
    var isIe = isNavigatorIe();
    if (isIe) {
      animateIE($);
    }
    else {
      animateDefault($);
    }
  });
}

var computeItemMaxWidth = function () {
  let $ = jQuery;
  if (viewportWidth() > MOBILE_MAX_SIZE && viewportWidth() < 1420) {
    let firstLevelLinksNumber = $('.menu--main>li').length;
    let availableSpace = $('.menu-content').width() - $('.navbar-header').width() - $('#block-languageblock').width();
    let itemsMaxWidth = parseInt(availableSpace / firstLevelLinksNumber);
    let availableExtraSpace = 0,
      smallerLevelLinkNumber = 0;

    //itemsMaxWidth -= 20; // (margin)
    $('.menu--main').css('max-width', availableSpace - 1);
    $('.menu--main>li').each(function () {
      $(this).css("max-width", (itemsMaxWidth) + 'px');
      $(this).css("overflow-x", 'auto');
      $(this).css("overflow-y", 'hidden');
      if (parseInt($(this).width()) < itemsMaxWidth) {
        availableExtraSpace = availableExtraSpace + itemsMaxWidth - this.scrollWidth;
        smallerLevelLinkNumber++;
      }
      $(this).css("overflow-x", 'visible');
      $(this).css("overflow-y", 'visible');
    });

    // Ensure to fit the entire tool bar space.
    if (availableExtraSpace) {
      itemsMaxWidth = itemsMaxWidth + (availableExtraSpace / (firstLevelLinksNumber - smallerLevelLinkNumber));
      $('.menu--main>li').each(function () {
        if (parseInt($(this).width()) < itemsMaxWidth) {
          $(this).css("max-width", (itemsMaxWidth - 20) + 'px');
        }
      });
    }


  }
  else {
    $('.menu--main>li').each(function () {
      $(this).css("max-width", '');
      $('.menu--main').css('max-width', '');
    });
  }
};


/**
 * Global main function.
 */
jQuery(document).ready(function ($) {
  if ($('.path-frontpage').length > 0) {
    // Init var for animations
    var delay = 0;
    var arr = [];
    var k = 0;
    // addClass for order animation
    $('.logo').addClass('resize-align anim-' + k++);
    $.each($('.navbar-nav > li'), function () {
      $(this).addClass('resize-align anim-' + k++);
    });
    $('.icon-international').addClass('resize-align anim-' + k++);
    $('.right-nav-part .dropdown').addClass('resize-align anim-' + k++);
    $('.icon-search').addClass('resize-align anim-' + k++);
    // start animation

    var videoIframe = $('.field--name-field-homepage-video').find('iframe');
    if (videoIframe.length > 0) {
      videoIframe.on('load', initMenuBehavior($));
    }
    else {
      initMenuBehavior($);
    }


  }

  /**
   * First level item width computing.
   */
  computeItemMaxWidth();
  $(window).resize(computeItemMaxWidth);

  /**
   * Init menu comportement.
   * @type {*|jQuery|HTMLElement}
   */
  $d = $(document);
  addMobileCaret($);
  initMobileBehavior($, $d);

  /**
   * Refresh the mobile caret display when the navbar is toggled (avoid
   * refreshing on each resize)
   */
  $('.navbar-toggle').click(function () {
    addMobileCaret($);
  });

  /**
   * Countries state desktop and mobiles.
   */
  $d.on('mouseenter', '.icon-international', function () {
    if (viewportWidth() > MOBILE_MAX_SIZE) {
      showContries($);
    }
  });
  $d.on('click', '.icon-international', function () {
    if (viewportWidth() > MOBILE_MAX_SIZE) {
      showContries($);
    }
  });
  $('#block-countryblock').on('mouseleave', function () {
    if (viewportWidth() > MOBILE_MAX_SIZE) {
      hideContries($);
    }
  });
  $('#block-countryblock').on('click', function () {
    hideContries($);
  });

  /**
   * Advanced submenu for desktop
   */
  $d.on('mouseenter', '.first-level', function () {
    $('.submenu-container').fadeIn();
    $('.submenu-container .for-level-3 ul').removeClass('complete').empty();
    $('.submenu-container .for-level-2 ul').html($(this).parent().children('ul').html());
    $('#block-countryblock').hide();
  });


  $d.on('mouseenter', '.level-1', function () {
    $('.submenu-container .for-level-3 ul').addClass('complete').html($(this).parent().children('ul').html());
    if ($(this).parent().hasClass("expanded") == false) {
      $('.submenu-container .for-level-3 ul').removeClass('complete').empty();
    }
  });

  $d.on('mouseenter', '.level-0', function () {
    $('.submenu-container').hide();
    $('#block-countryblock').hide();
  });

  $d.on('mouseenter', '#block-languageblock', function () {
    $('.submenu-container').hide();
  });

  $('.submenu-container').on('mouseleave', function () {
    $('.submenu-container').hide();
  });

  /**
   * Search form comportement.
   */
  $('.icon-search').on('click', function () {
    $('.menu--main').hide();
    $('.form-search').fadeIn();
    $('.form-search').addClass('open');
  });

  $('.form-search .icon-close-nav').on('click', function () {
    $('.form-search').removeClass('open').hide();
    $('.menu--main').fadeIn(200);
  });

});;
(function($,Drupal,drupalSettings){'use strict';Drupal.behaviors.userAgentClassBehavior={attach:function(){var userAgentText=navigator.userAgent,listDevicesAndBrowsers=drupalSettings.user_agent_class.ListDevicesAndBrowsers,listDevices=Object.keys(listDevicesAndBrowsers[0].device_entity).map(function(e){return listDevicesAndBrowsers[0].device_entity[e]}),listBrowsers=Object.keys(listDevicesAndBrowsers[1].user_agent_entity).map(function(e){return listDevicesAndBrowsers[1].user_agent_entity[e]}),methodProvideBoolean=drupalSettings.user_agent_class.methodProvide;if(methodProvideBoolean==='0'||methodProvideBoolean===0){var classes=[],item='';for(item in listBrowsers)if(listBrowsers[item].exclude.length>0&&userAgentText.search(listBrowsers[item].exclude)>=0&&userAgentText.search(listBrowsers[item].trigger)>=0){continue}else if(userAgentText.search(listBrowsers[item].trigger)>=0){classes.push(listBrowsers[item].className);break};for(item in listDevices)if(listDevices[item].exclude.length>0&&userAgentText.search(listDevices[item].exclude)>=0&&userAgentText.search(listDevices[item].trigger)>=0){continue}else if(userAgentText.search(listDevices[item].trigger)>=0){classes.push(listDevices[item].className);break};var classesInBody=classes.join(' ');$('body').addClass(classesInBody)}}}})(jQuery,Drupal,drupalSettings);
