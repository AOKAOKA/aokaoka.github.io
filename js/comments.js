(() => {
  const injectCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
      .card-latest-comments .item-headline i {
        color: var(--anzhiyu-main);
      }

      .card-latest-comments .headline-right {
        position: absolute;
        right: 24px;
        top: 20px;
        transition: all 0.3s;
        opacity: 0.6;
      }

      .card-latest-comments .headline-right:hover {
        color: var(--anzhiyu-main);
        opacity: 1;
        transform: rotate(90deg);
      }

      .aside-list-author {
        display: flex;
        align-items: center;
        font-weight: bold;
        height: 22px;
        gap: 5px;
      }

      .aside-list-date {
        font-size: 0.7rem;
        font-weight: normal;
        margin-left: auto;
      }

      .aside-list-content {
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        line-height: 1.2;
      }

      .aside-list-item:last-child {
        margin-bottom: 0!important;
      }

      [data-theme='dark'] .aside-list-item-right {
        filter: brightness(0.95);
      }
    `;
    document.head.appendChild(style);
  };

  const LatestComments = {
    API_URL: 'https://twikoo.ruom.top',
    ADMIN_EMAIL_MD5: 'f2c9c64c90a00afeed5ba410e5447a0d01aa294874bd662032a27c5385bcde1c',
    PAGE_SIZE: 5,
    LOADING_GIF: 'https://lib.bsgun.cn/Hexo-static/img/loading.gif',
  
    async fetchComments() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
  
      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'GET_RECENT_COMMENTS',
            includeReply: true,
            pageSize: this.PAGE_SIZE
          }),
          signal: controller.signal
        });
  
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.error('获取评论出错:', error);
        return null;
      } finally {
        clearTimeout(timeoutId);
      }
    },
  
    formatTimeAgo(timestamp) {
      const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
      if (diff < 60) return '刚刚';
      if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
      if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;
  
      return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }) + '日';
    },
  
    formatContent(content) {
      if (!content) return '';
      
      return content
        .replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g, '[代码块]')
        .replace(/<code>([^<]{4,})<\/code>/g, '[代码]')
        .replace(/<code>([^<]{1,3})<\/code>/g, '$1')
        .replace(/<img[^>]*>/g, '[图片]')
        .replace(/<a[^>]*?>[\s\S]*?<\/a>/g, '[链接]')
        .replace(/<[^>]+>/g, '')
        .replace(/&(gt|lt|amp|quot|#39|nbsp);/g, m => 
          ({'>':'>', '<':'<', '&':'&', 'quot':'"', '#39':"'", 'nbsp':' '})[m.slice(1,-1)])
        .replace(/\s+/g, ' ')
        .trim();
    },
  
    generateCommentHTML(comment) {
      const { created, comment: content, url, avatar, nick, mailMd5, id } = comment;
      const timeAgo = this.formatTimeAgo(created);
      const formattedContent = this.formatContent(content);
      const adminBadge = mailMd5 === this.ADMIN_EMAIL_MD5 ? `
        <svg t="1731283534336" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29337" width="22" height="22"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m291.84 366.08c-46.08 0-79.36 23.04-92.16 66.56l-163.84 358.4h-66.56L312.32 435.2c-17.92-46.08-46.08-71.68-89.6-71.68v-35.84H512v35.84h-40.96c-25.6 2.56-30.72 23.04-12.8 61.44l102.4 225.28 89.6-199.68c25.6-56.32 2.56-84.48-71.68-89.6v-35.84h225.28v40.96z" fill="#06c013" p-id="29338" data-spm-anchor-id="a313x.search_index.0.i73.2b2d3a81BgxnVW" class=""></path></svg>` : '';
  
      return `
        <div class="aside-list-item" title="${formattedContent}" onclick="pjax.loadUrl('${url}#${id}')">
          <div class="thumbnail">
            <img class="aside-list-avatar" src="${avatar}" alt="avatar">
          </div>
          <div class="content">
            <div class="aside-list-author">
              ${nick} ${adminBadge}
              <span class="aside-list-date">${timeAgo}</span>
            </div>
            <div class="aside-list-content">${formattedContent}</div>
          </div>
        </div>
      `;
    },
  
    getErrorTemplate(icon, message) {
      return `
        <div style="min-height: 346px;display: flex;padding: 20px;text-align: center;justify-content: center;align-items: center;flex-direction: column;">
          <i class="fas fa-${icon}" style="font-size: 2rem; color: ${icon === 'exclamation-circle' ? '#ff6b6b' : '#999'}; margin-bottom: 10px;"></i>
          <p style="color: #666;margin: 0;">${message}</p>
        </div>
      `;
    },
  
    async insertComponent() {
      const container = document.getElementById("latest-comments");
      if (!container) return;
  
      container.innerHTML = `<img src="${this.LOADING_GIF}" style="display: flex;min-height: 346px;object-fit: cover;">`;
  
      const comments = await this.fetchComments();
      let content;
  
      if (comments === null) {
        content = this.getErrorTemplate('exclamation-circle', '评论加载失败，请稍后再试');
      } else if (comments.length === 0) {
        content = this.getErrorTemplate('comment-slash', '还没有评论呢~ 快来抢沙发吧！');
      } else {
        content = comments.map(this.generateCommentHTML.bind(this)).join('');
      }
  
      container.style.opacity = '0';
      container.innerHTML = content;
  
      requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.3s ease-in';
        container.style.opacity = '1';
      });
    }
  };
  
  // 初始化时注入CSS并启动组件
  ['DOMContentLoaded', 'pjax:success'].forEach(event => 
    document.addEventListener(event, () => {
      injectCSS();
      LatestComments.insertComponent();
    })
  );
})();
