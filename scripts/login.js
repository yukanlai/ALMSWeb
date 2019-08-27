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
                url: "https://localhost:5001/api/Sign/in",
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                beforeSend: function(){},
                success: function(data, status, xhr){
                    console.log("apiData:", data, status, xhr);
                },
                fail: function(jqXhr, textStatus, errorMessage){
                    console.log("apiFail:", jqXhr, textStatus, errorMessage);
                }
            });
        }
        catch(err){
            console.log("apiErr:", err);
        }
    }
}