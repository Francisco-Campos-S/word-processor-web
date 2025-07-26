# Configuración de la aplicación
import os

class Config:
    # Configuración básica
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'tu_clave_secreta_muy_segura_aqui_cambiar_en_produccion'
    
    # Configuración de archivos
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'uploads'
    PROCESSED_FOLDER = 'processed'
    ALLOWED_EXTENSIONS = {'docx', 'docm'}
    
    # Configuración del servidor
    HOST = '0.0.0.0'
    PORT = 5000
    DEBUG = True
    
    # Configuración de procesamiento
    DEFAULT_STEP = 70
    MIN_STEP = 10
    MAX_STEP = 200
    
    # Configuración de limpieza automática
    AUTO_CLEANUP = True
    CLEANUP_HOURS = 24  # Limpiar archivos después de 24 horas
    
    # Configuración de seguridad
    SECURE_FILENAME = True
    VALIDATE_FILE_TYPE = True
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    
class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'clave-super-secreta-de-produccion'
    
class TestingConfig(Config):
    TESTING = True
    DEBUG = True

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
