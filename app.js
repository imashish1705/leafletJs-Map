// const map = L.map('map').setView([20.5937, 78.9629], 5); // 13 is for zoom 51.505 ,-1.9 this is longitute and lattitude
// //open street map
// const titleUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'; //z- > zoom ,  x&y is cordinate ....s-> is automatic change by title
// const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Ashish';

// const tile=L.tileLayer(titleUrl, {attribution});
// // add inside map
// tile.addTo(map);

// //draw circle layer
// //const cLayer = L.circle([28.7041, 77.1025], {radius: 20000,color:"orange",fillOpacity:0.5}); //radius basically meters me hoti hai
// //cLayer.addTo(map);

// // const bounds = [[22.5726, 88.3639],[19.0760, 72.8777]];
// // const rectangle = L.rectangle(bounds);
// // rectangle.addTo(map);

// // const bTriangle = [[25.774, -80.19],[18.466, -66.118],[32.321, -64.757]]; // isseh koi bhi shape create kr sakte hai hum log
// // const polygon = L.polygon(bTriangle); 
// // polygon.addTo(map);

// // var latlngs = [
// //     [45.51, -122.68],
// //     [37.77, -122.43],
// //     [34.04, -118.2]
// // ];
// // const polyline = L.polyline(latlngs);
// // polyline.addTo(map);

// //circle marker 
// // const cMarker = L.circleMarker([28.6276,77.2784]);
// // cMarker.addTo(map);


// // const icon = {
// //     iconUrl: ".icon.png",
// // }


// const icon = L.icon({
//     iconUrl: "./food.jpg",
//     iconSize: [60, 40],
    
    
// })
// const marker = L.marker([28.6276,77.2784], {
//     icon
// });
// marker.addTo(map);

// marker.bindPopup("<h1>food outlet 1</h1>"); // this is for pop-up
/**------------------------------------------------------------------------------------------------------------------
 * 
 Upper part is only for practice
 */

 //...........................now here we go.......................for make a mini project..............

 const mymap = L.map('map').setView([20.5937, 78.9629], 5); // 13 is for zoom 51.505 ,-1.9 this is longitute and lattitude
//open street map
const titleUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'; //z- > zoom ,  x&y is cordinate ....s-> is automatic change by title

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Ashish';

const tileLayer = L.tileLayer(titleUrl, {attribution});
tileLayer.addTo(mymap);

function generateList() {
    let ul = document.querySelector(".list");
    storeList.forEach((data) => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const a = document.createElement("a");

      //fly to store
      a.addEventListener("click", ()=> {
          flyToStore(data);
      })

        div.classList.add("shop-item");
        a.innerHTML = data.properties.name;
        a.href = "#";
        p.innerHTML = data.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        
        li.appendChild(div);
        ul.appendChild(li);
    })
}
generateList();
function makePopupContent(shop) {
   return `
   <div>
   <h4>${shop.properties.name}</h4>
   <p>${shop.properties.address}</p>
   <div class= "phone-no">
   <a href="ph-${shop.properties.phone}">${shop.properties.phone}</a>
   </div>
   </div>
   `
}

function onEachFeature(feature, layer) { //har ek layer ko bind krna hai
    layer.bindPopup(makePopupContent(feature),{closeButton:false, offset:L.point(0,-8)}); //point -> message kitna uper ki tarf marker k upper show hoga 

}
var myIcon = L.icon({
        iconUrl: "food.png",
        iconSize: [30, 40],
        
});

const shopsLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) { // har ek object k liye yeh run hogi 
        return L.marker(latlng,{icon:myIcon});
    }
});
shopsLayer.addTo(mymap);

// fly to store on click
function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    mymap.flyTo([lat, lng], 14 ,{
      //if you want not need any animation
    //   Animate: false  
    // kitna fast fly krna hai     
    duration: 3
    });
    setTimeout(()=> {
        //after fly pop that marker
        L.popup({closeButton: false, offset: L.point(0,-8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(mymap);
    
    },3000);
    
}

