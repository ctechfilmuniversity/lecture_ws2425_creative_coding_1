---
layout: default
title: Homework
nav_exclude: true
---

# Task 05.01 - The Final Project
**_by: David Leonardo Pirazán Palomar_**

My project is part of my _Orientierungsproject's **(Ceiba Forest)**_ iterations. It is definitely an experiment and also a learning path. I have documented everything, as you are about to see, but take into account that only some of the parts of the project will be online, like the 2 final p5 sketches, where you will be able to see my final coding results. Since I am working with an Ultrasonic sensor and the artworks depend on that interaction, the audiovisual components of the project will be shown in this document with pictures, videos and text.

### DESCRIPTION:
I created an interactive system that is able to use the proximity of the public to have an influence on the sounds and visuals of the artwork. In general terms, when the audience get closer to the system (the forest) they bring life to it. This is represented in greener colors of the botanic visuals and the higher volume of sounds of water and animals. In contrast to that closeness, the remoteness of the audience is represented by a desertic sound environment and the lack of saturation, brightness and hue of the visuals. Here is the diagram of the data flow: 

![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/489a021e4538fc3b338264407f4c56b6d03ae70f/Piraz%C3%A1nPalomar/img%20Final/13_Diagramm.png)

My main goal with my Orientierungsproject is the development of an interactive system that will allow the public of the video installation to have an effect on the artwork. For this CC1 final project I wanted to dive deeper on the "_emergence_" and "_instructions_" topics, since p5 allows the interaction of the code with sensors and a diversity of inputs. 

In order to explain better the state of my Orientierungsproject and what I achieved with this CC1 final project I would like to share the objective of my Orientierungsprojekt:

    In a nutshell: A raw prototype of the interactive sound interface of the installation with sensors and sound. I want to focus on those 2 aspects, since it corresponds to the most challenging part for me.

    Interaction: Research, experimentation and conceptualization of the interaction with the help of sensors. I am thinking on working with the body recognition function of p5, for example.

    Sound: I want to be able to create the 3 stages of the installation, specially with the progressive changes in the sound effects (the footsteps, the rain, the water, the fullness or hollowness of the tree, the closeness of the animals)#

    In a nutshell: A raw prototype of the interactive sound interface of the installation with sensors and sound.

This final CC1 project is close to the raw prototype I have in mind for my _Ceiba Forest_. I will keep working on my iterations, but as you will see on the results, I have already accomplished to use the sensor readings as a way of transmitting the audience that when they get closer to the artwork, it has an effect. I am very proud of achieving not only an interaction with sound but also with the visual component. 

I would like to point out that I like how the transition between the 3 stages is very smooth and that I want to work with sound synthesis in the next weeks and work on the complexity of the project by adding other types of sensors, sounds and visuals, to enrich the experience. 

You can read The detailed learning process in the "Learnings" section of this document.   

### THE SOURCE CODE && LINK TO THE BUILD / ONLINE DEPLOYMENT 
My project consist of the data flow of an ultrasonic sensor through the arduino software, a "bridge software" called p5.serialcontrol and 2 p5 sketches on the web editor. **Please note** that you will be able to see the results only until the next section "Representative image", since the artwork depends on the interaction with the sensor I have plugged in my computer. For more details of how I came up with the codes please go to the "Learnings" section.

