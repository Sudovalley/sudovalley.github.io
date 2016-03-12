angular.module('sudovalley').service('Event', function() {

	return {
				filtered: function() {
					return [{
						title: 'teste',
						start: new Date(),
						color: 'green'
					 }];
				},

				cities: [
					{
						abrev: 'dv',
						name: 'Dois Vizinhos'
					},

					{
						abrev: 'fb',
						name: 'Francisco Beltrão'
					},

					{
						abrev: 'pb',
						name: 'Pato Branco'
					}
				]
			};
});