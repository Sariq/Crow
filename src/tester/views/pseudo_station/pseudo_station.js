(function () {
    function PseudoStationController($http) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.station = {};

        self.runStatuses = ['idle', 'running', 'failed', 'success', 'active'];
        self.cavityStatuses = ['idle', 'running', 'failed', 'success'];
        self.fixtures = [{
            pn: 'test_b01',
            config: {
                "pn": "test_b01",
                "step_id": 1,
                "stage_id": "",
                "require_serial": true,
                "ip_address": "192.168.2.217",
                "host": "192.168.2.217",
                "horizontal_cavities": 1,
                "cavityInfo": [
                    {
                        "idx": 0,
                        "active": true

                    },
                    {
                        "idx": 1,
                        "active": true
                    },
                    {
                        "idx": 2,
                        "active": true
                    },
                    {
                        "idx": 3,
                        "active": true
                    },
                    {
                        "idx": 4,
                        "active": true
                    },
                    {
                        "idx": 5,
                        "active": true
                    }
                ],
                "os": "windows",
                "admin_info": {
                    'pre': 80
                },
                report: {},
                "project_id": 1,
                "device": "test_b01",
                "cavities": 6,
                "name": "",
                "project_family_id": "548850556b1da7617f70b722",
                "test_sequence_id": "",
                "station": "547ad9b26b1da71341c67677",
                "location": "apc",
                "agent_info": {}
            },
            status: 'idle',
            lastStatusUpdate: false,
            runStatus: {timeElapsed: 15, pre: 60},
            stats: {yield: 89, failed: 11, passed: 89},
            cavities: [
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 0,
                    pre: 30,
                    enabled: true,
                    status: 'running'
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 1,
                    pre: 50,
                    enabled: true,
                    status: 'running'
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 2,
                    pre: 30,
                    enabled: true,
                    status: 'running'
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 3,
                    pre: 10,
                    enabled: true,
                    status: 'failed'
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 4,
                    pre: 10,
                    enabled: true,
                    status: 'failed'
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 5,
                    pre: 10,
                    enabled: true,
                    status: 'failed'
                }
            ]
        }, {
            pn: 'test_b02',
            config: {
                "pn": "test_b02",
                "step_id": 1,
                "stage_id": "",
                "require_serial": true,
                "ip_address": "192.168.2.217",
                "host": "192.168.2.217",
                "horizontal_cavities": 4,
                "cavityInfo": [
                    {
                        "idx": 0,
                        "active": true
                    },
                    {
                        "idx": 1,
                        "active": true
                    },
                    {
                        "idx": 2,
                        "active": true
                    },
                    {
                        "idx": 3,
                        "active": true
                    }
                ],
                "os": "windows",
                "admin_info": {},
                "project_id": 1,
                "device": "test_b01",
                "cavities": 16,
                "name": "",
                "project_family_id": "548850556b1da7617f70b722",
                "test_sequence_id": "",
                "station": "547ad9b26b1da71341c67677",
                "location": "apc",
                "agent_info": {}
            },
            status: 'idle',
            lastStatusUpdate: false,
            runStatus: {},
            stats: {yield: 89, failed: 11, passed: 89},
            cavities: [
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 0
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 1
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 2
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 3
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 4
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 5
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 6
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 7
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 8
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 9
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 10
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 11
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 12
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 13
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 14
                },
                {
                    "active": true,
                    "require_serial": true,
                    "idx": 15
                }
            ]
        }
        ]
    }

    angular.module('ate.tester')
        .controller('PseudoStationController', ['$http', PseudoStationController]);
}());
