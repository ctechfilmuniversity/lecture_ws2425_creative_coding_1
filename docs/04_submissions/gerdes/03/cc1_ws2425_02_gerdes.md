---
layout: default
title: Homework
nav_exclude: true
---

### Task 03.02

As I am trying to familiarize myself more with React and have used Three.js in the [past](https://github.com/whatphilipcodes/inter/tree/master/src_frontend/three), I saw the opportunity to get started with [R3F](https://github.com/pmndrs/react-three-fiber). React Three Fiber acts as a React renderer for Three.js and allows for a component-based approach to creating 3D scenes.

Because of that my project file differs from the task suggestion. Since it is still bundled using Vite all commands should work as expected:

`cd` into `.code/03-03/`

```bash
pnpm i && pnpm dev
```

### Task 03.03

> My First React Fiber Scene

![](./img/preview.gif)

With this task I focused on experimentation with the libraries at first, as I am both not proficient with React (mainly used Vue & Nuxt in the past) and have never used R3F or Drei before. After a bit of trial and error I had a basic scene setup with some nice post-processing effects. From there, I started to think about what I wanted to display. My first idea was to create a fly-over above an abstract city generated from basic shapes. After I completed the Building component I realized however that the time left would not allow for an entire city algorithm that would actually look good (eg. using maze generation for a road network). Instead I opted to display a single building with a rotating camera around it. Even though the environment texture goes beyond geometric shapes exclusively, it adds to the overall aesthetic and mood of the scene.

### Learnings

- Setup and Configuration of React Three Fiber -> [Template Repository](https://github.com/whatphilipcodes/three-init)
- Familiarization with R3F components
- Basic Familiarization with Drei
- Bonus: Migration to Tailwind 4.0
