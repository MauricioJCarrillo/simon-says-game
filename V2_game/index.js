const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const verde = document.getElementById("verde");
const naranja = document.getElementById("naranja");
const btnEmpezar = document.getElementById("btnEmpezar");
const input_nivel_max = document.getElementById("input_nivel_max");
const nivel_max = document.getElementById("nivel_max");
const btnAcept = document.getElementById("btnAcept");
const modal = document.getElementById("modal");
const mayor_a_zero = document.getElementById("mayor_a_zero");
const toggleButton = document.getElementById('toggle-button');
const paragraph_footer = document.getElementById('paragraph_footer');

toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('light');
    paragraph_footer.classList.toggle('light');
});

function nivelMax() {
    const value_nivel_max = Number(input_nivel_max.value);
    if(value_nivel_max === 0) {
        mayor_a_zero.innerText = 'Ingresa un numero mayor a 0 (cero)';
    } else {
        modal.classList.add('hide');
        mayor_a_zero.innerText = '';
        nivel_max.innerText = value_nivel_max;
        num_level.innerText = 0;
        num_score.innerText = 0;
    }
}

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 1500);

    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();
        this.value_nivel_max = Number(input_nivel_max.value);
        this.subnivel = 0;
        console.log('Este es el subnivel ' + this.subnivel);
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            verde,
            naranja
        };
        this.puntaje = 0;
        nivel_max.innerText = this.value_nivel_max;
        num_level.innerText = this.nivel;
        num_score.innerText = this.puntaje;
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(this.value_nivel_max).fill(0).map(item =>  Math.floor(Math.random()*4));
        console.log(this.secuencia);
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    transformarNumeroAColor(numero) {
        switch(numero){
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'verde';
            case 3:
                return 'naranja';
        }
    }

    transformarColorANumero(color) {
        switch(color){
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'verde':
                return 2;
            case 'naranja':
                return 3;
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        console.log('Este es el subnivel ' + this.subnivel);
        console.log(numeroColor + " " + this.secuencia[this.subnivel]);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            this.puntaje = this.puntaje + this.subnivel;
            num_score.innerText = this.puntaje;
            if(this.subnivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if((this.value_nivel_max + 1) === this.nivel){
                    this.ganoElJuego();
                }
                else {
                    num_level.innerText = this.nivel;
                    swal("Simon says...", "Pasaste de nivel!", "success")
                    .then(() => setTimeout(this.siguienteNivel, 1500));
                }
            }
        }
        else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal("Simon says...", "Ganaste el juego!", "success")
        .then(() => {
            modal.classList.remove('hide');
            this.inicializar()
        });
    }

    perdioElJuego() {
        swal("Simon says...", "Perdiste el juego!", "error")
            .then(() => {
                this.eliminarEventosClick();
                modal.classList.remove('hide');
                this.inicializar();
            })
    }
}

function empezarJuego() {
    const juego = new Juego;
}