
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from signal_utils import generate_signal
import io
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    signal_type = data.get('type', 'sinusoidal')
    freq = float(data.get('frequency', 10))
    amp = float(data.get('amplitude', 1))
    sample_rate = int(data.get('sample_rate', 8000))
    bits = int(data.get('bits', 8))

    fig = generate_signal(signal_type, freq, amp, sample_rate, bits)
    buf = io.BytesIO()
    fig.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
