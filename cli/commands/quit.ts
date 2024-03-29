import {cleanUp} from '../helper/clean.ts';
export const Quit = () => {
  // Spun this out to handle cleaning
  cleanUp();
  Deno.exit(0);
}