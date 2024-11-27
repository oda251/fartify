const getRelativeMousePosition = (event: MouseEvent | React.MouseEvent) => {
  const rect = document.body.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log(`scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`);
  console.log(`rect.left: ${rect.left}, rect.top: ${rect.top}`);
  console.log(
    `event.clientX: ${event.clientX}, event.clientY: ${event.clientY}`
  );
  console.log(
    `event.clientX + scrollLeft - rect.left: ${
      event.clientX + scrollLeft - rect.left
    }, event.clientY + scrollTop - rect.top: ${
      event.clientY + scrollTop - rect.top
    }`
  );
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export default getRelativeMousePosition;
