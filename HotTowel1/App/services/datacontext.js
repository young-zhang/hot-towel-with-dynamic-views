define(['durandal/system', 'services/model', 'config', 'services/logger'],
    function (system, model, config, logger) {
        var EntityQuery = breeze.EntityQuery,
            manager = configureBreezeManager();
        
        var getSpeakers = function (speakerObservable) {
            var query = EntityQuery.from('Speakers')
                .orderBy('firstName, lastName');

            return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed);

            function querySucceeded(data) {
                if (speakerObservable) {
                    speakerObservable(data.results);
                }
                log('Retrieved [Speaker] from remote data source',
                    data, true);
            }
        };
        
        var getSessions = function (sessionsObservable) {
            var query = EntityQuery.from('Sessions')
                .orderBy('timeSlotId, level, speaker.firstName');

            return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed);

            function querySucceeded(data) {
                if (sessionsObservable) {
                    sessionsObservable(data.results);
                }
                log('Retrieved [Sessions] from remote data source',
                    data, true);
            }
        };

        var primeData = function () {
            return Q.all([getLookups(), getSpeakers()]);
        };

        var datacontext = {
            getSessions: getSessions,
            getSpeakers: getSpeakers,
            primeData: primeData
        };

        return datacontext;

        //#region Internal methods        
        function queryFailed(error) {
            var msg = 'Error retreiving data. ' + error.message;
            logger.logError(msg, error, system.getModuleId(datacontext), true);
        }

        function configureBreezeManager() {
            breeze.NamingConvention.camelCase.setAsDefault();
            var mgr = new breeze.EntityManager(config.remoteServiceName);
            model.configureMetadataStore(mgr.metadataStore);
            return mgr;
        }

        function getLookups() {
            return EntityQuery.from('Lookups')
                .using(manager).execute()
                .fail(queryFailed);
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(datacontext), showToast);
        }
        //#endregion
});