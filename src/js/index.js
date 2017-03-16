import Tone from 'tone';
import CodeMirror from 'codemirror';
import codeStyle from './code-style';
import { createOption } from './dom-helper';
import {
  playTune,
  clear,
  loadTune,
  tuneList,
  tuneData,
} from './dom-elements';
import { cleanTuneData, convertTuneToNotes } from './convert-tune';
import { playQueuedNotes, queueNotesForPlay } from './play-queue';
import * as tunes from './tunes';

codeStyle(CodeMirror);

const synth = new Tone.MonoSynth().toMaster();

const codeMirror = CodeMirror.fromTextArea(tuneData, {
  mode: 'justin',
  lineNumbers: true,
  scrollbarStyle: 'native',
});
codeMirror.setSize('100%', '100%');
codeMirror.setValue(tunes.mario.replace(/^ +/gm, ''));

const playTuneClick = () => {
  playTune.setAttribute('disabled', 'disabled');
  const notes = cleanTuneData(codeMirror.getValue())
    .map(convertTuneToNotes)
    .filter(Boolean);
  const { totalDuration } = queueNotesForPlay(synth, notes);
  playQueuedNotes(totalDuration)
    .then(() => playTune.removeAttribute('disabled'));
};

const clearClick = () => {
  codeMirror.setValue('');
};

const loadTuneClick = () => {
  codeMirror.setValue(tunes[tuneList.options[tuneList.selectedIndex].value].replace(/^ +/gm, ''));
};

playTune.addEventListener('click', playTuneClick, false);
clear.addEventListener('click', clearClick, false);
loadTune.addEventListener('click', loadTuneClick, false);

Object.keys(tunes).forEach((tune) => {
  const option = createOption(tune, tune);
  tuneList.add(option);
});
