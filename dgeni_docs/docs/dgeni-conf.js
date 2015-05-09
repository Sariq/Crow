// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Package = require('dgeni').Package;


module.exports = new Package('dgeni-example', [
    require('dgeni-packages/angularjs'),
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks')
])


    .config(function (log, readFilesProcessor, writeFilesProcessor) {

        log.level = 'info';

        readFilesProcessor.basePath = path.resolve(__dirname, '..');
        readFilesProcessor.sourceFiles = [
        //admin
            {include: '../src/admin/admin_module.js', basePath: 'src'},
            {include: '../src/admin/views/**/*.js', basePath: 'src'},



        ];

        writeFilesProcessor.outputFolder = 'build';

    })


    .config(function (templateFinder, templateEngine) {

        // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
        templateEngine.config.tags = {
            variableStart: '{$',
            variableEnd: '$}'
        };

        templateFinder.templateFolders
            .unshift(path.resolve(__dirname, 'templates'));

        templateFinder.templatePatterns = [
            '${ doc.template }',
            '${ doc.id }.${ doc.docType }.template.html',
            '${ doc.id }.template.html',
            '${ doc.docType }.template.html',
            'common.template.html'
        ];
    })


    .config(function (getLinkInfo) {
        getLinkInfo.relativeLinks = true;
    });




