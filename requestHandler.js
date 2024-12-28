const {newFile} = require('./components/newFile')
const {readFile} = require('./components/readFile')
const {editFile} = require('./components/editFile')
const {deleteFile} = require('./components/deleteFile')

const requestHandler = (req, res) => {
    console.log("Req sent by client");

    console.log(req.url,  req.method);


    // home page
    if (req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>File Management System</title>
            </head>
            <body>
                <div class="flex justify-center mt-[40px]">
                    <h1 class="text-5xl font-bold text-red-400 tracking-[3px]">Welcome to File Management System</h1>
                </div>
                <ul class="flex items-center justify-evenly mt-[100px]">
                    <li><a href="/new" class="text-[20px] font-semibold tracking-[3px] text-[#171717] hover:text-[#b88d51]">Create New File</a></li>
                    <li><a href="/read" class="text-[20px] font-semibold tracking-[3px] text-[#171717] hover:text-[#b88d51]">Read Existing File</a></li>
                    <li><a href="/edit" class="text-[20px] font-semibold tracking-[3px] text-[#171717] hover:text-[#b88d51]">Edit Existing File</a></li>
                    <li><a href="/delete" class="text-[20px] font-semibold tracking-[3px] text-[#171717] hover:text-[#b88d51]">Delete a File</a></li>
                </ul>
            </body>
            </html>
        `)

        return res.end()
    }
    


    // create new file
    else if (req.url.toLowerCase() === '/new'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>File Management System</title>
            </head>
            <body>

                <div class="flex justify-center mt-[40px] flex-col items-center gap-[50px]">
                    <!-- heading -->
                    <h1 class="text-5xl font-bold text-red-400 tracking-[3px]">Create New File</h1>

                    <!-- form -->
                        <form action="/newFile" method="POST" class="flex flex-col gap-[14px]">
                            <label class="flex flex-row justify-center items-center gap-[10px]">
                                <span class="text-gray-700 text-[18px]">File Name:</span>
                                <input type="text" placeholder="Pokemon" name = "fileName" class = "block rounded border-[#010021] text-gray-700 text-[18px] border-gray-500 border-2">
                            </label>
                            
                            <span class="text-gray-700 text-[18px]">File Content:</span>
                            <textarea name="fileContent" placeholder="Enter the file content" rows="10" class = "mt-5 block text-[18px] p-[20px] w-full rounded border-gray-500 border-2" style = "width: 900px"></textarea>

                            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Create File
                            </button>
                        </form>

                        <button onclick = "window.location.href = '/'" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Go Back to Home
                            </button>
                    </div>
                </div>
            </body>
            </html>    
        `)

        return res.end();
    }

    else if(req.url === '/newFile' && req.method === 'POST'){
        return newFile(req, res);
    }


    // Reading a file
    else if (req.url.toLowerCase() == '/read'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>File Management System</title>
            </head>
            <body>

                <div class="flex justify-center mt-[40px] flex-col items-center gap-[50px]">
                    <!-- heading -->
                    <h1 class="text-5xl font-bold text-red-400 tracking-[3px]">Create New File</h1>

                    <!-- form -->
                        <form action="/read-file" method = "POST" class="flex flex-col gap-4">
                            <label class="flex flex-row justify-center items-center gap-[10px]">
                                <span class="text-gray-700 text-[18px]">File Name:</span>
                                <input type="text" placeholder="Pokemon" name = "fileName" class = "block rounded border-[#010021] text-gray-700 text-[18px] border-gray-500 border-2">
                            </label>
                    

                            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Open File
                            </button>
                            
                        </form>
                        
                        <button onclick = "window.location.href = '/'" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Go Back to Home
                            </button>
                        
                    </div>
                </div>
            </body>
            </html>    
        `)

        return res.end();
    }

    else if (req.url === '/read-file' && req.method === 'POST'){
        return readFile(req, res);
    }
    
    // Edit file
    else if (req.url.toLowerCase() == '/edit'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>File Management System</title>
            </head>
            <body>

                <div class="flex justify-center mt-[40px] flex-col items-center gap-[50px]">
                    <!-- heading -->
                    <h1 class="text-5xl font-bold text-red-400 tracking-[3px]">Create New File</h1>

                    <!-- form -->
                        <form action="/edit-file" method = "POST" class="flex flex-col gap-4">
                            <label class="flex flex-row justify-center items-center gap-[10px]">
                                <span class="text-gray-700 text-[18px]">File Name:</span>
                                <input type="text" placeholder="Pokemon" name = "fileName" class = "block rounded border-[#010021] text-gray-700 text-[18px] border-gray-500 border-2">
                            </label>
                    

                            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Open File
                            </button>
                        </form>

                        <button onclick = "window.location.href = '/'" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Go Back to Home
                            </button>
                    </div>
                </div>
            </body>
            </html>    
        `)

        return res.end();
    }

    else if (req.url === '/edit-file' && req.method === 'POST'){
        return editFile(req, res);
    }
    
    else if (req.url === '/save' && req.method === 'POST'){
        return newFile(req, res);
    }

    else if (req.url.toLowerCase() === '/delete'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>File Management System</title>
            </head>
            <body>

                <div class="flex justify-center mt-[40px] flex-col items-center gap-[50px]">
                    <!-- heading -->
                    <h1 class="text-5xl font-bold text-red-400 tracking-[3px]">Create New File</h1>

                    <!-- form -->
                        <form action="/delete-file" method = "POST" class="flex flex-col gap-4">
                            <label class="flex flex-row justify-center items-center gap-[10px]">
                                <span class="text-gray-700 text-[18px]">File Name:</span>
                                <input type="text" placeholder="Pokemon" name = "fileName" class = "block rounded border-[#010021] text-gray-700 text-[18px] border-gray-500 border-2">
                            </label>
                    

                            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                Delete File
                            </button>
                        </form>
                    </div>
                </div>
            </body>
            </html>    
        `)

        return res.end();
    }

    else if (req.url === '/delete-file' && req.method === 'POST'){
        return deleteFile(req, res);
    }










    // Page not found
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
        <head>
        <title>File Management System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 text-center h-screen flex flex-col items-center justify-center">
            <h1 class="text-7xl font-bold text-red-400">404 Page not found</h1>
            <p class="text-gray-600 mt-4">The page you're looking for does not exist.</p>
        </body>
        </html>    
    `)

    
}

exports.requestHandler = requestHandler;