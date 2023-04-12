function dividir() {
  const fileInput = document.getElementById("csv-file");
  const numFilesInput = document.getElementById("num-files");
  const headerCheckbox = document.getElementById("header-checkbox");

  const file = fileInput.files[0];
  const numFiles = numFilesInput.value;
  const includeHeader = headerCheckbox.checked;

  if (!file || !numFiles) {
    alert("Selecione o arquivo CSV e a quantidade de arquivos para dividir.");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function() {
    const csv = reader.result;
    const linhas = csv.split("\n");
    const header = includeHeader ? linhas.shift() + "\n" : "";

    const numLinhasPorArquivo = Math.ceil(linhas.length / numFiles);

    const zip = new JSZip();

    for (let i = 0; i < numFiles; i++) {
      const nomeArquivo = `${file.name.slice(0,-4)}-parte-${i+1}.csv`;
      let conteudo = header;

      for (let j = i*numLinhasPorArquivo; j < (i+1)*numLinhasPorArquivo && j < linhas.length; j++) {
        conteudo += linhas[j] + "\n";
      }

      zip.file(nomeArquivo, conteudo);
    }

    zip.generateAsync({type:"blob"})
    .then(function(blob) {
      const nomeArquivoZip = `${file.name.slice(0,-4)}-partes.zip`;

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, nomeArquivoZip);
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", nomeArquivoZip);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  };
}
