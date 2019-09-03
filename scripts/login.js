account = {
    login: function(user, password){
        try{
            if(!user && !password){
                // validation 
                $alms.popup.error("ID or Password input error");
                return;
            }

            var data = {
                "user": user,
                "password": password
            };

            $.ajax({
                type: 'POST',
                url: "https://localhost:5001/api/Sign/in",
                async: true,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                beforeSend: function(){
                    $.alms.block();
                },
                success: function(data, status, xhr){
                    // console.log("apiData:", data, status, xhr);
                    sessionStorage.setItem('token', data.Data.token);
                    window.location.href = "/_sinopac_root/_ALMS/ALMSWeb/views/menu.html";
                },
                error: function(jqXhr, textStatus, errorMessage){
                    $.alms.popup.error("Login Fail: " + errorMessage);
                    // console.log("apiFail:", jqXhr, textStatus, errorMessage);
                },
                complete: function(){
                    $.alms.unblock();
                }
            });
        }catch(err){
            $.alms.unblock();
            $.alms.popup.error("Login Fail: " + err);
            // console.log("apiErr:", err);
        }
    }
}