from flask import jsonify

from core.exceptions import CustomError,NotFoundError,ValidationError,GameInsertionError,GameEditError

def register_error_handlers(app):
    @app.errorhandler(CustomError)
    def handle_custom_error(error):
        response = jsonify({
            "error": error.message
        })

        return response,error.status_code
    
    @app.errorhandler(NotFoundError)
    def handle_not_found_error(error):
        response = jsonify({
            "error": error.message
        })

        return response,error.status_code
    
    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        response = jsonify({
            "error": error.message
        })

        return response,error.status_code
    
    @app.errorhandler(GameInsertionError)
    def handle_insertion_error(error):
        response = jsonify({
            "error": error.message
        })
    
    @app.errorhandler(GameEditError)
    def handle_edit_error(error):
        response = jsonify({
            "error": error.message
        })