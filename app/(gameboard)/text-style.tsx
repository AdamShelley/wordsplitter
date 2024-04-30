"use client";

import React, { useState, useEffect } from "react";

type TextWithInsertionProps = {
  text: string;
  gameStarted: (value: boolean) => void;
};

const useTypingEffect = (
  text: string,
  duration: number,
  isTypeByLetter = false
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const items = isTypeByLetter ? text.split("") : text.split("");

  useEffect(() => {
    setCurrentPosition(0);
  }, [text]);

  useEffect(() => {
    if (currentPosition >= items.length) return;

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPosition, items, duration]);

  return items.slice(0, currentPosition).join("");
};

const texts = ["kadjskhelloflakjdflkjefworldlajdflkejjflkejf"];

const TIME_TO_FADE = 300;
const TIME_INTERVAL = 3000;
const TIME_PER_LETTER = 100;

// TODO: Add a typing effect to the text

const TextWithInsertion: React.FC<TextWithInsertionProps> = ({
  text,
  gameStarted,
}) => {
  const [characters, setCharacters] = useState(text.split(""));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleClick = (index: number) => {
    gameStarted(true);

    const newChars = [...characters];
    newChars.splice(index, 0, " ");
    setCharacters(newChars);
  };

  return (
    <div className="inline-block relative cursor-text">
      {characters.map((char, index) => (
        <React.Fragment key={index}>
          {index === hoverIndex && (
            <span className="text-4xl tracking-wider select-none cursor-none">
              |
            </span>
          )}
          <span
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            className="text-4xl tracking-wider select-none cursor-none"
          >
            {char}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextWithInsertion;
