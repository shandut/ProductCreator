'use strict';

var clamp = require('./clamp.js');
var roundNumberToDecimalPlaces = require('./roundNumberToDecimalPlaces.js');

function rgbString(color) {
  const {
    red,
    green,
    blue
  } = color;
  if ('alpha' in color) {
    return `rgba(${red}, ${green}, ${blue}, ${color.alpha})`;
  } else {
    return `rgb(${red}, ${green}, ${blue})`;
  }
}
const rgbaString = rgbString;
function rgbToHex({
  red,
  green,
  blue
}) {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}
function componentToHex(component) {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function hsbToHex(color) {
  return rgbToHex(hsbToRgb(color));
}
function rgbFromHueAndChroma(hue, chroma) {
  const huePrime = hue / 60;
  const hueDelta = 1 - Math.abs(huePrime % 2 - 1);
  const intermediateValue = chroma * hueDelta;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime <= 1) {
    red = chroma;
    green = intermediateValue;
    blue = 0;
  }
  if (huePrime >= 1 && huePrime <= 2) {
    red = intermediateValue;
    green = chroma;
    blue = 0;
  }
  if (huePrime >= 2 && huePrime <= 3) {
    red = 0;
    green = chroma;
    blue = intermediateValue;
  }
  if (huePrime >= 3 && huePrime <= 4) {
    red = 0;
    green = intermediateValue;
    blue = chroma;
  }
  if (huePrime >= 4 && huePrime <= 5) {
    red = intermediateValue;
    green = 0;
    blue = chroma;
  }
  if (huePrime >= 5 && huePrime <= 6) {
    red = chroma;
    green = 0;
    blue = intermediateValue;
  }
  return {
    red,
    green,
    blue
  };
}

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

function hsbToRgb(color) {
  const {
    hue,
    saturation,
    brightness,
    alpha = 1
  } = color;
  const chroma = brightness * saturation;
  let {
    red,
    green,
    blue
  } = rgbFromHueAndChroma(hue, chroma);
  const chromaBrightnessDelta = brightness - chroma;
  red += chromaBrightnessDelta;
  green += chromaBrightnessDelta;
  blue += chromaBrightnessDelta;
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha
  };
}

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

function hslToRgb(color) {
  const {
    hue,
    saturation,
    lightness,
    alpha = 1
  } = color;
  const chroma = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);
  let {
    red,
    green,
    blue
  } = rgbFromHueAndChroma(hue, chroma);
  const lightnessVal = lightness / 100 - chroma / 2;
  red += lightnessVal;
  green += lightnessVal;
  blue += lightnessVal;
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha
  };
}

// ref https://en.wikipedia.org/wiki/HSL_and_HSV
function rgbToHsbl(color, type = 'b') {
  const {
    alpha = 1
  } = color;
  const red = color.red / 255;
  const green = color.green / 255;
  const blue = color.blue / 255;
  const largestComponent = Math.max(red, green, blue);
  const smallestComponent = Math.min(red, green, blue);
  const delta = largestComponent - smallestComponent;
  const lightness = (largestComponent + smallestComponent) / 2;
  let saturation = 0;
  if (largestComponent === 0) {
    saturation = 0;
  } else if (type === 'b') {
    saturation = delta / largestComponent;
  } else if (type === 'l') {
    const baseSaturation = lightness > 0.5 ? delta / (2 - largestComponent - smallestComponent) : delta / (largestComponent + smallestComponent);
    saturation = isNaN(baseSaturation) ? 0 : baseSaturation;
  }
  let huePercentage = 0;
  switch (largestComponent) {
    case red:
      huePercentage = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      huePercentage = (blue - red) / delta + 2;
      break;
    case blue:
      huePercentage = (red - green) / delta + 4;
  }
  const hue = huePercentage / 6 * 360;
  const clampedHue = clamp.clamp(hue, 0, 360);
  return {
    hue: clampedHue ? roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(clampedHue, 2) : 0,
    saturation: roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(clamp.clamp(saturation, 0, 1), 4),
    brightness: roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(clamp.clamp(largestComponent, 0, 1), 4),
    lightness: roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(lightness, 4),
    alpha: roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(alpha, 4)
  };
}
function rgbToHsb(color) {
  const {
    hue,
    saturation,
    brightness,
    alpha = 1
  } = rgbToHsbl(color, 'b');
  return {
    hue,
    saturation,
    brightness,
    alpha
  };
}
function rgbToHsl(color) {
  const {
    hue,
    saturation: rawSaturation,
    lightness: rawLightness,
    alpha = 1
  } = rgbToHsbl(color, 'l');
  const saturation = roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(rawSaturation * 100, 2);
  const lightness = roundNumberToDecimalPlaces.roundNumberToDecimalPlaces(rawLightness * 100, 2);
  return {
    hue,
    saturation,
    lightness,
    alpha
  };
}
function hexToRgb(color) {
  if (color.length === 4) {
    const repeatHex = (hex1, hex2) => color.slice(hex1, hex2).repeat(2);
    const red = parseInt(repeatHex(1, 2), 16);
    const green = parseInt(repeatHex(2, 3), 16);
    const blue = parseInt(repeatHex(3, 4), 16);
    return {
      red,
      green,
      blue
    };
  }
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return {
    red,
    green,
    blue
  };
}

exports.hexToRgb = hexToRgb;
exports.hsbToHex = hsbToHex;
exports.hsbToRgb = hsbToRgb;
exports.hslToRgb = hslToRgb;
exports.rgbString = rgbString;
exports.rgbToHex = rgbToHex;
exports.rgbToHsb = rgbToHsb;
exports.rgbToHsl = rgbToHsl;
exports.rgbaString = rgbaString;
