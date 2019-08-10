//获取文章分类数据，并将数据显示在所属分类的下拉列表中，供管理员选择
$.ajax({
    // 获取文章分类的数据
    url:'/categories',
    type:'get',
    success:function(res){
        // 拼接模板 显示在页面
        var html = template('pTpl',{data:res});
        $('#category').html(html);
    }
})

// 上传图片到本地 并把路径写到隐藏域

$('#feature').on('change', function () {

    var formData = new FormData();

    formData.append('file', this.files[0]);
    // alert(111);
    // console.log(this.files[0]);
    console.log(formData);
    // return;
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success:function(res){
            //把路径写到隐藏域
            $('#hidden').val(res[0].file);
            // 实现图片预览
            $('#pImg').attr('src',res[0].file).show();
        }
    })
})
//实现文章封面图片上传，并将上传后的图片地址保存在一个隐藏域中
//为添加文章表单中的每一个表单项添加name属性，并且name属性值要和接口中要求的参数名称一致
//为添加文章列表绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
//获取到管理员在表单中输入的内容
//向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面