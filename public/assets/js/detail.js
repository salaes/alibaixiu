
var id = getUrlParams('id');

if (id != -1) {
  $.ajax({
    url: '/posts/' + id,
    type: 'get',
    success: function (res) {
      var html = template('detailTmp', { data: res });
      $('.article').html(html);
    }
  })
}

$('.article').on('click', '#like', function () {
  // 向服务器发送请求 执行点赞操作
  $.ajax({
    type: 'post',
    url: '/posts/fabulous/' + postId,
    success: function () {
      alert('点赞成功,感谢您的支持');
    }
  })
});
