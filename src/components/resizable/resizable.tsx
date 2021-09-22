import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import debounce from "lodash/debounce";
import "./resizable.css";

interface Props {
  axis: "x" | "y";
}

const Resizable: React.FC<Props> = ({ axis, children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  const options: ResizableBoxProps =
    axis === "x"
      ? {
          className: "resize-horizontal",
          resizeHandles: ["e"],
          minConstraints: [windowWidth * 0.2, Infinity],
          maxConstraints: [windowWidth * 0.8, Infinity],
          width,
          height: Infinity,
          onResizeStop: (_, { size: { width } }) => {
            setWidth(width);
          },
        }
      : {
          resizeHandles: ["s"],
          minConstraints: [Infinity, 24],
          maxConstraints: [Infinity, windowHeight * 0.9],
          width: Infinity,
          height: 300,
        };

  useEffect(() => {
    const onResize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      if (width > window.innerWidth * 0.8) {
        setWidth(window.innerWidth * 0.8);
      } else if (width < window.innerWidth * 0.2) {
        setWidth(window.innerWidth * 0.2);
      }
    }, 100);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [width]);

  return (
    <ResizableBox axis={axis} {...options}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
