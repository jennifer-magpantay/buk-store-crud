function sales() {
  //add function to display the message
  var x = document.querySelector(".root");
  if (x.style.display === "none") {
    //set the message and display it as block
    const message =
      "Hold your horses, hun! No SALES season yet! Check it out later on or subscribe to our newsletter to keep yourself updated!";
    document.querySelector("#root").innerHTML = message;
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  console.log(message);
}
