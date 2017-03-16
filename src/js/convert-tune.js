import { toneMap, durationMap } from './maps';

export const cleanTuneData = data => data
  .trim()
  .replace(/( *|\t*)(NOTE\(\w+, \d\))(, *)\n?/g, '$2\n')
  .replace(/\nEND_MARKER/g, '')
  .split('\n');

export const convertTuneToNotes = (tune) => {
  const [, toneIndex, durationIndex] = /NOTE\(T_(\w+), (\d)\)/g.exec(tune) || [];
  if (!toneIndex) {
    return null;
  }
  const note = {
    note: toneMap[toneIndex],
    duration: Number(durationMap[durationIndex]) / 50,
  };
  return note;
};
