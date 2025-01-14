---
layout: default
title: Homework
nav_exclude: true
---

#Task 01.02

Overall, how would you rate your skill level of programming?
* Overall, how would you rate your skill level of programming?
    * [ ] Never done it
    * [ ] Novice
    * [ ] Intermediate
    * [x] Advanced
    * [ ] God-like
* Have you used object-oriented programming before?
    * [ ] I don't know what that is
    * [x] I know the concept, but I have never implemented it
    * [ ] Yes
* Overall, how would you rate your skill level of using web technologies, e.g., have you used a local server setup?
    * [ ] Never done it
    * [ ] Novice
    * [ ] Intermediate
    * [x] Advanced
    * [ ] God-like
* How would you rate your skill level of working with Git and GitHub?
    * [ ] Never done it
    * [ ] Novice
    * [ ] Intermediate
    * [x] Advanced
    * [ ] God-like

## Motivation

I would like to learn more about creative coding to deepen my knowledge and explore new ways of using coding beyond my previous experiences. Having worked as a frontend developer, my job was to make user faces that were quite simple and I often just had to use already-made components from certain libraries such as Flowbite. I want to learn how to create more engaging and creative projects, moving beyond utilitarian websites and explore more dynamic and interesting designs. I would like to create a portfolio for my final creative coding project so that I can then upload all the different things I create during my degree. My old portfolio was very bland with its aim to just show that I knew how to code so I want to go beyond what I did before and make an immersive, interactive portfolio so that I can use it to apply for future festivals and jobs.

# Task 01.03

##Existing Creative Coding Project

I really like a piece made by Sam Griffith, a graphic designer based in Detroit. She recently made a piece that combines weaving with creative coding and I think its a great example of how we should think outside of the box in terms of what we can create with coding. During a residency in Barcelona she made a digital tool that maps an image onto a round hand loom (a type of weaving device) in order to weave it. 

The project explores how to translate code into physical materials. The process begins with an image and a spiral in code. The spiral extracts colours from the image, storing them in a linear form that represents a straightened thread. Using raffia as the medium, the stored colour data guides where to wrap coloured thread. Finally, the raffia is woven into a spiral, where the image takes shape again, completing a cycle of mapping, unwrapping, and re-wrapping between digital and physical forms.

[Link to her work](https://timrodenbroeker.de/sam-griffith/)

# Task 01.05 - The 10 PRINT pattern

[p5.js Pattern](https://editor.p5js.org/imoleadrews/sketches/Qwy5uF4z8)


![Pattern](./assets/imogen_pattern.gif)


# Task 01.05 - Greeting Card

[p5.js Greeting Card](https://editor.p5js.org/imoleadrews/sketches/PujEZTfH6)


![Pattern](./assets/imogen_card.gif)


# Learnings

What was most challenging for me was to translate my ideas into a working project that could be completed in the amount of time we had. With the pattern, it took me a while to do it because I was fixated in making an Art Deco pattern that turned out to be too complex to achieve in the time I had to complete the project. I had a similar issue with my greeting card - I spent way too much time editing the clown and thinking of other things I could potentially add, rather than working on the Card Interface which has resulted in a rather bland card. 

In the pattern I tried to add things that appeared more complex than what the code eventually was. Through trial and error, I figured out that overlapping the diamonds made the pattern appear more interesting and by changing the colour of the diamond stroke in draw() I was able to give the illusion of flickering lights. 

For my greeting card I then followed how to add the FaceMesh from ML5’s library which was very straight forward. I learned about the UV Unwrap for the Face Mesh Detection from a [tutorial](https://www.youtube.com/watch?v=R5UZsIwPbJA&t=575s) by Dan Shiffman which I then used to find my own keypoints for my clown. Most of my time was spent doing this but overall I am happy that I learned how to do this since I have been interested in working with ML5 for a while.
