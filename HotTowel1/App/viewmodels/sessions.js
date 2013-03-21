define(['services/datacontext'], function (datacontext) {
    var sessions = ko.observableArray();
    var initialized = false;
    var vm = {
        activate: activate,
        sessions: sessions,
        title: 'Sessions',
        refresh: refresh
    };
    return vm;

    function activate() {
        if (initialized) { return; }
        initialized = true;
        return refresh();
    }

    function refresh() {
        return datacontext.getSessions(sessions);
    }

});