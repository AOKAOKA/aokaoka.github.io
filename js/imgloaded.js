// 首页一图流加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
(function() {
  class ProgressiveLoad {
    constructor(smallSrc, largeSrc) {
      this.smallSrc = smallSrc;
      this.largeSrc = largeSrc;
      this.initTpl();
      this.container.addEventListener('animationend', () => {
        this.smallStage.style.display = 'none'; 
      }, {once: true});
    }

    initTpl() {
      this.container = document.createElement('div');
      this.smallStage = document.createElement('div');
      this.largeStage = document.createElement('div');
      this.smallImg = new Image();
      this.largeImg = new Image();
      this.container.className = 'pl-container';
      this.smallStage.className = 'pl-img pl-blur';
      this.largeStage.className = 'pl-img';
      this.container.appendChild(this.smallStage);
      this.container.appendChild(this.largeStage);
      this.smallImg.onload = this._onSmallLoaded.bind(this);
      this.largeImg.onload = this._onLargeLoaded.bind(this);
    }

    progressiveLoad() {
      this.smallImg.src = this.smallSrc;
      this.largeImg.src = this.largeSrc;
    }

    _onLargeLoaded() {
      this.largeStage.classList.add('pl-visible');
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
    }

    _onSmallLoaded() {
      this.smallStage.classList.add('pl-visible');
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
  }

  const executeLoad = (config, target) => {
    console.log('执行渐进背景替换');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const loader = new ProgressiveLoad(
      isMobile ? config.mobileSmallSrc : config.smallSrc,
      isMobile ? config.mobileLargeSrc : config.largeSrc
    );
    if (target.children[0]) {
      target.insertBefore(loader.container, target.children[0]);
    }
    loader.progressiveLoad();
  };

  const ldconfig = {
    light: {
	  smallSrc: 'https://tuchuang.aokaoka.top/file/1728157575483_5be812142f752c01ec6ab6cbdd313b607beba75f_raw.jpg', //浅色模式 小图链接 尽可能配置小于100k的图片 
	  largeSrc: 'https://tuchuang.aokaoka.top/file/1728157575483_5be812142f752c01ec6ab6cbdd313b607beba75f_raw.jpg', //浅色模式 大图链接 最终显示的图片
	  mobileSmallSrc: 'https://tuchuang.aokaoka.top/file/1730247469226_Screenshot_20241030_081712_com.microsoft.emmx.png', //手机端浅色小图链接 尽可能配置小于100k的图片
	  mobileLargeSrc: 'https://tuchuang.aokaoka.top/file/1730247469226_Screenshot_20241030_081712_com.microsoft.emmx.png', //手机端浅色大图链接 最终显示的图片
	  enableRoutes: ['/'],
	  },
	dark: {
	  smallSrc: 'https://tuchuang.aokaoka.top/file/1728157580571_1397d917df33ee3b23ec469bbc4403e8610a2d9d_raw.jpg', //深色模式 小图链接 尽可能配置小于100k的图片 
	  largeSrc: 'https://tuchuang.aokaoka.top/file/1728157580571_1397d917df33ee3b23ec469bbc4403e8610a2d9d_raw.jpg', //深色模式 大图链接 最终显示的图片
	  mobileSmallSrc: 'https://tuchuang.aokaoka.top/file/1730247462951_Screenshot_20241030_081641_com.microsoft.emmx.png', //手机端深色模式小图链接 尽可能配置小于100k的图片
	  mobileLargeSrc: 'https://tuchuang.aokaoka.top/file/1730247462951_Screenshot_20241030_081641_com.microsoft.emmx.png', //手机端深色大图链接 最终显示的图片
	  enableRoutes: ['/'],
	  },
	};

    const getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme'); 
    }

    const onThemeChange = () => {
      const currentTheme = getCurrentTheme();
      const config = ldconfig[currentTheme];
      initProgressiveLoad(config);
      document.addEventListener("DOMContentLoaded", function() {
        initProgressiveLoad(config);
      });
    
      document.addEventListener("pjax:complete", function() {
        onPJAXComplete(config);
      });
    }

    let initTheme = getCurrentTheme();
    let initConfig = ldconfig[initTheme];
    initProgressiveLoad(initConfig);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "data-theme" && location.pathname === '/') {
        onThemeChange();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]  
  });

  function initProgressiveLoad(config) {
    const container = document.querySelector('.pl-container');
    if (container) {
      container.remove();
    }
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      executeLoad(config, target);
    }
  }

  function onPJAXComplete(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      initProgressiveLoad(config);
    }
  }

})();
