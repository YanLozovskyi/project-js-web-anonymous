import { halfStarSVG, fullStarSVG, emptyStarSVG } from './stars';

export function getStar(params) {
  let rating = '';

  const averageCount = Math.round(params);
  switch (averageCount) {
    case 0:
      rating = `${emptyStarSVG.repeat(5)}`;
      break;
    case 1:
      rating = `${halfStarSVG}${emptyStarSVG.repeat(4)}`;
      break;
    case 2:
      rating = `${fullStarSVG}${emptyStarSVG.repeat(4)}`;
      break;
    case 3:
      rating = `${fullStarSVG}${halfStarSVG}${emptyStarSVG.repeat(3)}`;
      break;
    case 4:
      rating = `${fullStarSVG.repeat(2)}${emptyStarSVG.repeat(3)}`;
      break;
    case 5:
      rating = `${fullStarSVG.repeat(2)}${halfStarSVG}${emptyStarSVG.repeat(
        2
      )}`;
      break;
    case 6:
      rating = `${fullStarSVG.repeat(3)}${emptyStarSVG.repeat(2)}`;
      break;
    case 7:
      rating = `${fullStarSVG.repeat(3)}${halfStarSVG}${emptyStarSVG}`;
      break;
    case 8:
      rating = `${fullStarSVG.repeat(4)}${emptyStarSVG}`;
      break;
    case 9:
      rating = `${fullStarSVG.repeat(4)}${halfStarSVG}`;
      break;
    case 10:
      rating = `${fullStarSVG.repeat(5)}`;
      break;
    default:
      throw new Error('Invalid rating');
  }

  return rating;
}
