import Tone from 'tone';

const playNote = (instrument, note, duration, delay) => {
  Tone.Transport.schedule(time => instrument.triggerAttackRelease(note, duration, time + delay), 0);
};

export const playQueuedNotes = totalDuration => new Promise((r) => {
  Tone.Transport.start('+0.1');
  setTimeout(() => {
    Tone.Transport.stop();
    r();
  }, totalDuration * 1000);
});

export const queueNotesForPlay = (instrument, notes) => {
  let totalDuration = 0;
  let log = '';
  notes.forEach((note) => {
    playNote(instrument, note.note, note.duration, totalDuration);
    totalDuration += note.duration;
    log += `playNote(${note.note}, ${note.duration}, ${totalDuration})\n`;
  });
  log += `total duration: ${totalDuration}`;
  return {
    totalDuration,
    log,
  };
};
