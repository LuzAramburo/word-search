type WordListProps = {
  wordsList: string[]
};

export const WordList = ({ wordsList }: WordListProps) => {
  return (
    <ul className="grid-span-1 border border-gray-400 p-4">
      { wordsList.length > 0 && wordsList.map((item, index) => (
        <li
          className="text-xl mb-3 uppercase"
          key={index}>{item}</li>
      )) }
    </ul>
  );
};
