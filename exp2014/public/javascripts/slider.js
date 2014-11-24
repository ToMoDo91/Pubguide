$(document).ready(function() {


	//$('#sider').scrollTo('side1', 0);
	//get all link with class panel
	var sideNeste = 2;
	var sideForrige = 1;
	$('a.panel').click(function () {

                //reset and highlight the clicked link


		//grab the forrige side, to be used in resize function
		neste = $('a.panel');
		forrige = $('a.panel2');

                //scroll it to the destination
		$('#sider').scrollTo($(this).attr('href'), 800);

		$(this).unbind('click');
		$(this).click(function (event) {
					event.preventDefault();
					if(sideNeste > 7 && sideForrige > 6){
						sideNeste = 7;
						sideForrige = 6;
					} else if (sideNeste <= 1 && sideForrige <= 0){
						sideNeste = 1;
						sideForrige = 0;
					};

					sideNeste += 1;
					sideForrige += 1;
					neste.attr('href', '#side' + sideNeste);
					forrige.attr('href', '#side' + sideForrige);

					$('#sider').scrollTo($(this).attr('href'), 800);
		});
    //cancel the link default behavior
		return false;
	});

	$('a.panel2').click(function () {

		//grab the forrige side, to be used in resize function
		forrige = $('a.panel2');
		neste = $('a.panel');

		$(this).unbind('click');
		$(this).click(function (event) {
					event.preventDefault();
					if(sideNeste > 7 && sideForrige > 6){
						sideNeste = 7;
						sideForrige = 6;
					} else if (sideNeste <= 1 && sideForrige <= 0){
						sideNeste = 1;
						sideForrige = 0;
					};

					neste.attr('href', '#side' + sideNeste);
					forrige.attr('href', '#side' + sideForrige);
					sideNeste -= 1;
					sideForrige -= 1;

					$('#sider').scrollTo($(this).attr('href'), 800);
		});
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
