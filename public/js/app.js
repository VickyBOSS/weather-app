const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const address = document.querySelector("input").value;

  fetch("http://localhost:3000/weather?address=" + address)
    .then(response => {
      response
        .json()
        .then(data => {
          console.log(data);
          console.log(data.forecastData.temperature);

          document.getElementById("locationElement").innerHTML =
            data.forecastData.location;
          document.getElementById(
            "weatherElement"
          ).innerHTML = `${data.forecastData.temperature}&deg; C`;
        })
        .catch(e => {
          document.getElementById("weatherElement").innerHTML = e.message;
        });
    })
    .catch(e => {
      console.log(e.message);
    });
});
