document.addEventListener("DOMContentLoaded", function(){
	//Active sidebar nav
	var elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
 
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
        //Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a, .logo, .container .album a, .container .berita a").forEach(function(elm){
          elm.addEventListener("click", function(event){
            //Tutup Sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            //Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

	//load page content
	var page = window.location.hash.substr(1);
	if(page == "") page = "home";

	loadPage(page);

	function loadPage(page){
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 ) {
				var content = document.querySelector("#body-content");
				if (this.status == 200){
					content.innerHTML = xhttp.responseText;
				}
				else if (this.status == 404){
					content.innerHTML = "<h2>Halaman Tidak Dapat Ditemukan</h2>";
				}
				else{
					content.innerHTML = "<h2>Upss... Halaman Tidak Dapat Diakses</h2>";
				}
			}
		};
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}

	//load footer

	loadFooter();
	function loadFooter(){
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 ) {
				var content = document.querySelector("#footer");
				if (this.status == 200){
					content.innerHTML = xhttp.responseText;
				}
			}
		};
		xhttp.open("GET", "footer.html", true);
		xhttp.send();
	}	
});