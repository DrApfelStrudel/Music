
/**
 * @module Shit
 * @author Chzz
 */

function vibrato(speed, power, t) {
  return power * Math.sin(t * speed * Math.PI);
}

export function simpleLimit(soundList) {
  return function(time) {
    if (soundList.length === 0) {
      return 0;
    }
    else {
      var value = 0;
      for (var i = 0; i < soundList.length; i++) {
        value += soundList[i](time);
      }
      return value > 0 ? Math.min(1, value) : Math.max(-1, value);
    }
  }
}

export function simpleMasta(soundList) {
  return function(time) {
    if (soundList.length === 0) {
      return 0;
    }
    else {
      var value = 0;
      for (var i = 0; i < soundList.length; i++) {
        value += soundList[i](time);
      }
      var soundsPlaying = 0;
      for (var i = 0; i < soundList.length; i++) {
        if (Math.abs(soundList[i](time)) > 0) soundsPlaying++;
      }
      return soundsPlaying === 0 ? 0 : value / soundsPlaying;
    }
  }
}

export function paraFade(length, currentTime) {
  var attack = (-1 / Math.pow(0.005, 2)) * Math.pow(currentTime, 2) + 1;
  attack = attack > 0 ? attack : 0;
  var parabola = (-1 / Math.pow(length, 2)) * Math.pow(currentTime, 2) + 1 - attack;
  return parabola > 0 ? parabola : 0;
}

export function sound(osc, node, start, length, fader, vol) {
  return function(time) {
    vol = vol || 1;
    if (node === undefined) {
      return 0;
    }
    fader = fader || function() { return 1; };
    if (time < start) {
       return 0;
    }
    else {
      var currentTime = time - start;
      return osc(node, currentTime, length, fader, vol);
    }
  }
}

export function sine(n, currentTime, length, fader, vol) {
  return vol * Math.sin(currentTime * note(n) * Math.PI) * fader(length, currentTime);
}

export function square(n, currentTime, length, fader, vol) {
    var nodeFq = note(n);
    var sine = Math.sin(currentTime * nodeFq * Math.PI);
    var square = sine >= 0 ? 1 : -1;
    return vol * square * fader(length, currentTime);
}

function note(n) {
  return 440 * Math.pow (Math.pow (2, 1/12), n);
}