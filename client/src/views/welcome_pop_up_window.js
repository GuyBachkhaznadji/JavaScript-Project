var WelcomePopUpWindow = function(main){
  this.main = main
}

WelcomePopUpWindow.prototype.render = function(){
  var headerText = "Welcome to the most comprehensive UK coding bootcamps database!"
  this.text = "Here you can find the latest available information about every coding bootcamp existing in the UK .\n \n You can filter bootcamps by specific requirement such as: Location, Price, Programming languages.";

  var popUp = document.getElementById('pop-up');

  var popUpContent = document.createElement('article');
  popUpContent.id = "popUpWindow";

  var header = document.createElement('h1');
  header.id = "popUpHeader";
  header.innerText= headerText;

  var image = document.createElement('img');
  image.id = "mainImage";
  image.src = "http://art.fritsahlefeldt.com/assets/cache/idMjcyMWU4OTBkYjU1ZmY=-1ee547777c05df3effc27124f61347be.jpg";

  var closeButton = document.createElement('button');
  closeButton.id = "okButton";
  closeButton.innerText = "OK";
  closeButton.onclick = function(){
    popUp.style.display = "none"
  }

  var content = document.createElement('p');
  content.id = "content";
  content.innerText= this.text;

  popUpContent.appendChild(header);
  popUpContent.appendChild(image);
  popUpContent.appendChild(content);
  popUpContent.appendChild(closeButton);

  popUp.appendChild(popUpContent);

  var body = document.querySelector("body");
  body.appendChild(popUp);


}

module.exports = WelcomePopUpWindow;
