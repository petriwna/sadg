export class ProductDescription {
  constructor() {
    this.description = null;
  }

  render(product) {
    this.remove();

    const description = this.createDescription(product);
    document.querySelector('.modal__description').appendChild(description);
  }

  createDescription(product) {
    const description = this.createDescriptionElement();
    this.description = description;

    this.renderCompectationContent(description, product.description);

    if (product.gift) {
      this.renderGift(description, product.gift);
      this.createGiftAccent();
    }

    return description;
  }

  renderGift(description, gifts) {
    const ul = document.createElement('ul');

    gifts.forEach((gift) => {
      const title = document.createElement('p');
      title.innerText = gift.title;
      title.classList.add('accent', 'accent--color-green');
      description.appendChild(title);

      gift.text.forEach((t) => {
        const p = document.createElement('p');
        p.innerText = t;
        description.appendChild(p);
      });

      const li = document.createElement('li');
      const giftEl = document.createElement('article');
      giftEl.setAttribute('id', 'gift');
      giftEl.classList.add('gift-card');

      giftEl.innerHTML = `
      <div class='gift-card__info'>
          <div class='gift-card__description'>
            <img class='gift-card__img' src='${gift.imgsUrl[0]}' alt='${gift.name}'>
            <div class='gift-card__text'>
              <p class='gift-card__price accent margin'>${gift.cost} грн</p>
              <h3 class='gift-card__name margin'>${gift.name}</h3>
            </div>
          </div>           
            <div>
              <svg class='gift-card__icon' width='50' height='50'>
                <use href='public/images/icons.svg#icon-gift'></use>
              </svg>
            </div>
        </div>
    `;
      li.appendChild(giftEl);
      ul.appendChild(li);
    });

    description.appendChild(ul);
  }

  createGiftAccent() {
    const price = document.querySelector('.modal__price');
    price.style.position = 'relative';

    const a = document.createElement('a');
    a.setAttribute('href', '#gift');
    a.classList.add('gift-card__accent');

    a.innerHTML = `
      <svg class='gift-card__icon-accent' width='20' height='20'>
        <use href='public/images/icons.svg#icon-gift'></use>
      </svg>
    `;

    price.appendChild(a);
  }

  createDescriptionElement() {
    const description = document.createElement('div');
    description.classList.add('product');

    return description;
  }

  renderCompectationContent(description, productDescription) {
    if (productDescription) {
      this.appendTitle(description, productDescription.title);
      this.appendText(description, productDescription.text);
      this.appendFeatures(description, productDescription.features);
      this.appendComplectation(description, productDescription.accessories);
      this.appendDescriptionElement(description, productDescription.matter, 'Матеріал основи');
      this.appendDescriptionElement(
        description,
        productDescription.secondMatter,
        'Матеріал тарілок і ковпака',
      );
      this.appendDescriptionElement(description, productDescription.color, 'Колір');
      this.appendDescriptionElement(description, productDescription.application, 'Застосування');
      this.appendAdvantages(description, productDescription.advantages);
      this.appendList(description, productDescription.size);
      this.appendInstruction(description, productDescription.instruction);
      this.appendCharacteristics(
        description,
        productDescription.dimensionsFolded,
        'Габаритні розміри в складеному стані',
      );
      this.appendCharacteristics(
        description,
        productDescription.dimensionsLaidOut,
        'Габаритні розміри в розкладеному стані',
      );
      this.appendText(description, productDescription.secondText);
      this.appendCharacteristics(description, productDescription.characteristics, 'ХАРАКТЕРИСТИКИ');
      this.appendTable(description, productDescription.general);
    }
  }

  appendFeatures(description, features) {
    if (features) {
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.classList.add('margin', 'accent');
      p.innerText = 'Особливості:';
      div.appendChild(p);

      const ul = document.createElement('ul');

      features.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item}`;

        ul.appendChild(li);
      });

      div.appendChild(ul);
      description.appendChild(div);
    }
  }

  appendComplectation(description, accessories) {
    if (accessories) {
      const p = document.createElement('p');
      p.classList.add('margin', 'accent');
      p.textContent = 'Комплектація:';
      description.appendChild(p);
      const list = document.createElement('ul');
      list.classList.add('list-style', 'margin--left');

      accessories.forEach((el) => {
        const li = document.createElement('li');
        li.textContent = el;

        list.appendChild(li);
      });

      description.appendChild(list);
    }
  }

  appendInstruction(description, instruction) {
    if (instruction) {
      const p = document.createElement('p');
      p.classList.add('margin', 'accent');
      p.innerText = 'Інструкція з використання:';
      description.appendChild(p);

      const ol = document.createElement('ol');
      ol.classList.add('margin');

      instruction.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item}`;

        ol.appendChild(li);
      });

      description.appendChild(ol);
    }
  }

  appendList(description, items) {
    if (items) {
      const ul = document.createElement('ul');

      items.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<p class='margin'><span class='accent'>${item.name}: </span>${item.value}</p>`;

        ul.appendChild(li);
      });

      description.appendChild(ul);
    }
  }

  appendDescriptionElement(description, propertyName, label) {
    if (propertyName) {
      const element = document.createElement('p');
      element.classList.add('margin');
      element.innerHTML = `<span class='accent'>${label}: </span>${propertyName}`;
      description.appendChild(element);
    }
  }

  appendTitle(description, title) {
    if (title) {
      const p = document.createElement('p');
      p.classList.add('margin');

      if (title.length > 1) {
        p.innerHTML = ` <span class='accent'>${title[0]}</span> ${title[1]}`;
      } else {
        p.classList.add('accent');
        p.innerText = title;
      }

      description.appendChild(p);
    }
  }

  appendAdvantages(description, advantages) {
    if (advantages) {
      const advantagesElement = document.createElement('p');
      advantagesElement.classList.add('margin');
      advantagesElement.innerHTML = `<span class='accent'>Переваги: </span>${advantages} `;
      description.appendChild(advantagesElement);
    }
  }

  appendText(description, textList) {
    if (textList) {
      const div = document.createElement('div');

      textList.forEach((text) => {
        const textElement = document.createElement('p');

        textElement.classList.add('margin');
        textElement.innerHTML = this.highlightAttention(text);
        div.appendChild(textElement);
      });

      description.appendChild(div);
    }
  }

  highlightAttention(text) {
    if (text.includes('Є можливість')) {
      return `<span class="accent accent--color-green">${text}</span>`;
    }
    const words = text.split(' ');
    return words
      .map((word) =>
        word === 'Увага!' ? `<span class="accent accent--color-red">${word}</span>` : word,
      )
      .join(' ');
  }

  appendCharacteristics(description, characteristics, label) {
    if (characteristics) {
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.classList.add('accent', 'margin');
      p.innerText = `${label}:`;
      div.appendChild(p);

      const characteristicsList = document.createElement('ul');

      characteristics.forEach((item) => {
        const characteristicItem = document.createElement('li');
        characteristicItem.innerHTML = `<p class='margin'><span class='accent'>${item.name}: </span>${item.value}</p>`;

        characteristicsList.appendChild(characteristicItem);
      });

      div.appendChild(characteristicsList);
      description.appendChild(div);
    }
  }

  appendTable(description, info) {
    if (info) {
      const headers = ["Формат - Об'єм", 'Діаметр верхній', 'Діаметр нижній', 'Вага'];
      const table = document.createElement('table');
      const tr = document.createElement('tr');

      headers.forEach((header) => {
        const th = document.createElement('th');

        th.innerText = header;
        tr.appendChild(th);
      });
      table.appendChild(tr);

      info.forEach((item) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${item.format}</td>
          <td>${item.diameterTop}</td>
          <td>${item.diameterBottom}</td>
          <td>${item.weight}</td>
        `;
        table.appendChild(tr);
      });

      description.appendChild(table);
    }
  }

  remove() {
    if (this.description) {
      this.description.remove();
    }
  }
}
