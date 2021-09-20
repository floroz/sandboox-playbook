import { ResizableBox } from "react-resizable";
import "./resizable.css";

interface Props {
  axis: "x" | "y";
  onResizeStart: () => void;
  onResizeStop: () => void;
}

const Resizable: React.FC<Props> = ({
  axis,
  children,
  onResizeStart,
  onResizeStop,
}) => {
  return (
    <ResizableBox
      width={Infinity}
      height={300}
      axis={axis}
      resizeHandles={["s"]}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
