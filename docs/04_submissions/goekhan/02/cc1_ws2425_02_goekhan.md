---
layout: default
title: Homework
nav_exclude: true
---


# Session 02

### Task 02.01 - Circles

[Cycle: Tibetan Book of the Dread](https://editor.p5js.org/irugaru/sketches/3NjUcPLrj)
![SevenSins](https://owncloud.gwdg.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=618&a=true&file=Cycle.png&t=2JjV9WmFjrpyf7O&scalingup=0)

### Task 02.02 - Happiness
[Seven Easy Sins to Become Happy](https://editor.p5js.org/irugaru/sketches/E1HVGQcM9)

![SevenSins](https://owncloud.gwdg.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=584&a=true&file=SevenSins.png&t=7HtIJK2GYSbGwQe&scalingup=0)

### Task 02.03 - *Algorithmic Thinking*

### Cycle

Like every small project, this little code was conceived also as a gigantic being waiting to be reduced into torrents of simplicity.  

1. The first idea was to create circles with each gesture of the user, to make a mini novel and reveal a giant Ouroboros-like shape that would reflect into the reciprocity of life and death.  

2. The simplified version was to create the circles, without forming a macro scale graphic, pick some quotes from Bardo Thodol (Tibetan Book of the Dead) and reveal one of them with each mouse click.  

3. The reworked version included:  
- Removing most of the inner area of the circle and leaving a hoop, just for visual purposes.
- Tracking the quotes to the circles, which was much better than random circles and quotes flying around.
- Removing the circle erasing code, so that the thoughts stacking on each other was a more coherent execution conceptually.
- Adding sound to make it less boring. The sound engine was crafted as a very simple, bell-like tone producing, oscillator. The size of the circles were synced to the frequency of the notes produced. (Circle size is randomized.)

### Seven Easy Sins to Become Happy
<p align="justify">
As happiness probably being the most sought, discussed, portrayed, etc. concept throughout the existence of humankind, the origin of this game also came out of nothingness.  
It doesn't mean that the game didn't have any thought behind it, but my thinking path was actually kind of starting from a rear end. I thought about some concepts that made many people happy, more than the common denominator of things that make people happy, and I wanted to narrow them down to a few ideas, later narrowed to the cardinal sins.</p>
<p align="justify">
The concept was to define the seven deadly sins as 'happiness or unhappiness makers'. As I assessed the 'evil thoughts' that were written down 1800 years ago, I've decided that more than half of these sins (4 to be exact) are actually could be considered things to make us happy in life.</p>

<p align="justify">
I thought about a game idea to, capture/collect these sins so that in the end you would get your happiness index as a sinner, but I thought that it would be too much like an Astrology quiz and boring to complete.
</p>

<p align="justify">
Then I wanted to make an incredibly simple game, so I've checked the games from 70s and 80s to implement a simple mechanism. Cloning the 1976 Breakout game was my choice. At this point, I've remembered that I've had very limited experience with coding, and even making this game would take a while. As a responsible adult with good time management skills, I've worked on this 'game engine' for unfathomable durations. Of course, not the working principles were the only part but implementing any single, color, size, sound, shape meant putting another line of code to possibly interfere with my super basic game engine.<sup>For legal purposes, this coding log is not a complaint.</sup>  
The game eventually involved the sins being positive and negative, which were identified by their relative green and red colors, being collected by a space bar-like player object, to reach and end goal of +3 or -3. Everything worked properly, until the soundtrack idea was implemented.  </p>

<p align="justify">
As it was possible to use a MIDI song that I've generated with AI, I wanted an approach that can implement a songwriting mechanism inside the p5.js code. I knew this would take an immense amount of time, just to write a 1-minute song even, so I looped a 14-note sound machine to be the soundtrack of the game. This was the most complicated part of the entire written code during this project. Unfortunately, altering the composition, adding starting screen and ending screen music, or adding sound effects were impossible due to time constraints.</p>


### Task 02.04 - *Creative Instructions*

<p align="justify">
Tried to follow the prompt in class, giving instructions to a baby/alien, I thought about choosing a weird dish from where I grew up and trying to explain it to someone. I couldn't find another creative way than writing this dish in pseudo-code. I hope it makes some sense, but I will add photos to at least clarify the possible outcome of the recipe.</p>

#### Output of the Proper Written Code
![SevenSins](https://owncloud.gwdg.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=618&a=true&file=PilavSuccess.jpg&t=7SkvXxue3fx6iWJ&scalingup=0)

#### Output of the Ambiguous Code
![SevenSins](https://owncloud.gwdg.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=584&a=true&file=PilavFail.jpeg&t=qFnDVD50LRIBFhs&scalingup=0)



## Learnings

<p align="justify">
The personal learnings within this session was partially integrating the usage of object based programming and constructing a class to avoid excessive future coding (although in my game the Player class is only invoked once);</p>

> class Player {  
  constructor() {  
    this.width = 100;  
    this.height = 20;  
    this.x = width / 2; // canvas start places  
    this.y = height - 40;  
    this.speed = 10;  
  }  
  }  

<p align="justify">
The main challenge was actually crafting two different set of codes, within the pulsating thoughts emerging from two simple words 'Circle' and 'Happiness'. While the vagueness of the subject may become a colossal obstacle, it also pushes a lot to fathom the way out of this quasi-void.
</p>

---

Write and link all task results in a copy of this file. Submit your copy as `cc1_ws2425_XX_lastname.md` in your assignments' folder.
