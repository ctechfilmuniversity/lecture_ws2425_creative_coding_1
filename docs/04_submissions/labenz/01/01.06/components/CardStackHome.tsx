'use client';
import { DisplayMode } from '@/utils/types';
import { FC } from 'react';
import { CardStack } from './CardStack';
import QuestionCard from './QuestionCard';

const items: DisplayMode[] = [
  {
    mode: 'display',
    question: {
      id: '1',
      text: 'If their year was a music album, which song would have become the surprise hit?',
      answer:
        "The 'Great Pizza Marathon of March' - a power ballad about that night when you ordered from three different places because you couldn't decide, and somehow ended up hosting an impromptu pizza tasting party for the entire floor of your building.",
    },
  },
  {
    mode: 'display',
    question: {
      id: '2',
      text: 'What was their most loveable chaos project in 2024?',
      answer:
        "That time you decided to 'slightly reorganize' your apartment and ended up creating a mini indoor jungle complete with fairy lights and a hammock. Your 'it's just a few plants' turned into 47 green roommates and honestly? It's the most you thing ever and we love it.",
    },
  },
  {
    mode: 'display',
    question: {
      id: '3',
      text: 'If you filled a time capsule with one object that best describes their 2024 - what would you put in?',
      answer:
        "That ridiculous emergency umbrella you bought in Japan - the one that looks like a lettuce leaf. It perfectly captures how you turned every 'oh no' moment into an 'oh well, might as well make it fun' story this year.",
    },
  },
  {
    mode: 'display',
    question: {
      id: '4',
      text: 'What new quirk did they develop in 2024 that you secretly find charming?',
      answer:
        "You started naming all your tech devices after Renaissance artists and now dramatically apologize to 'Leonardo' when your laptop crashes or ask 'Michelangelo' (your phone) if it needs a moment to think. It's ridiculously endearing.",
    },
  },
  {
    mode: 'display',
    question: {
      id: '5',
      text: 'What was your most beautiful coincidental moment together this year?',
      answer:
        "Running into you at that tiny café in Berlin when neither of us knew the other was even in Germany. You were on your 'spontaneous Europe trip' and I was there for work. We ended up spending the whole day getting lost in the city and it became the best unplanned adventure of the year.",
    },
  },
  {
    mode: 'display',
    question: {
      id: '6',
      text: 'What was the biggest challenge they mastered this year?',
      answer:
        "Moving to a new city alone was huge for you. But the way you turned your fear of 'not knowing anyone' into this amazing talent for bringing people together - from your legendary 'Tuesday Taco Transitions' (helping other newcomers) to creating that neighborhood book club that now has a waiting list. You didn't just adapt, you created a whole community.",
    },
  },
];

const CardStackHome: FC = ({}) => {
  return (
    <CardStack
      items={items}
      renderCard={(item) => (
        <QuestionCard mode="display" question={item.question} />
      )}
      getId={(item) => item.question.id}
    />
  );
};

export default CardStackHome;
