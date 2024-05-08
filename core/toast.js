const toastLive = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
const textToast = toastLive.querySelector('#textToast');

const alertLive = document.getElementById('liveAlert');

const showToast = (message, type) => {
    if(toastLive.classList.length >= 4){
        toastLive.classList.remove(toastLive.classList[3]);
        
    }

    toastLive.classList.add('text-bg-' + type);
    textToast.innerHTML = message;
    toastBootstrap.show();
}

const showAlert = (message, type) => {
    const wrapper = document.createElement('div');
    
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
    alertLive.append(wrapper)
}