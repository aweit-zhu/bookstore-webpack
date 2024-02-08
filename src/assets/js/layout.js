$('body').prepend(
    '<div id="header" class="sticky top-0 bg-white z-40"></div>'
);

$('body').append(
    '<div id="footer"></div>'
);

$("#header").load("/src/fragements/header/header.html");
$("#footer").load("/src/fragements/footer.html");