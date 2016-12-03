var map = L.map('map').setView([37.8, -96], 4);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVzc2ljYWdvIiwiYSI6ImNpdmpzaTEzNTAxdzkyeGxtNHB4ejg2NGMifQ.CrbT1dpzzmWbiMRgkvNthA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);

	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info');
	    this.update();
	    return this._div;
	};

	info.update = function (props) {
	    this._div.innerHTML = '<h4>U.S. Death Row Inmate total</h4>' +  (props ?
	        '<b>' + props.name + '</b><br />' + props.inmateTotal + ' people ' +
					'</b><br />' + props.dateAbolished
	        : 'Hover over a state to view its total');
	};

	info.addTo(map);

  function getColor(d) {
		return d >= 700 ? "#990000" :
				d >= 300  ? "#b30000" :
				d >= 200  ? "#d7301f" :
				d >= 150  ? "#ef6548" :
				d >= 100  ? "#fc8d59" :
				d >= 50   ? "#fdbb84" :
				d >= 10   ? "#fdd49e" :
				d >= 1   ? "#fee8c8" :
							"#c8cbcc";
	}

	function style(feature) {
	    return {
	        fillColor: getColor(feature.properties.inmateTotal),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	L.geoJson(inmateData, {style: style}).addTo(map);
	function highlightFeature(e) {
    e.target.setStyle({
        weight: 5,
        color: getColor(e.target.feature.properties.colour),
        dashArray: '',
        fillOpacity: 0.7
    });
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

		info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
		info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(inmateData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        totals = [1, 10, 50, 100, 150, 200, 300, 700],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < totals.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(totals[i] + 1) + '"></i> ' +
            totals[i] + (totals[i + 1] ? '&ndash;' + totals[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
