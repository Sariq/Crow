describe('unit: StorageService', function () {

    var storageService;
    var server;

    // get a reference to the module
    beforeEach(module('taskApp'));

    /* use the $injector service to get a reference to the StorageService.
     Use the $httpBackend service to mock our server
     */
    beforeEach(inject(function ($injector, $httpBackend) {

        storageService = $injector.get('StorageService');
        server = $httpBackend;

    }));

    it('should save and retrieve data from storage', function () {

        storageService.save('testKey', 'testValue');

        var testData = storageService.getData('testKey');
        expect(testData).toEqual('testValue');
    });

    it('should clear the storage', function () {

        storageService.save('testKey', 'testValue');
        storageService.clear();

        var testData = storageService.getData('testKey');
        expect(testData).toBeNull();
    });

    it('should make a post request to the server', function () {

        server.expectPOST('/tasks', {'key': []})
            .respond(200);

        storageService.save('key', []);

        server.flush();

    });
});