// 这个数组是专门从来存放分类
var cArr = new Array();
// 添加分页
$('#cAdd').on('click', function () {
  // 获取用户在表单中输入的内容
  var formData = $('#addCategory').serialize();
  // 向服务器端发送请求 添加分类
  $.ajax({
    type: 'post',
    url: '/categories',
    data: formData,
    success: function (res) {
      cArr.push(res);
      render(cArr);
      $('#title').val('');
      $('#className').val('');
    }
  })
});

// 展示分类
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    cArr = res;
    render(cArr);
  }
})
// 显示数据 调用template方法
function render(arr) {
  var str = template('cTpl', {
    list: arr
  });
  $('tbody').html(str)
}

// 编辑功能
var cId; //设定一个全局变量
$('tbody').on('click', '.edit', function () {
  // 获取添加的id值
  cId = $(this).parent().attr('data-id');
  $('#addCategory > h2').text('修改分类');
  // 获取左边的title值
  var title = $(this).parents('tr').children().eq(1).text();
  // 获取左边的classname值
  var className = $(this).parents('tr').children().eq(2).text();
  // 把获取的左边的值给右边
  $('#title').val(title);
  $('#className').val(className);
  // 将显示添加的类名隐藏 编辑显示
  $('#cAdd').hide();
  $('#cEdit').show();
});

$('#cEdit').on('click', function () {
  $.ajax({
    type: 'put',
    url: '/categories/' + cId,
    data: $('#addCategory').serialize(),
    success: function (res) {
      var index = cArr.findIndex(item => item._id == cId);
      cArr[index] = res;
      render(cArr);
      $('#title').val('');
      $('#className').val('');
      $('#cAdd').show();
      $('#cEdit').hide();
    }
  })
});

// 删除单个用户
$('tbody').on('click', '.delete', function () {
  if (window.confirm('真的要删除吗?')) {
      var id = $(this).parent().attr('data-id');
      // 发送ajax
      $.ajax({
          type: 'delete',
          url: '/categories/' + id,
          success: function (res) {
              var index = cArr.findIndex(item => item._id == res._id)
              cArr.splice(index, 1);
              render(cArr);
          }
      })
  }
});

