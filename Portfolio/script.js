// ============================
// Project Modal (รองรับหลายรูป)
// ============================
let modalImages = [];
let modalImgIndex = 0;

function openProjectModal(card) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = card.dataset.title;
    document.getElementById('modalDesc').textContent = card.dataset.desc;
    document.getElementById('modalLink').href = card.dataset.link || '#';

    modalImages = card.dataset.images
        ? card.dataset.images.split(',').map(s => s.trim())
        : [card.dataset.img]; // เผื่อการ์ดเก่าที่ยังใช้ data-img อยู่
    modalImgIndex = 0;

    renderModalImg();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderModalImg() {
    const img = document.getElementById('modalImg');
    img.src = modalImages[modalImgIndex];
    img.alt = document.getElementById('modalTitle').textContent;

    // ปุ่มเลื่อน: ซ่อนถ้ามีรูปเดียว
    const showNav = modalImages.length > 1;
    document.querySelector('.modal-nav-prev').style.display = showNav ? 'flex' : 'none';
    document.querySelector('.modal-nav-next').style.display = showNav ? 'flex' : 'none';

    // จุดนับรูป
    const dotsWrap = document.getElementById('modalDots');
    dotsWrap.innerHTML = '';
    if (showNav) {
        modalImages.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'modal-dot' + (i === modalImgIndex ? ' active' : '');
            dotsWrap.appendChild(dot);
        });
    }
}

function modalPrevImg(event) {
    event.stopPropagation();
    modalImgIndex = (modalImgIndex - 1 + modalImages.length) % modalImages.length;
    renderModalImg();
}

function modalNextImg(event) {
    event.stopPropagation();
    modalImgIndex = (modalImgIndex + 1) % modalImages.length;
    renderModalImg();
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeProjectModalOnOverlay(event) {
    if (event.target.id === 'projectModal') {
        closeProjectModal();
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProjectModal();
    if (document.getElementById('projectModal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') modalPrevImg(e);
        if (e.key === 'ArrowRight') modalNextImg(e);
    }
});

// ============================
// Scroll Animations
// ============================
function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();