# Functions

## `init()`

> `init( `*`no arguments`*` )`

This is a one-time initialisation function, called when the game is loaded.

## `updateBleed()`

> `updateBleed( `*`no arguments`*` )`

This function is used to update the classes of the sixteen bleed tiles which show themselves when the player makes a move. This is particularly important during initiation and for edge moves.

This function could be heavily optimised.

## `inputHandle()`

> `inputHandle( `*`MouseEvent`*` e )

This is the click handler for the control arrows. It's called by the jQuery .on() function, and works out which arrow was clicked. It calls the move() function accordingly.

## `move()`

> `move( `*`Number`*` navIndex, `*`Number`*` aIndex )`

This function actually causes tiles to move, and calls the winCheck() function to see if the game is complete.