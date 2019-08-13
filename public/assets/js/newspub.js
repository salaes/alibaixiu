// 最新发布
$.ajax({
    url: "/posts/lasted",
    type: 'get',
    success: function (res) {
        var html = template('newspubTmp', { list: res });
        $('.new').append(html);
    }
})
