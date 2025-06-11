let cart = [];
let cartCount = 0;
let totalPrice = 0;

function addToCart(gameName, price) {
    const existingItem = cart.find(item => item.name === gameName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: gameName,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    totalPrice += price;
    
    updateCartDisplay();
    
    // 시각적 피드백
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '추가됨!';
    button.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    }, 1000);
}

function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cartCount;
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>수량: ${item.quantity}</small>
            </div>
            <div>
                ₩${(item.price * item.quantity).toLocaleString()}
                <button onclick="removeFromCart(${index})" style="margin-left: 10px; background: #ff6b6b; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">삭제</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
}

function removeFromCart(index) {
    const item = cart[index];
    totalPrice -= item.price * item.quantity;
    cartCount -= item.quantity;
    cart.splice(index, 1);
    updateCartDisplay();
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다!');
        return;
    }
    
    alert(`결제가 완료되었습니다!\n총 금액: ₩${totalPrice.toLocaleString()}\n\n구매한 게임들이 라이브러리에 추가되었습니다.`);
    
    // 장바구니 초기화
    cart = [];
    cartCount = 0;
    totalPrice = 0;
    updateCartDisplay();
    closeCart();
}

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) {
        closeCart();
    }
}

// 스크롤 효과
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// 초기 설정
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });
});