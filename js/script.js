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
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.innerHTML = 'View<br>Project';
document.body.appendChild(cursor);

// 기존 프로젝트 썸네일
const thumbs = document.querySelectorAll('.project-grid a');

thumbs.forEach(thumb => {
  thumb.addEventListener('mouseenter', () => {
    cursor.style.transition = 'transform 0.2s ease';
    cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(-15deg)';
    const projectItem = thumb.closest('.project-item');
    if (projectItem) {
      const title = projectItem.querySelector('.project-title');
      if (title) title.style.color = '#999';
    }
  });

  thumb.addEventListener('mouseleave', () => {
    cursor.style.transition = 'none';
    cursor.style.transform = 'translate(-50%, -50%) scale(0) rotate(-15deg)';
    const projectItem = thumb.closest('.project-item');
    if (projectItem) {
      const title = projectItem.querySelector('.project-title');
      if (title) title.style.color = '#000';
    }
  });

  thumb.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY - 16}px`;
  });
});

// [추가] Featured Projects 썸네일에도 커서 기능 적용
const featuredThumbs = document.querySelectorAll('.featured-item-wrap');

featuredThumbs.forEach(thumb => {
  thumb.addEventListener('mouseenter', () => {
    cursor.style.transition = 'transform 0.2s ease';
    cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(-15deg)';
    const title = thumb.querySelector('.featured-title');
    if (title) title.style.color = '#999';
  });

  thumb.addEventListener('mouseleave', () => {
    cursor.style.transition = 'none';
    cursor.style.transform = 'translate(-50%, -50%) scale(0) rotate(-15deg)';
    const title = thumb.querySelector('.featured-title');
    if (title) title.style.color = '#000';
  });

  thumb.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY - 16}px`;
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


// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
  // 데스크톱에서만 고급 sticky 동작 실행
  if (window.innerWidth > 768) {
    advancedStickyBehavior();
  }
});

// [추가] Past Projects 리스트에 hover 이미지 미리보기 기능 (모바일 제외)
(function() {
  if (window.innerWidth <= 768) return; // 모바일에선 미리보기 기능 비활성화

  // 미리보기 이미지 정보 (프로젝트명과 이미지 경로 매핑)
  const previewImages = {
    'Design Vancouver Festival': '../assets/img/main/main_sample_image1.avif',
    "Metrolinx 'T Symbol'": '../assets/img/main/main_sample_image2.avif',
    'Invictus Games 2025 ↗': '../assets/img/main/main_sample_image3.avif',
    'Geosource Energy ↗': '../assets/img/main/main_sample_image4.avif',
    'Christine Sinclair ↗': '../assets/img/main/main_sample_image5.avif',
    'Props.Cash': '../assets/img/main/main_sample_image6.avif',
    '1 Mill Road ↗': '../assets/img/main/main_sample_image7.avif',
    'Locomotive ↗': '../assets/img/main/main_sample_image8.avif',
    'Vinyl Records ↗': '../assets/img/main/main_sample_image9.avif',
    'FORM Swim ↗': '../assets/img/main/main_sample_image10.avif',
    'Skate Canada ↗': '../assets/img/main/main_sample_image11.avif',
    'Mountain Equipment Company ↗': '../assets/img/main/main_sample_image12.avif',
    'International Olympic Committee': '../assets/img/main/main_sample_image1.avif',
    '#StrongerTogether Tokyo 2020': '../assets/img/main/main_sample_image2.avif',
    'Order of Sport': '../assets/img/main/main_sample_image3.avif',
  };

  // 미리보기 이미지 DOM 생성
  const preview = document.createElement('div');
  preview.className = 'past-project-preview';
  preview.style.position = 'fixed';
  preview.style.right = '40px';
  preview.style.top = '50%';
  preview.style.transform = 'translateY(-50%)';
  preview.style.zIndex = '9999';
  preview.style.pointerEvents = 'none';
  preview.style.display = 'none';
  preview.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
  preview.style.background = '#fff';
  preview.style.borderRadius = '16px';
  preview.style.overflow = 'hidden';
  preview.style.width = '320px';
  preview.style.height = '200px';
  preview.style.transition = 'opacity 0.2s';
  document.body.appendChild(preview);

  const pastItems = document.querySelectorAll('.past-project-item');
  pastItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const titleEl = item.querySelector('.past-project-title');
      if (!titleEl) return;
      const title = titleEl.textContent.trim();
      const imgSrc = previewImages[title];
      if (imgSrc) {
        preview.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;display:block;" alt="${title}" />`;
        // 마우스 위치에 따라 미리보기 위치 조절
        item.addEventListener('mousemove', function(e) {
          preview.style.left = `${e.clientX + 32}px`;
          preview.style.top = `${e.clientY - 100}px`;
          preview.style.right = '';
          preview.style.transform = 'translateY(0)';
        });
        preview.style.display = 'block';
        preview.style.opacity = '1';
      } else {
        preview.style.display = 'none';
        preview.innerHTML = '';
      }
    });
    item.addEventListener('mouseleave', function() {
      preview.style.opacity = '0';
    });
  });
})();

