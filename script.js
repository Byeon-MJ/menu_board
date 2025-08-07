// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 테마 관리
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // 저장된 테마 불러오기 또는 기본값 설정
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 테마 토글 버튼 클릭 이벤트
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 네비게이션 배경 업데이트
        updateNavBackground();
    });
    
    // 테마 아이콘 업데이트 함수
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // 네비게이션 배경 업데이트 함수
    function updateNavBackground() {
        const nav = document.querySelector('.menu-nav');
        const currentTheme = body.getAttribute('data-theme');
        
        // 스크롤에 관계없이 일관된 배경 유지
        if (currentTheme === 'light') {
            nav.style.background = '#ffffff';
        } else {
            nav.style.background = '#1a1a1a';
        }
    }

    // 메뉴 네비게이션 기능
    const navButtons = document.querySelectorAll('.nav-btn');
    const menuContainer = document.getElementById('menuContainer');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navButtonsContainer = document.getElementById('navButtons');
    const currentMenuSpan = mobileMenuToggle ? mobileMenuToggle.querySelector('.current-menu') : null;
    let currentCategory = null;
    let loadedCategories = {};
    
    // Debug logging
    console.log('Mobile menu toggle element:', mobileMenuToggle);
    console.log('Nav buttons container:', navButtonsContainer);
    console.log('Current menu span:', currentMenuSpan);
    
    // 모바일 드롭다운 토글 기능
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('Mobile menu toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            console.log('Is active:', isActive);
            
            if (isActive) {
                // 드롭다운 닫기
                console.log('Closing dropdown');
                this.classList.remove('active');
                navButtonsContainer.classList.remove('show');
            } else {
                // 드롭다운 열기
                console.log('Opening dropdown');
                this.classList.add('active');
                navButtonsContainer.classList.add('show');
            }
        });
    } else {
        console.error('Mobile menu toggle not found');
    }
    
    // 드롭다운 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (mobileMenuToggle && navButtonsContainer && 
            !mobileMenuToggle.contains(e.target) && !navButtonsContainer.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navButtonsContainer.classList.remove('show');
        }
    });

    // 네비게이션으로 스크롤하는 함수
    function scrollToNavigation() {
        const nav = document.querySelector('.menu-nav');
        if (nav) {
            nav.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
    }

    // 메뉴 카테고리 로드 함수
    async function loadMenuCategory(category) {
        console.log(`Loading category: ${category}`);
        
        // 메뉴 컨테이너 표시
        menuContainer.classList.add('show');
        
        // 네비게이션으로 자동 스크롤
        setTimeout(() => {
            scrollToNavigation();
        }, 100); // 메뉴 컨테이너 표시 애니메이션 후 스크롤
        
        // 이미 로드된 카테고리면 캐시에서 가져오기
        if (loadedCategories[category]) {
            console.log(`Using cached content for: ${category}`);
            menuContainer.innerHTML = loadedCategories[category];
            initializeMenuItems();
            return;
        }

        try {
            // 로딩 상태 표시
            menuContainer.innerHTML = `
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading ${category}...</p>
                </div>
            `;

            // 카테고리 파일 로드
            const response = await fetch(`pages/${category}.html`);
            console.log(`Fetch response for ${category}:`, response.status, response.ok);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${category}: ${response.status}`);
            }
            
            const html = await response.text();
            console.log(`Loaded HTML for ${category}:`, html.substring(0, 100) + '...');
            
            // 캐시에 저장
            loadedCategories[category] = html;
            
            // 컨테이너에 삽입
            menuContainer.innerHTML = html;
            console.log(`Inserted HTML for ${category}`);
            
            // 메뉴 아이템 애니메이션 초기화
            initializeMenuItems();
            
        } catch (error) {
            console.error('Error loading menu category:', error);
            menuContainer.innerHTML = `
                <div class="loading-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load menu. Please try again.</p>
                </div>
            `;
        }
    }

    // 메뉴 아이템 초기화 함수
    function initializeMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        // 호버 효과 재적용 (클릭 가능하지 않은 아이템만)
        menuItems.forEach(item => {
            if (!item.classList.contains('clickable')) {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            }
        });

        // 클릭 가능한 메뉴 아이템에 클릭 이벤트 추가
        const clickableItems = document.querySelectorAll('.menu-item.clickable');
        clickableItems.forEach(item => {
            item.addEventListener('click', function() {
                const detailKey = this.getAttribute('data-detail');
                if (detailKey) {
                    openDetailModal(detailKey);
                }
            });
        });

        // 등장 애니메이션 적용
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });
    }

    // 네비게이션 버튼 클릭 이벤트
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // 같은 카테고리 클릭시 무시 (단, 초기 로드는 예외)
            if (currentCategory === targetCategory && currentCategory !== null) {
                // 모바일에서는 드롭다운 닫기
                if (mobileMenuToggle && navButtonsContainer) {
                    mobileMenuToggle.classList.remove('active');
                    navButtonsContainer.classList.remove('show');
                }
                return;
            }
            
            // 모든 버튼에서 active 클래스 제거
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 현재 카테고리 업데이트
            currentCategory = targetCategory;
            
            // 모바일 드롭다운 텍스트 업데이트
            if (currentMenuSpan) {
                currentMenuSpan.textContent = this.textContent;
            }
            
            // 드롭다운 닫기
            if (mobileMenuToggle && navButtonsContainer) {
                mobileMenuToggle.classList.remove('active');
                navButtonsContainer.classList.remove('show');
            }
            
            // 메뉴 카테고리 로드
            loadMenuCategory(targetCategory);
        });
    });

    // 초기 메뉴 로드 제거 - 메뉴 버튼 클릭시에만 로드

    // 상세 페이지 모달 관리
    const detailModal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    let loadedDetails = {};

    // 상세 페이지 모달 열기
    async function openDetailModal(detailKey) {
        console.log(`Opening detail modal for: ${detailKey}`);
        
        try {
            // 이미 로드된 상세 정보가 있으면 캐시 사용
            if (loadedDetails[detailKey]) {
                console.log(`Using cached detail for: ${detailKey}`);
                modalBody.innerHTML = loadedDetails[detailKey];
                showModal();
                return;
            }

            // 로딩 상태 표시
            modalBody.innerHTML = `
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading details...</p>
                </div>
            `;
            showModal();

            // 상세 페이지 파일 로드
            const response = await fetch(`pages/details/${detailKey}.html`);
            console.log(`Detail fetch response for ${detailKey}:`, response.status, response.ok);
            
            if (!response.ok) {
                throw new Error(`Failed to load detail: ${response.status}`);
            }
            
            const html = await response.text();
            console.log(`Loaded detail HTML for ${detailKey}:`, html.substring(0, 100) + '...');
            
            // 캐시에 저장
            loadedDetails[detailKey] = html;
            
            // 모달에 내용 삽입
            modalBody.innerHTML = html;
            
            // 알코올 미터 애니메이션
            setTimeout(() => {
                const alcoholFill = document.querySelector('.alcohol-fill');
                if (alcoholFill) {
                    const width = alcoholFill.style.width;
                    alcoholFill.style.width = '0%';
                    setTimeout(() => {
                        alcoholFill.style.width = width;
                    }, 300);
                }
            }, 100);
            
        } catch (error) {
            console.error('Error loading detail:', error);
            modalBody.innerHTML = `
                <div class="loading-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load details. Please try again.</p>
                </div>
            `;
        }
    }

    // 모달 표시
    function showModal() {
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    // 모달 닫기
    function closeModal() {
        detailModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // 스크롤 복원
    }

    // 모달 닫기 이벤트들
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detailModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 스크롤 시 네비게이션 배경 변경 (테마 인식)
    window.addEventListener('scroll', function() {
        updateNavBackground();
    });

    // 메뉴 아이템 호버 효과는 initializeMenuItems에서 처리됨

    // 부드러운 스크롤 효과
    const smoothScroll = function(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 로고 클릭 시 페이지 새로고침
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.reload();
        });
    }

    // 푸터 MJS Bar 텍스트 클릭 시 페이지 새로고침
    const footerTitle = document.querySelector('.footer-info h3');
    if (footerTitle) {
        footerTitle.style.cursor = 'pointer';
        footerTitle.addEventListener('click', function() {
            window.location.reload();
        });
    }

    // 페이지 로드 시 애니메이션
    window.addEventListener('load', function() {
        const header = document.querySelector('.header');
        const hero = document.querySelector('.hero-section');
        
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                hero.style.transition = 'all 1s ease';
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // 메뉴 아이템 등장 애니메이션은 initializeMenuItems에서 처리됨

    // 푸터 소셜 링크 호버 효과
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(activeButton);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navButtons[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < navButtons.length - 1) {
            navButtons[currentIndex + 1].click();
        }
    });

    // 터치 디바이스 지원
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeButton = document.querySelector('.nav-btn.active');
            const currentIndex = Array.from(navButtons).indexOf(activeButton);
            
            if (diff > 0 && currentIndex < navButtons.length - 1) {
                // 왼쪽으로 스와이프 - 다음 카테고리
                navButtons[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                // 오른쪽으로 스와이프 - 이전 카테고리
                navButtons[currentIndex - 1].click();
            }
        }
    }

    // 성능 최적화를 위한 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 스크롤 이벤트 최적화
    const optimizedScrollHandler = debounce(function() {
        updateNavBackground();
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);
}); 