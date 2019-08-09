// 用户展示页面
var userArr = new Array();
console.log(userArr);

// 将用户列表展示出来
$.ajax({
    url: '/users',
    type: 'get',
    success: function (res) {
        console.log(res);
        // res.sender('ok');
        // return;
        userArr = res;
        render(userArr);
    }
})
// 用于调用template
function render(arr) {
    var str = template('userTpl', {
        list: arr
    });
    // console.log(arr);

    $('tbody').html(str);
}
// 添加用户功能
$('userAdd').on('click', function () {
    $.ajax({
        url: '/users',
        type: 'post',
        data: $('#userForm').serialize(),
        success: function (res) {
            userArr.push(res);
            render(userArr);
        }
    });
});

// 当用户选择文件的时候 上传头像
$('#avatar').on('change', function () {
    // 用户选择到的文件
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax不要解析请求参数
        processData:false,
        // 告诉ajax方法不要设置请求参数的类型
        contentType:false,
        success:function(res){
            console.log(res);
            // 实现头像预览功能
            $('#preview').attr('src',res[0].avatar);
            $('#hiddenAvatar').val(res[0].avatar);
            
        }
    })
});

var userId;
// 修改文件
// 通过事件委托的形式为编辑按钮点击添加事件 点击之后表格中内容显示在修改用户中
$('tbody').on('click','.edit',function(){
    userId = $(this).parent().attr('data-id');
    // 将页面上的添加用户改为 修改用户 利用子代选择器选到h2标签
    $('#userForm > h2').text('修改用户');
    // 现货区当前被点击元素的祖先 tr
    var trObj = $(this).parents('tr');
    // 获取图片的地址
    var imgSrc = trObj.children(1).children('img').attr('src');
    // console.log(imgSrc);
    // return;
    
    // 将图片的地址写入到隐藏域中
    $('#hiddenAvatar').val(imgSrc);
    // 如果imgSrc 有值 
    if(imgSrc){
        $('#preview').attr('src',imgSrc);
    }else{
        $('#preview').attr('src','../img/default.png'); 
    };

    // 将对应的内容写入到左边的输入框中
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    if(status == '激活'){
        $('#jh').prop('checked',true);
    }else{
        $('#wjh').prop('checked',true);
    }

    var role= trObj.children().eq(5).text();
    if(role=='超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);
    };
    // 当我们点击编辑按钮时 将添加按钮隐藏 同时将修改按钮显示
    $('#userAdd').hide();
    $('#userEdit').show();
})
    
// 给修改按钮添加点击事件
$('#userEdit').on('click',function(){
    $.ajax({
        type:'put',
        url:'/users/'+userId,
        data:$('#userForm').serialize(),
        success:function(res){
    //我们只是将数据库里面的数据给修改 但是我们将userA这个数组里面的元素给修改
    // 我们要从userArr这个数组中 将要修改这个数组元素来 
            var index = userArr.findIndex(item=>item._id == userId);
            // 根据index 找到数组的这个元素将它的数据更新
            userArr[index] = res;
            // 调用 render 方法 重新渲染页面
            render(userArr);

        }
    });
})