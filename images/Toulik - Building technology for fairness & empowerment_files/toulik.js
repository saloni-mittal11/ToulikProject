// https://github.com/kamranahmedse/jquery-toast-plugin/
$(document).ready(function () {
    var backendUrl = "http://5.189.168.220:8899";

    var fnBookPlace = function (event) {
        console.log(event);
        console.log("book a place");
        event.preventDefault();
        var fullName = $("#fullName").val();
        var userPhone = $("#userPhone").val();
        var noOfParticipant = $("#noOfParticipant").val();
        var userEmail = $("#userEmail").val();
        var aboutTopic = $("#aboutTopic").val();

        // if ((fullName === "" || fullName === null) ||
        //     (userPhone === "" || userPhone === null) ||
        //     (noOfParticipant === "" || noOfParticipant === null) ||
        //     (userEmail === "" || userEmail === null) ||
        //     (aboutTopic === "" || aboutTopic === null)) {
        //     return;
        // }
        console.log(fullName);
        console.log(userPhone);
        console.log(noOfParticipant);
        console.log(userEmail);
        console.log(aboutTopic);

        if ($('form').smkValidate()) {
            var oData = {
                fullname: fullName,
                email: userEmail,
                phone: "+91" + userPhone,
                message: aboutTopic,
                vehicle_count: Number(noOfParticipant)
            };

            // sent data to backend
            $.ajax({
                url: backendUrl + "/contactform",
                contentType: "application/json",
                method: "POST",
                async: true,
                crossDomain: true,
                data: JSON.stringify(oData),
                success: function (response) {
                    console.log(response);
                    $.toast({
                        heading: 'Success',
                        text: 'Thanks for contacting us. We will get back to you soon.',
                        icon: 'info',
                        loader: true,
                        bgColor: '#584FFE',      // Change it to false to disable loader
                        loaderBg: '#FFFFFF' // To change the background
                    });
                },
                error: function (error) {
                    console.log(error);
                    $.toast({
                        heading: 'Error',
                        text: 'Something went wrong. Please check your details again.',
                        icon: 'error'  // To change the background
                    });
                }
            });
        }


    }

    var fnJoinUs = function (event) {
        var type = $(event.currentTarget).data('type');

        var userNameEmail = type === 1 ? $("#userNameEmail").val() : $("#userNameEmail2").val();
        if (userNameEmail === "" || userNameEmail === null) {
            if (type === 1) {
                $('#userNameEmail').parent().addClass("has-error");
                $('.phone-error').removeClass('hide').addClass('show');
            } else {
                $('#userNameEmail2').parent().addClass("has-error");
                $('.phone-error').removeClass('hide').addClass('show');
            }
            return;
        } else {
            if (type === 1) {
                $('#userNameEmail').parent().removeClass("has-error");
                $('.phone-error').removeClass('show').addClass('hide');
            } else {
                $('#userNameEmail2').parent().removeClass("has-error");
                $('.phone-error').removeClass('show').addClass('hide');
            }

        }

        console.log(userNameEmail);
        var oData = {
            "contact": userNameEmail,
            "is_phone": userNameEmail && userNameEmail.indexOf("@") === -1
        };


        $.ajax({
            url: backendUrl + "/justcontact",
            contentType: "application/json",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: JSON.stringify(oData),
            success: function (response) {
                console.log(response);
                $.toast({
                    heading: 'Success',
                    text: 'Thanks for contacting us. We will get back to you soon.',
                    icon: 'info',
                    bgColor: '#584FFE',      // Change it to false to disable loader
                    loaderBg: '#FFFFFF'  // To change the background
                });
                $('#userNameEmail2').val('');
                $("#userNameEmail").val('');
            },
            error: function (error) {
                console.log(error);
                $.toast({
                    heading: 'Error',
                    text: 'Something went wrong. Please check your details again.',
                    icon: 'error' // To change the background
                });
            }
        });
    };

    $('#btnBookPlace').click(fnBookPlace);
    $('#joinUs').click(fnJoinUs);
    $('#joinUs2').click(fnJoinUs);

    function gaSSDSLoad(acct) {
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."),
            pageTracker,
            s;
        s = document.createElement('script');
        s.src = gaJsHost + 'google-analytics.com/ga.js';
        s.type = 'text/javascript';
        s.onloadDone = false;
        function init() {
            pageTracker = _gat._getTracker(acct);
            pageTracker._trackPageview();
        }
        s.onload = function () {
            s.onloadDone = true;
            init();
        };
        s.onreadystatechange = function () {
            if (('loaded' === s.readyState || 'complete' === s.readyState) && !s.onloadDone) {
                s.onloadDone = true;
                init();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    gaSSDSLoad("UA-133971978-1");
});
