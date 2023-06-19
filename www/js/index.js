document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    /* console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    console.log('cualquier cosa'); */

    // var fileInput = document.getElementById('fileInput');
    // var copyButton = document.getElementById('copyButton');

    // copyButton.addEventListener('click', function () {
    //     if (fileInput.files.length > 0) {
    //         var file = fileInput.files[0];

    //         var sourceFilePath = file.localURL;
    //         console.log(sourceFilePath);
    //         console.log('paso!')
    //         var destinationDirectory = cordova.file.dataDirectory;
    //         var destinationFilePath = 'archivo.txt';

    //         var fileTransfer = new FileTransfer();

    //         fileTransfer.download(sourceFilePath, destinationDirectory + destinationFilePath, function (entry) {
    //             console.log('Archivo copiado con éxito:', entry.toURL());
    //         }, function (error) {
    //             console.error('Error al copiar el archivo:', error);
    //         });
    //     }
    // });


    // var fileInput = document.getElementById('fileInput');
    // var copyButton = document.getElementById('copyButton');

    // copyButton.addEventListener('click', function () {
    //     if (fileInput.files.length > 0) {
    //         var file = fileInput.files[0];

    //         var sourceFilePath = window.URL.createObjectURL(file);
    //         $('#image').attr('src', sourceFilePath);
    //         console.log(sourceFilePath);
    //         console.log('paso!')
    //         /* var destinationDirectory = cordova.file.dataDirectory; */
    //         /* var destinationDirectory = cordova.file.externalDataDirectory; */
    //         var destinationDirectory = cordova.file.externalApplicationStorageDirectory;
    //         var destinationFilePath = 'archivo.jpg';

    //         var fileTransfer = new FileTransfer();

    //         fileTransfer.download(sourceFilePath, destinationDirectory + destinationFilePath, function (entry) {
    //             console.log('Archivo copiado con éxito:', entry.toURL());
    //         }, function (error) {
    //             console.error('Error al copiar el archivo:', error);
    //         });
    //     }
    // });


    // Obtén una referencia al elemento de selección de archivos
    var inputFile = document.getElementById('fileInput');

    // Agrega un controlador de eventos al evento 'change' del elemento de selección de archivos
    inputFile.addEventListener('change', function (event) {
        // Obtén el archivo seleccionado
        var file = event.target.files[0];

        // Crea un objeto FileReader
        var reader = new FileReader();

        // Controlador de eventos para cuando la lectura del archivo se complete
        reader.onload = function (event) {
            // Obtén los datos del archivo leído
            var fileData = event.target.result;

            // Aquí puedes guardar el archivo localmente en tu aplicación
            // Utiliza las APIs de almacenamiento de Cordova, como cordova-plugin-file, para guardar el archivo
            // Guarda el archivo en una ubicación específica, por ejemplo, 'local_folder'
            console.log(fileData);
            var localFolder = 'files';
            saveFileToLocalFolder(fileData, localFolder);

        };

        // Inicia la lectura del archivo como una cadena de texto
        reader.readAsText(file);
    });

    // Función para guardar el archivo en una carpeta local
    function saveFileToLocalFolder(fileData, localFolder) {
        // Utiliza el plugin cordova-plugin-file para acceder y manipular archivos
        /* console.log('entro aqui'); */

        // Obtiene la carpeta raíz del sistema de archivos
        /* window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) { */
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
            // Crea o accede a la carpeta local
            dirEntry.getDirectory(localFolder, { create: true, exclusive: false }, function (folderEntry) {
                // Crea un nombre de archivo único utilizando una marca de tiempo
                var fileName = new Date().getTime().toString() + '.jpg';

                // Crea o accede al archivo dentro de la carpeta local
                folderEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                    // Escribe los datos del archivo en el archivo local
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.write(fileData);

                        console.log('Archivo guardado localmente:', fileEntry.fullPath);

                        // Aquí puedes enviar o mover el archivo a otra carpeta utilizando las funciones adecuadas del plugin
                    }, function (error) {
                        console.error('Error al crear el escritor del archivo:', error);
                    });
                }, function (error) {
                    console.error('Error al obtener o crear el archivo:', error);
                });
            }, function (error) {
                console.error('Error al obtener o crear la carpeta local:', error);
            });
        }, function (error) {
            console.error('Error al acceder a la carpeta raíz del sistema de archivos:', error);
        });
    }


}
