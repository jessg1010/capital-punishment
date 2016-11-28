var map = L.map('map').setView([37.8, -96], 4);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVzc2ljYWdvIiwiYSI6ImNpdmpzaTEzNTAxdzkyeGxtNHB4ejg2NGMifQ.CrbT1dpzzmWbiMRgkvNthA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);

  function getColor(d) {
		return d > 1000 ? '#800026' :
				d > 500  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 100  ? '#FC4E2A' :
				d > 50   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
	}

	function highlightFeature(e) {
    e.target.setStyle({
        weight: 5,
        color: getColor(e.target.feature.properties.colour),
        dashArray: '',
        fillOpacity: 0.7
    });
}
