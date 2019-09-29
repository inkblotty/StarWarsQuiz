const hexToRgb = (hex : string) : { r : number, g : number, b: number } | null => {
  // http://stackoverflow.com/a/5624139
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const rgba = (hex : string, alpha : number) : string => {
  const color = hexToRgb(hex);
  if (color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }
  return hex;
};

const focusables = 'button:not([disabled]),textarea:not([disabled]),a:not([disabled]),\
select:not([disabled]),[tabindex]:not([tabindex="-1"]),\
input:not([disabled]):not([type="hidden"]):not([hidden]),[role="option"]';
export const focusOnFirst = () => {
  if (window && document) {
    const allElems = document.querySelectorAll(focusables);
    if (allElems && !!allElems[0]) {
      console.log('focusing on : ', allElems[0]);
      // @ts-ignore
      allElems[0].focus();
    }
  }
}