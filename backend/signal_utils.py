
import matplotlib
matplotlib.use('Agg')  # ✅ IMPORTANTE para evitar errores de Tkinter
import matplotlib.pyplot as plt
import numpy as np

def generate_signal(signal_type, freq, amp, sample_rate, bits, duration=0.02):
    # Tiempo para la señal analógica (alta resolución)
    t_analog = np.linspace(0, duration, 1000)  # Fijo 1000 puntos
    if signal_type == 'sinusoidal':
        signal_analog = amp * np.sin(2 * np.pi * freq * t_analog)
    elif signal_type == 'square':
        signal_analog = amp * np.sign(np.sin(2 * np.pi * freq * t_analog))
    elif signal_type == 'triangle':
        signal_analog = amp * 2 * np.abs(2 * (t_analog * freq - np.floor(t_analog * freq + 0.5))) - 1
    elif signal_type == 'noise':
        signal_analog = amp * np.random.normal(0, 1, len(t_analog))
    else:
        signal_analog = amp * np.sin(2 * np.pi * freq * t_analog)

    # Tiempo para muestras digitalizadas
    t_digital = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    signal_digital = amp * np.sin(2 * np.pi * freq * t_digital)  # o el tipo que elijas

    # Cuantización
    quant_levels = 2 ** bits
    signal_quant = np.round(((signal_digital + amp) / (2 * amp)) * (quant_levels - 1))
    signal_quant = ((signal_quant / (quant_levels - 1)) * 2 * amp) - amp

    # Graficar
    fig, ax = plt.subplots()
    ax.plot(t_analog, signal_analog, label='Analógica', color='blue')
    ax.step(t_digital, signal_quant, label='Digitalizada', color='orange', where='mid')
    ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.15), ncol=2)
    ax.set_xlabel('Tiempo [s]')
    ax.set_ylabel('Amplitud')
    ax.set_title('Conversión ADC')
    plt.tight_layout()
    return fig


