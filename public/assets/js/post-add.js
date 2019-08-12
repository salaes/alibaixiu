//获取文章分类数据，并将数据显示在所属分类的下拉列表中，供管理员选择
$.ajax({
    // 获取文章分类的数据
    url: '/categories',
    type: 'get',
    success: function (res) {
        // 拼接模板 显示在页面
        var html = template('pTpl', { data: res });
        $('#category').html(html);
    }
})

// 上传图片到本地 并把路径写到隐藏域

$('#feature').on('change', function () {
    var formData = new FormData();
    formData.append('file', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (res) {
            //把路径写到隐藏域
            $('#hidden').val(res[0].file);
            // 实现图片预览
            $('#pImg').attr('src', res[0].file).show();
        }
    })
})

// 点击保存按钮添加文章
// $('#pAdd').on('click', function () {
//     $.ajax({
//         type:'post',
//         url:'/posts',
//         data:$('#pForm').serialize(),
//         success:function(res){
//             location.href='/admin/posts.html'
//         },
//         error:function(err){
//             console.log(err);
            
//         }
//     })
//     // render();
    
// })

$('#pAdd').on('click', function () {
    console.log($('#pForm').serialize());
    // return;
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $('#pForm').serialize(),
        success: function (res) {
            // 需要跳转到展示文章的列表页
            console.log(111);
            
            location.href = "/admin/posts.html";
        },
        error: function (err) {
            return;
            // console.log(err);
        }

    })
})


//获取到管理员在表单中输入的内容
//向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面