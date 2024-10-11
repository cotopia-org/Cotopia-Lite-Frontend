import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Slide from "./slide";

type Props = {
  children: ReactNode;
};

const SlideContext = createContext<{
  slides: ReactNode[];
  push: (slide: ReactNode) => void;
  back: () => void;
  width: number;
  camera: number;
}>({
  slides: [],
  push: (slide: ReactNode) => {},
  back: () => {},
  width: 0,
  camera: 0,
});

export const useSlides = () => useContext(SlideContext);

export default function SlidePusher({ children }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!parentRef?.current) return;

    setWidth(parentRef.current.getBoundingClientRect().width);
  }, []);

  const [camera, setCamera] = useState(0);

  const [slides, setSlides] = useState<ReactNode[]>([]);

  const moveForward = () => {
    setTimeout(() => {
      setCamera((prev) => prev + 1);
    }, 100);
  };

  const moveBack = () => {
    setTimeout(() => {
      setCamera((prev) => {
        if (prev > 0) return prev - 1;

        return 0;
      });
    }, 100);
  };

  const handlePushSlide = (slide: ReactNode) => {
    setSlides((prev) => [...prev, slide]);
    moveForward();
  };

  const handleBackSlide = () => {
    setSlides((prev) => {
      prev.pop();

      return prev;
    });

    moveBack();
  };

  useEffect(() => {
    if (slides.length === 0 && children) handlePushSlide(children);
  }, [children]);

  return (
    <SlideContext.Provider
      value={{
        width,
        camera,
        slides,
        push: handlePushSlide,
        back: handleBackSlide,
      }}
    >
      <div className='relative h-full flex-grow'>
        <div
          ref={parentRef}
          className='viewport flex flex-row w-full h-full absolute top-0 left-0 transition-all'
          style={{
            transform: `translateX(${-1 * (camera - 1) * width}px)`,
          }}
        >
          {slides.map((x, key) => (
            <Slide key={key} index={key}>
              {x}
            </Slide>
          ))}
        </div>
      </div>
    </SlideContext.Provider>
  );
}
