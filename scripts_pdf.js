
async function mergeAllPDFs() {

  var selectedFile = document.getElementById("inputFile").files;
  const pdfDoc = await PDFLib.PDFDocument.create();
  const numDocs = 2;
  
  for(var i = 0; i < numDocs; i++) {
    let reader = await readFileAsync(selectedFile[i]);
    
      const donorPdfDoc = await PDFLib.PDFDocument.load(reader);
      const docLength = donorPdfDoc.getPageCount();
      for(var k = 0; k < docLength; k++) {
          const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
          //console.log("Doc " + i+ ", page " + k);
          pdfDoc.addPage(donorPage);
      }
  }

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
 

  // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
 // var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',')+1);
  downloadURI(pdfDataUri, "output.pdf");
}


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }
  function downloadFunction() {
    //"data:text/html para text
    var conteudo = "data:application/pdf;base64,"+document.getElementById('inputDecode').value;
   var nomeArquivo = document.getElementById('fname').value+".pdf";
  downloadURI(conteudo, nomeArquivo);
  
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
       let reader = new FileReader(); 
       reader.onload = () => {
          resolve(reader.result);
       }; 
       reader.onerror = reject; 
       reader.readAsArrayBuffer(file);
    })
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
          //console.log(base64);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
  }
}