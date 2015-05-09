(function () {

    function BarcodeReaderService($rootScope) {
        var self = this;

        self.eventCounter = 0;
        self.SpecialInputFlag = false;
        self.charArr = [];
        self.str = '';
        self.res = '';
        self.currentFixture = -1;
        self.barcodMode = false;
        self.fixturesArr = [];

        /**
         *
         */
        self.toggleReaderMode = function(){
            self.barcodMode = !self.barcodMode;
        };
        /**
         *
         */
        self.getReaderMode = function(){
            return self.barcodMode;
        };


        /**
         *
         * @type {boolean}
         */
        BarcodeReaderService.disabledCavity = false;
        self.barcodeBarHandller = function (event, fixtures) {

            self.fixturesArr = fixtures;
            self.eventCounter++;
            /**
             * checks if the first char is 16
             * to indicate if it's a (!=keyboard)
             * or (@=barcodeReader)
             */
            if (self.eventCounter == 1 && event.which == 16) {
                self.str = '';
                self.res = '';
                self.charArr = [];
                self.firstChar = 16;
                event.preventDefault()
                return false;
            }

            /**
             * check if input equal to 16=SHIFT
             * that's mean it's a special input
             */
            if (self.firstChar != 16) {
                /**
                 * checks if it's barcode mode
                 * else keyboard mode on
                 */
                if (self.barcodMode) {

                    /**
                     * checks if we reached the
                     * end of the input
                     */
                    if (event.which == '9') {

                        /**
                         * change format from
                         * ASCII to string
                         */
                        for (var i = 0; i < self.charArr.length; i++) {

                            self.str = String.fromCharCode(self.charArr[i]);
                            self.res = self.res.concat(self.str);
                        }

                        /**
                         * checks if the input equal to barcode
                         * and changes the input mode to be barcode
                         * Reader mode
                         */
                        if (((self.res.toUpperCase()).localeCompare(("barcode").toUpperCase())) == 0) {

                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("barcode")
                            console.log(self.res)
                            self.barcodMode = true;
                            event.preventDefault()
                            return false;
                        }
                        /**
                         * checks if the input equal to keyboard
                         * and changes the input mode to be keyboard
                         * mode
                         */
                        if (((self.res.toUpperCase()).localeCompare(("keyboard").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which);
                            console.log("keyboard ");
                            console.log(self.res);
                            self.barcodMode = false;
                            event.preventDefault();
                            return false;
                        }

                        /**
                         * checks if the input equal to run
                         * and calls the "runTse" function
                         */
                        if (((self.res.toUpperCase()).localeCompare(("run").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which);
                            console.log("run");
                            event.preventDefault();
                            $rootScope.$broadcast('run', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to run
                         * and calls the "stopTse" function
                         */
                        if (((self.res.toUpperCase()).localeCompare(("stop").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("stop")
                            event.preventDefault()
                            $rootScope.$broadcast('stop', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to right
                         * and jump to the next cavity
                         */
                        if (((self.res.toUpperCase()).localeCompare(("right").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("right")
                            event.preventDefault()
                            $rootScope.$broadcast('right', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to left
                         * and jump to the prev cavity
                         */
                        if (((self.res.toUpperCase()).localeCompare(("left").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("left")
                            event.preventDefault()
                            $rootScope.$broadcast('left', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to disable
                         * and calls the "toggleEnabled" function
                         */
                        if (((self.res.toUpperCase()).localeCompare(("disable").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("disable")

                            $rootScope.$broadcast('disable', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to enable
                         * and calls the "toggleEnabled" function
                         */
                        if (((self.res.toUpperCase()).localeCompare(("enable").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("enable")
                            event.preventDefault()
                            $rootScope.$broadcast('enable', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to delete
                         * and delete the text from the current
                         * cavity
                         */
                        if (((self.res.toUpperCase()).localeCompare(("delete").toUpperCase())) == 0) {
                            self.str = '';
                            self.res = '';
                            self.charArr = [];
                            self.eventCounter = 0;
                            console.log(event.which)
                            console.log("delete")
                            event.preventDefault()
                            $rootScope.$broadcast('delete', self.currentFixture);
                            return false;
                        }
                        /**
                         * checks if the input equal to
                         * one of the Fixtures name and
                         * moves the focus on the Fixture
                         */
                        for (var j = 0; j < fixtures.length; j++) {
                            console.log(self.res.toUpperCase() + '-' + (fixtures[j].pn).toUpperCase())
                            if (((self.res.toUpperCase()).localeCompare((fixtures[j].pn).toUpperCase())) == 0) {
                                self.currentFixture = j;
                                self.currentFixtureDis = j;
                                self.SpecialInputFlag = true;
                                self.str = '';
                                self.res = '';
                                self.charArr = [];
                                self.eventCounter = 0;
                                event.preventDefault()
                                $rootScope.$broadcast('cavityFocus', self.currentFixture);
                                return false;
                            }
                        }
                        /**
                         * insert the input into the current cavity
                         */
                        $rootScope.$broadcast('insertInput', self.currentFixture, self.res);
                        self.str = '';
                        self.res = '';
                        self.charArr = [];
                        self.eventCounter = 0;

                    } else {
                        /**
                         * check if the input equal to
                         * 189 and insert instead
                         * of it 95='_' (ASCII issue)
                         */
                        if (event.which == 189) {

                            event.preventDefault()
                            self.charArr.push(95)
                            return false;
                        }
                        else {
                            /**
                             * push the input to charArray
                             * to be formatted from ASCII
                             * to string at the end of input
                             */
                            event.preventDefault()

                            self.charArr.push(event.which)

                            return false;
                        }
                    }
                }
                /**
                 * checks if input is equal to 9
                 * it's mean that it's the end of
                 * the input.
                 * then reset variables
                 */
                if (event.which == 9) {
                    self.firstChar = '';
                    self.eventCounter = 0
                }
            } else {
                /**
                 * checks if input is equal to 9
                 * it's mean that's the end of the input.
                 * then reset variables
                 */
                if (event.which == 9) {
                    self.firstChar = '';
                    event.preventDefault()
                    return false;
                }
                /**
                 * checks if input is equal to 49=!
                 * and changes the barcode mode to false
                 */
                if (event.which == 49) {
                    self.barcodMode = false;
                    event.preventDefault()
                    return false;
                }
                if (event.which == 50) {
                    /**
                     * changes the barcode mode to true
                     */

                    self.barcodMode = true;
                    console.log("barcodMode - " + self.barcodMode)
                    event.preventDefault()
                    return false;
                }

            }
        };
        return self;
    }

    angular.module('ate.tester')
        .service('BarcodeReaderService', ['$rootScope', BarcodeReaderService]);
}());

