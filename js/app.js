// variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//eventListeners
eventListeners();
function eventListeners(){
     formulario.addEventListener('submit', agregarTweet);

     // cuando el documento esta listo
     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse(localStorage.getItem('tweets')) || [];

          insertarHTML();
     });


};



//funciones 

function agregarTweet(e){
     e.preventDefault();

     // almacenando el tweet, para enviarlo
     const tweet = formulario.children[1].value;

     // validacion
     if(tweet === ''){
          mostrarError('Un mensaje no puede ir vacio');

          return; //evita que se ejecuten mas lineas de codigo
     }

     // creando el objeto para almacenarlo en el arreglo
     const tweetObj = {
          id: Date.now(),
          tweet
     }

     
     
     // añadir al arreglo de los tweets
     tweets = [...tweets, tweetObj]; 
     
     //crear el HTML
     insertarHTML();

     formulario.reset();
}

function mostrarError(mensaje) {
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('error')

     //insertar en el contenido
     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeError);

     // elimina la alerte despues de 3 segundos
     setTimeout(() => {
          mensajeError.remove();
     },3000)
}

//muestra el listado de los tweets
function insertarHTML(){
     limpiarHTML();

     if(tweets.length > 0){
          tweets.forEach( tweet =>{
               // creando el HTML
               const li = document.createElement('li');

               // agregar btn eliminar
               const btnEliminar = document.createElement('a');
               btnEliminar.classList.add('borrar-tweet');
               btnEliminar.innerText = 'X';

               // añadir la funcion de eliminar
               btnEliminar.onclick = () => {
                    borrarTweet(tweet.id);
               }

               
               // añadiendo el tweet al li
               li.innerHTML = tweet.tweet;
               
               //asignar la X al html
               li.appendChild(btnEliminar);

               // insertando el HTML
               listaTweets.appendChild(li);
          });
     }

     sincronizarStorage();
}

// agrega los Tweets acutales a localStorage
function sincronizarStorage(){
     localStorage.setItem('tweets', JSON.stringify(tweets))
}

// borrar un tweet
function borrarTweet(id) {
     tweets = tweets.filter( tweet => tweet.id !== id);

     insertarHTML();
}

// limpia el HTML existente
function limpiarHTML(){
     while(listaTweets.firstChild){
          listaTweets.removeChild(listaTweets.firstChild);
     }
}