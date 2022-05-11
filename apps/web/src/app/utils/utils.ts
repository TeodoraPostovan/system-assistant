export function sleep(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

export const BASE_IMG_URL = 'http://localhost:3333';
