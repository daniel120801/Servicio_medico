
import { interval, Subscription } from "rxjs";

/**
 * Clase Timer para gestionar temporizadores con intervalos personalizados.
 * Permite ejecutar acciones en cada tick y al finalizar el tiempo.
 *
 * @remarks
 * Utiliza RxJS `Subscription` e `interval` para la gestión de los intervalos.
 * El tiempo máximo y el intervalo de retraso se manejan en minutos, pero se convierten internamente a milisegundos.
 *
 * @property temporizador - Suscripción al intervalo de tiempo.
 * @property maxTiempo - Tiempo máximo del temporizador en milisegundos.
 * @property delayInterval - Intervalo de retraso entre ticks en milisegundos.
 * @property tiempoActual - Tiempo restante actual en milisegundos.
 * @property onTick - Función callback que se ejecuta en cada tick.
 * @property onEnd - Función callback que se ejecuta cuando el temporizador finaliza.
 *
 * @example
 * ```typescript
 * const timer = new Timer(5, 1); // 5 minutos de duración, tick cada 1 minuto
 * timer.setOnTickListener(() => console.log('Tick'));
 * timer.setOnEndListener(() => console.log('Fin del temporizador'));
 * timer.startTimer();
 * ```
 */
export class Timer {
    temporizador!: Subscription;
    maxTiempo = 1 * (1000 * 60);
    delayInterval = 1 * (1000 * 60);
    tiempoActual = 0;
    onTick: (() => void) | null = null;
    onEnd: (() => void) | null = null;

    /**
     * Creates an instance of the Timer class.
     *
     * @param maxTime - The maximum time for the timer, in minutes.
     * @param delayInterval - The interval delay for the timer, in minutes.
     *
     * Both `maxTime` and `delayInterval` are converted from minutes to milliseconds internally.
     */
    constructor(maxTime: number, delayInterval: number) {
        this.maxTiempo = maxTime * (1000 * 60);
        this.delayInterval = delayInterval * (1000 * 60)

    }
    setOnEndListener(listener: () => void) {
        this.onEnd = listener;
    }
    setOnTickListener(listener: () => void) {
        this.onTick = listener;
    }
    setMaxTime(value: number) {
        this.maxTiempo = value * (1000 * 60);
    }
    setDelay(value: number) {
        this.delayInterval = value * (1000 * 60)
    }
    restart(){
        this.tiempoActual = this.maxTiempo;
    }
    startTimer() {
        this.tiempoActual = this.maxTiempo;
        this.temporizador = interval(this.delayInterval).subscribe(() => {
            this.tiempoActual -= this.delayInterval;
            if (this.onTick) this.onTick();
            if (this.tiempoActual <= 0 && this.onEnd) this.onEnd();

        });
    }
    stopTimer() {
        this.temporizador.unsubscribe();
    }





}