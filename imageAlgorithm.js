export function imageAlgorithm(wc) {
  if (wc == 0) {
    return "assets/images/icon-sunny.webp";
  } else if (wc == 1 || wc == 2 || wc == 3) {
    return "assets/images/icon-partly-cloudy.webp";
  } else if (wc == 45 || wc == 48 || wc == 51 || wc == 53 || wc == 55) {
    return "assets/images/icon-fog.webp";
  } else if (wc == 56 || wc == 57) {
    return "assets/images/icon-drizzle.webp";
  } else if (wc == 61 || wc == 63 || wc == 65) {
    return "assets/images/icon-overcast.webp";
  } else if (wc == 80 || wc == 81 || wc == 82 || wc == 66 || wc == 67) {
    return "assets/images/icon-rain.webp";
  } else if (
    wc == 71 ||
    wc == 73 ||
    wc == 75 ||
    wc == 77 ||
    wc == 85 ||
    wc == 86
  ) {
    return "assets/images/icon-snow.webp";
  } else if (wc == 95 || wc == 96 || wc == 99) {
    return "assets/images/icon-storm.webp";
  }
}
