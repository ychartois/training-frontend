;(function( $ ){

	$(document).ready(function(){

		// Changement de portée du this
		// ici : c'est l'objet javascript correspondant 
		// à l'élément sur lequel tu as cliqué
		$('.test').click( function(){
			// en le donnant en paramètre à la fonction jQuery
			// => $( this ) : on lui rattache toutes les méthodes de la lib
			console.log( $( this ).attr('id') );
		} );

		$('#link').click(function(){
			var $this = $( this ); 
			setTimeout(function(){
				try {
					console.log( this );
					console.log( $(this).css('color') );
				} catch ( e ) {
					console.log("la portée du this a changé... ");
				} finally {
					console.log( $this.css('color') );
					$this.css({
							color : "red"
						 })
						 .html('SUPER !');
				}
			},1000);

			$('.test:last').after( $('.test:last').clone().attr('id','test-x') );
		});

		/** Ancienne methode

		$('#tests').mouseover(function( event ){

			var $target = $( event.target );

			if ( $target.is( '.test' ) ) {
				$target.css({
							background : "blue",
							color: 'white'
						 });
			}
			
		});
		**/

		/**
		 * jQuery 1.7 + 

		 */
		 $('#tests').on('mouseover mouseout', '.test', function(){
		 		$(this).toggleClass('hover');
		 });


		 /* DATA ATTRIBUTS */

		 $( '.user' ).click( function() { 
		 	var userId = $(this).data('id');

		 	$.getScript("assets/data/users.js", function(data){
		 		console.log(data);
		 	});

		 });


	});

})( jQuery.noConflict() );