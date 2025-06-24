- BibeCoding with Cursor AI

# MJS Bar - 칵테일 메뉴판 웹사이트

MJS Bar의 프리미엄 칵테일 메뉴판 웹사이트입니다. 세련된 디자인과 반응형 레이아웃으로 모든 디바이스에서 최적의 경험을 제공합니다.

## 🍸 주요 기능

- **반응형 디자인**: 데스크톱, 태블릿, 모바일 모든 디바이스 지원
- **카테고리별 메뉴**: 칵테일, 스피리츠, 와인, 맥주 카테고리 분류
- **인터랙티브 네비게이션**: 부드러운 전환 효과와 호버 애니메이션
- **모던 UI/UX**: 다크 테마와 골드 액센트로 프리미엄한 분위기 연출
- **터치 지원**: 모바일에서 스와이프로 카테고리 전환 가능
- **키보드 네비게이션**: 접근성을 위한 키보드 지원

## 🎨 디자인 특징

- **색상 팔레트**: 
  - 메인: 다크 그레이 (#1a1a1a, #2d2d2d)
  - 액센트: 골드 (#d4af37, #ffd700)
  - 텍스트: 화이트 (#ffffff), 라이트 그레이 (#cccccc)

- **타이포그래피**:
  - 제목: Playfair Display (세리프)
  - 본문: Poppins (산세리프)

- **애니메이션**: 
  - 페이드인 효과
  - 호버 트랜지션
  - 스크롤 기반 등장 애니메이션

## 📁 파일 구조

```
menu_board/
├── index.html          # 메인 HTML 파일
├── styles.css          # CSS 스타일시트
├── script.js           # JavaScript 기능
├── README.md           # 프로젝트 설명서
└── .gitignore          # Git 무시 파일
```

## 🚀 사용법

1. **로컬에서 실행**:
   ```bash
   # 프로젝트 폴더로 이동
   cd menu_board
   
   # 웹 서버 실행 (Python 3)
   python -m http.server 8000
   
   # 또는 Node.js live-server 사용
   npx live-server
   ```

2. **브라우저에서 접속**:
   ```
   http://localhost:8000
   ```

## 🖼️ 메인 이미지 추가 방법

현재 메인 이미지 섹션에는 플레이스홀더가 있습니다. 실제 이미지를 추가하려면:

1. `index.html` 파일의 히어로 섹션을 찾습니다:
   ```html
   <div class="hero-image-container">
       <!-- 메인 이미지가 여기에 들어갈 예정 -->
       <div class="placeholder-image">
           <i class="fas fa-image"></i>
           <p>메인 이미지를 여기에 첨부해주세요</p>
       </div>
   </div>
   ```

2. 플레이스홀더를 실제 이미지로 교체:
   ```html
   <div class="hero-image-container">
       <img src="images/hero-image.jpg" alt="MJS Bar" class="hero-image">
   </div>
   ```

3. CSS에서 이미지 스타일 추가:
   ```css
   .hero-image {
       width: 100%;
       height: 100%;
       object-fit: cover;
   }
   ```

## 🛠️ 커스터마이징

### 메뉴 아이템 추가
`index.html`의 각 메뉴 섹션에 새로운 아이템을 추가할 수 있습니다:

```html
<div class="menu-item">
    <div class="item-image">
        <i class="fas fa-glass-martini-alt"></i>
    </div>
    <div class="item-content">
        <h3 class="item-name">새로운 칵테일</h3>
        <p class="item-description">칵테일 설명</p>
        <span class="item-price">₩20,000</span>
    </div>
</div>
```

### 색상 변경
`styles.css`에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다.

### 폰트 변경
Google Fonts에서 다른 폰트를 선택하여 `index.html`의 폰트 링크를 교체할 수 있습니다.

## 📱 반응형 브레이크포인트

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 480px - 767px
- **소형 모바일**: 480px 미만

## 🌟 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript (ES6+)**: DOM 조작, 이벤트 처리
- **Font Awesome**: 아이콘
- **Google Fonts**: 웹 폰트

## 📞 연락처

- **주소**: 서울특별시 강남구 테헤란로 123
- **전화**: 02-1234-5678
- **영업시간**: 매일 18:00 - 02:00

## 📄 라이선스

© 2024 MJS Bar. All rights reserved.

---

**개발자**: MJS Bar Development Team  
**최종 업데이트**: 2024년 12월
