var key = getUrlParams('key');


    $.ajax({
        url: '/posts/search/' + key,
        type: 'get',
        success: function (res) {
            // console.log(res);
            
            var html = template('searchTmp', { list: res });
            $('#listContent').append(html);
        }
    })
