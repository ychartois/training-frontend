;(function( $ ){
    
         $.fn.toggleVisibility = function() {

            return this.each(function(){
                var visibility = ($(this).css('visibility') === 'visible') ? 'hidden' : 'visible';
                
                $(this).css('visibility',visibility);
            });
        };
    
        $.fn.blink = function(opts) {
            var options = $.extend({}, $.fn.blink.defaults, opts);

            return this.each(function(){
                var $this = $( this );
                
                setInterval(function(){
                    $this.toggleVisibility();
                    if ( $.isFunction(options.callback) ) {
                        options.callback.call( $this );
                    }
                }, options.speed);
            });
        };
        
        $.fn.blink.defaults = {
          speed : 1000,
          callback : undefined
        };

	$(document).ready(function(){

                $('.user:nth-child(2)').blink({
                    callback: function(){
                        //console.log( $(this) );
                        $(this).css('color','pink');
                    }
                });

                $('.user:nth-child(odd)').blink({
                    speed: 500
                });

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
                 
                 var $users = $('#users');

		 $( '.user' ).click( function() { 
		 	var $this = $(this);
                           
                        if ($users.data('users') === undefined) {
                            $.getJSON("assets/data/users.json", function(data){
                                    // on attache la liste d'utilisateurs 
                                    // à l'élément #users
                                    $users.data('users', data);
                                    
                                    showUserName($this);
                            });
                        } else {
                            showUserName($this);
                        }
		 });

                 var showUserName = function($user) {
                     
                     var result = $users.data('users').filter( function(user) {
                         return user.id === parseInt($user.data('id'));
                     });
                     
                     var user = result[0];
                     
                     $user.append( ' ' + user.prenom + ' ' + user.nom );
                 }
                 

	});

})( jQuery.noConflict() );