import axios from 'axios';
const cors = `https://cors-anywhere.herokuapp.com`;
const url = `https://play.pocketcasts.com/users/sign_in`;
const user = `steve.burtenshaw@gmail.com`;
const password = `KWud5s0H1zbz`;

const getInProgress = async () => {
  const response = await axios({
    method: 'post',
    url: `${cors}/${url}`,
    data: {
      'user[email]': user,
      'user[password]': password
    }
  });
  console.log(response.headers['set-cookie']);
  // const inProgress = await axios({
  //   method: 'post',
  //   url: `${cors}/https://play.pocketcasts.com/web/episodes/in_progress_episodes.json`,
  //   withCredentials: true
  // });
  // console.log(inProgress);
  // console.log(response);
};

function init() {
  getInProgress();
}

export default init;
