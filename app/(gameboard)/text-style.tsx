"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TextWithInsertionProps = {
  text: string;
};

interface Character {
  char: string;
  id: number;
  isNew: boolean;
}

interface SelectionRange {
  start: number;
  end: number;
}

const TextWithInsertion: React.FC<TextWithInsertionProps> = ({ text }) => {
  const [characters, setCharacters] = useState<Character[]>(
    text.split("").map((char, index) => ({
      char: char,
      id: index,
      isNew: false,
    }))
  );

  const [selections, setSelections] = useState<SelectionRange[]>([]);
  const [currentStart, setCurrentStart] = useState<number | null>(null);
  const [currentEnd, setCurrentEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastId = useRef(characters.length);

  const handleDragStart = (index: number) => {
    setCurrentStart(index);
    setCurrentEnd(index);
    setIsDragging(true);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging) {
      setCurrentEnd(index);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (currentStart !== null && currentEnd !== null) {
      setSelections((prevSelections) => [
        ...prevSelections,
        {
          start: Math.min(currentStart, currentEnd),
          end: Math.max(currentStart, currentEnd),
        },
      ]);

      if (!gameStarted) {
        toast("Game started!");
        setGameStarted(true);
      }

      setCurrentStart(null);
      setCurrentEnd(null);
    }
  };

  const isIndexSelected = (index: number) => {
    return selections.some(({ start, end }) => index >= start && index <= end);
  };

  useEffect(() => {
    const div = contentRef.current;
    if (!div) return;

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging) return;
      const touch = event.touches[0];
      const targetElement = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement;
      if (targetElement && targetElement.dataset.index) {
        const targetIndex = parseInt(targetElement.dataset.index, 10);
        setCurrentEnd(targetIndex);
      }
      event.preventDefault();
    };

    div.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      div.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      const newString = "More text appears here ";
      const newCharacters = newString.split("").map((char, index) => ({
        char: char,
        id: lastId.current++,
        isNew: true,
      }));
      setCharacters((oldCharacters) => [...oldCharacters, ...newCharacters]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  return (
    <div
      className="relative cursor-text p-5 flex flex-wrap max-h-[70vh]"
      ref={contentRef}
      style={{ maxWidth: "100%", overflow: "hidden" }}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
    >
      {characters.map(({ char, id, isNew }, index) => {
        const isSelected = isIndexSelected(index);
        const isCurrentlySelected =
          currentStart !== null &&
          currentEnd !== null &&
          index >= Math.min(currentStart, currentEnd) &&
          index <= Math.max(currentStart, currentEnd);
        const spanClass = isSelected
          ? "text-gray-400 border-b-2 border-gray-400"
          : isCurrentlySelected
          ? "bg-gray-500 rounded-xs text-white"
          : "border-b-2 border-transparent";

        return (
          <span
            key={id}
            className={`text-4xl tracking-wide select-none cursor-pointer inline ${spanClass} max-h-[70vh] overflow-hidden`}
            onMouseDown={() => handleDragStart(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onTouchStart={() => handleDragStart(index)}
            data-index={index}
            style={{
              lineHeight: "2rem",
              padding: "0.2rem 0.1rem",
              animation:
                isNew && gameStarted ? "rushUp 1.5s ease-out forwards" : "none",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextWithInsertion;
