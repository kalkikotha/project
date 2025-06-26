import "./Modal.css"; // Create a CSS file for styling
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import close from "../assets/close.svg";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const { zoomTo } = zoomPluginInstance;

  // In your component
  useEffect(() => {
    if (isOpen) {
      zoomTo(SpecialZoomLevel.PageFit);
    }
  }, [isOpen]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onContextMenu={(e) => e.preventDefault()}>
        <img
          src={close}
          alt="close"
          onClick={onClose}
          className="close-button"
        />
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={content}
            // plugins={[defaultLayoutPluginInstance]}
            plugins={[zoomPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default Modal;
