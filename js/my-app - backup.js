var app = new Framework7({
    swipeBackPage: false,
    init: true,    
    statusbar: {
        overlay: false,
        materialBackgroundColor: '#000'
    },
    routes: [{
        path: '/romblon/',
        url: './pages/romblon/romblon.html',
        options: {
            animate: false,
        },
    },{
        path: '/home/',
        url: './pages/home.html',
        options: {
            animate: false,
        },
    },{
        path: '/island-municipalities/',
        url: './pages/island-municipalities.html',   
        options: {
            animate: false,
        },
    },{
        path: '/how-to-get-there/',
        url: './pages/how-to-get-there.html',    
        options: {
            animate: false,
        },
    },{
        path: '/emergency-directory/',
        url: './pages/emergency-directory.html',    
        options: {
            animate: false,
        },
    },{
        path: '/help/',
        url: './pages/help.html',    
        options: {
            animate: false,
        },
    },{
        path: '/tablas-details/',
        url: './pages/tablas-island/tablas-details.html',    
        options: {
            animate: false,
        },
    },{
        path: '/sibuyan-details/',
        url: './pages/sibuyan-island/sibuyan-details.html',    
        options: {
            animate: false,
        },
    },{
        path: '/romblon-details/',
        url: './pages/romblon-island/romblon-details.html',    
        options: {
            animate: false,
        },
    },{
        path: '/tablas-island/',
        url: './pages/tablas-island/tablas-island.html',
        options: {
            animate: false,
        },
        routes: [{
            path: 'attractions/',
            url: './pages/tablas-island/attractions.html',
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tablas-island/attractions-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'accommodations/',
            url: './pages/tablas-island/accommodations.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tablas-island/accommodations-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'restaurants/',
            url: './pages/tablas-island/restaurants.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tablas-island/restaurants-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'tours/',
            url: './pages/tablas-island/tours.html',    
            options: {
                animate: false,
            }
        },{
            path: 'transportation/',
            url: './pages/tablas-island/transportation.html',   
            options: {
                animate: false,
            },
        },{
            path: 'directory/',
            url: './pages/tablas-island/directory.html',    
            options: {
                animate: false,
            },
        }]   
    },{
        path: '/sibuyan-island/',
        url: './pages/sibuyan-island/sibuyan-island.html',    
        options: {
            animate: false,
        },
        routes: [{
            path: 'attractions/',
            url: './pages/sibuyan-island/attractions.html',
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/sibuyan-island/attractions-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'accommodations/',
            url: './pages/sibuyan-island/accommodations.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/sibuyan-island/accommodations-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'restaurants/',
            url: './pages/sibuyan-island/restaurants.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/sibuyan-island/restaurants-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'tours/',
            url: './pages/sibuyan-island/tours.html',    
            options: {
                animate: false,
            }
        },{
            path: 'transportation/',
            url: './pages/sibuyan-island/transportation.html',   
            options: {
                animate: false,
            },
        },{
            path: 'directory/',
            url: './pages/sibuyan-island/directory.html',    
            options: {
                animate: false,
            },
        }]  
    },{
        path: '/romblon-island/',
        url: './pages/romblon-island/romblon-island.html',    
        options: {
            animate: false,
        },
        routes: [{
            path: 'attractions/',
            url: './pages/romblon-island/attractions.html',
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/romblon-island/attractions-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'accommodations/',
            url: './pages/romblon-island/accommodations.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/romblon-island/accommodations-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'restaurants/',
            url: './pages/romblon-island/restaurants.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/romblon-island/restaurants-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'tours/',
            url: './pages/romblon-island/tours.html',    
            options: {
                animate: false,
            }
        },{
            path: 'transportation/',
            url: './pages/romblon-island/transportation.html',   
            options: {
                animate: false,
            },
        },{
            path: 'directory/',
            url: './pages/romblon-island/directory.html',    
            options: {
                animate: false,
            },
        }] 
    }
    ]
});  

var $$ = Dom7;
var DEBUG = true;
var server = 'http://192.168.1.10/romblontours/';
var json_db;


var mainView = app.views.create('.view-main', {
    dynamicNavbar: false
}); 

