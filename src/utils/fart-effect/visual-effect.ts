const visualEffect = (pos: { x: number; y: number }) => {
  const fontSize = Math.random() * 2 + 2;
  const div = document.createElement("div");
  div.classList.add("fart-container");
  div.style.fontSize = `${fontSize}rem`;
  div.style.top = `${pos.y}px`;
  div.style.left = `${pos.x}px`;
  const childs = childEffect();
  div.append(...childs);
  div.addEventListener("animationend", () => div.remove());
  document.body.appendChild(div);
};

const childEffect = (): HTMLElement[] => {
  const arr = Array.from({ length: Math.ceil(Math.random() * 5 + 5) }, () => {
    const elem = document.createElement("div");
    elem.classList.add("fart-effect");
    elem.style.top = `${Math.random() * 5 - 2.5}rem`;
    elem.style.left = `${Math.random() * 8 - 3}rem`;
    elem.style.boxShadow = `0 0 ${
      Math.random() * 4 + 3
    }rem 0.5rem var(--fart-color)`;
    return elem;
  });
  return arr;
};

export default visualEffect;
