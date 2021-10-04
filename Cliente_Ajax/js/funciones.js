function consultar(){
    $.ajax({    
            url : 'https://g6c335b483ca254-gastosbd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/gastos/gastos',
        //  data : { id : 123 },
            type : 'GET',
            dataType : 'json',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada, '+xhr.status);
            },
            success : function(json) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>PRECIO<th>DESCRIPCION"
                total = 0;
                filas = ""
                for(i = 0;  i < json.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+json.items[i].id  
                   filas +="<td>"+json.items[i].nombre
                   filas +="<td>$"+json.items[i].valor
                   filas +="<td>"+json.items[i].descripcion
                   total += json.items[i].valor
                  
                }
                $("#resultado").append(tabla + filas+"<tr><th colspan='2'>TOTAL:<td>$"+total +"</center>")
                console.log(json)
            }
        });
}

 //fecha : $("#fecha").val(),
function guardar(){
    
$.ajax({    
    url : 'https://g6c335b483ca254-gastosbd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/gastos/gastos',
    data : { 
            nombre: $("#nombre").val(),
            valor: $("#valor").val(),
            fecha : "18/08/2021",
            descripcion: $("#desc").val(),
            nombre_usuario: $("#user").val() },
    type : 'POST',
    dataType: 'json',
    success : function(json, textStatus, xhr) {

    
    },
    error : function(xhr, status) {
       
        
    },
    complete : function(xhr, status) {
        alert('Petición realizada '+xhr.status);
        limpiarFormulario();
    }
});
}


function buscarPorID(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'https://g6c335b483ca254-gastosbd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/gastos/gastos/'+id.val(),
            dataType : 'json',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                tabla = "<center><table border='1'>"
                filas =""
                if(json.items.length > 0){
                    console.log(json)
                    $("#resultado").empty();
                    filas +="<tr><th> ID:<td>"+json.items[0].id  
                    filas +="<tr><th>NOMBRE:<td>"+json.items[0].nombre
                    filas +="<tr><th>FECHA:<td>"+json.items[0].fecha
                    filas +="<tr><th>VALOR:<td>$"+json.items[0].valor
                    filas +="<tr><th>DESCRIPCION:<td>"+json.items[0].descripcion
                    filas +="<tr><th>USUARIO:<td>"+json.items[0].nombre_usuario
                    $("#resultado").append(tabla + filas+"</center>")  
                }
                else{
                    alert("Gasto con ID "+id.val()+" no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada '+xhr.status);
            }
        });
    }
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;

}

function limpiarFormulario(){
    $("#nombre").val("");
    $("#valor").val("");
    $("#fecha").val("");
    $("#desc").val("");
    $("#user").val("");
}

function soloLectura(){
    $("#id").prop("readonly",false);
}

  /*
    $.ajax({
        url:"https://g6c335b483ca254-gastosbd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/gastos/gastos/",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        // obtener los elementos del json
        $('<h1/>').text(json.title).appendTo('body');
        $('<div class="content"/>')
            .html(json.html).appendTo('body');
        // mostrarlos por consola del navegado
            console.log(respuesta);
        }
    });    
    */   

