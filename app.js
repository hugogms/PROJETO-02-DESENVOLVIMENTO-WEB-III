const http = require('http');
const url  = require('url');
const path = require('path');
const fs   = require('fs');

const publicDir = path.join(__dirname, 'public');

// Content-Types 
const contentTypes = {
    '.html':    'text/html; charset=utf-8',
    '.css':     'text/css; charset=utf-8',
    '.js':      'text/javascript; charset=utf-8',
    '.json':    'application/json; charset=utf-8',
    '.jpeg':    'image/jpeg',
    '.jpg':     'image/jpeg',
    '.png':     'image/png',
    '.pdf':     'application/pdf',
    '.mp4':     'video/mp4'
};

// Rotas 
const routes = {
    '/':            'index.html',
    '/disciplina1': 'disciplina1.html',
    '/disciplina2': 'disciplina2.html',
    '/disciplina3': 'disciplina3.html',
    '/disciplina4': 'disciplina4.html',
    '/disciplina5': 'disciplina5.html',
    '/disciplina6': 'disciplina6.html',
    '/disciplina7': 'disciplina7.html'
};

// Função para ler arquivos
function readFile(response, file) {
    fs.stat(file, function(err, stats) {
        if (err || !stats.isFile()) {
            response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            return fs.createReadStream(path.join(publicDir, 'erro404.html')).pipe(response);
        }

        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'application/octet-stream';

        response.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size
        });

        fs.createReadStream(file).pipe(response);
    });
}

// Callback
var callback = function(request, response) {
    var pathname = decodeURIComponent(url.parse(request.url).pathname);

    
    if (routes[pathname]) {
        return readFile(response, path.join(publicDir, routes[pathname]));
    }

    var relativePath = pathname.startsWith('/public/') 
        ? pathname.replace('/public', '') 
        : pathname;

    var file = path.join(publicDir, relativePath);

    if (!file.startsWith(publicDir)) {
        return readFile(response, path.join(publicDir, 'erro404.html'));
    }

    readFile(response, file);
};

// Inicialização do servidor
var server = http.createServer(callback);
server.listen(3000, function() {
    console.log('Servidor iniciado em http://localhost:3000/ ....');
});