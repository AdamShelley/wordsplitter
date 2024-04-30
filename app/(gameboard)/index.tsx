import React from "react";
import TextWithInsertion from "./text-style";

type Props = {
  gameStarted: (value: boolean) => void;
};

const text = "kadjskhelloflakjdflkjefworldlajdflkejjflkejf";

const GameBoard = ({ gameStarted }: Props) => {
  return (
    <div className="mt-5">
      <TextWithInsertion
        text="aelaelfHellolaekfworldlksf"
        gameStarted={gameStarted}
      />
    </div>
  );
};

export default GameBoard;
