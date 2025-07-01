// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 75, 120, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = '#0a4b78';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 更新导航栏活跃状态
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 新闻轮播
    const newsItems = document.querySelectorAll('.news-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    function showNews(index) {
        // 隐藏所有新闻项目
        newsItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前新闻项目
        newsItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // 初始化显示第一条新闻
    showNews(0);
    
    // 自动轮播
    let interval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % newsItems.length;
        showNews(nextIndex);
    }, 5000);
    
    // 点击前进和后退按钮
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        let nextIndex = (currentIndex + 1) % newsItems.length;
        showNews(nextIndex);
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % newsItems.length;
            showNews(nextIndex);
        }, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        let prevIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
        showNews(prevIndex);
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % newsItems.length;
            showNews(nextIndex);
        }, 5000);
    });
    
    // 点击指示点切换新闻
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showNews(index);
            interval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % newsItems.length;
                showNews(nextIndex);
            }, 5000);
        });
    });
    
    // 回到顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 显示/隐藏回到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 处理汉堡菜单点击事件
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
});
