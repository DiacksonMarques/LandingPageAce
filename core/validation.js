export const validation = (form, gruop, input, message) => {
    if(!form.classList.contains('was-validated') && !gruop.classList.contains('was-validated')){
        gruop.classList.add('was-validated');
    }

    
    if(!input.value){
        input.setCustomValidity('required');
        message.innerHTML = 'Campo obrigatório';
        return true;
    }

    if(input.validity['valueMissing']){
        message.innerHTML = 'Campo obrigatório';
        return true;
    }

    if(input.validity['tooShort']){
        message.innerHTML = 'Caracteres inferiores ao permitido';
        return true;
    }

    if(input.validity['tooLong']){
        message.innerHTML = 'Caracteres superiores ao permitido';
        return true;
    }
    
    input.setCustomValidity('');
    message.innerHTML = 'valid';
};