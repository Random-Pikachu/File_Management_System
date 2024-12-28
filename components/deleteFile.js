const fs = require('fs')
const path = require('path')

const deleteFile = (req, res) =>{
    const body = [];

    req.on('data', (chunk) =>{
        console.log("Chunk coming")
        body.push(chunk);
    })

    req.on('end', () => {
        const fullBody = Buffer.concat(body).toString();
        console.log("2. Full Body coming", fullBody)
        const params = new URLSearchParams(fullBody);
        console.log("3. Params coming", params)
        const jsonBody = Object.fromEntries(params);
        console.log("4. Json Body coming", jsonBody)


        const dirPath = path.join(__dirname, '../Files');
        const filePath = path.join(dirPath, `${jsonBody.fileName}.txt`);
        fs.unlink(`${filePath}`, (err) => {
            if (err){
                console.log("Not able to delete file", err);
                res.setHeader('Content-Type', 'text/html');
                res.write(`
                    <html>
                    <head>
                    <title>Deletion Error</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                        setTimeout(() =>{
                            window.location.href = '/';
                        }, 3000)
                    </script>
                    </head>
                    <body class="bg-gray-100 text-center h-screen flex flex-col items-center justify-center">
                        <h1 class="text-7xl font-bold text-red-400">Not able to delete the file</h1>
                        <p class="text-gray-600 mt-4">Redirecting to homepage in 3 seconds.</p>
                    </body>
                    </html>      
                `)
                return res.end();
            }
            console.log("Deleted the file");
            res.statusCode = 200;
            console.log('File Saved Successfully');
            res.setHeader('Content-Type', 'text/html');
            res.write(`
                <html>
                <head>
                <title>File Saved</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <script>
                    setTimeout(() =>{
                        window.location.href = '/';
                    }, 3000)
                </script>
                </head>
                <body class="bg-gray-100 text-center h-screen flex flex-col items-center justify-center">
                    <h1 class="text-7xl font-bold text-red-400">File Deleted Successfully</h1>
                    <p class="text-gray-600 mt-4">Redirecting to homepage in 3 seconds.</p>
                </body>
                </html>      
            `)
            return res.end();
        })
    })
}

exports.deleteFile = deleteFile;