import { actionTypes } from '../actions/action-types';

export default function lyricsReducer(state = [], { type, song, lyrics }) {
  if (type === actionTypes.LOAD_LYRICS) {
    return [...state, { song, lyrics }];
  }

  return state;
}
