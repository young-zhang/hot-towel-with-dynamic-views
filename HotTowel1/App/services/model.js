define(['config'], function (config) {
    var imageSettings = config.imageSettings;

    var makeImageName = function (source) {
        return imageSettings.imageBasePath +
            (source || imageSettings.unknownPersonImageSource);
    };

    var model = {
        configureMetadataStore: configureMetadataStore
    };

    return model;

    //#region Internal Methods
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor(
            'Session', null, sessionInitializer);
        metadataStore.registerEntityTypeCtor(
            'Person', null, personInitializer);
        metadataStore.registerEntityTypeCtor(
            'TimeSlot', null, timeSlotInitializer);
    }

    function sessionInitializer(session) {
        session.tagsFormatted = ko.computed(function () {
            var text = session.tags();
            return text ? text.replace(/\|/g, ', ') : text;
        });
    };

    function personInitializer(person) {
        person.fullName = ko.computed(function () {
            return person.firstName() + ' ' + person.lastName();
        });
        person.imageName = ko.computed(function () {
            return makeImageName(person.imageSource());
        });
    };
    
    function timeSlotInitializer(timeSlot) {
        timeSlot.name = ko.computed(function () {
            return timeSlot.start() ? moment.utc(timeSlot.start()).format('ddd hh:mm a') : '';
        });
    }
    
    //#endregion
});