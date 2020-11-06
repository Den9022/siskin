let url = "http://testcode.modocloud.hu/api/menu/";
let proxy = 'https://cors-anywhere.herokuapp.com/';

var ul = $(".container").append('<ul class="list-unstyled components"></ul>').find('ul');

$.ajax({
    url: proxy + url,
    contentType: "application/json",
    dataType: 'json',
    type: 'POST',
    success: function(data){
        
        process(data.side_menu, ul);
    }
});

function process(data, ul) {

    if (data.length == 0) {
        return;
    }

    data.forEach(obj => {

        let id = obj.id ? obj.id : "";
        let href = obj.href ? obj.href : "";
        let icon = obj.icon ? obj.icon : "";
        let label = obj.label ? obj.label : "";

        var li = $('<li/>');

        if (obj.type != "divider") {

            var a = $('<a/>', { text: label, href: href, id: id });
            a.prepend('<span class="fas ' + icon + '"></span>')

            a.appendTo(li);

        }
        else {
            li = $('<li class="divider">&nbsp</li>');
        }
        if (obj.submenu) {
            a.attr({ href: "#pageSubmenu" + id, "data-toggle": "collapse", "aria-expanded": "false", class: "dropdown-toggle" })
            var sub_ul = li.append('<ul class="collapse list-unstyled"</ul>').find('ul');
            sub_ul.attr({ id: "pageSubmenu" + id });
            process(obj.submenu, sub_ul);
        }
        ul.append(li);

    });

}