// [추가] Past Projects에 마우스 오버 시 viewpoint marquee 효과 (모바일 제외)
(function() {
  if (window.innerWidth <= 768) return; // 모바일에선 marquee 효과 비활성화

  // [마우스 오버 시 viewpoint marquee 효과]
  const MARQUEE_TEXT = 'viewpoint';
  const MARQUEE_CLASS = 'past-project-marquee';
  const MARQUEE_ANIMATION = `@keyframes pastProjectMarqueeMove { from { transform: translateX(0); } to { transform: translateX(-50%); } }`;

  // 스타일 동적으로 추가 (한 번만)
  if (!document.getElementById('past-project-marquee-style')) {
    const style = document.createElement('style');
    style.id = 'past-project-marquee-style';
    style.innerHTML = `
      .${MARQUEE_CLASS} {
        position: absolute;
        width: 100%;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        white-space: nowrap;
        font-size: 30px;
        font-weight: 700;
        color: #222;
        pointer-events: none;
        z-index: 100;
        overflow: hidden;
        background: black;
        height: 48px;
        color: #fff;
      }
      .${MARQUEE_CLASS} .marquee-track {
        display: flex;
        width: max-content;
        animation: pastProjectMarqueeMove 8s linear infinite;
        white-space: nowrap;
        position: relative;
      }
      .${MARQUEE_CLASS} .marquee-text {
        display: inline-block;
        margin-right: 48px;
      }
      .${MARQUEE_CLASS}::before,
      .${MARQUEE_CLASS}::after {
        content: "";
        position: absolute;
        top: 0;
        width: 48px;
        height: 100%;
        z-index: 101;
        pointer-events: none;
      }
      .${MARQUEE_CLASS}::before {
        left: 0;
        background: linear-gradient(to right, black 0%, transparent 100%);
      }
      .${MARQUEE_CLASS}::after {
        right: 0;
        background: linear-gradient(to left, black 0%, transparent 100%);
      }
      @keyframes pastProjectMarqueeMove {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
  }

  // past-project-item-wrap에 이벤트 연결
  const wraps = document.querySelectorAll('.past-project-item-wrap');
  wraps.forEach(wrap => {
    wrap.addEventListener('mouseenter', function() {
      // 이미 있으면 중복 생성 방지
      if (wrap.querySelector(`.${MARQUEE_CLASS}`)) return;
      const marquee = document.createElement('div');
      marquee.className = MARQUEE_CLASS;
      const track = document.createElement('div');
      track.className = 'marquee-track';
      // 여러 번 반복
      for (let i = 0; i < 10; i++) {
        const span = document.createElement('span');
        span.className = 'marquee-text';
        span.textContent = MARQUEE_TEXT;
        track.appendChild(span);
      }
      marquee.appendChild(track);
      wrap.style.position = 'relative'; // marquee 위치 기준
      wrap.appendChild(marquee);
    });
    wrap.addEventListener('mouseleave', function() {
      const marquee = wrap.querySelector(`.${MARQUEE_CLASS}`);
      if (marquee) marquee.remove();
    });
  });
})();

// 모바일에서 .site-header-logo-link 텍스트를 Tomorrow로 변경
    function updateLogoTextForMobile() {
      var logo = document.getElementById('mainLogoText');
      if (!logo) return;
      if (window.innerWidth <= 768) {
        logo.textContent = 'Tomorrow';
      } else {
        logo.textContent = 'Sayjakki';
      }
    }
    window.addEventListener('resize', updateLogoTextForMobile);
    window.addEventListener('DOMContentLoaded', updateLogoTextForMobile);

    // project-thumb 스크롤 등장 애니메이션
    function onScrollRevealThumbs() {
      var thumbs = document.querySelectorAll('.project-thumb');
      var windowH = window.innerHeight;
      thumbs.forEach(function(thumb) {
        var rect = thumb.getBoundingClientRect();
        if (rect.top < windowH - 50) {
          thumb.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', onScrollRevealThumbs);
    window.addEventListener('DOMContentLoaded', onScrollRevealThumbs);

