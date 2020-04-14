var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(es_chrome){

    swal({
      title: "RECOMENDACIONES",
      text: "Se recomienda el uso del navegador Google Chrome.",
      icon: "chrome.png",
      button: "Ok",
    });
    // Colores
    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    // Buton
    const btnEmpezar = document.getElementById('btnEmpezar')
    // Sounds
    var audioDo = document.getElementById("audioDo");
    var audioRe = document.getElementById("audioRe");
    var audioMi = document.getElementById("audioMi");
    var audioFa = document.getElementById("audioFa");

    var nivelActual = document.getElementById('nivelActual')
    var nivelRecord = document.getElementById('nivelRecord')
    var nivelR = 0;

    const ULTIMO_NIVEL = 30

    swal({
      title: "RECOMENDACIONES",
      text: "Para mejor jugabilidad se recomienda el uso del navegador Google Chrome.",
      icon: "chrome.png",
      button: "Ok",
    });

    window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);
    };

    class Juego {
      constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout( this.siguienteNivel, 500);
      }

      inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        nivelActual.innerHTML = this.nivel;
        this.colores = {
          celeste,
          violeta,
          naranja,
          verde
        }
      }

      toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
          btnEmpezar.classList.remove('hide');
        } else {
          btnEmpezar.classList.add('hide');
        }
      }

      generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
      }

      siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia();
        this.agregarEventoClick();
      }

      transformarNumeroAColor(numero) {
        switch (numero) {
          case 0:
            return 'celeste'
          case 1:
            return 'violeta'
          case 2:
            return 'naranja'
          case 3:
            return 'verde'

        }
      }

      transformaColorANumero(color) {
        switch (color) {
          case 'celeste':
            return 0
          case 'violeta':
            return 1
          case 'naranja':
            return 2
          case 'verde':
            return 3
        }
      }

      iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
          let color = this.transformarNumeroAColor(this.secuencia[i]);
          setTimeout(() => {
            this.iluminarColor(color)
            switch (this.secuencia[i]) {
              case 0:
                audioDo.play()
                break;
              case 1:
                audioRe.play()
                break;
              case 2:
                audioMi.play()
                break;
              case 3:
                audioFa.play()
                break;
            }
          } , 1000 * i);
        }
      }

      iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
      }

      apagarColor(color) {
        this.colores[color].classList.remove('light')
      }

      agregarEventoClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
      }

      eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
      }

      elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformaColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        switch (numeroColor) {
          case 0:
            audioDo.play()
            break;
          case 1:
            audioRe.play()
            break;
          case 2:
            audioMi.play()
            break;
          case 3:
            audioFa.play()
            break;
        }

        if (numeroColor === this.secuencia[this.subnivel]) {
          this.subnivel++;
          if (this.subnivel === this.nivel) {
            this.nivel++;
            nivelActual.innerHTML = this.nivel;
            if (this.nivel > nivelR) {
              nivelRecord.innerHTML = this.nivel;
              nivelR = this.nivel;
            }
            this.eliminarEventosClick()
            if (this.nivel === (ULTIMO_NIVEL + 1)) {
              this.ganoElJuego();
            } else {
              setTimeout(this.siguienteNivel, 1500);
            }
          }
        } else {
            this.perdioElJuego();
        }
      }

      ganoElJuego() {
        swal('¡Ganaste!', 'Felicitaciones, ganaste el juego :)', 'premio.png')
          .then(this.inicializar)
      }

      perdioElJuego() {
        swal('¡Lo siento!', 'perdiste el juego :(', 'error')
          .then(() => {
            this.eliminarEventosClick();
            this.inicializar();
          })
      }
    }

    function empezarJuego() {
      window.juego = new Juego()
    }

    function infoJuego() {
      swal({
        title: "¿Como se juega?",
        text: "El juego de forma aleatoria va iluminando los cuadrantes de colores, y a la vez que se ilumina cada cuadrante emite un sonido propio. Después de esperar, el usuario debe ir introduciendo la secuencia mostrada en el orden correcto, ayudándose de su memoria visual y sonora. Si lo consigue, éste responderá con una secuencia más larga, y así sucesivamente. Si falla, el usuario debe volver a empezar. Los distintos niveles de dificultad van aumentando la velocidad de la secuencia a repetir.",
        icon: "info",
        button: "Ok",
      });
    }

} else {
  const texto = document.getElementById('descargarChrome')
  texto.classList.remove('hide');
  const circulo = document.getElementById('gameboard')
  // Estrellas
  const estrella1 = document.getElementById('estrella1')
  const estrella2 = document.getElementById('estrella2')
  const estrella3 = document.getElementById('estrella3')
  const estrella4 = document.getElementById('estrella4')
  const estrella5 = document.getElementById('estrella5')
  const estrella6 = document.getElementById('estrella6')
  const estrella7 = document.getElementById('estrella7')
  const meteoro = document.getElementById('meteoro')
  // Buton
  const btnEmpezar = document.getElementById('btnEmpezar')
  var containerPoints = document.getElementById('containerPoints')

  circulo.classList.add('hide');
  estrella1.classList.add('hide');
  estrella2.classList.add('hide');
  estrella3.classList.add('hide');
  estrella4.classList.add('hide');
  estrella5.classList.add('hide');
  estrella6.classList.add('hide');
  estrella7.classList.add('hide');
  meteoro.classList.add('hide');
  btnEmpezar.classList.add('hide');
  containerPoints.classList.add('hide');

  swal({
    title: "Lo Sentimos",
    text: "Se recomienda el uso del navegador Google Chrome.",
    icon: "chrome.png",
    button: "Ok",
  });
}
