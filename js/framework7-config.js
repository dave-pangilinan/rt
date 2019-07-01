const CONFIG = {
    swipeBackPage: false,
    init: true,
    statusbar: {
        overlay: false,
        materialBackgroundColor: '#000'
    },
    touch: {
        materialRipple: false,
    },

    /****************************************
     Routes
     ****************************************/
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
        path: '/events/',
        url: './pages/events.html',    
        options: {
            animate: false,
        },
    },{
        path: '/about/',
        url: './pages/about.html',    
        options: {
            animate: false,
        },
    },{
        path: '/quick-facts-and-tips/',
        url: './pages/quick-facts-and-tips.html',    
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
        path: '/carabao-details/',
        url: './pages/carabao-island/carabao-details.html',    
        options: {
            animate: false,
        },
    },{
        path: '/tresislas-details/',
        url: './pages/tresislas-island/tresislas-details.html',    
        options: {
            animate: false,
        },
    },{
        path: '/romblon/inbound-outbound/',
        url: './pages/romblon/inbound-outbound.html',    
        options: {
            animate: false,
        },
    },{
        path: '/romblon/inter-island/',
        url: './pages/romblon/inter-island.html',    
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
            path: 'dining/',
            url: './pages/tablas-island/dining.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tablas-island/dining-details.html',
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
            path: 'dining/',
            url: './pages/sibuyan-island/dining.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/sibuyan-island/dining-details.html',
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
            path: 'dining/',
            url: './pages/romblon-island/dining.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/romblon-island/dining-details.html',
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
    },{
        path: '/carabao-island/',
        url: './pages/carabao-island/carabao-island.html',    
        options: {
            animate: false,
        },
        routes: [{
            path: 'attractions/',
            url: './pages/carabao-island/attractions.html',
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/carabao-island/attractions-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'accommodations/',
            url: './pages/carabao-island/accommodations.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/carabao-island/accommodations-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'dining/',
            url: './pages/carabao-island/dining.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/carabao-island/dining-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'tours/',
            url: './pages/carabao-island/tours.html',    
            options: {
                animate: false,
            }
        },{
            path: 'transportation/',
            url: './pages/carabao-island/transportation.html',   
            options: {
                animate: false,
            },
        },{
            path: 'directory/',
            url: './pages/carabao-island/directory.html',    
            options: {
                animate: false,
            },
        }] 
    },{
        path: '/tresislas-island/',
        url: './pages/tresislas-island/tresislas-island.html',    
        options: {
            animate: false,
        },
        routes: [{
            path: 'attractions/',
            url: './pages/tresislas-island/attractions.html',
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tresislas-island/attractions-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'accommodations/',
            url: './pages/tresislas-island/accommodations.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tresislas-island/accommodations-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'dining/',
            url: './pages/tresislas-island/dining.html',    
            options: {
                animate: false,
            },
            routes: [{
                path: 'details/',
                url: './pages/tresislas-island/dining-details.html',
                options: {
                    animate: false,
                },
            }]
        },{
            path: 'tours/',
            url: './pages/tresislas-island/tours.html',    
            options: {
                animate: false,
            }
        },{
            path: 'transportation/',
            url: './pages/tresislas-island/transportation.html',   
            options: {
                animate: false,
            },
        },{
            path: 'directory/',
            url: './pages/tresislas-island/directory.html',    
            options: {
                animate: false,
            },
        }] 
    }],
}