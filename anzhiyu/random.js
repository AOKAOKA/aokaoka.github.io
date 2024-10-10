var posts=["2024/10/10/测试/","2024/10/06/笙竹小镇[乌托邦之旅]/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };