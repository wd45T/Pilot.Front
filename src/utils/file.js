export function openSaveDialog(fileData, fileName) {
    if (!fileData || !fileName) return;

    if(window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(fileData, fileName);
        return;
    }
    
    const url = URL.createObjectURL(fileData);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    document.body.appendChild(link);
    
    link.click();
    link.remove();
}