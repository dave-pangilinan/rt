/*****************************************************
 Page init functions.
 *****************************************************/

var Home = function() {
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
        spaceBetween: 1,
        slidesPerView: 'auto',
        centeredSlides: true,
        preventClicks: true,
        preventClicksPropagation: false,
        passiveListeners: false,
        loop: true,
        on: {
            tap: function(e) {
                e.preventDefault();
                log('tap event');
                var page = $$(e.target).attr('data-page');
                mainView.router.navigate({
                    url: page,
                    options: {
                        animate: false,
                    },
                });
            },
            // click: function(e) {
            //     e.preventDefault();
            //     log('click event');
            //     var page = $$(e.target).attr('data-page');
            //     mainView.router.navigate({
            //         url: page,
            //         options: {
            //             animate: false,
            //         },
            //     });
            // },
        }
    });
};

var Romblon = function() {
    var destination = {
        lat: 12.374967,
        lng: 122.2955552
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Romblon', 
        'map-canvas-romblon',
        9
    );
    var mapInstance = map.initialize();

    displayDirections(mapInstance, destination);
}

var RomblonEvents = function() {

    // Photobrowser for TonTon.
    var photoBrowserTonTon = app.photoBrowser.create({
        photos: [
            'images/tonton1.jpg',
            'images/tonton2.jpg'
        ],
        theme: 'dark',
        type: 'popup'
    });
    $$('.tonton .open-photos').on('click', function () {
        var index = $$(this).attr('data-index'); 
        photoBrowserTonTon.open(parseInt(index));
    }); 

    // Photobrowser for Biniray.
    var photoBrowserBiniray = app.photoBrowser.create({
        photos: [
            'images/biniray1.jpg',
            'images/biniray2.jpg',
            'images/biniray3.jpg',
            'images/biniray4.jpg',
            'images/biniray5.jpg',
            'images/biniray6.jpg',
            'images/biniray7.jpg',
            'images/biniray8.jpg'
        ],
        theme: 'dark',
        type: 'popup'
    });
    $$('.biniray .open-photos').on('click', function () {
        var index = $$(this).attr('data-index'); 
        photoBrowserBiniray.open(parseInt(index));
    }); 

    // Photobrowser for Marble.
    var photoBrowserMarble = app.photoBrowser.create({
        photos: [
            'images/marble1.jpg',
            'images/marble2.jpg',
            'images/marble3.jpg',
            'images/marble4.jpg'
        ],
        theme: 'dark',
        type: 'popup'
    });
    $$('.marble .open-photos').on('click', function () {
        var index = $$(this).attr('data-index'); 
        photoBrowserMarble.open(parseInt(index));
    }); 

    // Photobrowser for Kanidugan.
    var photoBrowserKanidugan = app.photoBrowser.create({
        photos: [
            'images/kanidugan.jpg'
        ],
        theme: 'dark',
        type: 'popup'
    });
    $$('.kanidugan .open-photos').on('click', function () {
        var index = $$(this).attr('data-index'); 
        photoBrowserKanidugan.open(parseInt(index));
    }); 
}

var Island = function() {
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
};

