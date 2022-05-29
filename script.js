//CONTADOR TAREAS

let contador = 0;



//FECHA

(function(){
    var actualizarFecha = function(){
        var fecha = new Date(),
        diaSemana = fecha.getDay(),
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        anio = fecha.getFullYear();

        console.log(fecha);

        

    var setDia = document.getElementById("dia"),
        setNumDia = document.getElementById("numDia"),
        setMes = document.getElementById("mes"),
        setAnio = document.getElementById("año");

    var diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "jueves", "Viernes"];
    setDia.textContent = diasSemana[diaSemana];
    setNumDia.textContent = dia;

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    setMes.textContent = meses[mes];

    setAnio.textContent = anio;
    
    };

   
    actualizarFecha();
}()) 


//VENTANA MODAL
var ventana_tarea = document.getElementById("ventana_tareas");


function mostrar(){
    ventana_tarea.style.display = "flex";
}

//CAPTURA DEL EVENTO    
  
document.getElementById("form_tareas").addEventListener("submit", agregarTarea);

function agregarTarea(e){   //(e) así capturo el evento
    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;
        
     
    //creacion de un objeto para luego almacenar la info
    const tarea = {    
        titulo,         //es lo mismo que escribir title: title  o tarea: tarea, forma abreviada
        descripcion     //descripcion: descripcion
    };

    // GUARDO LAS TAREAS EN LOCAL_STORAGE

    //local storage nos permite almacenar datos dentro de la memoria del navegador
    // y para que los datos sean almacenados como strin usamos JSON.stringify:


    //localStorage.setItem("tarea", JSON.stringify(tarea));

    //para obtener el dato que acabamosde almacenar:

    //localStorage.getItem("tarea");


        if (localStorage.getItem('tareas')===null){   //si en localStorage hay un valor llamado tareas y es null, vamos a crear tareas
            let tareas =[];                             //creamos un arreglo que iremos llenando
            tareas.push(tarea);                        
            localStorage.setItem('tareas', JSON.stringify(tareas));    //almacenamos las tareas, en caso e que no exista ninguna
            

        } else {
            let tareas = JSON.parse(localStorage.getItem("tareas"));  //si ya existen tareas previas, las obtenemos y las almacenamos en una variable
            tareas.push(tarea);                                      //actualizamos, agregando las tareas nuevas
            localStorage.setItem("tareas", JSON.stringify(tareas));   //volvemos a almacenar (también convertimos las tareas en string)
        
        }

    mostrarTareas();

    document.getElementById("form_tareas").reset();  //resetea el form, para que quede limpio para la siguiente tarea

    //para prevenir el comportamiento por defecto del form
    //(porq no necesitamos que envíe nada a ningun servidor, voy a trabajar local-la pag no se refresca-)
    e.preventDefault();

    ventana_tarea.style.display = "none";
}

function mostrarTareas(){
    let tareas =JSON.parse(localStorage.getItem("tareas"));
    let panel = document.getElementById("panelTareas");

    panel.innerHTML = "";

    for(let i = 0; i < tareas.length; i++){
        let titulo = tareas[i].titulo;
        let descripcion = tareas[i].descripcion;

        panel.innerHTML += `<div class="mr-auto">
            <div class = "estiloNota p-2 ">
                <p id="tituloP">${titulo}</p>
                <p id=descripcionP>${descripcion}</p>
                <div id="contenedor_btn">
                <a class="boton_e btn btn-light btn-rounded" onclick="eliminarTarea('${titulo}')">
                Eliminar
                </a>
                </div>
            </div>
        </div>`
        
    }
    
    let tareasPendientes = document.getElementById("pPendientes")
    tareasPendientes.textContent = "Tareas Pendientes: " + tareas.length;
}

function eliminarTarea(titulo){
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    for (let i=0; i<tareas.length; i++){
        if(tareas[i].titulo == titulo){
            tareas.splice(i, 1);   //indico dónde elininar y cuántos elementos
            
        }
    }
    
    localStorage.setItem("tareas", JSON.stringify(tareas));  //luego de quetar el elemento, volvemos a almacenar las tareas sin ese elemnto
    mostrarTareas();
}


mostrarTareas();


  




