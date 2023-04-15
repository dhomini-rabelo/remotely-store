from rest_framework.exceptions import ErrorDetail


class ErrorMessages:
    UNIQUE_EMAIL = ErrorDetail(string='Este email já foi cadastrado', code='unique_email')
    REQUIRED = ErrorDetail(string='Este campo é obrigatório', code='required')
    DIFFERENT_PASSWORDS = ErrorDetail(string='As senhas são diferentes', code='different_passwords')
    DUPLICATED_PRODUCT_IN_THE_CART = ErrorDetail(
        string='Existe um produto duplicado no carrinho', code='duplicated_product_in_the_cart'
    )
