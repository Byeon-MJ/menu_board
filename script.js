// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 네비게이션 기능
    const navButtons = document.querySelectorAll('.nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    // 네비게이션 버튼 클릭 이벤트
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // 모든 버튼에서 active 클래스 제거
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 메뉴 섹션 숨기기
            menuSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 타겟 섹션 보이기
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // 스크롤 시 네비게이션 배경 변경
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.menu-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // 메뉴 아이템 호버 효과 강화
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

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

    // 로고 클릭 시 페이지 상단으로 스크롤
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
                header.style.transition = 'all 0.8s ease';
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

    // 메뉴 아이템 등장 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 메뉴 아이템들에 애니메이션 적용
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

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
        const nav = document.querySelector('.menu-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);
}); 