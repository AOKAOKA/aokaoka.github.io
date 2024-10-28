var posts=["2024/10/06/笙竹小镇[MC服务器]/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"温婉二级域名分发","link":"http://dns.wenwanmn.cn/","avatar":"https://q1.qlogo.cn/g?b=qq&nk=1050925710&s=640","descr":"嘿嘿嘿 ，又是摆烂的一天！","siteshot":"https://tuchuang.aokaoka.top/file/1728214688633_屏幕截图 2024-10-06 193743.png"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"宇宇次元美图","link":"https://pic.yuyu.red/","avatar":"https://free-img.400040.xyz/4/2024/08/31/66d3280d0c83b.jpg","descr":"轻轻的图片，浅浅的爱意","siteshot":"https://tuchuang.aokaoka.top/file/1728124809041_屏幕截图 2024-10-05 183943.png","color":"vip","tag":"美图分享"},{"name":"南山上的一张烙饼","link":"https://blog.647382.xyz","avatar":"https://tuchuang.aokaoka.top/file/1728192792023_b_7dc598a89a19b6c298c2b7c2361328ce.jpg","descr":"陌生人,你好!","siteshot":"https://tuchuang.aokaoka.top/file/1728188308781_屏幕截图 2024-10-06 121806.png"},{"name":"温婉のBlog","link":"ss.wenwanmn.cn","avatar":"https://q1.qlogo.cn/g?b=qq&nk=1050925710&s=640","descr":"嘿嘿嘿 ，又是摆烂的一天！","siteshot":"https://q1.qlogo.cn/g?b=qq&nk=1050925710&s=640"},{"name":"HeLei的个人博客","link":"https://helei.host/","avatar":"https://tuchuang.aokaoka.top/file/1728231224234_b_2699d262dc3f4fe72053e28bb942aba6.jpg","descr":"走在人群中的你，仍旧是一个人","siteshot":"https://tuchuang.aokaoka.top/file/1728231444510_屏幕截图 2024-10-07 001710.png"},{"name":"XingJiのBlog","link":"https://love.xingji.fun/","avatar":"https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg","descr":"迄今所有人生都大写着失败，但不妨碍我继续向前✨","siteshot":"https://i.p-i.vip/47/20240920-66ed7b6730ca9.png"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"宇宇","link":"https://pic.yuyu.red/","avatar":"https://free-img.400040.xyz/4/2024/08/31/66d3280d0c83b.jpg","descr":"轻轻的图片，浅浅的爱意","recommend":true},{"name":"烧瑚烙饼","link":"https://blog.647382.xyz","avatar":"https://tuchuang.aokaoka.top/file/1728192792023_b_7dc598a89a19b6c298c2b7c2361328ce.jpg","descr":"陌生人,你好!","recommend":true},{"name":"花落谁相伴✘","link":"https://idc.natriumgroup.com/","avatar":"https://tuchuang.aokaoka.top/file/1728157563758_pic08.jpg","descr":"你最值得信赖的服务商!","recommend":true},{"name":"温婉","link":"http://dns.wenwanmn.cn/","avatar":"https://q1.qlogo.cn/g?b=qq&nk=1050925710&s=640","descr":"嘿嘿嘿 ，又是摆烂的一天！","recommend":true},{"name":"HeLei","link":"https://helei.host/","avatar":"https://tuchuang.aokaoka.top/file/1728231224234_b_2699d262dc3f4fe72053e28bb942aba6.jpg","descr":"走在人群中的你，仍旧是一个人","recommend":true},{"name":"XingJiのBlog","link":"https://love.xingji.fun/","avatar":"https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg","descr":"迄今所有人生都大写着失败，但不妨碍我继续向前✨","recommend":true}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };