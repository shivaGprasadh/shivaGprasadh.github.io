$('document').ready(function(){
	$('#post-share-buttons a').tooltip({container:"body"});
	/* 
		If url has the words archive.html, then following code is run.
		Category specific pages auto-hide/show code
	*/
	var url = document.location.href;
	if(url.indexOf("archive.html")!=1){
		// Hides posts that do not belong to category
		function posts_hide(category){
			$('.archive-post-wrap:not([data-category*="'+category+'"])').hide();
		}
		// Shows posts belonging to category
		function posts_show(category){
			$('.archive-post-wrap[data-category*="'+category+'"]').show();
		}
		// Shows category section in header
		function header_show(category){
			$('#archive-category-name').html(category);
			$('#archive-category-header').show();
		}
		// Hides category section in header
		function header_hide(){
			$('#archive-category-header').hide();
			$('#archive-category-name').html("");
		}
		//Code run on page load (archive.html)
		header_hide();
		var url = window.location.href;
		var category = url.split('#')[1];
		if(category){
			posts_hide(category);
			header_show(category);
		}
		// On click of categories in the archive pages & blog sidebar
		$('.archive-post-categories-single, .sidebar-category a').click(function(){
			var category = $(this).attr('data-category');
			posts_show(category);
			posts_hide(category);
			header_show(category);
		});
		// On click of archive button in the header of archive.html
		$('#archive-header-button').click(function(){
			$('.archive-post-wrap').show();
			header_hide();
		});
	}
	// Home site customizations

	/* smooth scrolling sections */
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	});

	// Initialize Tooltip
	$('.index-contact-social').tooltip();
});