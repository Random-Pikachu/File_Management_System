const fs = require('fs')
const path = require('path')


const readFile = (req, res) => {
    body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    })

    req.on('end', () =>{
        const fullBody = Buffer.concat(body).toString();
        console.log("2. Full Body", fullBody);
        const params = new URLSearchParams(fullBody);
        console.log("3. Params", params);
        const jsonBody = Object.fromEntries(params);
        console.log("4. jsonBody", jsonBody);

        const dirPath = path.join(__dirname, '../Files');
        console.log("5. Dir Path: ", dirPath);
        const filePath = path.join(`${dirPath}`, `${jsonBody.fileName}.txt`);
        console.log("6. File Path: ", filePath);

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
                    const formattedData = data.replace(/\n/g, '<br>');
                    res.setHeader('Content-Type', 'text/html');
                    res.write(`
                        <html>
                        <head>
                        <title>${jsonBody.fileName}</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body class = "bg-gray-100">
                            <div class="bg-gray-100 text-center flex flex-col items-center justify-center mt-[100px]">
                                <h1 class="text-4xl font-bold text-red-400">${jsonBody.fileName}</h1>
                                <p class="text-gray-600 mt-4 text-[18px] max-w-[900px]">${formattedData}</p>
                                <button type="back" onclick = "window.location.href = '/read'" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mt-[28px]">
                                Go Back
                                </button>
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

exports.readFile = readFile;