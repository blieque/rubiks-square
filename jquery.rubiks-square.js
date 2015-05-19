/*
 * The Rubik's Square
 * By Blieque Mariguan
 * MIT License
 *
 * Documentation: https://github.com/blieque/rubiks-square/blob/master/docs/
 * License: https://github.com/blieque/rubiks-square/blob/master/LICENSE.md
 */

/* variables */

var tiles,
    acceptInput = true;

/* functions */

function init() {

    tiles = $('#ti div');
    updateBleed();
    
    $('#ti div').addClass('dt');
    for (var i = 0; i < 20; i++) {
        var navIndex = Math.floor(Math.random() * 4),
            aIndex = Math.floor(Math.random() * 4);
        $('#c nav').eq(navIndex)
            .children('a').eq(aIndex)
            .trigger('mouseup', true);
    }
    $('.dt').removeClass('dt');

}

function updateBleed() {

    updateIds();

    // have fun deciphering this
    var nightmare = [[ [[0,0], [-18,30]], [1, 2, 3, 4 ], 24] ,
                     [ [[0,0], [3,  -5]], [11,17,23,29], -4] ];

    nightmare.forEach(function(data){
        data[0].forEach(function(diff){
            data[1].forEach(function(index){

                var elCopy = $('#t' + (index + diff[0] + data[2])),
                    elPaste = $('#t' + (index + diff[1])),
                    newStripped;

                if (elPaste.attr('class') != null) {
                    var newStripped =
                        elPaste.attr('class').replace(/g[0-9]*[ \t]*/,'');
                } else {
                    var newStripped = '';
                }

                var newExtracted = elCopy.attr('class').match(/g[0-9]*/)[0];

                var valSpaced = newStripped.length > 0 ? ' ' : '',
                    valNew = newStripped + valSpaced + newExtracted;
                elPaste.attr('class', valNew);

            });
        });
    });

}

function updateIds() {

    var positions = [-25, 0, 25, 50, 75, 100];
    tiles.each(function(){

        var tilePos = parsePosition(this.style.cssText),
            indexX = positions.indexOf(tilePos[0]),
            indexY = positions.indexOf(tilePos[1]),
            id;
        id = indexX + indexY * 6;

        $(this).attr('id', 't' + id);

    });

}

function parsePosition(cssText) {

    var reLeft = /left:[ \t]*([-0-9]*)%/,
        reTop = /top:[ \t]*([-0-9]*)%/;

    var strLeft = cssText.match(reLeft)[1],
        strTop = cssText.match(reTop)[1];

    var valLeft = parseInt(strLeft),
        valTop = parseInt(strTop);

    return [valLeft, valTop];

}

function inputHandle(e, forceInput) {

    if (acceptInput || forceInput) {

        var navIndex = $('#c nav').index($(this).parent()),
            aIndex = $('#c nav').eq(navIndex).children('a').index($(this));

        // prevent quick simultaneous inputs
        if (!forceInput) {

            acceptInput = false;
            setTimeout(function(){
                acceptInput = true;
            }, 250);

        }

        move(navIndex, aIndex, forceInput);

    }

}

function move(navIndex, aIndex, forceInput) {

    var condition = [], // describes tiles to move
        alter = [],     // describes how to move them
        navIndexMod = navIndex % 2; // group vertical and horizontal buttons

    condition[0] = navIndexMod == 0 ? 'left' : 'top'; // elem. search property
    condition[1] = aIndex * 25; // elem. search value
    alter[0] = navIndexMod == 0 ? 'top' : 'left'; // elem. replace property
    alter[1] = navIndex == 1 || navIndex == 2 ? 25 : -25; // elem. replace value

    // get the elements conditional property, e.g., "left: 25%"
    var reProperty = new RegExp(condition[0] + ':[ \\t]*' + condition[1] + '%');

    // give "alter" class to elements that need moving
    tiles.each(function(index){

        if ($(this).attr('style').search(reProperty) > -1) {
            $(this).addClass('alter');
        }

    });

    // remove disable transition class in a moment
    if (!forceInput) {
        setTimeout(function(){
            $('.dt').removeClass('dt');
        },100);
    }

    // increase or decrease value manually (jquery doesn't like percentages)
    $('.alter').each(function(){

        // parse coords, and pick out the one we want to alter
        var coordIndex = alter[0] == 'left' ? 0 : 1,
            coord = parsePosition(this.style.cssText)[coordIndex];
        coord += alter[1];

        if (coord > 100) {
            coord = -25;
            $(this).addClass('dt');
        } else if (coord < -25) {
            coord = 100;
            $(this).addClass('dt');
        }

        $(this).css(alter[0], coord + '%');

    });

    // remove "alter" class and update bleed tiles' colours
    $('.alter').removeClass('alter');
    if (!forceInput) {
        updateBleed();
    }

}

/* jquery call */

$(function(){

    init();

    $('#c a').on('mouseup', inputHandle);

});