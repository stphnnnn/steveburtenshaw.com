const key = `tlIny82RH7SUxGBrwJCZkg`;
const userId = `8961225-steve`;
const cors = `https://cors-anywhere.herokuapp.com`;
const url = `${cors}/https://www.goodreads.com/review/list/?id=${userId}&shelf=currently-reading&key=${key}&v=2`;

const getCurrentlyReading = async () => {
  const response = await fetch(url);
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, 'text/xml');
  const reviews = xml.querySelectorAll('review');
  const books = Array.from(reviews).map(x => {
    const title = x.getElementsByTagName('title')[0].textContent;
    const author = x
      .getElementsByTagName('author')[0]
      .getElementsByTagName('name')[0].textContent;
    return {
      title,
      author
    };
  });
  const { title, author } = books[0];
  document.getElementById('reading').innerText = `${title} by ${author}`;
};

function init() {
  getCurrentlyReading();
}

export default init;
