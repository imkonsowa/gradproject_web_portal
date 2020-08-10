const axios = require('axios');

let express = require('express'),
    http = require('http'),
    fs = require('fs');

let app = express();

let http_server = http.createServer(app);
// let http_server = https.createServer(options, app);
http_server.listen(4300, function () {
    console.log('listening on 127.0.0.1:4300');
});

let io = require('socket.io').listen(http_server);
// let redis = require('redis')
// let subscriber = new redis();
// let publisher = new redis();

io.sockets.on('connection', function (socket) {
    socket.join(socket.handshake.query.service)

    io.to(socket.handshake.query.service).emit('connected_successfully', {
        success: true
    })

    socket.on('process_snap', function (data) {
        io.to('ai').emit('process_snap', data)
    })

    socket.on('process_employee_cover', function (data) {
        io.to('ai').emit('process_employee_cover', data)
    })

    socket.on('employee_cover_processed', function (data) {
        axios.post(`http://gradproject.test/api/employee/${data.id}/features-array`, {
            features: data.features
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    })
});

