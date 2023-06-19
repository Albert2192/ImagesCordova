
// Obtén una referencia al elemento de selección de archivos
var inputFile = document.getElementById("fileInput");

// Agrega un controlador de eventos al evento 'change' del elemento de selección de archivos
inputFile.addEventListener("change", function (event) {
    // Obtén el archivo seleccionado
    var file = event.target.files[0];

    // Crea un objeto FileReader
    var reader = new FileReader();

    // Inicia la lectura del archivo como una cadena base64
    reader.readAsDataURL(file);
});

// Función para guardar el archivo en una carpeta local
function saveFileToLocalFolder(fileData, localFolder, fileType) {
    // Utiliza el plugin cordova-plugin-file para acceder y manipular archivos
    //console.log("entro aqui");

    // Obtiene la carpeta raíz del sistema de archivos
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
        // Crea o accede a la carpeta local
        dirEntry.getDirectory(localFolder, { create: true, exclusive: false }, function (folderEntry) {
            // Crea un nombre de archivo único utilizando una marca de tiempo
            var fileName = new Date().getTime().toString();

            // Asigna la extensión de archivo según el tipo de archivo
            if (fileType.startsWith("image/")) {
                fileName += ".jpg"; // Puedes ajustar la extensión según el tipo de imagen
            } else if (fileType.startsWith("video/")) {
                fileName += ".mp4"; // Puedes ajustar la extensión según el tipo de video
            }

            // Crea o accede al archivo dentro de la carpeta local
            folderEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                // Escribe los datos del archivo en el archivo local
                fileEntry.createWriter(function (fileWriter) {
                    var dataBlob = fileData; // Convierte la cadena base64 en un Blob de datos
                    console.log(dataBlob);
                    fileWriter.write(dataBlob);

                    console.log("Archivo guardado localmente:", fileEntry.fullPath);

                    // Aquí puedes enviar o mover el archivo a otra carpeta utilizando las funciones adecuadas del plugin
                }, function (error) {
                    console.error("Error al crear el escritor del archivo:", error);
                });
            }, function (error) {
                console.error("Error al obtener o crear el archivo:", error);
            });
        }, function (error) {
            console.error("Error al obtener o crear la carpeta local:", error);
        });
    }, function (error) {
        console.error("Error al acceder a la carpeta raíz del sistema de archivos:", error);
    });
}

// Función para convertir una cadena base64 en un Blob de datos
function base64ToBlob2(base64Data) {
    var parts = base64Data.split(";base64,");
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

function getFileBlobFromInput(inputFile) {
    return new Promise(function(resolve, reject) {
        var file = inputFile.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
        var blob = new Blob([event.target.result], { type: file.type });
        resolve(blob);
        };

        reader.onerror = function(event) {
        reject(new Error('Error al leer el archivo.'));
        };

        reader.readAsArrayBuffer(file);
    });
}

$('#copyButton').click(function() {
    // Ejemplo de uso
    var inputFile = document.getElementById('fileInput');
    // Obtener el Blob del archivo cargado
    getFileBlobFromInput(inputFile).then(function(blob) {
        // Hacer algo con el Blob del archivo...
        //console.log(blob.type);
        saveFileToLocalFolder(blob, 'files', blob.type);
    }).catch(function(error) {
        console.error('Error:', error);
    });
});