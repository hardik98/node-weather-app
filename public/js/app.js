const placeName = document.getElementById("location");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

const handleSearch = () => {
  message1.textContent = "Loading...";
  message2.textContent = " ";

  fetch(`/weather?address=${placeName.value}`).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = data.error;
        message2.textContent = "";
        return;
      }
      message1.textContent = data.location;
      message2.textContent = data.foreCast;
    })
  );
};
