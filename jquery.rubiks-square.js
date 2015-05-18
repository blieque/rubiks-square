/*
 * The Rubik's Square
 * By Blieque Mariguan
 * MIT License
 *
 * Documentation: https://github.com/blieque/rubiks-square/blob/master/docs/
 * License: https://github.com/blieque/rubiks-square/blob/master/LICENSE.md
 */

/* variables */

var tiles;

/* functions */

function init() {

	tiles = $('#ti div');
	updateBleed();

}

function updateBleed() {

	// have fun deciphering this
	[[[[0,0], [-18,28]], [0, 1, 2, 3], 23],
	 [[[0,0], [3,  -5]], [9,15,21,27], -4]].forEach(function(data){
		data[0].forEach(function(diff){
			data[1].forEach(function(index){
				var newClass = $(tiles[index + data[2] + diff[0]]).attr('class');
				$(tiles[index + diff[1]]).attr('class', newClass);
			});
		});
	});

}

function inputHandle(e) {

	var navIndex = $('#c nav').index($(this).parent()),
		aIndex = $('#c nav').eq(navIndex).children('a').index($(this));

	move(navIndex, aIndex);

}

function move(navIndex, aIndex) {

	console.log(aIndex);

	var condition = [],
		alter = [];

	navIndex %= 2;
	condition[0] = navIndex == 0 ? 'left' : 'top';
	condition[1] = aIndex * 25;
	alter[0] = navIndex == 0 ? 'top' : 'left';
	alter[1] = navIndex == 1 || navIndex == 2 ? '+=25' : '-=25';

	var regex = new RegExp(condition[0] + '\\:[ \\t]*' + condition[1] + '\\%');
	console.log(regex);
	tiles.each(function(index){
		if ($(this).attr('style').search(regex) > -1) {
			$(this).addClass('alter');
		}
	});

	$('.alter').css(alter[0], alter[1] + '%');

	// $('.alter').removeClass('alter');
	// updateBleed();

}

/* jquery call */

$(function(){

	init();

	$('#c a').on('mouseup', inputHandle);

});