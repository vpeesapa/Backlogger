class CustomError(Exception):
    def __init__(self,message,status_code=400):
        self.message = message
        self.status_code = status_code

        super().__init__(self.message)

class NotFoundError(CustomError):
    def __init__(self,message,status_code=404):
        super().__init__(message,status_code)

class ValidationError(CustomError):
    def __init__(self,message,status_code=400):
        super().__init__(message,status_code)

class RequestParamError(CustomError):
    def __init__(self,message,status_code=403):
        super().__init__(message,status_code)

class GameInsertionError(CustomError):
    def __init__(self,message,status_code=402):
        super().__init__(message,status_code)

class GameEditError(CustomError):
    def __init__(self,message,status_code=405):
        super().__init__(message,status_code)

class InvalidRowError(CustomError):
    def __init__(self,message,status_code=406):
        super().__init__(message,status_code)