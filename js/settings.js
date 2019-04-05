var error_global;

/*****************************************************
 App settings.
 *****************************************************/
var RTG = {
    server: 'https://teachermaestro.com/romblonislandsguide/',
    datafile: 'rtg.data',
    data: '',
    status: 'initializing',
    update_version: '0',
    is_offline: false,
    file_error: {
        [1]: 'NOT_FOUND_ERR',
        [2]: 'SECURITY_ERR',
        [3]: 'ABORT_ERR',
        [4]: 'NOT_READABLE_ERR',
        [5]: 'ENCODING_ERR',
        [6]: 'NO_MODIFICATION_ALLOWED_ERR',
        [7]: 'INVALID_STATE_ERR',
        [8]: 'SYNTAX_ERR',
        [9]: 'INVALID_MODIFICATION_ERR',
        [10]: 'QUOTA_EXCEEDED_ERR',
        [11]: 'TYPE_MISMATCH_ERR',
        [12]: 'PATH_EXISTS_ERR'
    },
    file_transfer_error: {
        [1] : 'FILE_NOT_FOUND_ERR',
        [2] : 'INVALID_URL_ERR',
        [3] : 'CONNECTION_ERR',
        [4] : 'ABORT_ERR',
        [5] : 'NOT_MODIFIED_ERR'
    }
}

var TEMPLATE = {
    Tablas: {
        attractions: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-att-id="{{att_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tablas-island/attractions/details/?id={{att_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                        '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        accommodations: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-acc-id="{{acc_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tablas-island/accommodations/details/?id={{acc_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        dining: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-din-id="{{din_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tablas-island/dining/details/?id={{din_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        
    },
    Sibuyan: {
        attractions: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-att-id="{{att_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/sibuyan-island/attractions/details/?id={{att_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        accommodations: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-acc-id="{{acc_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/sibuyan-island/accommodations/details/?id={{acc_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        dining: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-din-id="{{din_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/sibuyan-island/dining/details/?id={{din_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
    },
    Romblon: {
        attractions: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-att-id="{{att_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/romblon-island/attractions/details/?id={{att_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        accommodations: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-acc-id="{{acc_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/romblon-island/accommodations/details/?id={{acc_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        dining: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-din-id="{{din_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/romblon-island/dining/details/?id={{din_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
    },
    Carabao: {
        attractions: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-att-id="{{att_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/carabao-island/attractions/details/?id={{att_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        accommodations: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-acc-id="{{acc_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/carabao-island/accommodations/details/?id={{acc_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        dining: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-din-id="{{din_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/carabao-island/dining/details/?id={{din_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
    },
    TresIslas: {
        attractions: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-att-id="{{att_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tresislas-island/attractions/details/?id={{att_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        accommodations: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-acc-id="{{acc_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tresislas-island/accommodations/details/?id={{acc_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
        dining: {
            raw: '{{#each this}}' +    
                    '<li class="item-content">' +
                        '<div class="card" data-din-id="{{din_id}}">' +
                            '<div class="card-content">' +
                                '<a href="/tresislas-island/dining/details/?id={{din_id}}" class="row no-gap">' +
                                    '<div class="col-35">' +
                                        '<div class="loader"><div class="img-wrapper lazy" {{#if local_photos.length}}{{#each local_photos}}{{#if @first}} data-background="{{this}}" {{/if}}{{/each}}{{else}} style="background-image: url(../images/no-image.jpg)"{{/if}}></div></div>' +
                                    '</div>' +
                                    '<div class="col-65 item-summary">' +
                                        '<h3>{{title}}</h3>' +
                                        '<div class="municipality">{{location}}</div>' +
                                        '<div class="tags">' +
                                            '{{if tags}}' +
                                                '{{#each tags}}' +
                                                    '<div class="chip">' +
                                                        '<div class="chip-label">{{this}}</div>' +
                                                    '</div>' +
                                                '{{/each}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                        '<div class="distance-wrapper" data-latitude="{{latitude}}" data-longitude="{{longitude}}"></div>' +
                                        '<div class="search-keywords hidden">{{title}}, {{location}}, {{#each tags}}{{this}}, {{/each}}</div>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '{{/each}}',
            compiled: '',
            photos: {
                raw: '<h3>Photos</h3>' +
                    '<div class="row no-gap photo-browser-container">' +
                        '{{#each this}}' +
                            '<div class="col-100">' +
                                '<div class="card">' +
                                    '<div class="card-content">' +
                                       '<a href="#" class="open-photos" data-index="{{@index}}"><img class="responsive lazy" data-src="{{this}}"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '{{else}}' +
                            '<p>No photos available.</p>' +
                        '{{/each}}' +
                    '</div>',
                compiled: ''
            }
        },
    },
}