Here is the code I used on the Arduino software: 


    >const int trigPin = 9;
    >
    >const int echoPin = 10;
    >
    >float duration;
    >
    >float distanceCM; // in centimeters
    >
    >
    >void setup() {
    >
    >  Serial.begin(9600); //establishes serial communication between your Arduino board and the computer.
    >
    >  pinMode(trigPin, OUTPUT);
    >
    >  pinMode(echoPin, INPUT);
    >
    >}
    >
    >void loop() {
    >
    >//start with a clean signal
    >
    >  digitalWrite(trigPin, HIGH);
    >
    >  delayMicroseconds(2);
    >
    >//send trigger signal
    >
    >  digitalWrite(trigPin, HIGH);
    >
    >  delayMicroseconds(10);
    >
    >  digitalWrite(trigPin, LOW);
    >
    >//return pulse duration in microseconds
    >
    >//if set to HIGH; pulseIn() waits for the pin to go from LOW to HIGH
    >
    >// stops timing when pin goes back LOW
    >
    >  duration = pulseIn(echoPin, HIGH);
    >
    >//convert m/s (of speed of sound) to in/microsec
    >
    >//343 m/s = 0.034 com/microseconds
    >
    >  distanceCM = (duration * 0.034) / 2;
    >
    >// print distance
    >
    >  // Serial.print("Distance: ");
    >
    >  Serial.println(distanceCM);
    >
    >  // Serial.println("cm");
    >
    >  delay(100); //to slow down the readings to read better
    >
    >}
    >

This are the links of both sketches on p5: 

