var id = getUrlParams('categoryId');

if (id != -1) {
    $.ajax({
        url: '/posts/category/' + id,
        type: 'get',
        success: function (res) {
            // console.log(res);
            
            var html = template('listTmp', { list: res });
            $('#listContent').append(html);
        }
    })
}