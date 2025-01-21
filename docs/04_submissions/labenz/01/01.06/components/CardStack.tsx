'use client';
import { motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';
// @ts-expect-error lodash-move is not typed
import move from 'lodash-move';

interface CardStackProps<T> {
  items: T[];
  renderCard: (item: T) => ReactElement;
  getId: (item: T) => string | number;
  maxCards?: number;
  isNextCardOnCardClick?: boolean;
}

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;
const ROTATION_FACTOR = 3;
const DEFAULT_MAX_CARDS = 8;

export const CardStack = <T,>({
  items,
  renderCard,
  getId,
  maxCards = DEFAULT_MAX_CARDS,
  isNextCardOnCardClick = true,
}: CardStackProps<T>) => {
  const [rotations, setRotations] = useState<Record<string, number>>();
  const [cards, setCards] = useState([...items]);
  const [dragIndex, setDragIndex] = useState<null | number>(null);

  useEffect(() => {
    // TODO: make better
    setCards([...items]);
  }, [items]);

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  useEffect(() => {
    const rot: { [key: string]: number } = {};
    items.forEach((item) => {
      rot[getId(item).toString()] = ROTATION_FACTOR * (Math.random() - 0.5);
    });
    setRotations(rot);
  }, [items, getId]);

  const nextCard = () => {
    moveToEnd(0);
  };

  return (
    <ul className="relative">
      {cards.map((item, index) => {
        if (index >= maxCards) return null;

        const isFirst = index === 0;
        const isLast = index === Math.min(maxCards - 1, cards.length - 1);
        const itemId = getId(item).toString();

        return (
          <motion.li
            key={itemId}
            onClick={isNextCardOnCardClick ? nextCard : undefined}
            className={`absolute h-full top-0 origin-top min-h-fit ${
              isFirst && 'cursor-grab active:cursor-grabbing'
            }`}
            initial={{
              x: 0,
              y: 0,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: maxCards - index,
              translateX: '-50%',
              translateY: '-50%',
              rotate: rotations ? rotations[itemId] : 0,
            }}
            animate={{
              x: 0,
              y: index * -CARD_OFFSET,
              scale: dragIndex === index ? 1.15 : 1 - index * SCALE_FACTOR,
              zIndex: maxCards - index,
              translateX: '-50%',
              translateY: '-50%',
              rotate:
                rotations && !(dragIndex === index) ? rotations[itemId] : 0,
            }}
            transition={
              isLast || isFirst
                ? {
                    type: 'spring',
                    stiffness: 150,
                    damping: 12,
                  }
                : {
                    type: 'spring',
                    stiffness: 150,
                    damping: 12,
                    delay: 0.07 * index,
                    zIndex: { delay: 0 },
                  }
            }
            drag={isFirst ? true : false}
            onDragStart={() => {
              setDragIndex(index);
            }}
            dragConstraints={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onDragEnd={() => {
              setDragIndex(null);
              moveToEnd(index);
            }}
          >
            {renderCard(item)}
          </motion.li>
        );
      })}
    </ul>
  );
};
