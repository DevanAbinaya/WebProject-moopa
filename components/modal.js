export default function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black bg-opacity-50" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`shadow rounded-xl p-6 transition-all ${
          open ? "scale-125 opacity-100" : "scale-100 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
