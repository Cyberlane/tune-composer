import Tone from 'tone';
import { createOption } from './dom-helper';
import {
  playTune,
  clear,
  loadTune,
  tuneList,
  tuneData,
  convertedData,
} from './dom-elements';
import { cleanTuneData, convertTuneToNotes } from './convert-tune';
import { playQueuedNotes, queueNotesForPlay } from './play-queue';
import * as tunes from './tunes';

const synth = new Tone.MonoSynth().toMaster();

const playTuneClick = () => {
  playTune.setAttribute('disabled', 'disabled');
  const notes = cleanTuneData(tuneData.value)
    .map(convertTuneToNotes);
  const { totalDuration, log } = queueNotesForPlay(synth, notes);
  convertedData.value = log;
  playQueuedNotes(totalDuration)
    .then(() => playTune.removeAttribute('disabled'));
};

const clearClick = () => {
  tuneData.value = '';
  convertedData.value = '';
};

const loadTuneClick = () => {
  tuneData.value = tunes[tuneList.options[tuneList.selectedIndex].value];
};

playTune.addEventListener('click', playTuneClick, false);
clear.addEventListener('click', clearClick, false);
loadTune.addEventListener('click', loadTuneClick, false);

Object.keys(tunes).forEach((tune) => {
  const option = createOption(tune, tune);
  tuneList.add(option);
});
