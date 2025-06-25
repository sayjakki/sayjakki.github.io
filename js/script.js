// [1] 햄버거 메뉴 기능
const hamburger = document.getElementById('hamburger');       // 햄버거 버튼 요소
const overlayNav = document.getElementById('overlayNav');     // 전체 오버레이 메뉴
const body = document.body;                                   // 전체 body 요소

// 햄버거 클릭 시 오버레이 열기/닫기
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');           // 햄버거 → X 아이콘 변환
  overlayNav.classList.toggle('active');        // 오버레이 메뉴 열고 닫기
  body.classList.toggle('menu-open');           // 배경 스타일 (로고/텍스트 색상 등) 토글
});

// 닫기용 햄버거 버튼도 이벤트 연결
const hamburgerClose = document.getElementById('hamburgerClose');

hamburgerClose?.addEventListener('click', () => {
  hamburger.classList.remove('open');
  overlayNav.classList.remove('active');
  body.classList.remove('menu-open');
});

// 브라우저 창이 데스크탑 사이즈로 전환되면 메뉴 자동 초기화
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('open');         // X → 햄버거 원복
    overlayNav.classList.remove('active');      // 오버레이 닫기
    body.classList.remove('menu-open');         // 배경 스타일 원복
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

// [4] 히어로 텍스트 빠르게
// 커서 생성
const heroText = document.querySelector('.hero-text');

if (window.innerWidth <= 768) {
  heroText.style.animationDuration = '8s';
} else {
  heroText.style.animationDuration = '20s';
}


