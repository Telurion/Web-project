var map = L.map("map").setView([48.7936, 2.362], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
L.marker([48.7936, 2.362])
  .addTo(map)
  .bindPopup("CIGEMS Shop<br>24 Rue des carrats gemmes, Villejuif")
  .openPopup();
