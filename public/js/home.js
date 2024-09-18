document.querySelectorAll('.module-img').forEach((el)=> {
        el.addEventListener('click', (event) => {
                document.querySelector('.module-preview-cont').style.display = 'initial';
        });
});

document.querySelector('.exit-module-preview').addEventListener('click', event => {
        document.querySelector('.module-preview-cont').style.display = 'none';
})

