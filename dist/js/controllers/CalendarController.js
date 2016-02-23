angular.module('sudovalley').controller('CalendarController', function($scope, Event) {
	alert('olá 2');
    $scope.event = Event;
	$("#calendar").fullCalendar( {
		header: {
			left: '',
			center: 'prevYear prev title next nextYear',
			right: ''
		},
		events: Event.filtered()
	});
});