from flask import Flask, render_template, request, jsonify, send_file
import os
import sys
from datetime import datetime
from werkzeug.utils import secure_filename
from docx import Document
from docx.shared import RGBColor

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'clave-secreta-simple')

UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
ALLOWED_EXTENSIONS = {'docx', 'docm'}

# Crear carpetas
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def procesar_documento_simple(doc_path, paso=70):
    try:
        doc = Document(doc_path)
        contador = 0
        
        for paragraph in doc.paragraphs:
            if len(paragraph.text) > 30:
                for run in paragraph.runs:
                    if len(run.text) > paso:
                        # Insertar '0' invisible cada 'paso' caracteres
                        texto = run.text
                        nuevo_texto = ""
                        for i, char in enumerate(texto):
                            nuevo_texto += char
                            if (i + 1) % paso == 0:
                                nuevo_texto += "0"
                                contador += 1
                        run.text = nuevo_texto
                        
                        # Hacer los '0' invisibles
                        for j, char in enumerate(run.text):
                            if char == '0' and j > 0:
                                run.font.color.rgb = RGBColor(255, 255, 255)
        
        # Guardar documento procesado
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_name = os.path.splitext(os.path.basename(doc_path))[0]
        output_path = os.path.join(PROCESSED_FOLDER, f"{timestamp}_{base_name}_procesado.docx")
        doc.save(output_path)
        
        return output_path, contador
    except Exception as e:
        print(f"Error: {e}")
        return None, 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No se seleccionó archivo'})
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No se seleccionó archivo'})
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{timestamp}_{filename}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            
            paso = int(request.form.get('paso', 70))
            output_path, contador = procesar_documento_simple(filepath, paso)
            
            if output_path:
                # Limpiar archivo temporal
                os.remove(filepath)
                
                download_filename = os.path.basename(output_path)
                return jsonify({
                    'success': True, 
                    'message': f'Documento procesado. Se insertaron {contador} caracteres invisibles.',
                    'download_url': f'/download/{download_filename}',
                    'filename': download_filename
                })
            else:
                return jsonify({'success': False, 'message': 'Error al procesar documento'})
        else:
            return jsonify({'success': False, 'message': 'Tipo de archivo no permitido'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'})

@app.route('/download/<filename>')
def download_file(filename):
    try:
        filepath = os.path.join(PROCESSED_FOLDER, filename)
        if os.path.exists(filepath):
            return send_file(filepath, as_attachment=True, download_name=filename)
        else:
            return jsonify({'success': False, 'message': 'Archivo no encontrado'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
