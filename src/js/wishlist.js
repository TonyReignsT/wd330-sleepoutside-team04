import { getLocalStorage, setLocalStorage, loadHeaderFooter, alertMessage} from './utils.mjs';
loadHeaderFooter();

function wishlistItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.selectedColor?.ColorPreviewImageSrc || item.Images?.PrimaryMedium || item.Image}" alt="${item.Name}" />
      </a>
      <div>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.selectedColor?.ColorName || item.Colors?.[0]?.ColorName}</p>
      </div>
      <div style="position: relative;">
        <button class="remove-wishlist" data-id="${item.Id}" style="position: absolute; top: 0; right: 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="move-to-cart" data-id="${item.Id}" style="margin-top: 70px;">Move to Cart 🛒</button>
      </div>
    </li>
  `;
}

export function renderWishlist() {
  const wishlist = getLocalStorage('so-wishlist') || [];
  const wishlistContainer = document.querySelector('#wishlist-items');
  const countBubble = document.querySelector('#wishlist-count');

  if (!wishlistContainer) return;

  wishlistContainer.innerHTML = wishlist.map(wishlistItemTemplate).join('');
  if (countBubble) countBubble.textContent = wishlist.length;

  // Attach actions
  wishlistContainer.querySelectorAll('.remove-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      removeFromWishlist(id);
    });
  });

  wishlistContainer.querySelectorAll('.move-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      moveToCart(id);
    });
  });
}

function removeFromWishlist(id) {
  let wishlist = getLocalStorage('so-wishlist') || [];
  wishlist = wishlist.filter(item => item.Id !== id);
  setLocalStorage('so-wishlist', wishlist);
  renderWishlist();
}

function moveToCart(id) {
  let wishlist = getLocalStorage('so-wishlist') || [];
  const item = wishlist.find(i => i.Id === id);
  if (!item) return;

  let cart = getLocalStorage('so-cart') || [];
  cart.push(item);
  setLocalStorage('so-cart', cart);

  removeFromWishlist(id);
  alertMessage('Product added to cart',true, 'success', 3000);
}

// Auto-run
document.addEventListener('DOMContentLoaded', renderWishlist);