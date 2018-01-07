var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2");

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/clientForm', function(req,res){
    res.sendfile(__dirname + '/public/clientForm.html');
});
app.get('/our_command', function(req,res){
    res.sendfile(__dirname + '/public/ourCommand.html');
});
app.get('/our_services', function(req,res){
    res.sendfile(__dirname + '/public/ourServices.html');
});
app.get('/guarantee', function(req,res){
    res.sendfile(__dirname + '/public/guarantee.html');
});
app.get('/contacts', function(req,res){
    res.sendfile(__dirname + '/public/contacts.html');
});

// ---------------- Стили и скрипты --------------//
app.get('/stylesheets/style.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/style.css');
});
app.get('/stylesheets/font-awesome.min.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/font-awesome.min.css');
});
app.get('/stylesheets/jquery-ui.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/jquery-ui.css');
});
app.get('/javascripts/jquery-3.2.1.min.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/jquery-3.2.1.min.js');
});
app.get('/javascripts/jquery.history.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/jquery-3.2.1.min.js');
});
app.get('/javascripts/main.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/main.js');
});
app.get('/javascripts/jquery-ui.min.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/jquery-ui.min.js');
});


// ---------------- Картинки --------------//
app.get('/images/brand.png', function(req,res){
    res.sendfile(__dirname + '/public/images/brand.png');
});
app.get('/images/bg-image-1.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/bg-image-1.jpg');
});
app.get('/images/director.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/director.jpg');
});
app.get('/images/manager.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/manager.jpg');
});
app.get('/images/avtomoyshik.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/avtomoyshik.jpg');
});
app.get('/images/avtoelektrik.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/avtoelektrik.jpg');
});
app.get('/images/1412467531_professii_avtomehani.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/1412467531_professii_avtomehani.jpg');
});
app.get('/images/27822548.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/27822548.jpg');
});
app.get('/images/16112016-06.jpg', function(req,res){
    res.sendfile(__dirname + '/public/images/16112016-06.jpg');
});
app.get('/images/Loader.gif', function(req,res){
    res.sendfile(__dirname + '/public/images/Loader.gif');
});
app.get('/images/ui-icons_444444_256x240.png', function(req,res){
    res.sendfile(__dirname + '/public/images/ui-icons_444444_256x240.png');
});
app.get('/images/ui-icons_555555_256x240.png', function(req,res){
    res.sendfile(__dirname + '/public/images/ui-icons_555555_256x240.png');
});
app.get('/images/281801.jpeg', function(req,res){
    res.sendfile(__dirname + '/public/images/281801.jpeg');
});



// ---------------- Шрифты --------------//

app.get('/font/fontawesome-webfont.eot', function(req,res){
    res.sendfile(__dirname + '/public/font/fontawesome-webfont.eot');
});
app.get('/font/fontawesome-webfont.svg', function(req,res){
    res.sendfile(__dirname + '/public/font/fontawesome-webfont.svg');
});
app.get('/font/fontawesome-webfont.ttf', function(req,res){
    res.sendfile(__dirname + '/public/font/fontawesome-webfont.ttf');
});
app.get('/font/fontawesome-webfont.woff', function(req,res){
    res.sendfile(__dirname + '/public/font/fontawesome-webfont.woff');
});
app.get('/font/fontawesome-webfont.woff2', function(req,res){
    res.sendfile(__dirname + '/public/font/fontawesome-webfont.woff2');
});



//---------------- Форма заявки ------------------//
// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.use('/clientFormSub', bodyParser.urlencoded({
    extended: true
}));

// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.post('/clientFormSub', function(req, res, next) {
    // Объект req.body содержит данные из переданной формы
    console.log(req.body);

    /* Здесь по идее должен быть код добавления записи в БД */

    smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'urredkitty@gmail.com',
            pass: 'kZcZvFcZ91'
        }
    });

        smtpTransport.sendMail({  //email options
        from: "Stasya <urredkitty@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: req.body.email, // receiver
        subject: "Запись в  атовсервис.", // subject
        html: '<table><tr><td colspan="2">Здравствуйте, ' + req.body.name + '. Вы записались к нам в автосервис.</td></tr><tr><td>Телефон</td><td>' + req.body.phone + '</td></tr><tr><td>Дата и время</td><td>' + req.body.date + ', ' + req.body.time + '</td></tr><tr><td>Марка машины</td><td>' + req.body.car + '</td></tr><tr><td colspan=\'2\'>Что случилось: <br>' + req.body.what + '</td></tr></tr></table>'
        }, function(error, response){  //callback
        if(error){
            console.log(error);
        }else{
            console.log("Сообщение отправлено...");
            res.send(req.body);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });

    return true;
});


//------------ Форма подписки-------------//
app.use('/subFrom', bodyParser.urlencoded({
    extended: true
}));

// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.post('/subFrom', function(req, res, next) {
    // Объект req.body содержит данные из переданной формы
    console.log(req.body);

    /* Здесь по идее должен быть код добавления записи в БД */

    smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'почта',
            pass: 'пароль'
        }
    });

    smtpTransport.sendMail({  //email options
        from: "Автосервис <почта>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: req.body.email, // receiver
        subject: "Подписка", // subject
        text: 'Вы подписаны на рассылку'
    }, function(error, response){  //callback
        if(error){
            console.log(error);
        }else{
            console.log("Сообщение отправлено...");
            res.send(req.body);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });

    return true;
});

//---------------- Запуск ------------------//
app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

module.exports = app;
