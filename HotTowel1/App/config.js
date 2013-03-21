define(function () {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var imageSettings = {
        imageBasePath: '../content/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var remoteServiceName = 'api/breeze';

    var routes = [{
        url: 'sessions',
        moduleId: 'viewmodels/sessions',
        name: 'Sessions',
        visible: true
    }, {
        url: 'speakers',
        moduleId: 'viewmodels/speakers',
        name: 'Speakers',
        visible: true
    }];

    var startModule = 'sessions';

    return {
        imageSettings: imageSettings,
        remoteServiceName: remoteServiceName,
        routes: routes,
        startModule: startModule
    };
});
