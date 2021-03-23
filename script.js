window.addEventListener('DOMContentLoaded', ()=> {
  const piano = document.querySelector('.piano');
  const pianoKeys = document.querySelectorAll('.piano-key');
  const btns = document.querySelectorAll('.btn');

  
  //play sound by using mouse
  function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  };

  function stopAudio(event) {
      event.target.classList.remove('piano-key-active');
  };
  
  function clickKeyPiano(event) {
    if(event.target.classList.contains('piano-key')) {
      pianoKeys.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        }
      });
      event.target.classList.add('piano-key-active');
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);
    };
  };
  
  piano.addEventListener('mousedown', clickKeyPiano);
  piano.addEventListener('mouseup', stopAudio);
  
  //play sound by using keyboard
  function playKeyboard(event) {
      if (event.repeat) return;
      const audio = document.querySelector(`audio[data-key="${event.code}"]`);
      const key = document.querySelector(`.piano-key[data-key="${event.code}"]`);
      audio.currentTime = 0;
      audio.play();
      key.classList.add('piano-key-active');
  };
  
  function stopPlayKeyboard(event) {
      const key = document.querySelector(`.piano-key[data-key="${event.code}"]`);
      key.classList.remove('piano-key-active');
  };
  
  window.addEventListener('keydown', playKeyboard);
  window.addEventListener('keyup', stopPlayKeyboard);
  
  //Fullscreen
  
  const fullscreenBtn = document.querySelector('.fullscreen');
  fullscreenBtn.addEventListener('click', openFullscreen);
  
  function openFullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } document.exitFullscreen();
  }
  
 // Notes and Letters
  btns.forEach(el => el.addEventListener('click', () => {
      if (!el.classList.contains('btn-active')) {
          btns.forEach((el) => {
              changeClass.call(el, 'btn-active');
          });
          changeClass.call(piano, 'toggle-letters')
      }
  })
  );
  
  function changeClass(cls) {
      this.classList.toggle(cls);
  }
})