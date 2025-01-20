### Task 02.01

> Circles

For this task I thought it would be interesting to start out with a non-circle primitive which then gradually morphs into a circle.

As a kind of fun interaction I tried to build a tool to detect some aspects of the user's mouse movement. I imagined the sketch to work like a scratch card but you have to scratch in a circle. Even though I came close I overlooked too long that going in a diagonal line tricks my naive approach to detecting circular movement and at that point the time budget was already spent.

The overall structure of the program is distributed across 3 files:

- `main.ts`
  - Entry point for p5
  - Handles `setup()` and `draw()`
  - Instantiates and manages the custom class `Circloid` and `MouseMeasurement`
- `MouseMeasurement.ts`
  - Provides a velocity measurement for the mouse
  - Provides a the distance moved in x and y direction
- `Circloid.ts`
  - Generates and manages the polygon
  - Provides a method to morph the polygon into a circle incrementally

With this structure I hoped to somewhat differentiate the concerns within the program (Divide and Conquer):

- p5 and the main program logic
- detailed logic for mouse measurement
- detailed logic for the polygon

### Task 02.02

> Happiness

- Lyrics from Happy by Pharrell Williams but you have to clap to skip through the lyrics.
-

### Task 02.03

Especially with the `Circloid` I

#### Task 02.04

> Creative Instructions

##### Architectural Significance

Forwards you must go two steps, then rotate,<br>
ninety degrees to your right,<br>
now count the steps you go take,<br>
again at two you are right.<br>
Turn yourself by a hundred thirty-five,<br>
degrees to your left side.

Don't be confused by your next stride,<br>
it is indeed more complex;<br>
take now the square root of two steps.<br>
Afterward, again you rotate, ninety degrees to your left,<br>
once more, move forwards, the square root of two steps.

Even without any division,<br>
you conquered the first challenging part,<br>
what follows is another rotation,<br>
ninety degrees to the left - not hard.

Do you recall the square root of two?<br>
Now take twice that many steps, too.<br>
Rotate once more, by a hundred thirty-five,<br>
degrees to the left, if you're still alive.

Two steps later, another turn to the left,<br>
one hundred thirty-five degrees with some heft.<br>
Again you move forward, twice the square root of two,<br>
The last turn left is a hundred thirty-five degrees too.<br>

After all, two steps forward is all that's ahead,<br>
can you tell me who lives in this tiny ass shed?

### Task 02.05

All of the sketches from assignment 01.05 onwards are created in a local environment using [Vite](https://vite.dev/) to run a development sever. To skip the boilerplate, I created a [template](https://github.com/whatphilipcodes/p5-init) based on Gorm's approach for assignment 01.04.

Usage:

```bash
cd root/where/your/sketch/should/be
```

Using `degit` (requires you to have `Node.js` installed, will ask to install degit once):

```bash
npx degit whatphilipcodes/p5-init name-your-sketch
```

Or using `git` (remember to remove the `.git` folder manually to avoid conflicts with the creative coding repository BUT keep the `.gitignore` file):

```bash
git clone https://github.com/whatphilipcodes/p5-init.git name-your-sketch
```

```bash
cd name-your-sketch
rm -rf .git
```

## Learnings

- I didn't use `Array.reduce()` in a while and had to look up the syntax again.
