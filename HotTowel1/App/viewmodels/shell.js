define(['durandal/system',
        'durandal/plugins/router',
        'services/logger',
        'services/datacontext'],
    function (system, router, logger, datacontext) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        //#region Internal Methods
        function activate() {
            return datacontext.primeData()
                .then(boot)
                .fail(failedInit);
        }

        function boot() {
            router.mapNav('home');
            router.mapNav('details');
            router.mapNav('sessions');
            log('Hot Towel SPA Loaded!', null, true);
            return router.activate('home');
        }
        
        function failedInit(error) {
            toastr.error('App init failed: ' + error.message);
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });