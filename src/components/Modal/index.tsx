import React from 'react';
import { IoClose } from 'react-icons/io5';
import './style.css';

interface Props {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: Props) {
  const { isOpen, title, children, onClose } = props;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>

          <button className="modal-close" type="button" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
