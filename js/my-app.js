var $$ = Dom7;
var DEBUG = true;
var json_db;
var app = new Framework7(CONFIG);  
var mainView = app.views.create('.view-main', {
    dynamicNavbar: false
}); 
var TEMP = '';

$$(document).on('deviceready', function() {
    log('device is ready.');

    // Check first if we need to update data.
    // log('Checking for update:' + RTG.server + 'config/has_update');
    // app.request.json(RTG.server + 'config/has_update', function (data) {
    //     if (data != '1') {
    //         // Display options to download or skip downloading data.
    //         log('there is an update.');
    //         $$('#status-desc').text('');
    //         $$('.progressbar').hide();
    //         $$('#loader').hide();
    //         $$('#has-update').show('');
    //     } else {

    //         // Load the existing datafile.
    //         log('no update found.');
    //         RTG.status = 'local';
    //         setStatusLabel('Loading data');
    //         //readDataFile();
    //     }
    // },  function (xhr, status) {
    //     // Unable to get status from server. 
    //     // There might be no internet, server is down or server address is invalid.
    //     // In this case, load the old datafile.
    //     log('Unable to get status from server.');
    //     log(status);
    //     RTG.status = 'local';
    //     setStatusLabel('Loading data');
    //     readDataFile();
    // });

    // RTG.status = 'local';

    // Disable changing of font size based on Android font size settings.
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }

    // Download the data from server.
    app.request.get(RTG.server +  '/json/get', function (data) {
        RTG.data = JSON.parse(data);
        log('downloaded from ' + RTG.server );

        prepareOfflinePhotos(RTG.data);
    }, function(xhr, status) {
        log('error downloading data from server. Error: ' + status);
        RTG.is_offline = true;
        $$('.menu-links').append('<div class="offline">Offline</div>');
    });

    setStatusLabel('Loading..');
    //readDataFile();
   

    // Load the home page.
    setTimeout(function(){ 
        RTG.status = 'running';
        $$('#loader').hide();
        mainView.router.load({
            url: './pages/home.html',
            options: {
                animate: false,
            },
        });

        if (RTG.is_offline) {
            var toastBottom = app.toast.create({
                text: 'You are using offline data.',
                closeTimeout: 4000,
            });
            toastBottom.open();
        }
    }, 3500);
 



    /* END **********************************************/


    // When back button is pressed, exit if in home page, otherwise, just go back to previous page.
    document.addEventListener('backbutton', function onBackKeyDown() {
        if (app.views.main.router.url == '/home/' || app.views.main.router.url == './pages/home.html') {
            app.dialog.confirm('Are you sure you want to exit?', 'Quit', function() {
                navigator.app.exitApp();
            });
        } else {
            app.views.main.router.back();
        }
    }, false);
});

// Skip update and load offline data.
$$('#has-update .skip').click(function(e) {
    e.preventDefault();
    setStatusLabel('Loading offline data');
    $$('#has-update').hide();
    $$('#loader').show();

    RTG.is_offline = true;
    $$('.menu-links').append('<div class="offline">Offline</div>');

    var toastBottom = app.toast.create({
        text: 'You are using offline data.',
        closeTimeout: 6000,
    });

    readDataFile();
    toastBottom.open();
});    

// Download update.
$$('#has-update .update').click(function(e) {
    e.preventDefault();
    setStatusLabel('Downloading data');
    $$('#has-update').hide();
    $$('#loader').show();

    // request to download data now.
    app.request.get(RTG.server +  '/json/get', function (data) {
        setStatusLabel('Creating data file');
        prepareDataFile(data);
    }, function(xhr, status) {
        log('error downloading data from server. Error: ' + status);
        setStatusLabel('Can\'t connect to server. Loading offline data');
        readDataFile();
    });
});

