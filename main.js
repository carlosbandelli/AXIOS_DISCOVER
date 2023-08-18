const url = "http://localhost:5500/api";

function getUsers() {
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      apiResult.textContent = JSON.stringify(response.data);
    })
    .catch((error) => console.error(error));
}

function addNewUser() {
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151) + 1}`
    )
    .then((response) => response.data)
    .then((data) => {
      const newUser = {
        id: data.id,
        name: data.name,
        avatar: data.sprites.front_default,
        city: "",
      };

      axios
        .get(data.location_area_encounters)
        .then((response) => response.data)
        .then((encounterData) => {
          if (encounterData.length > 0) {
            newUser.city = encounterData[0].location_area.name;
          }
          axios
            .post(url, newUser)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

function getUser(id) {
  axios
    .get(`${url}/${id}`)
    .then((response) => {
      const data = response.data;
      userName.textContent = data.name;
      userCity.textContent = data.city;
      userID.textContent = data.id;
      userAvatar.src = data.avatar;
    })
    .catch((error) => console.error(error));
}

const userUpdate = {
  id: "",
  name: "",
  avatar: "",
  city: "",
};

function updateUser(id) {
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 501) + 1}`
    )
    .then((response) => response.data)

    .then((data) => {
      const update = {
        id: data.id,
        name: data.name,
        avatar: data.sprites.front_default,
        city: "",
      };

      axios
        .get(data.location_area_encounters)
        .then((response) => response.data)
        .then((encounterData) => {
          if (encounterData.length > 0) {
            update.city = encounterData[0].location_area_name;
          }

          userUpdate.id = update.id;
          userUpdate.name = update.name;
          userUpdate.avatar = update.avatar;
          userUpdate.city = update.city;

          axios
            .put(`${url}/${id}`, userUpdate)
            .then((response) => response.data)
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })

    .catch((error) => console.error(error));
}

function deleteUser(id) {
  axios
    .delete(`${url}/${id}`)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
}

deleteUser(79);

getUsers();
//addNewUser();
getUser(1);
//updateUser(1);
