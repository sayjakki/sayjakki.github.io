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

const thumbs = document.querySelectorAll('.project-grid a');

thumbs.forEach(thumb => {
  thumb.addEventListener('mouseenter', () => {
    cursor.style.transition = 'transform 0.2s ease';
    cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(-15deg)';
    // project-title 텍스트 회색으로 변경
    const projectItem = thumb.closest('.project-item');
    if (projectItem) {
      const title = projectItem.querySelector('.project-title');
      if (title) title.style.color = '#999';
    }
  });

  thumb.addEventListener('mouseleave', () => {
    cursor.style.transition = 'none';
    cursor.style.transform = 'translate(-50%, -50%) scale(0) rotate(-15deg)';
    // project-title 텍스트 검정으로 복원
    const projectItem = thumb.closest('.project-item');
    if (projectItem) {
      const title = projectItem.querySelector('.project-title');
      if (title) title.style.color = '#000';
    }
  });

  thumb.addEventListener('mousemove', (e) => {
    // ✅ 마우스 좌표 기준으로 아래쪽에 위치시킴
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY - 16}px`;  // ✅ 커서 아래쪽으로 이동
  });
});

// [4] 히어로 텍스트 빠르게
const heroText = document.querySelector('.hero-text');
if (heroText) {
  if (window.innerWidth <= 768) {
    heroText.style.animationDuration = '0.5s';
  } else {
    heroText.style.animationDuration = '0.5s';
  }
}

// [5] Past Projects 더보기 버튼 호버 효과 (JS로 구현)
const pastProjectsListMore = document.querySelector('.past-projects-list-more');
if (pastProjectsListMore && window.innerWidth > 1024) {
  const moreBox = pastProjectsListMore.querySelector('.past-projects-list-more-box');
  const moreText = pastProjectsListMore.querySelector('.past-projects-list-more-text');
  pastProjectsListMore.addEventListener('mouseenter', () => {
    if (moreBox) moreBox.style.background = '#000';
    if (moreText) moreText.style.color = '#fff';
  });
  pastProjectsListMore.addEventListener('mouseleave', () => {
    if (moreBox) moreBox.style.background = 'rgba(0, 0, 0, 0)';
    if (moreText) moreText.style.color = '';
  });
}

// [6] Past Projects 더보기 버튼 클릭 시 슬라이드 확장/축소
(function() {
  const moreBtn = document.querySelector('.past-projects-list-more');
  const list = document.querySelector('.past-projects-list');
  if (!moreBtn || !list) return;

  // 이미 확장된 상태인지 저장
  let expanded = false;
  // 확장/축소에 사용할 아이템들
  const items = Array.from(list.querySelectorAll('.past-project-item-wrap'));

  // 기본적으로 6개만 보이게, 나머지는 숨김
  const defaultShow = 6;
  items.forEach((item, idx) => {
    if (idx >= defaultShow) {
      item.style.maxHeight = '0';
      item.style.overflow = 'hidden';
      item.style.transition = 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)';
    }
  });

  moreBtn.addEventListener('click', function() {
    if (!expanded) {
      // 확장: 나머지 아이템 슬라이드 다운
      items.forEach((item, idx) => {
        if (idx >= defaultShow) {
          item.style.maxHeight = item.scrollHeight + 'px';
        }
      });
      expanded = true;
      // 버튼 텍스트 변경
      const text = moreBtn.querySelector('.past-projects-list-more-text');
      if (text) text.textContent = 'SHOW LESS';
    } else {
      // 축소: 나머지 아이템 슬라이드 업
      items.forEach((item, idx) => {
        if (idx >= defaultShow) {
          item.style.maxHeight = '0';
        }
      });
      expanded = false;
      // 버튼 텍스트 원복
      const text = moreBtn.querySelector('.past-projects-list-more-text');
      if (text) text.textContent = 'Show All (34)';
    }
  });
})();

// 스크롤 방향에 따라 헤더 숨김/노출
let lastScrollY = window.scrollY;
const headerBar = document.querySelector('.site-header-bar');

window.addEventListener('scroll', () => {
  if (!headerBar) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 40) {
    // 아래로 스크롤: 헤더 숨김
    headerBar.style.transform = 'translateY(-100%)';
    headerBar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
  } else {
    // 위로 스크롤: 헤더 노출
    headerBar.style.transform = 'translateY(0)';
    headerBar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
  }
  lastScrollY = currentY;
});



