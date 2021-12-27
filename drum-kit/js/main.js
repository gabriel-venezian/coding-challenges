'use strict';

const keys = {
  'A': 'boom.wav',
  'S': 'clap.wav',
  'D': 'hihat.wav',
  'F': 'kick.wav',
  'G': 'openhat.wav',
  'H': 'ride.wav',
  'J': 'snare.wav',
  'K': 'tink.wav',
  'L': 'tom.wav'
};

const createDiv = (text) => {
  const div = document.createElement('div');
  div.classList.add('key');
  div.textContent = text;
  div.id = text;
  document.getElementById('container').appendChild(div);
};

const display = (keys) => {
  Object.keys(keys).forEach(createDiv);
};

display(keys);

const playSound = (clickedKey) => {
  const audio = new Audio(`./sounds/${keys[clickedKey]}`);
  audio.play();
};

const addEffect = (clickedKey) => document.getElementById(clickedKey).classList.toggle('active');

const removeEffect = (clickedKey) => {
  const div = document.getElementById(clickedKey);
  const removeActive = () => div.classList.remove('active');
  div.addEventListener('transitionend', removeActive);
};

const activateEffect = (event) => {
  const clickedKey = event.type == 'click' ? event.target.id : event.key.toUpperCase();
  const allowedKey = keys.hasOwnProperty(clickedKey);
  if (allowedKey) {
    addEffect(clickedKey);
    playSound(clickedKey);
    removeEffect(clickedKey);
  };
};

document.getElementById('container').addEventListener('click', activateEffect);

window.addEventListener('keydown', activateEffect);