// Going To and From Romblon
var InboundOutbound = function() {
    var seatransport = RTG.data.transport.seatransport;

    // Function to create list of ports.
    var PortList = function(port_field) {
        var list = [];
        for(id in seatransport) {
            var port = seatransport[id][port_field];
            if (seatransport[id].trans_type == 'Sea Transport') {
                if (list.includes(port)) {
                    // Don't add if port is already in the list.
                } else {
                    list.push(port);
                }
            }
        }
        return list;
    }

    // Generate list of departure and arrival post on initialization.
    var init = function() {
        $$('#to-container, #reset-container').hide();
        $$('#schedule').html('');

        var list = PortList('dep_port');
        $$('#from').html('<option value=""></option>');
        for(var id in list) {
            $$('#from').append('<option value="' + list[id] + '">' + list[id] + '</option>');
        }

        var list = PortList('arr_port');
        $$('#to').html('<option value=""></option>');
        for(var id in list) {
            $$('#to').append('<option value="' + list[id] + '">' + list[id] + '</option>');
        }
    }

    // Filter dropdown and display schedule on selections from dropdown.
    $$('#from, #to').change(function() {
        removeNoSchedules($$(this));
        displaySchedule();
    });

    // Clear the selections.
    $$('#reset').click(function(e) {
        e.preventDefault();
        init();
    });

    // If a dropdown is selected, only display ports that have schedule with the selected port from dropdown.
    function removeNoSchedules(dropdown) {
        log('preparing schedule')
        var dep = $$('#from').val();
        var arr = $$('#to').val();

        if ((dep != '' && arr == '') || (dep != '' && arr != '' && dropdown.attr('id') == 'from') ) {
            $$('#to').html('<option value=""></option>');
            $$('#schedule').html('');
            for(id in seatransport) {
                if (seatransport[id].trans_type == 'Sea Transport') {
                    var arr_port = seatransport[id].arr_port;
                    
                    // Select all departure port equal to selected departure port in dropdown.
                    if (seatransport[id].dep_port == dep) {

                        // Add to "to" dropdown but avoid duplicates.
                        var exists = false;
                        $$('#to option').each(function() {
                            if ($$(this).val() == arr_port && !exists) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) {
                            $$('#to').append('<option value="' + arr_port + '">' + arr_port + '</option>');
                        }

                    } 
                }
            }
            $$('#to-container').show();
        } else if (dep == '') {
            init();
        }
    }

    // Display schedule if there's a match.
    function displaySchedule() {
        var dep = $$('#from').val();
        var arr = $$('#to').val();

        if (dep != '' && arr != '') {
            log('searching for schedule');
            var dep = $$('#from').val();
            var arr = $$('#to').val();

            $$('#schedule').html('<div class="card"><div class="card-inner card-content-padding"></div></div>');

            var dep_day = '';
            var schedule_list = [];

            // Create the list for schedule.
            for(id in seatransport) {
                if (seatransport[id].dep_port == dep && seatransport[id].arr_port == arr) {
                    schedule_list.push(seatransport[id]);
                }            
            }

            // Sort by departure day. The schedule will be grouped by departure day.
            log(schedule_list);
            var temp_schedule_list = [];
            var weekdays = ['DAILY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
            for (var i = 0; i < weekdays.length; i++) {
                day = weekdays[i]; 
                for (id in schedule_list) {
                    if (day == schedule_list[id].dep_day) {
                        temp_schedule_list.push(schedule_list[id]);
                    }
                }
            }
            var sorted_list = temp_schedule_list;

            // Remove duplicates schedules.
            var temp_arr = sorted_list;
            var duplicates = [];
            for (id in sorted_list) {
                for (id_arr in temp_arr) {
                    if (id != id_arr &&
                        sorted_list[id].arr_day == temp_arr[id_arr].arr_day &&
                        sorted_list[id].arr_port == temp_arr[id_arr].arr_port &&
                        sorted_list[id].arr_time == temp_arr[id_arr].arr_time &&                        
                        sorted_list[id].dep_day == temp_arr[id_arr].dep_day &&
                        sorted_list[id].dep_port == temp_arr[id_arr].dep_port &&
                        sorted_list[id].dep_time == temp_arr[id_arr].dep_time &&
                        sorted_list[id].vessel == temp_arr[id_arr].vessel &&
                        !duplicates.includes(sorted_list[id].transport_id)) {

                        // duplicate.    
                        duplicates.push(temp_arr[id_arr].transport_id);
                    }
                }
            }
            for (id in sorted_list) {
                if (duplicates.includes(sorted_list[id].transport_id)) {
                    sorted_list.splice(id, 1);
                }
            }

            // Display the final list.
            schedule_list = sorted_list;
            for(id in schedule_list) {
                var tbody = '';
                if (dep_day == schedule_list[id].dep_day) {
                    tbody = '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + schedule_list[id].vessel + '</td></tr>' +
                        '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + schedule_list[id].dep_time  + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + schedule_list[id].arr_day + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + schedule_list[id].arr_time  + '</td></tr>';
                } else {
                    tbody = '<tr><td class="label-cell" colspan="2"><h3><span>Departure Day:</span> ' + schedule_list[id].dep_day + '</h3></td></tr>' +
                        '<tr><td colspan="2"><hr></td></tr>' +
                        '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + schedule_list[id].vessel + '</td></tr>' +
                        '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + schedule_list[id].dep_time  + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + schedule_list[id].arr_day + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + schedule_list[id].arr_time  + '</td></tr>';
                }
                var table = '<table><tbody>' + tbody + '</tbody></table>';
                $$('#schedule .card-inner').append(table);
                dep_day = schedule_list[id].dep_day;
            }

            $$('#reset-container').show();
        }
    }

    init();
}

// Going Around the Islands
var InterIsland = function() {
    var interisland = RTG.data.transport.interisland;
    
    // Function to create list of ports.
    var PortList = function(port_field) {
        var list = [];
        for(id in interisland) {
            var port = interisland[id][port_field];
            if (interisland[id].trans_type == 'Inter-island') {
                if (list.includes(port)) {
                    // Don't add if port is already in the list.
                } else {
                    list.push(port);
                }
            }
        }
        return list;
    }

    // Generate list of departure and arrival post on initialization.
    var init = function() {
        log('interisland start')
        $$('#to-container, #reset-container').hide();
        $$('#schedule').html('');

        var list = PortList('dep_port');
        $$('#from').html('<option value=""></option>');
        for(var id in list) {
            $$('#from').append('<option value="' + list[id] + '">' + list[id] + '</option>');
        }

        var list = PortList('arr_port');
        $$('#to').html('<option value=""></option>');
        for(var id in list) {
            $$('#to').append('<option value="' + list[id] + '">' + list[id] + '</option>');
        }
    }

    // Filter dropdown and display schedule on selections from dropdown.
    $$('#from, #to').change(function() {
        removeNoSchedules($$(this));
        displaySchedule();
    });

    // Clear the selections.
    $$('#reset').click(function(e) {
        e.preventDefault();
        init();
    });

    // If a dropdown is selected, only display ports that have schedule with the selected port from dropdown.
    function removeNoSchedules(dropdown) {
        log('preparing schedule')
        var dep = $$('#from').val();
        var arr = $$('#to').val();

        if ((dep != '' && arr == '') || (dep != '' && arr != '' && dropdown.attr('id') == 'from') ) {
            $$('#to').html('<option value=""></option>');
            $$('#schedule').html('');
            for(id in interisland) {
                if (interisland[id].trans_type == 'Inter-island') {
                    var arr_port = interisland[id].arr_port;
                    
                    // Select all departure port equal to selected departure port in dropdown.
                    if (interisland[id].dep_port == dep) {

                        // Add to "to" dropdown but avoid duplicates.
                        var exists = false;
                        $$('#to option').each(function() {
                            if ($$(this).val() == arr_port && !exists) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) {
                            $$('#to').append('<option value="' + arr_port + '">' + arr_port + '</option>');
                        }

                    } 
                }
            }
            $$('#to-container').show();
        } else if (dep == '') {
            init();
        }
    }

    // Display schedule if there's a match.
    function displaySchedule() {
        var dep = $$('#from').val();
        var arr = $$('#to').val();

        if (dep != '' && arr != '') {
            log('searching for schedule');
            var dep = $$('#from').val();
            var arr = $$('#to').val();

            $$('#schedule').html('<div class="card"><div class="card-inner card-content-padding"></div></div>');

            var dep_day = '';
            var schedule_list = [];

            // Create the list for schedule.
            for(id in interisland) {
                if (interisland[id].dep_port == dep && interisland[id].arr_port == arr) {
                    schedule_list.push(interisland[id]);
                }            
            }

            // Sort by departure day. The schedule will be grouped by departure day.
            log(schedule_list);
            var temp_schedule_list = [];
            var weekdays = ['DAILY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
            for (var i = 0; i < weekdays.length; i++) {
                day = weekdays[i]; 
                for (id in schedule_list) {
                    if (day == schedule_list[id].dep_day) {
                        temp_schedule_list.push(schedule_list[id]);
                    }
                }
            }
            var sorted_list = temp_schedule_list;

            log('sorted:');
            log(sorted_list);

            // Remove duplicates schedules.
            var temp_arr = sorted_list;
            var duplicates = [];
            for (id in sorted_list) {
                for (id_arr in temp_arr) {
                    if (id != id_arr &&
                        sorted_list[id].arr_day == temp_arr[id_arr].arr_day &&
                        sorted_list[id].arr_port == temp_arr[id_arr].arr_port &&
                        sorted_list[id].arr_time == temp_arr[id_arr].arr_time &&                        
                        sorted_list[id].dep_day == temp_arr[id_arr].dep_day &&
                        sorted_list[id].dep_port == temp_arr[id_arr].dep_port &&
                        sorted_list[id].dep_time == temp_arr[id_arr].dep_time &&
                        sorted_list[id].vessel == temp_arr[id_arr].vessel &&
                        !duplicates.includes(sorted_list[id].transport_id)) {

                        // duplicate.    
                        duplicates.push(temp_arr[id_arr].transport_id);
                    }
                }
            }
            log('duplicates:');
            log(duplicates);

            for (id in sorted_list) {
                if (duplicates.includes(sorted_list[id].transport_id)) {
                    sorted_list.splice(id, 1);
                }
            }
            log('sorted without duplicates:');
            log(sorted_list);

            // Display the final list.
            schedule_list = sorted_list;
            for(id in schedule_list) {
                var tbody = '';
                if (dep_day == schedule_list[id].dep_day) {
                    tbody = '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + schedule_list[id].vessel + '</td></tr>' +
                        '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + schedule_list[id].dep_time  + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + schedule_list[id].arr_day + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + schedule_list[id].arr_time  + '</td></tr>';
                } else {
                    tbody = '<tr><td class="label-cell" colspan="2"><h3><span>Departure Day:</span> ' + schedule_list[id].dep_day + '</h3></td></tr>' +
                        '<tr><td colspan="2"><hr></td></tr>' +
                        '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + schedule_list[id].vessel + '</td></tr>' +
                        '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + schedule_list[id].dep_time  + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + schedule_list[id].arr_day + '</td></tr>' +
                        '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + schedule_list[id].arr_time  + '</td></tr>';
                }
                var table = '<table><tbody>' + tbody + '</tbody></table>';
                $$('#schedule .card-inner').append(table);
                dep_day = schedule_list[id].dep_day;
            }

            $$('#reset-container').show();

            // for(id in interisland) {
            //     // log(interisland[id].dep_port + ' == ' + dep +  ' && ' + interisland[id].arr_port + ' == ' + arr);

            //     if (interisland[id].dep_port == dep && interisland[id].arr_port == arr) {


            //         // Display schedule by departure day.
            //         var tbody = '';

            //         if (dep_day == interisland[id].dep_day) {
            //             tbody = '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + interisland[id].vessel + '</td></tr>' +
            //                 '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + interisland[id].dep_time  + '</td></tr>' +
            //                 '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + interisland[id].arr_day + '</td></tr>' +
            //                 '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + interisland[id].arr_time  + '</td></tr>';
            //         } else {
            //             tbody = '<tr><td class="label-cell" colspan="2"><h3><span>Departure Day:</span> ' + interisland[id].dep_day + '</h3></td></tr>' +
            //                 '<tr><td colspan="2"><hr></td></tr>' +
            //                 '<tr><td class="label-cell">Vessel: </td><td class="label-cell">' + interisland[id].vessel + '</td></tr>' +
            //                 '<tr><td class="label-cell">Departure Time: </td><td class="label-cell">' + interisland[id].dep_time  + '</td></tr>' +
            //                 '<tr><td class="label-cell">Arrival Day: </td><td class="label-cell">' + interisland[id].arr_day + '</td></tr>' +
            //                 '<tr><td class="label-cell">Arrival Time: </td><td class="label-cell">' + interisland[id].arr_time  + '</td></tr>';
            //         }
            //         var table = '<table><tbody>' + tbody + '</tbody></table>';
            //         $$('#schedule .card-inner').append(table);

            //         dep_day = interisland[id].dep_day;
            //     }            
            // }
            // $$('#reset-container').show();
        }
    }

    init();
}

/*****************************************************
 Tablas Island
 *****************************************************/

var TablasIsland = function() {
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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };    

            var generateNearestLocationsSlides = function(module) {

                // Create list of distance.
                var distance_list = [];
                var records = RTG.data[module].Tablas;
                for(var id in records) {
                    var p = {
                        lat: records[id].latitude,
                        lng: records[id].longitude
                    }
                    var distance = getDistance(location, p);
                    distance_list[id] = distance;
                }

                // Sort the distance.
                var distance_sorted = sortNumbersInArray(distance_list);
                var slides = ''

                // Get the top 3.
                if (distance_sorted.length) {
                    for(var i = 0; i < 3; i++) {
                        var id = distance_sorted[i][0];
                        var distance_meters = parseFloat(distance_sorted[i][1]);

                        // Convert to km.
                        distance_meters = (distance_meters / 1000).toFixed(2); 
                        
                        // Get the details.
                        for(var rec_id in records) {
                             if (id == rec_id) {
                                var title = records[id].title;
                                var photo = '<div class="no-image"></div>';
                                var bg_image = '';
                                if (RTG.data[module + '_local_photos'][id].length) {
                                    photo = '<img class="responsive" src="' + RTG.data[module + '_local_photos'][id][0] + '">';
                                    bg_image = 'style="background-image: url(' + RTG.data[module + '_local_photos'][id][0] + ')"';
                                }

                                slides += '<div class="swiper-slide">' +
                                        '<div class="card">' +
                                            '<div class="card-content text-center">' +
                                                '<div class="img-wrapper" ' + bg_image + ' data-page="/tablas-island/' + module + '/details/?id=' + id + '">' +
                                                    photo +
                                                '</div>' +
                                                '<h3>' + title + '</h3>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="distance-meters"><i class="material-icons">place</i> ' + distance_meters + ' km away</div>' +
                                    '</div>';
                                break;
                            }
                        }
                    }

                    $$('#near-' + module + ' > .block').remove();
                    $$('#near-' + module + ' .swiper-wrapper').html(slides);
                    var swiper = new Swiper('#near-' + module + ' .swiper-container', {
                        pagination: {
                            'el': '#near-' + module + ' .swiper-pagination'
                        },
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        grabCursor: true,
                        preventClicks: true,
                        preventClicksPropagation: false,
                        passiveListeners: false,
                        threshold: 75,
                        on: {
                            tap: function(e) {
                                e.preventDefault();
                                log('tap event');
                                var page = $$(e.target).attr('data-page');
                                mainView.router.navigate({
                                    url: page,
                                    options: {
                                        animate: false,
                                    },
                                });
                            }
                        }
                    });
                } else {
                    $$('#near-' + module).html('<p class="no-location">No ' + module + ' found.</p>');
                }
            }

            generateNearestLocationsSlides('attractions');
            generateNearestLocationsSlides('accommodations');
            generateNearestLocationsSlides('dining');

        }, function(error) {
            log(error);
            handleLocationError();
        }, {
            maximumAge: 10000, 
            timeout: 10000, 
            enableHighAccuracy: true
        });

    } else {
        // Browser doesn't support Geolocation
        log('doesnt support geolocation.');
        handleLocationError();
    }

    function handleLocationError(selector) {
        $$('#near-attractions').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-accommodations').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-dining').html('<p class="no-location">Device location is not accessible.</p>');
    }
};

