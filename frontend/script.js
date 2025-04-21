const container = document.getElementById('product-container');

const colorHex = {
  yellow: '#E6CA97',
  white: '#D9D9D9',
  rose: '#E1A4A9'
};

const colorNameMap = {
  yellow: 'Yellow Gold',
  white: 'White Gold',
  rose: 'Rose Gold'
};

fetch('http://127.0.0.1:5000/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';

      const images = Object.entries(product.images);
      let currentIndex = images.findIndex(([color, _]) => color === 'yellow');

      const img = document.createElement('img');
      img.src = product.images['yellow'];
      imageWrapper.appendChild(img);

      const prevBtn = document.createElement('button');
      prevBtn.textContent = '←';
      prevBtn.className = 'nav-btn left';
      prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
      };

      const nextBtn = document.createElement('button');
      nextBtn.textContent = '→';
      nextBtn.className = 'nav-btn right';
      nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
      };

      imageWrapper.appendChild(prevBtn);
      imageWrapper.appendChild(nextBtn);

      const name = document.createElement('h3');
      name.textContent = product.name;
      name.className = 'product-title';

      const price = document.createElement('p');
      price.textContent = `$${product.price} USD`;
      price.className = 'product-price';

      const colorName = document.createElement('p');
      colorName.className = 'color-name';
      colorName.textContent = colorNameMap['yellow'];

      const colorRow = document.createElement('div');
      ['yellow', 'white', 'rose'].forEach(color => {
        if (product.images[color]) {
          const dot = document.createElement('span');
          dot.className = 'color-dot';
          dot.style.backgroundColor = colorHex[color] || '#ccc';
          dot.title = colorNameMap[color];
          dot.onclick = () => {
            currentIndex = images.findIndex(([c]) => c === color);
            updateImage();
          };
          colorRow.appendChild(dot);
        }
      });

      const rating = generateStarElements(product.popularityOutOf5);

      function updateImage() {
        const [color, url] = images[currentIndex];
        img.src = url;
        colorName.textContent = colorNameMap[color];
      }

      function generateStarElements(score) {
        const container = document.createElement('div');
        container.className = 'stars';

        const fullStars = Math.floor(score);
        const halfStar = score % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        for (let i = 0; i < fullStars; i++) {
          const star = document.createElement('span');
          star.className = 'star full';
          star.textContent = '★';
          container.appendChild(star);
        }

        if (halfStar) {
          const star = document.createElement('span');
          star.className = 'star half';
          star.textContent = '★';
          container.appendChild(star);
        }

        for (let i = 0; i < emptyStars; i++) {
          const star = document.createElement('span');
          star.className = 'star';
          star.textContent = '★';
          container.appendChild(star);
        }

        const ratingText = document.createElement('span');
        ratingText.textContent = ` ${score} / 5`;
        ratingText.className = 'rating';
        container.appendChild(ratingText);

        return container;
      }

      
      card.appendChild(imageWrapper);
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(colorName);  
      card.appendChild(colorRow);   
      card.appendChild(rating);     

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Fetch failed:', err));
