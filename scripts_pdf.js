
async function mergeAllPDFs() {

  var selectedFile = document.getElementById("inputFile").files;
  const pdfDoc = await PDFLib.PDFDocument.create();
  const numDocs = 2;
  
  for(var i = 0; i < numDocs; i++) {
 
    
 
      const file = selectedFile[0]
      let reader = new FileReader();
    
    
          let arrayBuffer = new Uint8Array(reader.result);
   
      
    
      reader.readAsArrayBuffer(file);
    


      const donorPdfBytes = arrayBuffer;
      const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);
      const docLength = donorPdfDoc.getPageCount();
      for(var k = 0; k < docLength; k++) {
          const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
          //console.log("Doc " + i+ ", page " + k);
          pdfDoc.addPage(donorPage);
      }
  }

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  //console.log(pdfDataUri);

  // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
  var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',')+1);
}
function convertToBase64() {
  //Read File
  var selectedFile = document.getElementById("inputFile").files;
  //Check File is not Empty
  if (selectedFile.length > 0) {
      // Select the very first file from list
      var fileToLoad = selectedFile[0];
      // FileReader function for read the file.
      var fileReader = new FileReader();
      var base64;
      // Onload of file read the file content
      fileReader.onload = function(fileLoadedEvent) {
          base64 = fileLoadedEvent.target.result;
          // Print data in console
          console.log(base64);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
  }
}