1. This one is called [**_CC1_Final_Barnsley Fern_**](https://editor.p5js.org/dlpp/sketches/ifUgqlkzA)
2. This one is called [**_CC1_Final_Phyllotaxis_**](https://editor.p5js.org/dlpp/sketches/dYxbOPON-)

On both codes you can find information about the authors of the sounds. 


### REPRESENTATIVE IMAGE
1. **_CC1_Final_Barnsley Fern_** is based on the mathematical analysis of natural forms. I followed a tutorial to do it, as you will see on the "Learnings" section, but I personalized the code to adapt it to my project and make it interactive. I really love the way the fern can both:
    *   Desintegrate in the dark when the audience is far away and how the sound is desertic and noisy.

        &
    * Bloom and come to live together with vivid sounds of water an animals when the audience come closer.

    I believe this is the poetic part of the work I have been looking for, because the distance between humans and non - human, even though we are of course part of the nature needs to be questioned because coming closer to it can get it out of the dark, both figurative and literal. 

    Here is a screenshot:

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/489a021e4538fc3b338264407f4c56b6d03ae70f/Piraz%C3%A1nPalomar/img%20Final/12_CC1_Final.png)

    & here is a video: 
    [![CC1_Final_Barnsley Fern](https://img.youtube.com/vi/vKJ8XwXGoZY/0.jpg)](https://www.youtube.com/watch?v=vKJ8XwXGoZY "CC1_Final_Barnsley Fern")

2. **_CC1_Final_Phyllotaxis_** is also based on the mathematical analysis of natural forms. Phyllotaxis is an spiral based arrangement of leaves on a plant stem. I followed a tutorial to do it too, as you will see on the "Learnings" section, but I personalized this code to adapt it to my project and make it interactive. I worked with the same sound system and sounds, but visually this approach is different from the previous one, because the proximity of the audience does not affect the "existence" (desintegration or blooming) of the pattern, but the saturation, brightness and hue of the pattern being drawn changes.

    Here is a screenshot:

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/489a021e4538fc3b338264407f4c56b6d03ae70f/Piraz%C3%A1nPalomar/img%20Final/11_CC1_Final.png)

    & here is a video: 

    [![CC1_Final_Phyllotaxis](https://img.youtube.com/vi/oOVd7mZLmkM/0.jpg)](https://www.youtube.com/watch?v=oOVd7mZLmkM "CC1_Final_Phyllotaxis")



## Task 05.02 - Feedback

### How would you rate the difficulty of this class from 1 (far too easy) to 5 (far too difficult)?
3.5 I think the class has some complexity but it is dynamic, fun and goes step by step, so that helps a lot despite of the complexity of some topics. 

### How would you rate the amount of work you had to put into this class so far from 1 (no work at all) to 5 (far too much work)?
4 I consider it was good, not too much, but not too little. 

### How much did you learn in the class and expanded your skill set, from 1 (I am the same) to 5 (learned a lot)?
4 I have definitely learned a lot. THere were many things that were new for me and I will need time to get the hang of it, but I think I know how to learn and continue that path. 
    
### How much did you enjoy working with p5, from 1 (hate it) to 5 (love it)?
4 It was pretty good, beginner friendly and it was very important for my project due to the interaction. It feels a little bit like it is no the most professional tool, but there are many tutorials and examples that can help to do the transition from p5 to more professional tools. 

### How useful do you consider p5 for you, from 1 (don't need it) to 5 (will use it all the time)?
4 Very useful, I will definitely keep looking for other tools and to integrate interaction with more professional tools like three.js, but I think is very useful. 

### How much did you enjoy working with tree.js, from 1 (hate it) to 5 (love it)?
4 very much. It is very nice to learn the professional workflows of the web and even though it is complex it is something that I can see myself doing in the future more. 
    
### How useful do you consider tree.js for you, from 1 (don't need it) to 5 (will use it all the time)?
4 Very useful, I want to learn more and get skilled at it. I also like that we learned how important is this skill to find a job i the future, it is nice to know what to work towards to. 

### How much did you enjoy working with React, from 1 (hate it) to 5 (love it)?
4 I think is very important and that made it enjoyable for me. 

### How useful do you consider React for you, from 1 (don't need it) to 5 (will use it all the time)?
4 As three.js I want to learn more about it and get skilled at it. THe possibilities are very nice and is something very topical subject. 

### How much did you enjoy working on the exercise tasks, from 1 (hated it) to 5 (loved it)?
4 I really enjoyed it, particularly the fact that we had freedom to do them but that they needed to be connected with the topics of the class. 

### What do you think about the context expansions, e.g., the brief general discussions of certain topics?
Those are very important, I think is nice to reflect about what we do, learn and to see thing from different perspectives. 
    
### Which one was your favorite topic, which one your least favorite?
My favorite topic was emergence because it is closely related to creativity and I associate it to nature and creation of life, not in a religious way, but as something that I admire and feel passionate about. 

My least favorite was probably the higher order functions. I believe it is very important to understand this, but it was vey challenging for me to understand the different ways in which we can write the code for high order functions. Probably some practical exercises in class could help to understand better. 
    
### Was there a topic missing and if so which one?
For my project I looked for tutorials about sound and coding. It would be nice to have a general idea on how to work with pictures, videos and sounds taking into account that we are on a creative program. 

### Please feel free to add any feedback you want to give!
In general I felt very good and I learned a lot! I just think that we should  receive support to solve code problems and learn from our mistakes without having to rely on Chatgpt for example. I think it is very nice that the homeworks do not need to be finished in order to pass, but I would love to be able to correct the mistakes in the frame of a mentoring afterwards  and to be able to see the realisation of my concepts and the concepts of my classmates. I know this was optional, but I believe that the correction and the exchange withing the group about how to solve problems could also be part of the course.


# Learnings
_**Please summarize your personal learnings of the final project and in regard to the whole course. What was challenging for you? How did you challenge yourself?**_

I have definitely a much broader perspective about the way creative coding works. Since I am working with p5 because of the interaction possibilities I have learned how to connect sensors to code-based projects and that is something I always wanted to do. I challenged my self doing what I did not not how to do.  I had no Idea where to start and how to do it, but this course and the personal iterations I have done have taught me how to experiment, learn and what I want to do with this tools. 

I have the impression that this is a very big topic and that the possibilities are enormous, but I am very proud of going beyond what I knew and to explore new paths. I would love to continue this path also with three.js and the web, but to work closely to p5 has brought me a lot of new learning that are successfully integrated into my learning process. 

It was very challenging to make different softwares and codes to work as one integrated system and to incorporate natural elements to be part of the interaction, but I am very proud of my self because I was able to learn, fail, continue and learn more. 

Now I want to share with you my learning path to achieve what you can listen to and watch today. It corresponds to my:

**FIRST ITERATION - p5 & Arduino:**
This is definitely a more technical approach. I will start by learning more about p5 and Arduino, since it is the way I have found to work on the interaction. Coding with JavaScript will allow me to feel more confident and together with Arduino, it will bring me closer to know the creative possibilities of this software-hardware combination. 

* I saw [this series](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) of 36 video tutorials about p5 to understand better. It was made by _"The coding train"_ and it has helped me to improve my skills with Javascript. Here is a screenshot:

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/949900cd5b3fdd735b38c19ce2e8f020cb52416f/Piraz%C3%A1nPalomar/img%20Final/01_Coding%20train.png)

    I learned about syntax, functions, variables, boolean expressions, control structures like conditional statements, nested loops, classes, arrays, load data and object communication. This was very useful to have a better picture of the way it works and to find new possibilities for my project. 

* After this I wanted to focus on sound, so I saw a [second series](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW) of 11 video tutorials, also made  by _"The coding train"_. Here is a screenshot: 

    ![alt image](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/aff373aa27146965e16c64b23d52ef9faaa7578e/Piraz%C3%A1nPalomar/img%20Final/02_Coding%20train_sound.png)

    I learned about loading sounds, creating sliders and buttons, using callback functions instead of the preload functions (which we also learned in CC1). I also learned about how to loop, play, stop and pause sounds. Particularly important was the information about important libraries like _p5.js_, _p5.dom.js_ and _p5.sound.js_. Complementary to this I also learned about functions luke jump(), duration(), addCue() and currentTime(), which I found very important for my project. In addition, I was able to identify and work with the information of the amplitude of the sound, different play modes and even how to create sound synthesis with p5 along with ADSR envelopes. Finally I became aware of the possibilities of using microphone's input, the visualization of sound and the FFT - Frequency analysis. 

* After having gained knowledge about p5 and sound on p5 I decided to learned about Arduino. I found a [series](https://www.youtube.com/playlist?list=PL0beHPVMklwhUxv_DNJ31M5BVrp6Y4SX4) about physical computing, which was not very good. I think Patt Vira, the person behind the series is very talented, but the 3 videos of the series are too basic and are not what she promised at the beginning of the series. In her defence I will say that she started this series 3 months ago and probably in the future she will be able to really explain the connection between arduino and p5, which she hasn't done so far. I had the change to go to the physical computing workshop at the Filmuni this semester and this videos were unfortunately lake a 5% of the workshop we had. I will look for other tutorials that could help me with this part of the project. Here is a screenshot: 


    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/de22af2028c0c110943c6d409a44b76a2e4de4cd/Piraz%C3%A1nPalomar/img%20Final/03_Arduino_Patt%20Vira.png)

* Joel Schaefer from CTECH made a tutorial about motion tracking, that he shared with me: It is called [_"Finger Tracking for Audiovisual Application (LeapMotion + TouchDesigner + Ableton)"_](https://github.com/ctechfilmuniversity/workshop_wi2324_ti/tree/main/Submissions/Schaefer). 

    I learned that you must install the tracking software of the Leap device, Touchdesigner and Ableton and the workflow in order to make the movement of the fingers and hands create variations of sound and sound effects. Particularly interesting for me was the use of samples. I have never worked with Ableton, but it looks like a great tool. I will try now to build my own workflow with p5 and Arduino to achieve something similar.  
    
    SOmething that Joel pointed out, that I find very important is to find an Open Sound Control (OSC) connection between the DAW and the software. I will look for a way to connect Reaper with p5 and Arduino. 

* I found [this tutorial](https://www.youtube.com/watch?v=ZqQgxgnH9wg) very good to understand the sensor I have and the way I can connect it to the Arduino micro controller. I was very happy to discover that the HR - SR04 Ultrasonic sensor I am working with is very good to measure distances. According to Rachel, the tutorial teacher, this sensor is much better than a regular motion sensor like the PIR sensor (passive infrared), because is more nuanced. This means, that it is possible to program different events to be triggers at different distances. It uses echolocation to find out how far objects are. It has 2 transducers, one that transmits ultrasonic pulses (T) and another one that receives it (R)

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/8d3b6582a0962fcc62465e13074cb4c7d0bbf8a8/Piraz%C3%A1nPalomar/img%20Final/04_%20Ultrasonic%20Sensor.png)

* Rachel, the same person who did the previous tutorial also  made [this tutorial](https://youtu.be/ybhMIy9LWFg?si=SIbH8jf4wTOEkhsM) where she uses the ultrasonic sensor to control a Servo. I liked the way se explains and I learned how to apply the map() function to connect different devices.

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/dae269f94b3acece46aa0efb881d6ef23dfbb5f8/Piraz%C3%A1nPalomar/img%20Final/05_%20Ultrasonic%20Sensor%20_%20map.png)

    At this point and following both Tutorials of Rachel I was able to write my code for Arduino: 
    
    >const int trigPin = 9;
    >
    >const int echoPin = 10;
    >
    >float duration;
    >
    >float distanceCM; // in centimeters
    >
    >
    >void setup() {
    >
    >  Serial.begin(9600); //establishes serial communication between your Arduino board and the computer.
    >
    >  pinMode(trigPin, OUTPUT);
    >
    >  pinMode(echoPin, INPUT);
    >
    >}
    >
    >void loop() {
    >
    >//start with a clean signal
    >
    >  digitalWrite(trigPin, HIGH);
    >
    >  delayMicroseconds(2);
    >
    >//send trigger signal
    >
    >  digitalWrite(trigPin, HIGH);
    >
    >  delayMicroseconds(10);
    >
    >  digitalWrite(trigPin, LOW);
    >
    >//return pulse duration in microseconds
    >
    >//if set to HIGH; pulseIn() waits for the pin to go from LOW to HIGH
    >
    >// stops timing when pin goes back LOW
    >
    >  duration = pulseIn(echoPin, HIGH);
    >
    >//convert m/s (of speed of sound) to in/microsec
    >
    >//343 m/s = 0.034 com/microseconds
    >
    >  distanceCM = (duration * 0.034) / 2;
    >
    >// print distance
    >
    >  // Serial.print("Distance: ");
    >
    >  Serial.println(distanceCM);
    >
    >  // Serial.println("cm");
    >
    >  delay(100); //to slow down the readings to read better
    >
    >}
    >

* I found what I was looking for! A way to connect arduino and p5. I found [this tutorial](https://youtu.be/MtO1nDoM41Y?si=cuyPiSBj3mmTh_Q8) where I learned that a program is needed to allow Javascript in the browser to access the serial ports of my computer. It is a JS App called _"**p5.serialcontrol**"_ Here is a screenshot: 

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/ab06dc57442c39f405cebbf041243d88d037eac3/Piraz%C3%A1nPalomar/img%20Final/06_%20connection%20p5_arduino%20and%20sensor.png)

* I tried to follow the tutorial, but I got an error on the p5.serialcontrol, even though everything looks good on the Arduino software: 
   
    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/f012a27f1be0e3862dfefcb569b2ae6a4a8291c1/Piraz%C3%A1nPalomar/img%20Final/07_%20error%20p5%20serialcontrol.png)

* I thought the error was because the tutorial I saw was made using MAC, so I watched [this tutorial](https://youtu.be/MHJ6KpgE7j4?si=z0MKOeLMro4rJOvZ) since it was made using Windows. But I discovered that I should not have errors, because the person from the tutorial did not have any issues. I really recommend this tutorial, it helped me understand how to connect the arduino with p5 better. For example, it is very important to write on the html file the **_p5.serialcontrol.js_** library in order to complete the connection. Not only the software is required to do so. 
    
    This is what I wrote on the HTML file of my p5 sketch to add the library of p5.serialcontrol, based on this tutorial: 

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/7ff48cbc731721c2f664f084275d8275a85d0db7/Piraz%C3%A1nPalomar/img%20Final/09_paste%20code%20in%20the%20html.png)

* I was able to solve the error by closing the Arduino software and work with the p5.serialcontrol. It seems like since both programs want to get the information that the sensor is receiving, but it can only be read in one of the softwares at the time, at least in my case. 
    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/80f06a040bba4051b09e4c861d51bade3306fb82/Piraz%C3%A1nPalomar/img%20Final/08_solved%20error.png) 

    As you can see on the picture, Arduino gets the error now but I still get the information of the sensor where I really need: p5.serialcontrol.

* I want to use the measured distance of the sensor as the defining element of the volume of one of the sound samples on p5.   On the p5 web editor, in addition to what I already have, I uploaded 2 sounds. To do so I clicked on the "+" and I uploaded the sound file. p5 will only let you upload a maximum of 5mb, so make sure the files are not bigger than that.

    I got the sound files from  https://www.freesound.org and since it was bigger than 5mb I used this website to compress it: https://www.onlineconverter.com/compress-mp3 it is now 3.5mb.  Here is the information of the author: _Atmospheric Landscape for Meditation Relaxation and Yoga by Muyo5438 -- freesound.org/s/718704/ -- License: Attribution 4.0_. This first sound will be static and be used as a "base", while the second one (ocean waves) will be louder or quieter according to the distance read by the sensor. I will also use the data of the sensor to draw circles with a size that depends on how far the person is to the sensor.

* At this point I thought I had everything ready, I was even having data flowing from the sensor, to the Arduino software, to the p5.serialcontrol to my p5 sketch in my browser. I could see the changing values of the distance on the serial console of the p5.serialcontrol and on the console of my p5 sketch. However, when I was trying to use the variable that has all the values of the distance changes "reported" by the sensor p5 would tell me that it was "undefined". I tried different solutions and I rewatched the tutorials trying to find an answer. I tried to solve it myself and I could not understand what the problem was. I decided to ask ChatGPT at this point, not only to have an answer, but also to ask it to explain to me what I have done wrong. 

    This was the original code I had on my p5 sketch: 

     > let song; 
     >
     >let serial;
     >
     >let latestData;
     >
     >let newVol;
    >
    > function preload(){
    >
    >song = loadSound('718704-muyo5438-atmospheric-land.mp3')
    >
    >}
    >
    >
    >function setup() {
    >
    >createCanvas(windowWidth, windowHeight);
    >
    >serial = new p5.SerialPort();
    >
    >serial.open("COM5");
    >
    >serial.on("data", gotData);
    >
    >song.play();
    >
    >// map the distance (CM) to the volume of the sound. Closer is quiter and farther is lauder. 
    >
    >let newVol = map(latestData,5,200,0, 1);
    >
    >let col = map(latestData,5, 200, 0, 255);
    >
    >}
    >
    >function draw() {
    >
    >background(latestData);
    >
    >song.setVolume(newVol);
    >}
    >
    >function gotData() {
    >
    >let currentString = serial.readLine();
    >
    >trim(currentString);
    >
    >if (!currentString) return;
    >
    >latestData = parseInt(currentString);   // Update latestData with parsed sensor value
    >
    >console.log(latestData); // Debugging line
    >
    >}
    >

    I asked chatGPT and my problem was the order. I learned 2 important things: 
    1) I was trying to use the "latestData" variable in setup along with a map() function ir order to adjust the ranges of the background color and the sound volume, but since that variable depends on the callback function "gotData" and the programming model of Javascript is asynchronous, I was calling a function that was not ready to deliver the information about the values of the sensor. I moved the map functions and the "latestData" variable to draw() so the gotData callback function can be ready to deliver the information I need when draw() updates. 
    2) I learned from ChatGPT that I can use "(latestData !== undefined)" as a condition on my draw() function to ensure that "latestData" has a valid value before using it as a vavalid variable in the map() functions.

    The working code is:
    
    >let song; 
    >
    >let serial;
    >
    >let latestData;
    >
    >let newVol;
    >
    >function preload() {
    >
    >song = loadSound('718704-muyo5438-atmospheric-land.mp3');
    >
    >}
    >
    >function setup() {
    >
    >createCanvas(windowWidth, windowHeight);
    >  
    >serial = new p5.SerialPort();
    >
    >serial.open("COM5");
    >
    >serial.on("data", gotData);
    >
    >song.play();
    >
    >}
    >
    >function draw() {
    >
    >  // Ensure latestData has a valid value before using it
    >
    > if (latestData !== undefined) {
    >
    > // Map the distance (CM) to volume (closer is quieter, farther is louder)
    >
    > newVol = map(latestData, 5, 200, 0, 1);
    > 
    > let col = map(latestData, 5, 200, 0, 255);
    >
    > background(col);  // Set background color based on distance
    >
    >// Update sound volume based on the distance
    >
    >song.setVolume(newVol);
    >
    >   }
    >
    >}
    >
    >// Handle incoming serial data
    >
    > function gotData() {
    >
    >  let currentString = serial.readLine();
    >
    >  trim(currentString);
    >
    >  if (!currentString) return;
    >
    >  latestData = parseInt(currentString); // Update latestData with parsed sensor value
    >   
    > console.log(latestData); // Debugging line
    > 
    > }
    > 

