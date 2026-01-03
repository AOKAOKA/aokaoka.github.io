var posts=["posts/d50a.html","posts/de2a4172.html","posts/7bcddba4.html","posts/43222ac4.html","posts/a159f972.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱"},{"name":"别碰我的镜头盖","link":"https://blog.bornforthis.cn","avatar":"https://bornforthis.cn/aiyc.svg","descr":"I love the people I photograph！"},{"name":"龙星划空","link":"https://blog.245179.xyz/","avatar":"https://blog.245179.xyz/images/atiq.png","descr":"人生近看是悲剧，远看是喜剧"},{"name":"轻风 blog","link":"https://www.qingfengnb.cn","avatar":"https://img.qingfengnb.cn/LightPicture/2025/07/bec6eb9625656d60.jpg","descr":"茫茫人海，多么幸运才能遇见你！"},{"name":"一清三白","link":"https://sanbaiblog.cn/","avatar":"https://s21.ax1x.com/2025/01/05/pE9CfDU.jpg","descr":"克己慎独 守心明性"},{"name":"ZERO开发","link":"https://www.zerofc.cn/","avatar":"https://pica.zhimg.com/80/v2-a67e0f93ae57170e033e56834c841c43_720w.png","descr":"一个持续探索副业的独立开发者博客"},{"name":"轻风 blog","link":"https://www.qingfengnb.cn","avatar":"https://img.qingfengnb.cn/LightPicture/2025/07/bec6eb9625656d60.jpg","descr":"茫茫人海，多么幸运才能遇见你！"},{"name":"XingJiのBlog","link":"https://love.xingji.fun/","avatar":"https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg","descr":"迄今所有人生都大写着失败，但不妨碍我继续向前✨"},{"name":"一粒微尘","link":"https://blog.667408.xyz","avatar":"https://blog.667408.xyz/favicon.ico","descr":"撷光以望，纳星于瞳"},{"name":"铭心石刻","link":"https://blog.kouseki.cn/","avatar":"https://blog.kouseki.cn/imgs/avatar.webp","descr":"愿岁并谢，与友长兮"},{"name":"Spark の Blog","link":"https://www.aspark.cc","avatar":"https://www.aspark.cc/img/avatar.webp","descr":"星星之火，可以燎原。"},{"name":"弈鸣小筑","link":"https://blog.ymhut.cn","avatar":"https://blog.ymhut.cn/upload/favicon.ico","descr":"功不唐捐，玉汝于成"},{"name":"青桔气球","link":"https://blog.qjqq.cn/","avatar":"https://q2.qlogo.cn/headimg_dl?dst_uin=1645253&spec=640","descr":"分享网络安全与科技生活"},{"name":"煮雪话河山`Blog","link":"https://blog.cent1pedee.top/","avatar":"https://img.cent1pedee.top/img/wechat.jpg","descr":"如月之恒，如日之升。"},{"name":"前尘小筑","link":"https://mnchen.cn/","avatar":"https://image.mnchen.cn/2023/12/mnochen.jpg","descr":"虽多尘色染，犹见墨痕浓"},{"name":"胜天半子","link":"https://blog.291055.xyz/","avatar":"https://i1.wp.com/ruom.wuaze.com/i/2024/11/02/166823.webp","descr":"事已至此，先吃饭吧"},{"name":"龙窝","link":"https://blog.245179.xyz/","descr":"随便发点啥啦ouo","avatar":"https://blog.qiyao.us.kg/images/atiq.png"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情"},{"name":"陆小启","link":"https://blog.luxq.space","avatar":"https://bu.dusays.com/2025/03/14/67d3fbedaa1c6.webp","descr":"往者不谏，来者可追"},{"name":"李小白","link":"https://blog.lxb.icu/","avatar":"https://q1.qlogo.cn/g?b=qq&nk=648226460&s=640","descr":"风共舞，随心而行"},{"name":"Elykia","link":"https://blog.elykia.cn/","avatar":"https://bu.dusays.com/2024/10/25/671b2438203a6.gif","descr":"致以无暇之人"},{"name":"Sky-cat✨","link":"https://blog.075262.xyz/","avatar":"https://pic4.58cdn.com.cn/nowater/webim/big/n_v2706f69d74e3849528841b07982015d4c.jpg","descr":"星河满目，璀璨无限✨"},{"name":"小旦","link":"https://satera.cn","avatar":"https://satera.cn/img/logo.png","descr":"SNTube Studio"},{"name":"葱苓小筑","link":"https://blog.ciraos.top","avatar":"https://s2.loli.net/2025/12/26/F9nkl7yfuo6TN5p.png","descr":"风带来了故事的种子，时间使其发芽。"},{"name":"Acacia_Ma","link":"https://acacia-ma.com","avatar":"https://bu.dusays.com/2023/10/21/6533d9c12532c.jpg","descr":"心有棱角，身泛星光"}];
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