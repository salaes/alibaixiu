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

$('#pAdd').on('click', function () {
    // console.log($('#pForm').serialize());
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



// 定义一个函数 用来获取浏览器地址中的id参数
var id = getUrlParams('id');
console.log(id);

// 修改功能
if (id != -1) {
    // 发送ajax 向服务器发送请求这边文章的相关信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (res) {
            console.log(res);
            // 获取标签
            $('#title').val(res.title);
            // 获取文章内容
            $('#content').val(res.content);
            // 获取文章提交时间 并判断当提交了时间时 就截取时间的字符串 获得时间的规范显示
            $('#created').val(res.createAt && res.createAt.substr(0, 16));
            // 获取category下所有的option 分类
            var coption = $('#category > option');
            // 遍历这个分类
            coption.each(function (index, item) {
                // 需要将item对象转换为jq对象
                if ($(item).val() == res.category) {
                    $(item).prop('selected', true);
                }
            });
            // 获取文章的发布状态
            var soption = $('#status > option');
            // 遍历这个状态的下拉框
            soption.each(function (index, item) {
                // 需要将item对象转换为jq对象
                if ($(item).val() == res.state) {
                    $(item).prop('selected', true);
                }
            });
            // 获取上传的图片
            $("#feature").val(res.thumbnail);
            $('#pImg').show().prop("src",res.thumbnail);
            
        }
    })
}

// 从浏览器的地址中获取id
function getUrlParams(name) {
    var par = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < par.length; i++) {
        var tem = par[i].split('=');
        if (tem[0] == name) {
            return tem[1];
        } else {
            return -1;
        }
    }
}