* I took this chance and used this experiments to do the assignment for _**Technology Introductions**_ and I did a tutorial that it is available [here](https://miro.com/app/board/uXjVIcMXxjI=/?share_link_id=450052392297) where it is possible to see my partial results until now.  The final version of my p5 sketch is available [here](https://editor.p5js.org/dlpp/sketches/Xm-Me1geI). 

    The video with the results that is also available on my tutorial is here:
[![Tutorial: Sensors + Arduino + p5 = Interactive artistic tool!](https://img.youtube.com/vi/XZovjXTPFMI/0.jpg)](https://www.youtube.com/watch?v=XZovjXTPFMI "Tutorial: Sensors + Arduino + p5 = Interactive artistic tool!") 


* On this iteration process I wanted to get closer to nature, since I am working with a Ceiba Forest for my Orientierungsprojekt. I want to fusion my new discoveries. That is the reason why I decided to watch a series of p5 coding called _"[Algorithmic Botany](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bxNsa_3SfCPyF9Md9XvXhR)"_ by "The coding train": 

    Here is a screenshot:

    ![alt text](https://github.com/ctechfilmuniversity/project_ws2425_first_term/blob/9650592e31875df946ffb4e17d88aaf958f2ea7c/Piraz%C3%A1nPalomar/img%20Final/10_Botany.png)


    In this series I learned different ways in which one can generate trees and fractal forms. The 3 tutorials that I liked the most where:
    * The one about "Barnsley Fern", because it brings together the mathematical calculations of nature and the functions that researchers have defined in order to understand the "logic" of nature. When using those functions and adjust the proven probability of those patterns we can create wonderful natural forms.  

    * The one about "phyllotaxis", the spirals that form a distinctive class of patterns in nature. _phýllon_ means leave and _táxis_ means arrangement both in ancient greek. FOr this it is necessary to transform the polar coordinates to cartesian coordinates. Similar to the Barnsley Fern, this tutorial takes a mathematical information and uses it as a creative tool. 

    * The third one was veeeeery long (more than 3 hours), it was a live recording and the last video of that tutorial. The Professor shows how he implements a physics library on his sketch. THe library is called _Toxiclibs.js_ and the worked with recursion, when an object or function is being defined by itself, with particles and with springs. This vas very advanced for me, but it gave me an idea on how to work with physics when programming. It was also interesting to see how the professor was struggling, finding solutions to the problems that came up in order to train the algorithmic thinking and get an idea on how to create a virtual world with similar physic rules.  






_**The rest of the process was already described in the previous sections of this document.**_
