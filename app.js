// const $btn=document.getElementById("btn");
const $lista=document.getElementById("lista-tareas");
const $form=document.getElementById("formulario");
const $template=document.getElementById("template").content;
const fragment=document.createDocumentFragment();
let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

$lista.addEventListener('click', (e) => {btnAccion(e)})

$form.addEventListener("submit",e=>{
    e.preventDefault()
    // console.log(e.target[0].value)
    setTarea(e)
})

const setTarea=e=>{
    const texto=e.target[0].value;

    if(texto.trim()===""){
        console.log("vacio")
        return
    }

    const tarea={
        id:Date.now(),
        texto:texto,
        estado:false
    }
    tareas[tarea.id]=tarea;
    pintarTareas()

    $form.reset();
    e.target[0].focus();
    console.log(tareas)
}

const pintarTareas=()=>{
    localStorage.setItem("tareas",JSON.stringify(tareas))

    if(Object.values(tareas).length===0){
        $lista.innerHTML=`
        <div class="alert alert-dark text-center">
            Sin tareas pendientes 😁
        </div>
        `;
        return
    }

    $lista.innerHTML="";
    Object.values(tareas).forEach(tarea => {
        const clone = $template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    $lista.appendChild(fragment)

}
const btnAccion = e => {
    // console.log(e.target.classList.contains('fa-check-circle'))
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        // console.log(e.target.dataset.id)
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }

    e.stopPropagation()
}