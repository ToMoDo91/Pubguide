$(document).ready(function() {


	//$('#sider').scrollTo('side1', 0);
	//get all link with class panel
	$('a.panel').click(function () {

                //reset and highlight the clicked link
		$('a.panel').removeClass('valgt');
		$(this).addClass('valgt');

		//grab the current side, to be used in resize function
		current = $(this);

                //scroll it to the destination
		$('#sider').scrollTo($(this).attr('href'), 800);

                //cancel the link default behavior
		return false;
	});



	//resize all the sides according to the new browser size
	/*$(window).resize(function () {

		call the resizePanel function
		resizePanel();
	});*/

});

/*function resizePanel() {

	//get the browser width and height
	width = $(window).width();
	height = $(window).height();

	//get the mask width: width * total of sides
	mask_width = width * $('.side').length;

	//set the dimension
	$('#sider, .side').css({width: width, height: height});
	$('#mask').css({width: mask_width, height: height});

	//if the side is displayed incorrectly, set it to the corrent pos
	$('#sider').scrollTo($('a.selected').attr('href'), 0);

};*/
