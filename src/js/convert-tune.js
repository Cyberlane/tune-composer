import { toneMap, durationMap } from './maps';

export const cleanTuneData = data => data
  .trim()
  .replace(/( *|\t*)(NOTE\(\w+, \d\))(, *)\n?/g, '$2\n')
  .replace(/\nEND_MARKER/g, '')
  .split('\n');

export const convertTuneToNotes = (tune) => {
  const segments = /NOTE\(T_(\w+), (\d)\)/g.exec(tune);
  const note = {
    note: toneMap[segments[1]],
    duration: Number(durationMap[segments[2]]) / 50,
  };
  return note;
};
