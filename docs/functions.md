# Functions

## `init()`

> `init( `*`no arguments`*` )`

This is a one-time initialisation function, called when the game is loaded.

## `updateBleed()`

> `updateBleed( `*`no arguments`*` )`

This function is used to update the classes of the sixteen bleed tiles which show themselves when the player makes a move.

The function could be fresh OC on /r/shittyprogramming, and could also be heavily optimised. Having looked back at this horrendous snippet of JavaScript, I have gathered the following:

- The snippet is essentially a three-dimensional `forEach` loop.
- The `nightmare` variable is a four-dimensional array, containing the other data:
	- `nightmare[0]` and `nightmare[1]` become `data`.
	- `data[0]` becomes `diff`.
	- `data[1]` becomes `index`.
	- `data[2]` keeps its name as it is not iterated over.
- The arrays are:
	- `nightmare` &ndash; This contains two arrays within it, as the first `forEach` executes its contents first for above/below bleed tiles, and then a second time for right/left bleed tiles. These two arrays include three members; a 2D array, a 1D array, and an integer.
- `diff[0]` and `data[2]` are involved in selecting the element to copy the class attribute value of, and `diff[1]` is involved in selecting the element to receive the new value.
- The two members of `diff`, each two-member arrays of integers, are ineffective half of the time, as their members' values are 0.
- `diff[1]` causes the loop to update the classes of the opposite-side bleed tiles on its second and final iteration. The first value in diff[1][1] (once [18,30], later [3,-5]) is the **diff**erence (offset would have been a better word) in the ID of the tile that the class is copied from. The second value is the difference in the ID of the tile that the new class is given to.

## `updateIds()`

> `updateIds( `*`no arguments`*` )`

There will never be a tile with an ID of 0, 5, 30 or 35. These would be invisible corner tiles, but they aren't required and don't exist; it makes life easier to pretend they are.

## `parsePosition()`

> `parsePosition( `*`String`*` cssText )`

## `inputHandle()`

> `inputHandle( `*`MouseEvent`*` e )

This is the click handler for the control arrows. It's called by the jQuery .on() function, and works out which arrow was clicked. It calls the move() function accordingly.

## `move()`

> `move( `*`Number`*` navIndex, `*`Number`*` aIndex )`

This function actually causes tiles to move, and calls the winCheck() function to see if the game is complete.