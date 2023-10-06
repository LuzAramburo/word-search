import { useWordSearchContext } from '@/context/WordSearchContext.tsx';
import useMousePosition from '@/useMousePosition.tsx';

export const CollectedLetters = () => {
  const { collectedLetters } = useWordSearchContext();
  const mousePosition = useMousePosition();

  return (
    <div
      className="flex gap-1 fixed"
      style={{
        top: mousePosition.y ? mousePosition.y + 15 : -100,
        left: mousePosition.x ? mousePosition.x + 10 : -100,
      }}
    >
      {collectedLetters.length > 0 && collectedLetters.map(item => (
        <div
          className="
          w-8 h-8
          border
          border-gray-400
          flex
          justify-center
          items-center
          select-none
          cursor-pointer
          bg-gray-100
          rounded-sm"
          key={item.position}
        >{item.letter}</div>
      ))}
    </div>
  );
};
