(() => {

  document.addEventListener('DOMContentLoaded', () => {

    const CARD_WIDTH = 70;
    let firstCardOpened = false;
    let openedCardValue = null;

    let field = document.getElementById('game-field');
    let startButton = document.getElementById('btn-start');

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function createCard(CardValue) {
      let card = document.createElement('li');
      field.append(card)
      card.classList.add('game__card');
      card.textContent = CardValue;

      card.addEventListener('click', () => {

        let openedCardsAmount = 0;

        if (card.classList.contains('open') === false) { // исключаем действия при клике на открытую карту

          card.classList.add('open'); // открываем карту в любом случае

          if (firstCardOpened === false) { // проверяем, что открытая карта первая в паре
            firstCardOpened = true;
            openedCardValue = CardValue;

          } else {
            if (openedCardValue === CardValue) { // проверяем совпадение в паре
              firstCardOpened = false;
            } else { // прячем обе карты

              setTimeout(() => {
                firstCardOpened = false;
                card.classList.remove('open');
                for (let index = 0; field.childNodes.length; index++) {
                  if (parseInt(field.childNodes[index].textContent) === openedCardValue) {
                    field.childNodes[index].classList.remove('open');
                  }
                }
              }, 1000);
            }
          }
        }

        // проверка завершения игры
        for (let index = 0; index < field.childNodes.length; index++) {
          if (field.childNodes[index].classList.contains('open')) {
            openedCardsAmount++;
          }
        }

        if (openedCardsAmount === field.childNodes.length) {
          setTimeout(() => {
            document.querySelector('.game__shirm').classList.remove('visually-hidden');
          }, 500);
        }
      })
    }

    function setGame() {

      // сброс поля
      while (field.firstChild) {
        field.removeChild(field.firstChild);
      }

      // считывание установок
      let horizontal = document.getElementById('column-count').value;
      let vertical = document.getElementById('row-count').value;

      if (horizontal < 2 || horizontal > 10 || (horizontal % 2) !== 0) {
        horizontal = 4;
        document.getElementById('column-count').value = 4;
      }

      if (vertical < 2 || vertical > 10 || (vertical % 2) !== 0) {
        vertical = 4;
        document.getElementById('row-count').value = 4;
      }

      // разметка поля
      let width = CARD_WIDTH * horizontal
      field.style.width = width + 'px';

      // создание массива карт
      let cardsAmount = horizontal * vertical;
      let cardsArray = [];

      for (let index = 0; index < (cardsAmount / 2); index++) {
        cardsArray.push(index);
        cardsArray.push(index);
      }

      shuffle(cardsArray);

      for (let index = 0; index < cardsAmount; index++) {
        createCard(cardsArray[index]);
      }

    }

    // старт игры
    startButton.addEventListener('click', () => {
      setGame();
    })

    // повторный запуск игры
    document.getElementById('btn-more').addEventListener('click', () => {
      document.querySelector('.game__shirm').classList.add('visually-hidden');
      setGame();
    })

  })

})()
