(function () {
  /**
   * Fixture Admin Service
   * using the following services
   * @param $resource
   * @returns {FixtureAdmin}
   * @constructor
   */
  function FixtureAdmin($resource,CeleryControlService) {

    var self = this;
    self.info = {
      os: ['linux', 'windows'],
      stages: ['DOCS', 'TF', 'QL', 'Production'],
      locations: ['apc', 'afula'],
      fixture_width:['auto','100%','50%'],
      cavity_width:['auto','100px','150px','100%'],
      celery_queues:CeleryControlService.getQueues()
    };
    /**
     * create a $resource for fixture
     */
    self.fixtureResource = $resource('/admin/api/fixture', {},
      {update: {method: 'PUT'}}
    );
    /**
     * get a fixture by id from database
     * @param fixture_id
     * @returns {*}
     */
    self.get = function (pn) {
      return self.fixtureResource.get({pn: pn});
    };
    /**
     * Creates a cavity object based on number of cavities entered by the user
     * @param fixture
     */
    self.setCavities = function (fixture) {
      fixture.cavityInfo = [];
      for (var i = 1; i <= fixture.cavities; i++) {
        fixture.cavityInfo.push({active: true, idx: i});
      }
    };

    /**
     * create a new fixture object
     *
     * @returns {FixtureAdmin.fixtureResource}
     */
    self.create = function () {
      var fixture = {
        stage_id: '',
        name: '',
        ip_address: '',
        host: '',
        test_sequence_id: '',
        device: '',
        pn: '',
        os: '',
        celery_queue:'',
        deleted: false,
        cavities: 4,
        horizontal_cavities: 1,
        station: '',
        cavityInfo: [],
        admin_info: {},
        agent_info: {},
        require_serial: true,
        location: '',
        pn_cfg:'',
        pn_cfg_rev:'',
        gui_conf:[]
      };
      return new self.fixtureResource(fixture);
    };
    /**
     * Add a gui configuration to a fixture
     */
    self.addGuiConf= function(fixture){
      if(!fixture.gui_conf){
        fixture.gui_conf = [];
      }
      fixture.gui_conf.push({
        fixture_width:'auto',
        cavity_width:'auto'
      })
    };
    /**
     * returns a list of fixtures
     * @returns {*}
     */
    self.query = function () {
      return self.fixtureResource.query();
    };

    return self;
  }

  angular.module('ate.admin')
    .service('FixtureAdmin', ['$resource','CeleryControlService', FixtureAdmin])
}());