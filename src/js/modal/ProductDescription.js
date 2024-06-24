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

    return description;
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
      this.appendDescriptionElement(description, productDescription.matter, 'Матеріал');
      this.appendDescriptionElement(description, productDescription.color, 'Колір');
      this.appendDescriptionElement(description, productDescription.application, 'Застосування');
      this.appendAdvantages(description, productDescription.advantages);
      this.appendList(description, productDescription.size);
      this.appendInstruction(description, productDescription.construction);
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
      const p = document.createElement('p');
      p.innerText = 'Особливості:';
      description.appendChild(p);

      const ul = document.createElement('ul');

      features.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item}`;

        ul.appendChild(li);
      });

      description.appendChild(ul);
    }
  }

  appendInstruction(description, instruction) {
    if (instruction) {
      const firstParagraph = document.createElement('p');
      firstParagraph.innerText =
        'Конструкція мангалу дозволяє швидко скласти його у вигляді валізи.';
      description.appendChild(firstParagraph);

      const secondParagraph = document.createElement('p');
      secondParagraph.innerText = 'Для цього необхідно:';
      description.appendChild(secondParagraph);

      const ol = document.createElement('ol');

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
        li.innerHTML = `<p><span class='accent'>${item.name}: </span>${item.value}</p>`;

        ul.appendChild(li);
      });

      description.appendChild(ul);
    }
  }

  appendDescriptionElement(description, propertyName, label) {
    if (propertyName) {
      const element = document.createElement('p');
      element.innerHTML = `<span class='accent'>${label}: </span>${propertyName}`;
      description.appendChild(element);
    }
  }

  appendTitle(description, title) {
    if (title) {
      const p = document.createElement('p');

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
      advantagesElement.innerHTML = `<span class='accent'>Переваги: </span>${advantages} `;
      description.appendChild(advantagesElement);
    }
  }

  appendText(description, textList) {
    if (textList) {
      textList.forEach((text) => {
        const textElement = document.createElement('p');
        textElement.textContent = text;
        description.appendChild(textElement);
      });
    }
  }

  appendCharacteristics(description, characteristics, label) {
    if (characteristics) {
      const p = document.createElement('p');
      p.classList.add('accent');
      p.innerText = `${label}:`;
      description.appendChild(p);

      const characteristicsList = document.createElement('ul');

      characteristics.forEach((item) => {
        const characteristicItem = document.createElement('li');
        characteristicItem.innerHTML = `<p><span class='accent'>${item.name}: </span>${item.value}</p>`;

        characteristicsList.appendChild(characteristicItem);
      });

      description.appendChild(characteristicsList);
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
