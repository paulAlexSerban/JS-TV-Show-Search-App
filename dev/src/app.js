import regeneratorRuntime from "regenerator-runtime";

class App {
  constructor() {
    this.init();
    this.form;
  }

  setupDOMReferences() {
    this.form = document.querySelector('#searchForm');
    console.log(`this.setupDOMReferences() loaded`);
  }

  setupGetMovieData() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      this.searchTerm = e.target.elements.query.value;
      this.config = {
        params: {
          q: this.searchTerm
        }
      };
      this.response = await axios.get(`http://api.tvmaze.com/search/shows`, this.config);
      console.log(this.response);
      console.log(`this.form - submit event`);
      this.createImages(this.response.data);
      e.target.elements.query.value = '';
    });
    console.log(`this.setupMovieData() loaded`);
  }

  createImages(shows) {
    for (let result of shows) {
      console.log(result);

      if (result.show.image !== null) {
        this.image = document.createElement('IMG');
        this.image.src = result.show.image.medium;
        document.body.appendChild(this.image);
      }
    }
  }

  init() {
    console.log('[app.js] initiated');
    this.setupDOMReferences();
    this.setupGetMovieData();
  }
}

export default App;