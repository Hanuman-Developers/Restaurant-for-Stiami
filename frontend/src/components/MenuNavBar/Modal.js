import React from "react";
import { CartState } from "../../context/cartItem_context";
import { FaTimes } from "react-icons/fa";
import "./VerticalNav.css";

const Modal = () => {
  const { isModalOpen, closeModal } = CartState();
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3>modal content</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  );
};

export default Modal;