$$(document).on('page:init', function (e, page) {
    log('page init: ' + page.name);

    useServerUrl();

    if (page.name == 'home') {
        Home();
    } else if (page.name == 'romblon') {
        Romblon(); 
    } else if (page.name == 'events') {
        RomblonEvents(); 
    } else if (page.name == 'inbound-outbound') {
        InboundOutbound();
    } else if (page.name == 'inter-island') {
        InterIsland();

    } else if (page.name == 'tablas-island') {
        TablasIsland();         
    } else if (page.name == 'tablas-island-details') {
        TablasIslandDetails();         
    } else if (page.name == 'tablas-attractions') {
        TablasIslandAttractions();
    } else if (page.name == 'tablas-attractions-details') {
        TablasIslandAttractionsDetails(page);
    } else if (page.name == 'tablas-accommodations') {
        TablasIslandAccommodations();
    } else if (page.name == 'tablas-accommodations-details') {
        TablasIslandAccommodationsDetails(page);    
    } else if (page.name == 'tablas-dining') {
        TablasIslandDining();
    } else if (page.name == 'tablas-dining-details') {
        TablasIslandDiningDetails(page);

    } else if (page.name == 'sibuyan-island') {
        SibuyanIsland();     
    } else if (page.name == 'sibuyan-island-details') {
        SibuyanIslandDetails();         
    } else if (page.name == 'sibuyan-attractions') {
        SibuyanIslandAttractions();
    } else if (page.name == 'sibuyan-attractions-details') {
        SibuyanIslandAttractionsDetails(page);
    } else if (page.name == 'sibuyan-accommodations') {
        SibuyanIslandAccommodations();
    } else if (page.name == 'sibuyan-accommodations-details') {
        SibuyanIslandAccommodationsDetails(page);    
    } else if (page.name == 'sibuyan-dining') {
        SibuyanIslandDining();
    } else if (page.name == 'sibuyan-dining-details') {
        SibuyanIslandDiningDetails(page);

    } else if (page.name == 'romblon-island') {
        RomblonIsland();         
    } else if (page.name == 'romblon-island-details') {
        RomblonIslandDetails();         
    } else if (page.name == 'romblon-attractions') {
        RomblonIslandAttractions();
    } else if (page.name == 'romblon-attractions-details') {
        RomblonIslandAttractionsDetails(page);
    } else if (page.name == 'romblon-accommodations') {
        RomblonIslandAccommodations(); 
    } else if (page.name == 'romblon-accommodations-details') {
        RomblonIslandAccommodationsDetails(page);
    } else if (page.name == 'romblon-dining') {
        RomblonIslandDining(); 
    } else if (page.name == 'romblon-dining-details') {
        RomblonIslandDiningDetails(page);
    
    } else if (page.name == 'carabao-island') {
        CarabaoIsland();         
    } else if (page.name == 'carabao-island-details') {
        CarabaoIslandDetails();         
    } else if (page.name == 'carabao-attractions') {
        CarabaoIslandAttractions();
    } else if (page.name == 'carabao-attractions-details') {
        CarabaoIslandAttractionsDetails(page);
    } else if (page.name == 'carabao-accommodations') {
        CarabaoIslandAccommodations();    
    } else if (page.name == 'carabao-accommodations-details') {
        CarabaoIslandAccommodationsDetails(page);
    } else if (page.name == 'carabao-dining') {
        CarabaoIslandDining();    
    } else if (page.name == 'carabao-dining-details') {
        CarabaoIslandDiningDetails(page);

    } else if (page.name == 'tresislas-island') {
        TresIslasIsland();         
    }  else if (page.name == 'tresislas-island-details') {
        TresIslasIslandDetails();         
    } else if (page.name == 'tresislas-attractions') {
        TresIslasIslandAttractions();
    } else if (page.name == 'tresislas-attractions-details') {
        TresIslasIslandAttractionsDetails(page);
    } else if (page.name == 'tresislas-accommodations') {
        TresIslasIslandAccommodations();
    } else if (page.name == 'tresislas-accommodations-details') {
        TresIslasIslandAccommodationsDetails(page);
    } else if (page.name == 'tresislas-dining') {
        TresIslasIslandDining();
    } else if (page.name == 'tresislas-dining-details') {
        TresIslasIslandDiningDetails(page);
    }   
});