const clickButton = document.getElementsByClassName('agregar')
const tbody=document.querySelector('.tbody')
let carrito = []

for (const agregar of clickButton){
    agregar.addEventListener('click', addCarrito)
}

function addCarrito(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle= item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    const newItem={
       title: itemTitle,
       precio: itemPrice,
       img: itemImg,
       cantidad: 1,
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){
    const alert= document.querySelector('.alert')
    setTimeout(function(){
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')
    

    const inputElemento =tbody.getElementsByClassName('input__elemento')
    for(let i=0; i<carrito.length; i++){
        if (carrito[i].title.trim() === newItem.title.trim()){
          carrito[i].cantidad ++;
          const inputValue = inputElemento[i]
          inputValue.value ++ 
          carritoTotal()
          return null;  
        }
    }

    carrito.push(newItem)

    renderCarrito()
}
function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item =>{
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const Content = `
        <th scope="row">1</th>
                        <td class="table__productos d-flex flex-column">
                            <img src=${item.img} alt="">
                            <h6 class="title mt-2">${item.title}</h6>
                        </td>
                        <td class="table__precio">
                            <p>${item.precio}</p>
                        </td>
                        <td class="table__cantidad">
                            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                            <button class="delete btn btn-danger">x</button>
                        </td>
        `
        tr.innerHTML = Content;
        tbody.appendChild(tr)

        tr.querySelector(".delete").addEventListener('click',removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let total=0;
    const itemCartTotal= document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = parseInt(item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    }
    )
   itemCartTotal.innerHTML = `Total $${total}` 
   addLocalStorage()
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i=0; i<carrito.length; i ++){
        if (carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    carritoTotal()
}
function sumaCantidad(e){
    const sumaInput = e.target;
    const tr = sumaInput. closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item =>{
        if(item.title.trim() ===title){
            sumaInput.value < 1 ? (sumaInput.value=1):sumaInput.value;
            item.cantidad = sumaInput.value
            carritoTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}


//reservas
//primer turno
//salon
const ids=[
    {m1:"Mesa1", m2:"Mesa2"},
    {m1:"Mesa3", m2:"Mesa4"},
    {m1:"Mesa5", m2:"Mesa6"},  
];

//vereda
const idsV=[
    {m1:"Mesa7", m2:"Mesa8"},]


//segundo turno
//salon
const idsNoche=[
    {m1:"Mesa1N", m2:"Mesa2N"},
    {m1:"Mesa3N", m2:"Mesa4N"},
    {m1:"Mesa5N", m2:"Mesa6N"},  
];
//vereda
const idsVNoche=[
    {m1:"Mesa7N", m2:"Mesa8N"},]


$(document).ready(function(){
    
//primer turno

    $("#mesitas1").prepend(`
    <h2 class="p-2 d-flex justify-content-center letra">Turno 20:00 - 22:00</h2>`)

    for (const id of ids){
        $("#mesitas1").append(`
            
            <div class="d-flex justify-content-center">
                <img src="../assets/img/mesa 4 verde.png" class="ancho" id="${id.m1}" alt="">
                <img src="../assets/img/mesa 4 roja.png" class="ancho oculta" id="${id.m1}R" alt="">
                <img src="../assets/img/mesa 4 verde.png" class="ancho" id="${id.m2}" alt="">
                <img src="../assets/img/mesa 4 roja.png" class="ancho oculta" id="${id.m2}R" alt="">
            </div>
            

            `)
            $(`#${id.m1}`).on('click',function(){
                $(`#${id.m1}`).toggle()
                $(`#${id.m1}R`).toggle()
            })
            $(`#${id.m1}R`).on('click',function(){
                $(`#${id.m1}`).toggle()
                $(`#${id.m1}R`).toggle()  
            })
            $(`#${id.m2}`).on('click',function(){
                $(`#${id.m2}`).toggle()
                $(`#${id.m2}R`).toggle()
                })
            $(`#${id.m2}R`).on('click',function(){
                $(`#${id.m2}`).toggle()
                $(`#${id.m2}R`).toggle()
            })
    }

for (const idV of idsV){
    $("#mesitas1").append(`
    
    <div class="d-flex justify-content-center">
    
        <img src="../assets/img/mesa 4 verde luna.png" class="ancho" id="${idV.m1}" alt="">
        <img src="../assets/img/mesa 4 roja luna.png" class="ancho oculta" id="${idV.m1}R" alt="">
        <img src="../assets/img/mesa 4 verde luna.png" class="ancho" id="${idV.m2}" alt="">
        <img src="../assets/img/mesa 4 roja luna.png" class="ancho oculta" id="${idV.m2}R" alt="">
    </div>`)

    $(`#${idV.m1}`).on('click',function(){
        $(`#${idV.m1}`).toggle()
        $(`#${idV.m1}R`).toggle()
    })
    $(`#${idV.m1}R`).on('click',function(){
        $(`#${idV.m1}`).toggle()
        $(`#${idV.m1}R`).toggle()  
    })
    $(`#${idV.m2}`).on('click',function(){
        $(`#${idV.m2}`).toggle()
        $(`#${idV.m2}R`).toggle()
        })
    $(`#${idV.m2}R`).on('click',function(){
        $(`#${idV.m2}`).toggle()
        $(`#${idV.m2}R`).toggle()
    })

  }
 
  //Segundo turno

  $("#mesitas2").prepend(`
    <h2 class="p-2 d-flex justify-content-center letra">Turno 22:00 - 00:00</h2>`)

    for (const idN of idsNoche){
        $("#mesitas2").append(`
            
            <div class="d-flex justify-content-center">
                <img src="../assets/img/mesa 4 verde.png" class="ancho" id="${idN.m1}" alt="">
                <img src="../assets/img/mesa 4 roja.png" class="ancho oculta" id="${idN.m1}R" alt="">
                <img src="../assets/img/mesa 4 verde.png" class="ancho" id="${idN.m2}" alt="">
                <img src="../assets/img/mesa 4 roja.png" class="ancho oculta" id="${idN.m2}R" alt="">
            </div>
            

            `)
            $(`#${idN.m1}`).on('click',function(){
                $(`#${idN.m1}`).toggle()
                $(`#${idN.m1}R`).toggle()
            })
            $(`#${idN.m1}R`).on('click',function(){
                $(`#${idN.m1}`).toggle()
                $(`#${idN.m1}R`).toggle()  
            })
            $(`#${idN.m2}`).on('click',function(){
                $(`#${idN.m2}`).toggle()
                $(`#${idN.m2}R`).toggle()
                })
            $(`#${idN.m2}R`).on('click',function(){
                $(`#${idN.m2}`).toggle()
                $(`#${idN.m2}R`).toggle()
            })
    }

for (const idVN of idsVNoche){
    $("#mesitas2").append(`
    
    <div class="d-flex justify-content-center">
        <img src="../assets/img/mesa 4 verde luna.png" class="ancho" id="${idVN.m1}" alt="">
        <img src="../assets/img/mesa 4 roja luna.png" class="ancho oculta" id="${idVN.m1}R" alt="">
        <img src="../assets/img/mesa 4 verde luna.png" class="ancho" id="${idVN.m2}" alt="">
        <img src="../assets/img/mesa 4 roja luna.png" class="ancho oculta" id="${idVN.m2}R" alt="">
    </div>`)

    $(`#${idVN.m1}`).on('click',function(){
        $(`#${idVN.m1}`).toggle()
        $(`#${idVN.m1}R`).toggle()
    })
    $(`#${idVN.m1}R`).on('click',function(){
        $(`#${idVN.m1}`).toggle()
        $(`#${idVN.m1}R`).toggle()  
    })
    $(`#${idVN.m2}`).on('click',function(){
        $(`#${idVN.m2}`).toggle()
        $(`#${idVN.m2}R`).toggle()
        })
    $(`#${idVN.m2}R`).on('click',function(){
        $(`#${idVN.m2}`).toggle()
        $(`#${idVN.m2}R`).toggle()
    })

  }

})





//api google maps

function loadGoogleMaps() {
    fetch("./config.js") // Leer la API Key desde un archivo externo
        .then(response => response.text())
        .then(apiKey => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.getElementById("googleMapsScript").replaceWith(script);
        })
        .catch(error => console.error("Error cargando la API Key:", error));
}

loadGoogleMaps(); // Llamar a la función al cargar la página


//Crear opciones de mapa
var myLatLng = { lat: -34.6109405, lng: -58.4706074 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};
//Crar un objeto DirectionsService para usar el metodo de ruta y obtener los resultados de nuestra petición

var directionsService = new google.maps.DirectionsService();

//Crear un objeto DirectionsRenderer el cual vamos a usar para plasmar nuestra ruta
var directionsDisplay = new google.maps.DirectionsRenderer();


//Definir la función calcRoute
function calcRoute() {
    //Crear la peticion
    var request = {
        origin: { lat: -34.5986852, lng: -58.4384221},
        destination: document.getElementById("exampleInputCalle1").value,
        travelMode: google.maps.TravelMode.BICYCLING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //Pasar la peticion al metodo de ruta

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Plasmar la distancia y el precio
            const output = document.querySelector('#output');
            output.innerHTML = "<p class='delivery'>Precio del delivery: $" + (parseFloat(result.routes[0].legs[0].distance.text) *23+100) + ".</p>"; //-----aqui esta el beta-----

            //display route
            // directionsDisplay.setDirections(result);
        } else {
            
            //Mostrar mensaje de error
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> No colocaste la direccion de entrega.</div>";
        }
    });

}
//Autocompletado en los inputs

var options = {
    types: ['geocode']
}

var input2 = document.getElementById("exampleInputCalle1");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);