var TablasIslandDetails = function() {
    var destination = {
        lat: 12.4070195,
        lng: 21.8676621
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Tablas', 
        'map-canvas-tablas-island',
        9
    );
    var mapInstance = map.initialize();
    displayDirections(mapInstance, destination);
}

var TablasIslandAttractions = function() {
    var attractions = RTG.data.attractions.Tablas;
    if (attractions) {
        $$('.searchbar-hide-on-search span').html(Object.keys(attractions).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAttractions = Template7.compile(TEMPLATE.Tablas.attractions.raw);
    for(att_id in attractions) {
        attractions[att_id]['local_photos'] = RTG.data.attractions_local_photos[att_id];
    }

    // Display the compiled template.
    if (attractions) {
        var compiled = compiledAttractions(attractions);  
        $$('#attractions-list').html(compiled);
    } else {
        $$('#attractions-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('att-id');
    convertListToGrid();
};

var TablasIslandAttractionsDetails = function(page) {
    var id = page.route.query.id;
    var record = RTG.data.attractions.Tablas[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.convenience) $$('#info').append('<label>Convenience:</label><p>' + record.convenience + '</p>');
    if (record.time_of_visit) $$('#info').append('<label>Time of visit:</label><p>' + record.time_of_visit + '</p>');
    if (record.sunset_viewing) $$('#info').append('<label>Sunset viewing:</label><p>' + record.sunset_viewing + '</p>');
    if (record.how_to_get_there) $$('#info').append('<label>How to get there:</label><p>' + record.how_to_get_there + '</p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tablas-attractions'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Tablas.attractions.photos.raw);
    TEMPLATE.Tablas.attractions.photos.compiled = compiledPhotos(RTG.data.attractions_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Tablas.attractions.photos.compiled);

    createPhotoBrowser(RTG.data.attractions_local_photos[id]);
};

var TablasIslandAccommodations = function() {
    var accommodations = RTG.data.accommodations.Tablas;
    if (accommodations) {
        $$('.searchbar-hide-on-search span').html(Object.keys(accommodations).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAccommodations = Template7.compile(TEMPLATE.Tablas.accommodations.raw);
    for(id in accommodations) {
        accommodations[id]['local_photos'] = RTG.data.accommodations_local_photos[id];
    }

    // Display the compiled template.
    if (accommodations) {
        var compiled = compiledAccommodations(accommodations);  
        $$('#accommodations-list').html(compiled);
    } else {
        $$('#accommodations-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('acc-id');
    convertListToGrid();
};

var TablasIslandAccommodationsDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.accommodations.Tablas[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tablas-accommodations'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Tablas.accommodations.photos.raw);
    TEMPLATE.Tablas.accommodations.photos.compiled = compiledPhotos(RTG.data.accommodations_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Tablas.accommodations.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};

var TablasIslandDining = function() {
    var dining = RTG.data.dining.Tablas;
    if (dining) {
        $$('.searchbar-hide-on-search span').html(Object.keys(dining).length);
    }

    // Add the path of photos downloaded to device.
    var compiledDining = Template7.compile(TEMPLATE.Tablas.dining.raw);
    for(id in dining) {
        dining[id]['local_photos'] = RTG.data.dining_local_photos[id];
    }

    // Display the compiled template.
    if (dining) {
        var compiled = compiledDining(dining);
        $$('#dining-list').html(compiled);
    } else {
        $$('#dining-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('din-id');
    convertListToGrid();
};

var TablasIslandDiningDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.dining.Tablas[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tablas-dining'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Tablas.dining.photos.raw);
    TEMPLATE.Tablas.dining.photos.compiled = compiledPhotos(RTG.data.dining_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Tablas.dining.photos.compiled);

    createPhotoBrowser(RTG.data.dining_local_photos[id]);
};

/*****************************************************
 Sibuyan Island
 *****************************************************/
var SibuyanIsland = function() {
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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var generateNearestLocationsSlides = function(module) {

                // Create list of distance.
                var distance_list = [];
                var records = RTG.data[module].Sibuyan;
                for(var id in records) {
                    var p = {
                        lat: records[id].latitude,
                        lng: records[id].longitude
                    }
                    var distance = getDistance(location, p);
                    distance_list[id] = distance;
                }
                log('distance (' + module +'):' );
                log(distance_list); 

                // Sort the distance.
                var distance_sorted = sortNumbersInArray(distance_list);
                log(distance_sorted);
                var slides = ''

                // Get the top 3.
                if (distance_sorted.length) {
                    for(var i = 0; i < 3; i++) {
                        var id = distance_sorted[i][0];
                        var distance_meters = parseFloat(distance_sorted[i][1]);

                        // Convert to km.
                        distance_meters = (distance_meters / 1000).toFixed(2);
                        
                        // Get the details.
                        for(var rec_id in records) {
                            if (id == rec_id) {
                                log(records[id]);
                                var title = records[id].title;
                                var photo = '<div class="no-image"></div>';
                                var bg_image = '';
                                if (RTG.data[module + '_local_photos'][id].length) {
                                    photo = '<img class="responsive" src="' + RTG.data[module + '_local_photos'][id][0] + '">';
                                    bg_image = 'style="background-image: url(' + RTG.data[module + '_local_photos'][id][0] + ')"';
                                }

                                slides += '<div class="swiper-slide">' +
                                        '<div class="card">' +
                                            '<div class="card-content text-center">' +
                                                '<div class="img-wrapper" ' + bg_image + '>' +
                                                    photo +
                                                '</div>' +
                                                '<a class="button button-fill swiper-no-swiping" href="/sibuyan-island/' + module + '/details/?id=' + id + '">' + title + '<i class="material-icons">keyboard_arrow_right</i></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="distance-meters"><i class="material-icons">place</i> ' + distance_meters + ' km away</div>' +
                                    '</div>';
                                break;
                            }
                        }
                    }
                    log(slides);
                

                    $$('#near-' + module + ' > .block').remove();
                    $$('#near-' + module + ' .swiper-wrapper').html(slides);
                    var swiper = new Swiper('#near-' + module + ' .swiper-container', {
                        pagination: {
                            'el': '#near-' + module + ' .swiper-pagination'
                        },
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        grabCursor: true,
                        preventClicks: true,
                        preventClicksPropagation: false,
                        passiveListeners: false,
                        threshold: 75,
                        on: {
                            tap: function(e) {
                                e.preventDefault();
                                log('tap event');
                                var page = $$(e.target).attr('data-page');
                                mainView.router.navigate({
                                    url: page,
                                    options: {
                                        animate: false,
                                    },
                                });
                            }
                        }
                    });
                } else {
                    $$('#near-' + module).html('<p class="no-location">No ' + module + ' found.</p>');
                }
            }

            generateNearestLocationsSlides('attractions');
            generateNearestLocationsSlides('accommodations');
            generateNearestLocationsSlides('dining');

        }, function(error) {
            log(error);
            handleLocationError();
        }, {
            maximumAge: 10000, 
            timeout: 10000, 
            enableHighAccuracy: false
        });

    } else {
        // Browser doesn't support Geolocation
        log('doesnt support geolocation.');
        handleLocationError();
    }

    function handleLocationError(selector) {
        $$('#near-attractions').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-accommodations').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-dining').html('<p class="no-location">Device location is not accessible.</p>');
    }
};

var SibuyanIslandDetails = function() {
    var destination = {
        lat: 12.385556,
        lng: 122.561389
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Sibuyan', 
        'map-canvas-sibuyan-island',
        10
    );
    var mapInstance = map.initialize();
    displayDirections(mapInstance, destination);
}

var SibuyanIslandAttractions = function() {
    var attractions = RTG.data.attractions.Sibuyan;
    if (attractions) {
        $$('.searchbar-hide-on-search span').html(Object.keys(attractions).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAttractions = Template7.compile(TEMPLATE.Sibuyan.attractions.raw);
    for(att_id in attractions) {
        attractions[att_id]['local_photos'] = RTG.data.attractions_local_photos[att_id];
    }

    // Display the compiled template.
    var compiled = compiledAttractions(attractions);  
    $$('#attractions-list').html(compiled);

    displayDistanceInGrid('att-id');
    convertListToGrid();
};

var SibuyanIslandAttractionsDetails = function(page) {
    var id = page.route.query.id;
    var record = RTG.data.attractions.Sibuyan[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.convenience) $$('#info').append('<label>Convenience:</label><p>' + record.convenience + '</p>');
    if (record.time_of_visit) $$('#info').append('<label>Time of visit:</label><p>' + record.time_of_visit + '</p>');
    if (record.sunset_viewing) $$('#info').append('<label>Sunset viewing:</label><p>' + record.sunset_viewing + '</p>');
    if (record.how_to_get_there) $$('#info').append('<label>How to get there:</label><p>' + record.how_to_get_there + '</p>');

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-sibuyan-attractions'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledSibuyanAttractionsPhotos = Template7.compile(TEMPLATE.Sibuyan.attractions.photos.raw);
    TEMPLATE.Sibuyan.attractions.photos.compiled = compiledSibuyanAttractionsPhotos(RTG.data.attractions_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Sibuyan.attractions.photos.compiled);

    createPhotoBrowser(RTG.data.attractions_local_photos[id]);
};

var SibuyanIslandAccommodations = function() {
    var accommodations = RTG.data.accommodations.Sibuyan;
    if (accommodations) {
        $$('.searchbar-hide-on-search span').html(Object.keys(accommodations).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAccommodations = Template7.compile(TEMPLATE.Sibuyan.accommodations.raw);
    for(id in accommodations) {
        accommodations[id]['local_photos'] = RTG.data.accommodations_local_photos[id];
    }

    // Display the compiled template.
    if (accommodations) {
        var compiled = compiledAccommodations(accommodations);  
        $$('#accommodations-list').html(compiled);
    } else {
        $$('#accommodations-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('acc-id');
    convertListToGrid();
};

var SibuyanIslandAccommodationsDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.accommodations.Sibuyan[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-sibuyan-accommodations'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Sibuyan.accommodations.photos.raw);
    TEMPLATE.Sibuyan.accommodations.photos.compiled = compiledPhotos(RTG.data.accommodations_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Sibuyan.accommodations.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};

var SibuyanIslandDining = function() {
    var dining = RTG.data.dining.Sibuyan;
    if (dining) {
        $$('.searchbar-hide-on-search span').html(Object.keys(dining).length);
    }

    // Add the path of photos downloaded to device.
    var compiledDining = Template7.compile(TEMPLATE.Sibuyan.dining.raw);
    for(id in dining) {
        dining[id]['local_photos'] = RTG.data.dining_local_photos[id];
    }

    // Display the compiled template.
    if (dining) {
        var compiled = compiledDining(dining);
        $$('#dining-list').html(compiled);
    } else {
        $$('#dining-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('din-id');
    convertListToGrid();
};

var SibuyanIslandDiningDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.dining.Sibuyan[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-sibuyan-dining'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Sibuyan.dining.photos.raw);
    TEMPLATE.Sibuyan.dining.photos.compiled = compiledPhotos(RTG.data.dining_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Sibuyan.dining.photos.compiled);

    createPhotoBrowser(RTG.data.dining_local_photos[id]);
};


/*****************************************************
 Romblon Island
 *****************************************************/
var RomblonIsland = function() {
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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var generateNearestLocationsSlides = function(module) {

                // Create list of distance.
                var distance_list = [];
                var records = RTG.data[module].Romblon;
                for(var id in records) {
                    var p = {
                        lat: records[id].latitude,
                        lng: records[id].longitude
                    }
                    var distance = getDistance(location, p);
                    distance_list[id] = distance;
                }
                log('distance (' + module +'):' );
                log(distance_list); 

                // Sort the distance.
                var distance_sorted = sortNumbersInArray(distance_list);
                log(distance_sorted);
                var slides = ''

                // Get the top 3.
                if (distance_sorted.length) {
                    for(var i = 0; i < 3; i++) {
                        var id = distance_sorted[i][0];
                        var distance_meters = parseFloat(distance_sorted[i][1]);

                        // Convert to km.
                        distance_meters = (distance_meters / 1000).toFixed(2);
                        
                        // Get the details.
                        for(var rec_id in records) {
                            if (id == rec_id) {
                                log(records[id]);
                                var title = records[id].title;
                                var photo = '<div class="no-image"></div>';
                                var bg_image = '';
                                if (RTG.data[module + '_local_photos'][id].length) {
                                    photo = '<img class="responsive" src="' + RTG.data[module + '_local_photos'][id][0] + '">';
                                    bg_image = 'style="background-image: url(' + RTG.data[module + '_local_photos'][id][0] + ')"';
                                }

                                slides += '<div class="swiper-slide">' +
                                        '<div class="card">' +
                                            '<div class="card-content text-center">' +
                                                '<div class="img-wrapper" ' + bg_image + '>' +
                                                    photo +
                                                '</div>' +
                                                '<a class="button button-fill swiper-no-swiping" href="/romblon-island/' + module + '/details/?id=' + id + '">' + title + '<i class="material-icons">keyboard_arrow_right</i></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="distance-meters"><i class="material-icons">place</i> ' + distance_meters + ' km away</div>' +
                                    '</div>';
                                break;
                            }
                        }
                    }
                    log(slides);
                


                    $$('#near-' + module + ' > .block').remove();
                    $$('#near-' + module + ' .swiper-wrapper').html(slides);
                    var swiper = new Swiper('#near-' + module + ' .swiper-container', {
                        pagination: {
                            'el': '#near-' + module + ' .swiper-pagination'
                        },
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        grabCursor: true,
                        preventClicks: true,
                        preventClicksPropagation: false,
                        passiveListeners: false,
                        threshold: 75,
                        on: {
                            tap: function(e) {
                                e.preventDefault();
                                log('tap event');
                                var page = $$(e.target).attr('data-page');
                                mainView.router.navigate({
                                    url: page,
                                    options: {
                                        animate: false,
                                    },
                                });
                            }
                        }
                    });
                } else {
                    $$('#near-' + module).html('<p class="no-location">No ' + module + ' found.</p>');
                }
            }

            generateNearestLocationsSlides('attractions');
            generateNearestLocationsSlides('accommodations');
            generateNearestLocationsSlides('dining');

        }, function(error) {
            log(error);
            handleLocationError();
        }, {
            maximumAge: 10000, 
            timeout: 10000, 
            enableHighAccuracy: false
        });

    } else {
        // Browser doesn't support Geolocation
        log('doesnt support geolocation.');
        handleLocationError();
    }

    function handleLocationError(selector) {
        $$('#near-attractions').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-accommodations').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-dining').html('<p class="no-location">Device location is not accessible.</p>');
    }
};

var RomblonIslandDetails = function() {
    var destination = {
        lat: 12.55,
        lng: 122.45833
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Romblon', 
        'map-canvas-romblon-island',
        9
    );
    var mapInstance = map.initialize();
    displayDirections(mapInstance, destination);
}

var RomblonIslandAttractions = function() {
    var attractions = RTG.data.attractions.Romblon;
    if (attractions) {
        $$('.searchbar-hide-on-search span').html(Object.keys(attractions).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAttractions = Template7.compile(TEMPLATE.Romblon.attractions.raw);
    for(att_id in attractions) {
        attractions[att_id]['local_photos'] = RTG.data.attractions_local_photos[att_id];
    }

    // Display the compiled template.
    if (attractions) {
        var compiled = compiledAttractions(attractions);  
        $$('#attractions-list').html(compiled);
    } else {
        $$('#attractions-list').html('<li class="item-content"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('att-id');
    convertListToGrid();
};

var RomblonIslandAttractionsDetails = function(page) {
    var id = page.route.query.id;
    var record = RTG.data.attractions.Romblon[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.convenience) $$('#info').append('<label>Convenience:</label><p>' + record.convenience + '</p>');
    if (record.time_of_visit) $$('#info').append('<label>Time of visit:</label><p>' + record.time_of_visit + '</p>');
    if (record.sunset_viewing) $$('#info').append('<label>Sunset viewing:</label><p>' + record.sunset_viewing + '</p>');
    if (record.how_to_get_there) $$('#info').append('<label>How to get there:</label><p>' + record.how_to_get_there + '</p>');

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-romblon-attractions'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledRomblonAttractionsPhotos = Template7.compile(TEMPLATE.Romblon.attractions.photos.raw);
    TEMPLATE.Romblon.attractions.photos.compiled = compiledRomblonAttractionsPhotos(RTG.data.attractions_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Romblon.attractions.photos.compiled);

    createPhotoBrowser(RTG.data.attractions_local_photos[id]);
};

var RomblonIslandAccommodations = function() {
    var accommodations = RTG.data.accommodations.Romblon;
    if (accommodations) {
        $$('.searchbar-hide-on-search span').html(Object.keys(accommodations).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAccommodations = Template7.compile(TEMPLATE.Romblon.accommodations.raw);
    for(id in accommodations) {
        accommodations[id]['local_photos'] = RTG.data.accommodations_local_photos[id];
    }

    // Display the compiled template.
    if (accommodations) {
        var compiled = compiledAccommodations(accommodations);  
        $$('#accommodations-list').html(compiled);
    } else {
        $$('#accommodations-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('acc-id');
    convertListToGrid();
};

var RomblonIslandAccommodationsDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.accommodations.Romblon[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-romblon-accommodations'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Romblon.accommodations.photos.raw);
    TEMPLATE.Romblon.accommodations.photos.compiled = compiledPhotos(RTG.data.accommodations_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Romblon.accommodations.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};

var RomblonIslandDining = function() {
    var dining = RTG.data.dining.Romblon;
    if (dining) {
        $$('.searchbar-hide-on-search span').html(Object.keys(dining).length);
    }

    // Add the path of photos downloaded to device.
    var compiledDining = Template7.compile(TEMPLATE.Romblon.dining.raw);
    for(id in dining) {
        dining[id]['local_photos'] = RTG.data.dining_local_photos[id];
    }

    // Display the compiled template.
    if (dining) {
        var compiled = compiledDining(dining);
        $$('#dining-list').html(compiled);
    } else {
        $$('#dining-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('din-id');
    convertListToGrid();
};

var RomblonIslandDiningDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.dining.Romblon[id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-romblon-dining'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Romblon.dining.photos.raw);
    TEMPLATE.Romblon.dining.photos.compiled = compiledPhotos(RTG.data.dining_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Romblon.dining.photos.compiled);

    createPhotoBrowser(RTG.data.dining_local_photos[id]);
};


/*****************************************************
 Carabao Island
 *****************************************************/
var CarabaoIsland = function() {
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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var generateNearestLocationsSlides = function(module) {

                // Create list of distance.
                var distance_list = [];
                var records = RTG.data[module]['San Jose'];
                for(var id in records) {
                    var p = {
                        lat: records[id].latitude,
                        lng: records[id].longitude
                    }
                    var distance = getDistance(location, p);
                    distance_list[id] = distance;
                }
                log('distance (' + module +'):' );
                log(distance_list); 

                // Sort the distance.
                var distance_sorted = sortNumbersInArray(distance_list);
                log(distance_sorted);
                var slides = ''

                // Get the top 3.
                if (distance_sorted.length) {
                    for(var i = 0; i < 3; i++) {
                        var id = distance_sorted[i][0];
                        var distance_meters = parseFloat(distance_sorted[i][1]);

                        // Convert to km.
                        distance_meters = (distance_meters / 1000).toFixed(2);
                        
                        // Get the details.
                        for(var rec_id in records) {
                            if (id == rec_id) {
                                log(records[id]);
                                var title = records[id].title;
                                var photo = '<div class="no-image"></div>';
                                var bg_image = '';
                                if (RTG.data[module + '_local_photos'][id].length) {
                                    photo = '<img class="responsive" src="' + RTG.data[module + '_local_photos'][id][0] + '">';
                                    bg_image = 'style="background-image: url(' + RTG.data[module + '_local_photos'][id][0] + ')"';
                                }

                                slides += '<div class="swiper-slide">' +
                                        '<div class="card">' +
                                            '<div class="card-content text-center">' +
                                                '<div class="img-wrapper" ' + bg_image + '>' +
                                                    photo +
                                                '</div>' +
                                                '<a class="button button-fill swiper-no-swiping" href="/carabao-island/' + module + '/details/?id=' + id + '">' + title + '<i class="material-icons">keyboard_arrow_right</i></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="distance-meters"><i class="material-icons">place</i> ' + distance_meters + ' km away</div>' +
                                    '</div>';
                                break;
                            }
                        }
                    }
                    log(slides);
                


                    $$('#near-' + module + ' > .block').remove();
                    $$('#near-' + module + ' .swiper-wrapper').html(slides);
                    var swiper = new Swiper('#near-' + module + ' .swiper-container', {
                        pagination: {
                            'el': '#near-' + module + ' .swiper-pagination'
                        },
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        grabCursor: true,
                        preventClicks: true,
                        preventClicksPropagation: false,
                        passiveListeners: false,
                        threshold: 75,
                        on: {
                            tap: function(e) {
                                e.preventDefault();
                                log('tap event');
                                var page = $$(e.target).attr('data-page');
                                mainView.router.navigate({
                                    url: page,
                                    options: {
                                        animate: false,
                                    },
                                });
                            }
                        }
                    });
                } else {
                    $$('#near-' + module).html('<p class="no-location">No ' + module + ' found.</p>');
                }
            }

            generateNearestLocationsSlides('attractions');
            generateNearestLocationsSlides('accommodations');
            generateNearestLocationsSlides('dining');

        }, function(error) {
            log(error);
            handleLocationError();
        }, {
            maximumAge: 10000, 
            timeout: 10000, 
            enableHighAccuracy: false
        });

    } else {
        // Browser doesn't support Geolocation
        log('doesnt support geolocation.');
        handleLocationError();
    }

    function handleLocationError(selector) {
        $$('#near-attractions').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-accommodations').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-dining').html('<p class="no-location">Device location is not accessible.</p>');
    }

};

var CarabaoIslandDetails = function() {
    var destination = {
        lat: 12.07,
        lng: 121.93
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Carabao', 
        'map-canvas-carabao-island',
        9
    );
    var mapInstance = map.initialize();
    displayDirections(mapInstance, destination);
}

var CarabaoIslandAttractions = function() {
    var attractions = RTG.data.attractions['San Jose'];
    if (attractions) {
        $$('.searchbar-hide-on-search span').html(Object.keys(attractions).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAttractions = Template7.compile(TEMPLATE.Carabao.attractions.raw);
    for(att_id in attractions) {
        attractions[att_id]['local_photos'] = RTG.data.attractions_local_photos[att_id];
    }

    // Display the compiled template.
    if (attractions) {
        var compiled = compiledAttractions(attractions);  
        $$('#attractions-list').html(compiled);
    } else {
        $$('#attractions-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('att-id');
    convertListToGrid();
};

var CarabaoIslandAttractionsDetails = function(page) {
    var id = page.route.query.id;
    var record = RTG.data.attractions['San Jose'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.convenience) $$('#info').append('<label>Convenience:</label><p>' + record.convenience + '</p>');
    if (record.time_of_visit) $$('#info').append('<label>Time of visit:</label><p>' + record.time_of_visit + '</p>');
    if (record.sunset_viewing) $$('#info').append('<label>Sunset viewing:</label><p>' + record.sunset_viewing + '</p>');
    if (record.how_to_get_there) $$('#info').append('<label>How to get there:</label><p>' + record.how_to_get_there + '</p>');

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-carabao-attractions'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledCarabaoAttractionsPhotos = Template7.compile(TEMPLATE.Carabao.attractions.photos.raw);
    TEMPLATE.Carabao.attractions.photos.compiled = compiledCarabaoAttractionsPhotos(RTG.data.attractions_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Carabao.attractions.photos.compiled);

    createPhotoBrowser(RTG.data.attractions_local_photos[id]);
};

var CarabaoIslandAccommodations = function() {
    var accommodations = RTG.data.accommodations['San Jose'];
    if (accommodations) {
        $$('.searchbar-hide-on-search span').html(Object.keys(accommodations).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAccommodations = Template7.compile(TEMPLATE.Carabao.accommodations.raw);
    for(id in accommodations) {
        accommodations[id]['local_photos'] = RTG.data.accommodations_local_photos[id];
    }

    // Display the compiled template.
    if (accommodations) {
        var compiled = compiledAccommodations(accommodations);  
        $$('#accommodations-list').html(compiled);
    } else {
        $$('#accommodations-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('acc-id');
    convertListToGrid();
};

var CarabaoIslandAccommodationsDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.accommodations['San Jose'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-carabao-accommodations'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Carabao.accommodations.photos.raw);
    TEMPLATE.Carabao.accommodations.photos.compiled = compiledPhotos(RTG.data.accommodations_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Carabao.accommodations.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};

var CarabaoIslandDining = function() {
    var dining = RTG.data.dining['San Jose'];
    if (dining) {
        $$('.searchbar-hide-on-search span').html(Object.keys(dining).length);
    }

    // Add the path of photos downloaded to device.
    var compiledDining = Template7.compile(TEMPLATE.Carabao.dining.raw);
    for(id in dining) {
        dining[id]['local_photos'] = RTG.data.dining_local_photos[id];
    }

    // Display the compiled template.
    if (dining) {
        var compiled = compiledDining(dining);
        $$('#dining-list').html(compiled);
    } else {
        $$('#dining-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('din-id');
    convertListToGrid();
};

var CarabaoIslandDiningDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.dining['San Jose'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-carabao-dining'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.Carabao.dining.photos.raw);
    TEMPLATE.Carabao.dining.photos.compiled = compiledPhotos(RTG.data.dining_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.Carabao.dining.photos.compiled);

    createPhotoBrowser(RTG.data.dining_local_photos[id]);
};

/*****************************************************
 Tres Islas Island
 *****************************************************/
var TresIslasIsland = function() {
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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var generateNearestLocationsSlides = function(module) {

                // Create list of distance.
                var distance_list = [];
                var records = RTG.data[module]['Tres Islas'];
                for(var id in records) {
                    var p = {
                        lat: records[id].latitude,
                        lng: records[id].longitude
                    }
                    var distance = getDistance(location, p);
                    distance_list[id] = distance;
                }
                log('distance (' + module +'):' );
                log(distance_list); 

                // Sort the distance.
                var distance_sorted = sortNumbersInArray(distance_list);
                log(distance_sorted);
                var slides = ''

                // Get the top 3.
                if (distance_sorted.length) {
                    for(var i = 0; i < 3; i++) {
                        var id = distance_sorted[i][0];
                        var distance_meters = parseFloat(distance_sorted[i][1]);

                        // Convert to km.
                        distance_meters = (distance_meters / 1000).toFixed(2);
                        
                        // Get the details.
                        for(var rec_id in records) {
                            if (id == rec_id) {
                                log(records[id]);
                                var title = records[id].title;
                                var photo = '<div class="no-image"></div>';
                                var bg_image = '';
                                if (RTG.data[module + '_local_photos'][id].length) {
                                    photo = '<img class="responsive" src="' + RTG.data[module + '_local_photos'][id][0] + '">';
                                    bg_image = 'style="background-image: url(' + RTG.data[module + '_local_photos'][id][0] + ')"';
                                }

                                slides += '<div class="swiper-slide">' +
                                        '<div class="card">' +
                                            '<div class="card-content text-center">' +
                                                '<div class="img-wrapper" ' + bg_image + '>' +
                                                    photo +
                                                '</div>' +
                                                '<a class="button button-fill swiper-no-swiping" href="/tresislas-island/' + module + '/details/?id=' + id + '">' + title + '<i class="material-icons">keyboard_arrow_right</i></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="distance-meters"><i class="material-icons">place</i> ' + distance_meters + ' km away</div>' +
                                    '</div>';
                                break;
                            }
                        }
                    }
                    log(slides);
                


                    $$('#near-' + module + ' > .block').remove();
                    $$('#near-' + module + ' .swiper-wrapper').html(slides);
                    var swiper = new Swiper('#near-' + module + ' .swiper-container', {
                        pagination: {
                            'el': '#near-' + module + ' .swiper-pagination'
                        },
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        grabCursor: true,
                        preventClicks: true,
                        preventClicksPropagation: false,
                        passiveListeners: false,
                        threshold: 75,
                        on: {
                            tap: function(e) {
                                e.preventDefault();
                                log('tap event');
                                var page = $$(e.target).attr('data-page');
                                mainView.router.navigate({
                                    url: page,
                                    options: {
                                        animate: false,
                                    },
                                });
                            }
                        }
                    });
                } else {
                    $$('#near-' + module).html('<p class="no-location">No ' + module + ' found.</p>');
                }
            }

            generateNearestLocationsSlides('attractions');
            generateNearestLocationsSlides('accommodations');
            generateNearestLocationsSlides('dining');

        }, function(error) {
            log(error);
            handleLocationError();
        }, {
            maximumAge: 10000, 
            timeout: 10000, 
            enableHighAccuracy: false
        });

    } else {
        // Browser doesn't support Geolocation
        log('doesnt support geolocation.');
        handleLocationError();
    }

    function handleLocationError(selector) {
        $$('#near-attractions').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-accommodations').html('<p class="no-location">Device location is not accessible.</p>');
        $$('#near-dining').html('<p class="no-location">Device location is not accessible.</p>');
    }

};

var TresIslasIslandDetails = function() {
    var destination = {
        lat: 12.899087,
        lng: 121.898415
    };
    var map = new GoogleMap(
        destination.lat, 
        destination.lng, 
        'Tres Islas', 
        'map-canvas-tresislas-island',
        10
    );
    var mapInstance = map.initialize();
    displayDirections(mapInstance, destination);
}

var TresIslasIslandAttractions = function() {
    var attractions = RTG.data.attractions['Tres Islas'];
    if (attractions) {
        $$('.searchbar-hide-on-search span').html(Object.keys(attractions).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAttractions = Template7.compile(TEMPLATE.TresIslas.attractions.raw);
    for(att_id in attractions) {
        attractions[att_id]['local_photos'] = RTG.data.attractions_local_photos[att_id];
    }

    // Display the compiled template.
    if (attractions) {
        var compiled = compiledAttractions(attractions);  
        $$('#attractions-list').html(compiled);
    } else {
        $$('#attractions-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('att-id');
    convertListToGrid();
};

var TresIslasIslandAttractionsDetails = function(page) {
    var id = page.route.query.id;
    var record = RTG.data.attractions['Tres Islas'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.convenience) $$('#info').append('<label>Convenience:</label><p>' + record.convenience + '</p>');
    if (record.time_of_visit) $$('#info').append('<label>Time of visit:</label><p>' + record.time_of_visit + '</p>');
    if (record.sunset_viewing) $$('#info').append('<label>Sunset viewing:</label><p>' + record.sunset_viewing + '</p>');
    if (record.how_to_get_there) $$('#info').append('<label>How to get there:</label><p>' + record.how_to_get_there + '</p>');

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tresislas-attractions'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledTresIslasAttractionsPhotos = Template7.compile(TEMPLATE.TresIslas.attractions.photos.raw);
    TEMPLATE.TresIslas.attractions.photos.compiled = compiledTresIslasAttractionsPhotos(RTG.data.attractions_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.TresIslas.attractions.photos.compiled);

    createPhotoBrowser(RTG.data.attractions_local_photos[id]);
};

var TresIslasIslandAccommodations = function() {
    var accommodations = RTG.data.accommodations['Tres Islas'];
    if (accommodations) {
        $$('.searchbar-hide-on-search span').html(Object.keys(accommodations).length);
    }

    // Add the path of photos downloaded to device.
    var compiledAccommodations = Template7.compile(TEMPLATE.TresIslas.accommodations.raw);
    for(id in accommodations) {
        accommodations[id]['local_photos'] = RTG.data.accommodations_local_photos[id];
    }

    // Display the compiled template.
    if (accommodations) {
        var compiled = compiledAccommodations(accommodations);  
        $$('#accommodations-list').html(compiled);
    } else {
        $$('#accommodations-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }

    displayDistanceInGrid('acc-id');
    convertListToGrid();
};

var TresIslasIslandAccommodationsDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.accommodations['Tres Islas'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tresislas-accommodations'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.TresIslas.accommodations.photos.raw);
    TEMPLATE.TresIslas.accommodations.photos.compiled = compiledPhotos(RTG.data.accommodations_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.TresIslas.accommodations.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};

var TresIslasIslandDining = function() {
    var dining = RTG.data.dining['Tres Islas'];
    if (dining) {
        $$('.searchbar-hide-on-search span').html(Object.keys(dining).length);
    }

    // Add the path of photos downloaded to device.
    var compiledDining = Template7.compile(TEMPLATE.TresIslas.dining.raw);
    for(id in dining) {
        dining[id]['local_photos'] = RTG.data.dining_local_photos[id];
    }

    // Display the compiled template.
    if (dining) {
        var compiled = compiledDining(dining); 
        $$('#dining-list').html(compiled);
    } else {
        $$('#dining-list').html('<li class="item-content" style="position:relative;width:100%"><div class="card"><div class="card-content"><p>No record found.</p></div></div></li>');
    }
    
    displayDistanceInGrid('din-id');
    convertListToGrid();
};

var TresIslasIslandDiningDetails = function(page) {
    var id = page.route.query.id;
    log(page);
    var record = RTG.data.dining['Tres Islas'][id];

    $$('#title').html(record.title);
    $$('#location').html(record.location);
    $$('#content').html((record.content).replace(/(?:\r\n|\r|\n)/g, '<br />'));

    if (record.room_count) $$('#info').append('<label>Number of rooms:</label><p>' + record.room_count + '</p>');
    // if (record.employee_count) $$('#info').append('<label>Number of employees:</label><p>' + record.employee_count + '</p>');
    if (record.phone) $$('#info').append('<label>Phone number:</label><p>' + record.phone + '</p>');
    if (record.mobile_1) $$('#info').append('<label>Mobile Number:</label><p class="mobile"><a class="external" href="tel:' + record.mobile_1 + '">' + record.mobile_1 + '</a></p>');
    if (record.mobile_2) $$('#info .mobile').append(' / <a class="external" href="tel:' + record.mobile_2 + '">' + record.mobile_2 + '</a>');
    if (record.email) $$('#info').append('<label>Email address:</label><p><a class="external" href="mailto:' + record.email + '">' + record.email + '</a></p>');
    if (record.website) $$('#info').append('<label>Website:</label><p><a class="external" href="' + record.website + '">' + record.website + '</a></p>');
    if (record.tags.length) {
        var tags = '';
        for (var tag in record.tags) {
            tags += record.tags[tag] + ', ';
        }
        tags = tags.slice(0, -2);
        $$('#info').append('<label>Tags:</label><p>' + tags + '</p>');
    }

    var map = new GoogleMap(
        record.latitude, 
        record.longitude, 
        record.title, 
        'map-canvas-tresislas-dining'
    );
    var mapInstance = map.initialize();

    var destination = {
        lat: record.latitude,
        lng: record.longitude
    };
    displayDirections(mapInstance, destination);

    var compiledPhotos = Template7.compile(TEMPLATE.TresIslas.dining.photos.raw);
    TEMPLATE.TresIslas.dining.photos.compiled = compiledPhotos(RTG.data.dining_local_photos[id]);
    $$('#photo-browser').html(TEMPLATE.TresIslas.dining.photos.compiled);

    createPhotoBrowser(RTG.data.accommodations_local_photos[id]);
};