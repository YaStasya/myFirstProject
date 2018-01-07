jQuery(function($){
    //--------------- Валидация ---------------//
        var Validation = {
            init: function(massForm , obj){
                var status = true;
                for(var key in massForm){
                   // console.log(key)
                    switch(key) {
                        case "phone":
                            if(!this.validatePhone(massForm[key])){
                                obj.phone = 1;
                            }
                            break;
                        case "email":
                            if(!this.validateEmail(massForm[key])){
                                obj.email = 1;
                            }
                            break;
                        default:
                            if(!this.validateAll(massForm[key])){
                                //keyNew =  key.substr(5, key.length - 6);
                                obj[key] = 1;
                            }
                    }
                }
                var leng = 0;
                for (var s in obj) {
                    leng++;
                }
                if(leng > 0){
                    return false;
                } else {
                    return true;
                }
            },
            validateEmail : function(val){
                var r = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(val);
               // console.log( val + '-' + r)
                if (r == false ||  r == '') {
                    return false;
                } else {
                    return true;
                }
             },
            validatePhone: function(val){
                check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(val);
               // console.log( val + '-' + check)
                if(check == false || check == ''){
                    return false;
                } else {
                    return true;
                }
            },
            validateAll: function(val){
                if(val == ''){
                    return false;
                } else {
                    return true;
                }
            }
        }


    //---------------Нужнфе функции---------------//
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }


    /*---------------- Основные функции ------------------*/
    $(document).ready(function(){

        /*---------------- Форма заявки ------------------*/
        $('.callClientForm').click(function(){
            $('.clientForm ').html('<div class="preloader"><img src="/images/Loader.gif"</div>')
            var url= $(this).attr('href');
            $.get(url, function(data){
               setTimeout(function(){
                $('.clientForm ').html($(data).html());
                   $('#calbackFormOrder input[name="date"]').datepicker({
                       dayNames        : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
                       dayNamesMin      : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
                       closeText		    : 'Готово',
                       currentText		  : 'Сегодня' ,
                       duration		    : '',
                       monthNames		  : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                       monthNamesShort : ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'],
                       yearRange		    : "-6:+6",
                       dateFormat		  : 'dd.mm.yy',
                       minDate         : new Date(),
                       firstDay		    : 1
                   });
                   $('#calbackFormOrder #agreConf').click(function(){
                           if ($(this).hasClass("active")){
                               $('#calbackFormOrder .blueButton').attr('disabled', true);
                               $('label[for="agreConf"]').after('<p class="redSapnConfirm">Это поле обязательно для заполнения</p>');
                               $(this).removeClass("active")
                           } else {
                               $('#calbackFormOrder .blueButton').attr('disabled', false);
                               $('.redSapnConfirm').remove();
                               $(this).addClass("active");
                           }
                   })

                    $('#calbackFormOrder input[type="button"]').click(function() {
                        $('#calbackFormOrder .entry').removeClass('redError');
                        $('.redMes').remove();
                        var formData = {};
                        var url= $(this).parents('form').attr('action');
                        $('#calbackFormOrder').serializeArray().map(function(x){formData[x.name] = x.value;});
                        var objError = {};
                       // console.log('1111' + Validation.init(formData, objError))
                        if(Validation.init(formData, objError)){
                           // console.log(121221)
                            $.ajax({
                                 type: 'POST',
                                 url: url,
                                 data: formData,
                                 success: function(data) {
                                     $('.clientForm ').html('<h4>Спасибо большое.<br>Ваша запись добавлена.</h4>')

                             },
                             error:  function(xhr, str){
                                 alert('Произошла ошибка, попробуйте отправить форму повторно');
                             }
                         });
                        } else{
                           // console.log(objError)
                            for(var keyInp in objError ){
                                $('#calbackFormOrder [name="' + keyInp + '"').addClass('redError');
                               // $('#calbackFormOrder [name="' + keyInp + '"').after('<p class="redMes">Поле заполнено не верно.</p>')
                            }
                        }

                    return false;
                })
               }, 1000)
            })
            return false;
        })



        /*---------------- Клики по верхнему меню. Мобильное меню ------------------*/
        $('.header-bottom .nav a, .header-bottom .mobnav a').click(function(){
            $(this).parents('ul').find('a').removeClass('activeMenu');
            $(this).addClass('activeMenu');
            var title=$(this).attr('title');
            console.log(title)
            $('.slider_container').html('<div class="preloader"><img src="/images/Loader.gif"</div>')
            var url= $(this).attr('href');
            $.get(url, function(data){
               // console.log(data)
                setTimeout(function(){
                    history.pushState({urlPath:url}, title , url);
                    document.title = title;
                    $('.slider_container').html($(data).find('.slider_container_text').html())
                }, 1000);
            });
            return false;
        })

        $('.header-bottom .mobileLink').click(function(){
            $('.header-bottom .mobnav').toggle(1000)
        })



        /*---------------- Форма подписки ------------------*/

        $('#calbackForm2 input[type="button"]').click(function() {
            $('#calbackForm2 .entry').removeClass('redError');
            $('.redMes').remove();
            var formData = {};
            var url= $(this).parents('form').attr('action');
            $('#calbackForm2').serializeArray().map(function(x){formData[x.name] = x.value;});
            $('.subBlockClient h5').remove();
            var objError = {};
            if(Validation.init(formData, objError)){
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: formData,
                    success: function(data) {
                        /* На сервере надо сделать проверку на добавление в БД уже существующей записи */
                        $('#calbackForm2').before('<h5>Вы подписаны на рассылку</h5>');
                        },
                    error:  function(xhr, str){
                        alert('Произошла ошибка, попробуйте отправить форму повторно');
                    }
                });
            } else{
               // console.log(objError)
                for(var keyInp in objError ){
                    $('#calbackForm2 [name="' + keyInp + '"').addClass('redError');
                    // $('#calbackFormOrder [name="' + keyInp + '"').after('<p class="redMes">Поле заполнено не верно.</p>')
                }
            }

            return false;
        })


        /*---------------- Спецпредложения ------------------*/
        var getCookieNew = getCookie('showFansyNews');
        if(getCookieNew != 1 ){
            $('.fancyBlock').show();
            setCookie('showFansyNews', 1, 1);
            $('.fancyClose').click(function(){
                $('.fancyBlock').hide();
            })
        }

        //--------Мобильные новости-----------
        $('#news .moreShow').click(function(){
            if($(this).hasClass('active')){
                $(this).text('Показать еще');
                $(this).removeClass('active');
                $('#news .newsBlock .item:gt(1)').hide(1000)
            } else {
                $(this).text('Скрыть');
                $(this).addClass('active');
                $('#news .newsBlock .item:gt(1)').show(1000)
            }
            return false;
        })
    })

})