const electron = window.require("electron");
const path = window.require('path');
const fs = window.require('fs');
const { remote } = electron;
const dialog = remote.dialog;

export const saveFile = (dataToSave: any) => {
      // Resolves to a Promise<Object>
      dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '../assets/exported.csv'),
        // defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Save',
        // Restricting the user to only Text Files.
        filters: [
            {
                name: 'Text Files',
                extensions: ['csv']
            }, ],
        properties: []
    }).then((file: any) => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
            console.log(file.filePath.toString());
            // Creating and Writing to the sample.txt file
            fs.writeFile(file.filePath.toString(),
            dataToSave, function (err: any) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }).catch((err: any) => {
        console.log(err)
    });
}