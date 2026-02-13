function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

export default Toast;