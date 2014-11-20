
/**
 * @name aSimpleTrack
 * @author Chzz
 */
 
import debug from "debug";
import { sound, sine, square, simpleMasta
       , paraFade, noteSine, simpleLimit} from "./index";
var u = undefined;
var notes = [0,3,7,10,14,u,7,3
            ,0,3,7,u,14,10,7,3
            ,-4,-2,0, 7, 10, 7, 12, 0
            ,u,u,u,u,-12,-9,-2,0];
var bass = [-24, -12, -24, -12, -24, -12, -24, -12
           ,-28, -28, -16, -16, -28, -28, -16, -16];
var bass2 = [-24, -24, -16, -16];
var lead = [12]

var sounds = [];
  for (var i = 0; i < notes.length; i++) {
    sounds.push(sound(square, notes[i]+12, i/8, 0.125, paraFade,0.1));
    sounds.push(sound(square, notes[i], i/8, 0.125, paraFade,0.1));
    sounds.push(sound(square, bass[i], i/4, 0.125, paraFade,0.2));
  }
  for (var i = 0; i < bass2.length; i++) {
    sounds.push(sound(sine, bass2[i], i, 1, paraFade, 0.15));
  }
  var sineVol = 0.22;
  sounds.push(sound(sine, 12, 0, 2, paraFade, sineVol));
  sounds.push(sound(sine, 15, 0, 2, paraFade, sineVol));
  sounds.push(sound(sine, 19, 1, 1, paraFade, sineVol));
  sounds.push(sound(sine, 22, 1, 1, paraFade, sineVol));
  sounds.push(sound(sine, 8, 2, 2, paraFade, sineVol));
  sounds.push(sound(sine, 12, 2, 2, paraFade, sineVol));
  sounds.push(sound(sine, 15, 3, 1, paraFade, sineVol));
  sounds.push(sound(sine, 19, 2.5, 1.5, paraFade, sineVol));
var ma = simpleLimit(sounds);

export function dsp(t) {
  t = t % 4;
  return ma(t);
}