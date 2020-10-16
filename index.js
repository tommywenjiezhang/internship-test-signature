$(document).ready(() => {
    $(".dropdown-menu").children('.dropdown-item').each( function() {
       $(this).click(()=> {
            itemName = $(this).text()
            $(".dropdown-toggle").text(itemName)
            $('.container p').css('color', itemName.toLowerCase())
        })
    
        const canvas = document.getElementById("signature_canvas")
        const signaturePad = new SignaturePad(canvas);
   
   
        $("#clear_signature").click(()=>{
            signaturePad.clear();
        })

        $("#save_change").click(()=>{
            url = signaturePad.toDataURL()
            console.log(url)
        })

    $("#covid_form").submit(function(event){
        event.preventDefault()
        let retypeName = $('input[name=retype]').val()
        let dropdownColor = $('.dropdown-toggle').text()
        const defaultColor = ['Red', ' Blue', 'Green']
    
        if (defaultColor.indexOf(dropdownColor) == -1){
            $('#dropdown_alert').text("You have to select a dropdown")
            $('#dropdown_alert').show()
        }
        if (retypeName.length <= 0){
            $("#retype_name_alert").text("You have to type your name")
            $("#retype_name_alert").show()
        }
        if(signaturePad.isEmpty()){
            $("#signature_alert").text("You have to provide signature")
            $("#signature_alert").show()
        }
        else{
            $('#dropdown_alert').hide()
            $("#retype_name_alert").hide()
            $("#signature_alert").hide()

            var fd_Name_Color = new FormData()
            fd_Name_Color.append('name', retypeName)
            fd_Name_Color.append('color', dropdownColor)
            $.ajax({
                type: "POST",
                url:  "https://www.quixi.com/internship-form",
                data: fd_Name_Color,
                success: function(response){
                    if(response != 0){
                       console.log(response)
                    }else{
                       alert('request not successful');
                    }
                 }
            })

            var fd_signature = new FormData()
            fd_signature.append('image_data',signaturePad.toDataURL())
            $.ajax({
                type: "POST",
                url:  "https://www.quixi.com/signature_data",
                data: fd_signature,
                success: function(response){
                    if(response != 0){
                       console.log(response)
                    }else{
                       alert('signature not uploaded');
                    }
                 }
            }) 

        }

    })

    })
    

})