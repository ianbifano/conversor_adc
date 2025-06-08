
import numpy as np
import matplotlib.pyplot as plt

def generate_signal(signal_type, freq, amp, sample_rate, bits, duration=0.01):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    if signal_type == 'sinusoidal':
        signal = amp * np.sin(2 * np.pi * freq * t)
    elif signal_type == 'square':
        signal = amp * np.sign(np.sin(2 * np.pi * freq * t))
    elif signal_type == 'triangle':
        signal = amp * 2 * np.abs(2 * (t * freq - np.floor(t * freq + 0.5))) - 1
    elif signal_type == 'noise':
        signal = amp * np.random.normal(0, 1, len(t))
    else:
        signal = amp * np.sin(2 * np.pi * freq * t)

    quant_levels = 2 ** bits
    signal_quant = np.round(((signal + amp) / (2 * amp)) * (quant_levels - 1))
    signal_quant = ((signal_quant / (quant_levels - 1)) * 2 * amp) - amp

    fig, ax = plt.subplots()
    ax.plot(t, signal, label='Analógica', color='blue')
    ax.step(t, signal_quant, label='Digitalizada', color='orange', where='mid')
    ax.legend()
    ax.set_xlabel('Tiempo [s]')
    ax.set_ylabel('Amplitud')
    ax.set_title('Conversión ADC')
    return fig
