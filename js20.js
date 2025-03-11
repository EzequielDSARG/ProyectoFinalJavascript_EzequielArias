







/*Array contenedor de los subtotales*/
const productosA = [

  {
    id: 1,
    nombre: "El arte de la guerra",
    autor: "Sun Tzu",
    precio: 10
  },
  {
    id: 2,
    nombre: "Sobre la guerra",
    autor: "Clausewitz",
    precio: 15
  },
  {
    id: 3,
    nombre: "La guerra total",
    autor: "Keegan",
    precio: 20
  }

]


/*LOCAL STORAGE*/

// Convertir el objeto usuario a una cadena JSON para almacenamiento
localStorage.setItem('productosA', JSON.stringify(productosA));

// Recuperar el objeto usuario de localStorage y convertirlo de nuevo a un objeto JavaScript
const productos = JSON.parse(localStorage.getItem('productosA'));
//console.log(productos);






const carrito = [];
const containerCards = document.getElementById("containerCards");
const carritoLista = document.getElementById("carritoLista");
const carritoSuma = document.getElementById("carritoSuma");
document.getElementById("carritoSuma")


function agregarProductos() {

  productos.forEach(producto => {

    const card = document.createElement("article"); // createElement crea etiquetas
    card.classList.add("card"); // la propiedad classlist sumado con el metodo add nos permite crear clases`

    card.innerHTML = `              
                    
                    <br>
                    <h3>producto: ${producto.nombre}</h3>
                    <p>${producto.autor}</p>
                    <p>precio: ${producto.precio}</p>
                    
                    <button onclick = "agregarAlCarrito(${producto.id})">comprar</button>
                    
                    `

    containerCards.appendChild(card)
  })
}
//<button onclick = "agregarAlCarrito(${producto.id})">comprar</button>






// AGREGAR AL CARRO
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id)
  carrito.push(producto)

  mostrarCarrito()
  eliminarDelCarrito(index)
  
}



// ELIMINAR DEL CARRITO
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito()
  
}


// MOSTRAR EL CARRITO
function mostrarCarrito() {
 

  //AGREGO LA SUMA    28/2 salio bien la suma en el console.log
  const totalPrecio = carrito.reduce((acumulador, producto2) => acumulador + producto2.precio, 0);
  console.log("El precio total es:", totalPrecio);
  document.getElementById("carritoSuma").innerHTML = "La suma total es: " + totalPrecio;
  //////


  carritoLista.innerHTML = "";
  carrito.forEach((producto, index) => {
  const item = document.createElement("li");
  
  item.innerHTML =
                     `              
                    ${producto.nombre}= ${producto.precio}
                                        
                     <button onclick = "eliminarDelCarrito(${index})">X</button>
                     
                     `
  carritoLista.appendChild(item)
    
  })
  
}



agregarProductos()

////////////////////////////////////





////////////////////////////////////
window.addEventListener('load', () => {
  let lon
  let lat

  let ubicacion = document.getElementById('ubicacion')
  let temperaturaValor = document.getElementById('temperatura-valor')


  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(posicion => {
          //console.log(posicion.coords.latitude)
          lon = posicion.coords.longitude
          lat = posicion.coords.latitude


          //Ubicación por ciudad
          //const url = `https://api.openweathermap.org/data/2.5/weather?q=Campana,AR&appid=f3c2cb8b104c918df94d3eb03678fa29`
          const url = `http://api.openweathermap.org/geo/1.0/direct?q=Campana,AR&limit={limit}&appid=f3c2cb8b104c918df94d3eb03678fa29`
          console.log(url)
       

          async function getData() {

              try {

                  const response = await fetch(url);

                  const data = await response.json()

                  let temp = Math.round(data.main.temp)         //  CODIGO NUEVO
                  temperaturaValor.textContent = `${temp} °C`
                  ubicacion.textContent = data.name


                  console.log("datos recibidos", data)

              }

              catch (error) {

                  console.error("hay un error revisar", error);
              }

          }
          getData()

      }) }
})



 document.getElementById("ConfirmarCompra").addEventListener("click", () => {
       
    
       Swal.fire({
         title: "Confirmaste la compra!",
         icon: "success",
         draggable: true

       })

           
       })

/*
  No se como agregarle un ID a los botones cuando se hacen dentro de un innerHTML


  document.getElementById("${producto.id").addEventListener("click", () => {

       Toastify ({
         text: "Great !!",
         duration: 2000,
         gravity:"bottom",
         position:"left",
         background: "red"

       }).showToast();
      })
*/


