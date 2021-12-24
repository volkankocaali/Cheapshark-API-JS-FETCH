// Cheapshark API

const BASE_URL = "https://www.cheapshark.com/api/1.0/games";

const row = document.getElementsByClassName("game-row")[0];

const getGamesList = async (url) => {
  const response = await (
    await fetch(`${url}?title=batman&limit=60&exact=0`)
  ).json();
  showGamesList(response);
}

const getOldPrice = async (id,) => {
  const oldPriceResponse = await (await fetch(`${BASE_URL}?id=${id} `)).json();
  console.log(Math.max.apply(
    Math,
    oldPriceResponse.deals.map(function (item) {
      return item.retailPrice;
    })
  ));
  return Math.max.apply(
    Math,
    oldPriceResponse.deals.map(function (item) {
      return item.retailPrice;
    })
  )

}
const showGamesList = async (data) => {
  row.innerHTML = "";

  data.forEach((game) => {
    const { gameID, thumb, external, cheapest } = game;
    const gameListElement = document.createElement("div");

    gameListElement.classList.add("col-md-4");
    getOldPrice(gameID).then(oldPrice => {
      const discountCalculation = Math.ceil(100 - (cheapest * 100 / oldPrice))
      gameListElement.innerHTML = `
      <div class="card mb-4 shadow-sm">
      <img
          class="card-img-top"
          width="100%"
          height="225"
          src="${thumb}"
          alt="${external}"
          />
  
          <div class="card-body">
          <p class="card-text">
              ${external}
          </p>
          <p class="card-price">
              ${cheapest}$
          </p>
          <p class="card-price-old">
          ${oldPrice}$
          </p>
          <p class="card-discount">
          %${discountCalculation} indirim
          </p>
          </div>
      </div>
          `;
          row.appendChild(gameListElement);
    })
  
  });
};

getGamesList(BASE_URL);
