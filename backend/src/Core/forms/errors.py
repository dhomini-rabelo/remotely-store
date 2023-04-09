from rest_framework.exceptions import ErrorDetail


class ErrorMessages:
    UNIQUE_EMAIL = ErrorDetail(string='Este email já foi cadastrado', code='unique_email')
    REQUIRED = ErrorDetail(string='Este campo é obrigatório', code='required')
    DIFFERENT_PASSWORDS = ErrorDetail(string='Este campo é obrigatório', code='different_passwords')
