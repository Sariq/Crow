(function () {

    /**
     * @description projects filter
     */
    function projects() {
        return function (array, projectFamilyId, projectId, stepId) {
            var filteredArr = [];
            if (projectFamilyId == '') {
                return array;
            }
            for (var i = 0; i < array.length; i++) {
                var match = true;
                if (array[i].project_family_id == projectFamilyId) {
                    if (projectId == '') {
                        filteredArr.push(array[i])
                    } else {
                        if (array[i].project_id == projectId) {
                            if (stepId == '') {
                                filteredArr.push(array[i])
                            } else {
                                if (array[i].step_id == stepId) {
                                    filteredArr.push(array[i])
                                }
                            }
                        }
                    }
                }
            }
            return filteredArr;
        }
    }

    angular.module('ate.admin')
        .filter('projects', projects)
}());