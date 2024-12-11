const getRelativeMousePosition = (event: MouseEvent | React.MouseEvent) => {
  const rect = document.body.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export default getRelativeMousePosition;
