import { actionTypes } from './action-types';

export const loadLyricsActionCreator = (songName, lyrics) => ({
  type: actionTypes.LOAD_LYRICS,
  song: songName,
  lyrics,
});
