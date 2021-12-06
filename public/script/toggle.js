



$(function(){
	$("#sidebarCollapse").on("click",function(){
		$('#sidebar,#content').toggleClass('active');
	});
});


// include each user with his name
// window.onload = function(){
let ans =  localStorage.getItem("email").split("@")[0];
let email =  localStorage.getItem("email").split(" ")[0];

 document.getElementById("myname").innerHTML = ans;
 document.getElementById("email").innerHTML = email;
// alert(me)

// }