$$(document).on('deviceready', function() {

    console.log('device is ready.');

    /*****************************************************************
     Load splash screen with progress bar.
     *****************************************************************/
    var percentage = 0;
    var success = false;

    // function animateProgressBar() {

    //     if (success) return;

    //     //Use a fake progress bar for now.
    //     var interval = 40;
    //     var max = 5;// 5
    //     var min = 0;
    //     var random = Math.floor( Math.random() * ( max - min + 1 ) + min );
    //     percentage = percentage + random;

    //     if (percentage > 100) {
    //         percentage = 100;
    //     }
    //     if (random > (max * 0.9)) {
    //         //interval *= random * 2;
    //         interval *= random / 10;
    //     }

    //     updateProgressBarValue(percentage);
    //     if (percentage < 100) {
    //         timer = setTimeout(animateProgressBar, interval);
    //     } else {

    //         // After loading is done, load the home page with slight delay.
    //         var delay = 1000;
    //         success = true;
    //         setTimeout(function() {
    //             mainView.router.load({
    //                 url: './pages/home.html',
    //                 options: {
    //                     animate: false,
    //                 },
    //             });
    //         }, delay);
    //     }
    // }    

    // Check first if we need to update data.
    console.log('checking for update..');
    $$('#status-desc').text('Checking for update..');

    app.request.json(server + 'config/has_update', function (has_update) {
        console.log(has_update ? 'has update' : 'no update');

        // If there's an update, download the data.
        if (has_update == '1') {
            console.log('requesting to download data from ' + server +  'location/r/attraction..');
            app.request.json(server +  'location/r/attraction', function (data) {
                console.log('success. creating file for the data..');
                writeFile(data);

            });
        }

    },  function (xhr, status) {
        console.log('error retrieving update.');
        console.log(status);
    });

    function writeFile(data) {
        var json = JSON.stringify(data);
        var type = LocalFileSystem.PERSISTENT;
        var size = 5*1024*1024;
        window.requestFileSystem(type, size, successCallback, errorCallback);

        function successCallback(fs) {
            fs.root.getFile('data.json', {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        console.log('Write completed. ' + json);
                        console.log('reading the data from file..');
                        readFile(fileEntry);
                    };

                    fileWriter.onerror = function(e) {
                       console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([json], {type: 'text/plain'});
                    fileWriter.write(blob);
                }, errorCallback);
            }, errorCallback);
        }

        function errorCallback(error) {
            console.log("writeFile Error: " + error.code);
        }
    }

    function readFile(fileEntry) {

        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               // var txtArea = document.getElementById('textarea');
               // txtArea.value = this.result;
               console.log(this.result);
            };

            reader.readAsText(file);
        }, errorCallback);

       function errorCallback(error) {
          console.log("readFile Error: " + error.toString());
       }
    }

    function animateProgressBar() {

        if (success) return;
        if (percentage > 100) {
            percentage = 100;
        }

        updateProgressBarValue(percentage);
        if (percentage < 100) {
            


        } else {

            // After loading is done, load the home page with slight delay.
            var delay = 1000;
            success = true;
            setTimeout(function() {
                mainView.router.load({
                    url: './pages/home.html',
                    options: {
                        animate: false,
                    },
                });
            }, delay);
        }
    }

    function updateProgressBarValue(percentage) {
        app.progressbar.set($$('.progressbar'), percentage);
        $$('.progress-value').html('Updating content.. ' + percentage + '%');
    }
                mainView.router.load({
                    url: './pages/home.html',
                    options: {
                        animate: false,
                    },
                });
    //animateProgressBar();
});

$$(document).on('page:init', function (e, page) {
    log('pageinit: ' + page.name);

    if (page.name == 'home') {
        
        /***********************************
         Swipers.
         ***********************************/
        var bannerSwiper = new Swiper('.banner-wrapper .swiper-container', {
            spaceBetween: 0,
            autoplay: {
                delay: 6000,
            },
            speed: 1900,
            loop: true,
            effect: 'fade',
            loopedSlides: 3,
            fadeEffect: {
                crossFade: true
            },
        });        

        var islandsSwiper = new Swiper('.islands .swiper-container', {
            pagination: {
                'el': '.islands .swiper-pagination'
            },
            spaceBetween: 10,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 3
        });

    } else if (page.name == 'tablas-island' || page.name == 'sibuyan-island' || page.name == 'romblon-island' ) {

        var bannerSwiper = new Swiper('.banner-wrapper .swiper-container', {
            spaceBetween: 0,
            autoplay: {
                delay: 6000,
            },
            speed: 1900,
            loop: true,
            effect: 'fade',
            loopedSlides: 3,
            fadeEffect: {
                crossFade: true
            },
        });         



    } else if (page.name == 'tablas-attractions-details') {

        /***********************************
         Photobrowser.
         ***********************************/  
        var photoBrowser = app.photoBrowser.create({
            photos : [
                './images/St._Joseph_Cathedral_15.jpg',
                './images/Binucot_Beach.jpg',
                './images/Fort_San_Andres_6.jpg',
                './images/Macat-ang_Beach_Banton.jpg',
                './images/MainitFalls81027cga.jpg',
                './images/Romblon_island_040col.jpg',
            ],
            theme: 'dark',
            type: 'popup'
        });
        $$('.open-photos').on('click', function () {
            var index = $$(this).attr('data-index'); 
            photoBrowser.open(parseInt(index));
        });

    } else if (page.name == 'tablas-accommodations-details') {

        /***********************************
         Photobrowser.
         ***********************************/  
        var photoBrowser = app.photoBrowser.create({
            photos : [
                './images/1510963169_ranchers1.jpg',
                './images/Binucot_Beach.jpg',
                './images/Fort_San_Andres_6.jpg',
                './images/Macat-ang_Beach_Banton.jpg',
            ],
            theme: 'dark',
            type: 'popup'
        });
        $$('.open-photos').on('click', function () {
            var index = $$(this).attr('data-index');
            photoBrowser.open(parseInt(index));
        });
    } else if (page.name == 'tablas-restaurants-details') {

        /***********************************
         Photobrowser.
         ***********************************/  
        var photoBrowser = app.photoBrowser.create({
            photos : [
                './images/1510963169_ranchers1.jpg',
                './images/Binucot_Beach.jpg',
                './images/Fort_San_Andres_6.jpg',
                './images/Macat-ang_Beach_Banton.jpg',
            ],
            theme: 'dark',
            type: 'popup'
        });
        $$('.open-photos').on('click', function () {
            var index = $$(this).attr('data-index');
            photoBrowser.open(parseInt(index));
        });
    }
});