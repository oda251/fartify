const createChildEffect = (scale = 1): HTMLElement => {
  const size = (Math.random() * 0.5 + 0.1) * scale;
  const angle = Math.random() * 360;
  const elem = document.createElement("div");
  elem.className = "click-effect-fragment";
  elem.style.cssText = `
    --angle: ${angle}deg;
    --blur: ${0.5 * scale}rem;
    top: ${-size / 2}rem;
    left: ${-size / 2}rem;
    width: ${size}rem;
    height: ${size}rem;
  `;
  return elem;
};

const visualEffect = async (pos: { x: number; y: number }, scale?: number) => {
  const div = document.createElement("div");
  div.className = "click-effect-container";
  div.style.cssText = `
    top: ${pos.y}px;
    left: ${pos.x}px;
    --angle: ${Math.random() * 120 - 60}deg;
    --distance: ${18 * (scale ? scale : 1)}rem;
    --pre-timespan: ${3 * (scale ? scale : 1)}s;
    --after-timespan: 1s;
  `;
  const fragment = document.createDocumentFragment();
  const fSize = 3 + 2 * (scale ? scale : 1);
  const animations: Promise<Animation>[] = [];
  for (let i = 0; i < fSize; i++) {
    fragment.appendChild(createChildEffect(scale));
  }
  div.appendChild(fragment);
  document.body.appendChild(div);
  for (let i = 0; i < fSize; i++) {
    animations.push(
      ...div.children[i].getAnimations().map((animation) => animation.finished)
    );
  }
  animations.push(
    ...div.getAnimations().map((animation) => animation.finished)
  );
  console.log(animations.length);
  Promise.all(animations).then(() => div.remove());
};

export default visualEffect;
