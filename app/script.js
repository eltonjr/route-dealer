var app = angular.module('RouteDealer', []);

app.controller('MainCtrl', ['$scope', function($scope){

	var map
		, directionsService
		, directionsDisplay;

	google.maps.event.addDomListener(window, 'load', init);
	function init() {
		var mapOptions = {
			center: { lat: -34.397, lng: 150.644 }, // Sydney, but it doesn't matter
			zoom: 8
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();

		directionsDisplay.setMap(map);

		(function bindMapEvents() {
			google.maps.event.addListener(map, 'rightclick', rightClickHandler);

			function rightClickHandler(evt){
				// Clique com o botao direito pode adicionar um market
				// ou abre um menu contextual onde o usuário escolhe as ações
			}
		})();

		drawTestRoute();
	}

	function drawTestRoute() {
		var request = {
			origin: "Florianópolis, SC",
			destination: "Chapecó, SC",
			waypoints: [{
					location: "Lages, SC",
					stopover: true //optimize only works with stopover points, so this must be true
				},{
					location: "Blumenau, SC",
					stopover: true
				}],
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING
		};

		directionsService.route(request, function(response, status){
			if(status == google.maps.DirectionsStatus.OK){
				directionsDisplay.setDirections(response);
				console.log(response);
			} else {
				console.log("SOMETHING WRONG");
				console.log(status);
				console.log(response);
			}
		});
	}

}]);


