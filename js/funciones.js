
const formulario = document.querySelector("form");
const inputText = document.querySelector('form input[type="text"]');
const contenedorTareas = document.querySelector(".tareas");

//carga inicial de los datos
fetch("https://api-todo-b1za.onrender.com/tareas") //fetch de fábrica hace GET  - A nivel de proceso fetch nunca falla, siempre te va a dar una respuesta, sea buena o mala.
.then(respuesta => respuesta.json())
.then(tareas => {
    tareas.forEach(({id,tarea,estado}) => {
        new Tarea(id,tarea,estado,contenedorTareas);
    });
});

formulario.addEventListener("submit", evento => { //el evento del formulario siempre serán SUBMIT
    evento.preventDefault();

    if(inputText.value.trim() != ""){ //no puede estar vacía la entrada

        let tarea = inputText.value.trim();

        fetch("https://api-todo-b1za.onrender.com/tareas/nueva",{
            method : "POST",
            body : JSON.stringify({tarea}),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(({id, error}) => {
            if(!error){
                new Tarea(id,tarea,false,contenedorTareas);
                return inputText.value = "";
            }

        });
    }
});




