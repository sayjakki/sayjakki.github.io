// [1] 햄버거 메뉴 기능
const hamburger = document.getElementById('hamburger');
const overlayNav = document.getElementById('overlayNav');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  overlayNav.classList.toggle('active');
  body.classList.toggle('menu-open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('open');
    overlayNav.classList.remove('active');
    body.classList.remove('menu-open');
  }
});


// [2] 홈페이지 진입 시 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-fade-up');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + index * 150);
  });
});


// [3] 프로젝트 썸네일에 마우스 올릴 때 'View Project' 커서 따라다니기
// 커서 생성
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.innerHTML = 'View<br>Project';
document.body.appendChild(cursor);

const thumbs = document.querySelectorAll('.project-thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('mouseenter', () => {
    cursor.style.transition = 'transform 0.2s ease';
    cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(-15deg)';
  });

  thumb.addEventListener('mouseleave', () => {
    cursor.style.transition = 'none';
    cursor.style.transform = 'translate(-50%, -50%) scale(0) rotate(-15deg)';
  });

  thumb.addEventListener('mousemove', (e) => {
    // ✅ 마우스 좌표 기준으로 아래쪽에 위치시킴
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY - 16}px`;  // ✅ 커서 아래쪽으로 이동
  });
});