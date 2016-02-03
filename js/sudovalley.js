$(document).ready(function() {
	$("#calendar").fullCalendar( {
		header: {
			left: '',
			center: 'prevYear prev title next nextYear',
			right: ''
		},
		events: [
			{
				title: 'meus ovo',
				start: new Date(),
				color: 'green'
			}
		]
	});
});