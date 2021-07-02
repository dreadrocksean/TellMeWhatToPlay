// Brand Colors
export const brandYellow = "#ffd52b";
export const brandBlue = "#2bf8ff";
export const brandPink = "#ff2385";

// Additional Colors
export const alertYellow = "#f9edbe";
export const warningOrange = "#d66944";
export const errorRed = "#ac3931";
export const darkUIGray1 = "#191919";
export const darkUIGray2 = "#2d2d2d";
export const borderGray = "#e4e4e4";

// Base Colors
export const black = "#000";
export const white = "#fff";
export const gray1 = "#111";
export const gray2 = "#222";
export const gray3 = "#333";
export const gray4 = "#484848";
export const gray5 = "#555";
export const gray6 = "#767676";
export const gray7 = "#777";
export const gray8 = "#888";
export const gray9 = "#929292";
export const gray10 = "#aaa";
export const gray11 = "#bbb";
export const gray12 = "#f0f0f0";

export const luminance = (hex, lum) => {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
};

export const saturate = (hex, saturation) => {
  if (!/^#([0-9a-f]{6})$/i.test(hex)) {
    throw "Unexpected color format";
  }

  if (saturation < 0 || saturation > 1) {
    throw "Unexpected color format";
  }

  const rgbIntensityFloat = [
    parseInt(hex.substr(1, 2), 16) / 255,
    parseInt(hex.substr(3, 2), 16) / 255,
    parseInt(hex.substr(5, 2), 16) / 255,
  ];

  const rgbIntensityFloatSorted = rgbIntensityFloat
      .slice(0)
      .sort(function (a, b) {
        return a - b;
      }),
    maxIntensityFloat = rgbIntensityFloatSorted[2],
    mediumIntensityFloat = rgbIntensityFloatSorted[1],
    minIntensityFloat = rgbIntensityFloatSorted[0];

  if (maxIntensityFloat === minIntensityFloat) {
    // All colors have same intensity, which means
    // the original color is gray, so we can't change saturation.
    return hex;
  }

  // New color max intensity wont change. Lets find medium and weak intensities.
  let newMediumIntensityFloat;
  const newMinIntensityFloat = maxIntensityFloat * (1 - saturation);

  if (mediumIntensityFloat === minIntensityFloat) {
    // Weak colors have equal intensity.
    newMediumIntensityFloat = newMinIntensityFloat;
  } else {
    // Calculate medium intensity with respect to original intensity proportion.
    const intensityProportion =
      (maxIntensityFloat - mediumIntensityFloat) /
      (mediumIntensityFloat - minIntensityFloat);
    newMediumIntensityFloat =
      (intensityProportion * newMinIntensityFloat + maxIntensityFloat) /
      (intensityProportion + 1);
  }

  const newRgbIntensityFloat = [],
    newRgbIntensityFloatSorted = [
      newMinIntensityFloat,
      newMediumIntensityFloat,
      maxIntensityFloat,
    ];

  // We've found new intensities, but we have then sorted from min to max.
  // Now we have to restore original order.
  rgbIntensityFloat.forEach(function (originalRgb) {
    const rgbSortedIndex = rgbIntensityFloatSorted.indexOf(originalRgb);
    newRgbIntensityFloat.push(newRgbIntensityFloatSorted[rgbSortedIndex]);
  });

  const floatToHex = (val) =>
    ("0" + Math.round(val * 255).toString(16)).substr(-2);
  const rgb2hex = (rgb) =>
    "#" + floatToHex(rgb[0]) + floatToHex(rgb[1]) + floatToHex(rgb[2]);

  const newHex = rgb2hex(newRgbIntensityFloat);

  return newHex;
};
