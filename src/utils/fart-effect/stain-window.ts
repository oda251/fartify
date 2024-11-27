import Config from "@config";

let depth = 0;
const maxOpacity = 0.4;

const calcOpacity = (depth: number) => {
  const opacity = depth / 90 - 0.1;
  return opacity < 0 ? 0 : opacity > maxOpacity ? maxOpacity : opacity;
};

export const stainWindow = () => {
  const stains = Array.from(
    document.querySelectorAll<HTMLElement>(".fart-stain")
  );
  if (stains.length === 0) {
    depth = 0;
    const stain = document.createElement("div");
    stain.classList.add("fart-stain");
    stain.style.backgroundColor = Config.stainColor.default;
    document.body.appendChild(stain);
  } else {
    depth++;
    stains.forEach((stain) => {
      stain.style.opacity = calcOpacity(depth).toString();
    });
  }
};

export const clearStain = () => {
  const stains = Array.from(
    document.querySelectorAll<HTMLElement>(".fart-stain")
  );
  stains.forEach((stain) => {
    stain.remove();
  });
  depth = 0;
};
