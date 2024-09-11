document.addEventListener('DOMContentLoaded', () => {
  const frames = document.querySelectorAll('.frame');
  const dialogueContainer = document.getElementById('dialogue-container');

  const scenes = [
    {
      dialogue: "It's time to reveal the cards, Kyle you go first",
      frame: 0,
      timeText: 50,
      timeSound: 2500,
      duration: 3000,
      velocity: 1,
      position: { top: '10%', left: '65%' },
      audio: '../assets/audio/sound-sans.mp3'
    },
    {
      dialogue: "HA! I have three of Kings",
      frame: 1,
      timeText: 30,
      timeSound: 1000,
      duration: 3500,
      velocity: 1.5,
      position: { top: '5%', left: '15%' },
      audio: '../assets/audio/sound-papyrus.mp3'
    },
    {
      dialogue: "Awesome but I have POKER of Queens",
      frame: 1,
      timeText: 40,
      timeSound: 1000,
      duration: 3500,
      velocity: 1.5,
      position: { top: '7%', left: '45%' },
      audio: '../assets/audio/sound-papyrus.mp3'
    },
    {
      dialogue: "You shouldn't go All In hahaha",
      frame: 1,
      timeText: 100,
      timeSound: 3000,
      duration: 5500,
      velocity: 0.5,
      position: { top: '50%', left: '60%' },
      audio: '../assets/audio/sound-undyne.mp3'
    },
    {
      dialogue: "You are not playing seriously...",
      frame: 2,
      timeText: 150,
      timeSound: 5500,
      duration: 7000,
      velocity: 0.3,
      position: { top: '70%', left: '40%' },  
      audio: '../assets/audio/sound-sans.mp3'
    },
    {
      dialogue: "Hey! Please don't leave us...",
      frame: 3,
      timeText: 50,
      timeSound: 3000,
      duration: 9000,
      velocity: 0.7,
      position: { top: '20%', left: '75%' },  
      audio: '../assets/audio/sound-undyne.mp3'
    },
    {
      dialogue: "I won't allow that this asshole talk me like this, I'm out",
      frame: 3,
      timeText: 50,
      timeSound: 6000,
      duration: 6000,
      velocity: 1,
      position: { top: '7%', left: '25%' },  
      audio: '../assets/audio/sound-sans.mp3'
    },
    {
      dialogue: "",
      frame: 4,
      timeText: 2000,
      timeSound: 2000,
      duration: 2000,
      velocity: 1,
      position: { top: '7%', left: '25%' },  
      audio: ''
    },
    {
      dialogue: "",
      frame: 99,
      timeText: 0,
      timeSound: 0,
      duration: 0,
      velocity: 1,
      position: { top: '7%', left: '25%' },  
      audio: '../assets/audio/sound-sans.mp3'
    }
  ];

  let typingSound = new Audio();
  let typingSoundTimeout;

  function showFrame(index) {
    frames.forEach((frame, i) => {
      frame.classList.remove('show');
      if (i === index) {
        frame.classList.add('show');
      }
    });
  }

  function typeDialogue(scene) {
    let index = 0;
    dialogueContainer.innerHTML = '';
    dialogueContainer.style.top = scene.position.top;
    dialogueContainer.style.left = scene.position.left;

    function typeNextLetter() {
      if (index < scene.dialogue.length) {
        dialogueContainer.innerHTML += scene.dialogue.charAt(index);
        index++;
        setTimeout(typeNextLetter, scene.timeText);
      }
    }

    typingSound.src = scene.audio;
    typingSound.playbackRate = scene.velocity;
    typingSound.currentTime = 0;
    typingSound.volume = scene.frame === 4 ? 0 : 1; // Configurar el volumen según la escena
    typingSound.play();

    typingSoundTimeout = setTimeout(() => {
      typingSound.pause();
    }, scene.timeSound);

    typeNextLetter();
  }

  function playScene(scene) {
    clearTimeout(typingSoundTimeout); // Limpiar el timeout anterior
    typingSound.pause(); // Asegurarse de que el sonido se detiene
    typingSound.currentTime = 0; // Reiniciar el tiempo del sonido

    if (scene.frame === 99) {
      window.location.href = '../login/index.html';
    } else {
      showFrame(scene.frame);
      typeDialogue(scene);
    }
  }

  let currentScene = 0;

  function nextScene() {
    const scene = scenes[currentScene];
    playScene(scene);
    currentScene = (currentScene + 1) % scenes.length;
    setTimeout(nextScene, scene.duration); // Esperar la duración de la escena antes de pasar a la siguiente
  }

  nextScene(); // Iniciar la primera escena
});
