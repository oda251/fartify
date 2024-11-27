export async function addCallbackToElements(
  target: Document | Element,
  query: string,
  event: string,
  callback: (event: Event) => void
) {
  // get config and blinds
  let elements = Array.from(target.querySelectorAll(query));
  // add event listeners
  elements.forEach((elem) => {
    elem.removeEventListener(event, callback);
    elem.addEventListener(event, callback);
  });
}

export async function removeCallbackFromElements(
  query: string,
  event: string,
  callback: (event: Event) => void
) {
  // get config and blinds
  let elements = Array.from(document.querySelectorAll<HTMLElement>(query));
  // remove event listeners
  elements.forEach((elem) => {
    elem.removeEventListener(event, callback);
  });
}
