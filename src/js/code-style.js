export default (CodeMirror) => {
  CodeMirror.defineMode('justin', () => ({
    startState: () => ({
      inNote: false,
      endMarkerFound: false,
    }),
    token: (stream, state) => {
      if (stream.eatSpace()) {
        return null;
      }
      if (!state.inNote) {
        if (stream.match('END_MARKER')) {
          return 'end-marker';
        }
        if (stream.match('NOTE(')) {
          state.inNote = true;
          return 'note';
        }
        if (stream.match(',')) {
          return null;
        }
      } else {
        if (stream.match('T_EX')) {
          return 'tone';
        }

        if (stream.match(',')) {
          return null;
        }

        if (stream.match(/[0-7]/)) {
          return 'duration';
        }

        if (stream.match(')')) {
          state.inNote = false;
          return 'note';
        }

        stream.next();
        return 'error';
      }
      stream.skipToEnd();
      return null;
    },
  }));
};
