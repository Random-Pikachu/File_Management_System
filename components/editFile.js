const fs = require('fs')
const path = require('path')

const editFile = (req, res) =>{
    body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    })

    req.on('end', () =>{
        const fullBody = Buffer.concat(body).toString();
        const params = new URLSearchParams(fullBody);
        const jsonBody = Object.fromEntries(params);

        const dirPath = path.join(__dirname, '../Files');
        const filePath = path.join(`${dirPath}`, `${jsonBody.fileName}.txt`);

        if(!fs.existsSync(filePath)){
            console.log("File doesn't exists.");
            res.setHeader('Content-Type', 'text/html');
            res.write(`
                <html>
                <head>
                <title>File not Found</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <script>
                    setTimeout(() =>{
                        window.location.href = '/read';
                    }, 3000)
                </script>
                </head>
                <body class="bg-gray-100 text-center h-screen flex flex-col items-center justify-center">
                    <h1 class="text-7xl font-bold text-red-400">File Not Found</h1>
                    <p class="text-gray-600 mt-4">Redirecting to reading page in 3 seconds.</p>
                </body>
                </html>      
            `)
            return res.end();
        }

        else{
            fs.readFile(`${filePath}`, 'utf-8', (err, data) =>{
                if (err) {
                    console.log("Error reading file");
                    res.end()
                }
                else {
                    res.setHeader('Content-Type', 'text/html');
                    res.write(`
                        <html>
                        <head>
                        <title>${jsonBody.fileName}</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body class = "bg-gray-100">
                            <div class="bg-gray-100 text-center flex flex-col items-center justify-center mt-[100px]">
                            <h1 class="text-4xl font-bold text-red-400">Edit File: ${jsonBody.fileName}</h1>
                            <form action="/save" method="POST" class = "flex flex-col gap-[10px]">
                                <input type="hidden" name="fileName" value="${jsonBody.fileName}"> 
                                <textarea name = 'fileContent' class="text-gray-600 mt-4 text-[18px] min-w-[900px] p-[25px] border-rose-500 border-2 rounded" rows = '18' style = "width: 800px;">${data}</textarea>
                                    <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                        Save File
                                    </button>
                                </form>
                            </div>
                        </body>
                        </html>      
                    `)
                    return res.end();
                }

            })
        }
    })
}

exports.editFile = editFile;