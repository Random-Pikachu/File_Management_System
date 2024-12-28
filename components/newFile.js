const fs = require('fs');
const path  = require('path');



const newFile = (req, res) =>{
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
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, {recursive: true});
        }

        console.log("5. Dir Checked", dirPath)
        const filePath = path.join(`${dirPath}`, `${jsonBody.fileName}.txt`);

        console.log("6. file Path made", filePath)

        fs.writeFile(`${filePath}`, `${jsonBody.fileContent}`, (err) =>{
            if (err){
                console.log("Error while writing the file", err);
                res.statusCode = 500; //Internal Server Error
                res.setHeader('Content-Type', 'text/html');
                res.write(`
                    <html>
                    <head>
                    <title>Saving Error</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                        setTimeout(() =>{
                            window.location.href = '/read';
                        }, 3000)
                    </script>
                    </head>
                    <body class="bg-gray-100 text-center h-screen flex flex-col items-center justify-center">
                        <h1 class="text-7xl font-bold text-red-400">Not able to save the file</h1>
                        <p class="text-gray-600 mt-4">Redirecting to homepage in 3 seconds.</p>
                    </body>
                    </html>      
                `)
                return res.end();
            }

            
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
                    <h1 class="text-7xl font-bold text-red-400">File Saved Successfully</h1>
                    <p class="text-gray-600 mt-4">Redirecting to homepage in 3 seconds.</p>
                </body>
                </html>      
            `)
            return res.end();           
        });

    });
}

exports.newFile = newFile;