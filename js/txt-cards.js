function ajustarNombreLuchador() {
    const texto = document.querySelector('.SegundoNombreLuchadorCarta');
    const contenedor = texto.parentElement;

    if (!texto || !contenedor) return;

    let maxSize = 42;
    texto.style.fontSize = maxSize + 'px';

    while (texto.scrollWidth > contenedor.clientWidth && maxSize > 10) {
      maxSize--;
      texto.style.fontSize = maxSize + 'px';
    }
  }

  window.addEventListener('load', ajustarNombreLuchador);
  window.addEventListener('resize', ajustarNombreLuchador);