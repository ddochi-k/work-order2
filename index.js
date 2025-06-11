function addToCart(itemId, itemName) {
  // 실제 장바구니 로직 수행
  // ...

  // GA4 이벤트 전송
  gtag('event', 'add_to_cart', {
    item_id: itemId,
    item_name: itemName
  });

  console.log(`장바구니 추가됨: ${itemName}`);
}

   // 게임 데이터
        const games = [
            {
                id: 1,
                name: "Counter-Strike 2",
                genre: "FPS",
                price: "무료",
                originalPrice: null,
                description: "세계에서 가장 인기 있는 팀 기반 액션 게임",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
            },
            {
                id: 2,
                name: "Cyberpunk 2077",
                genre: "RPG",
                price: "29,000원",
                originalPrice: "59,000원",
                description: "미래 도시 나이트 시티를 배경으로 한 오픈 월드 RPG",
                image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop"
            },
            {
                id: 3,
                name: "Grand Theft Auto V",
                genre: "액션",
                price: "19,500원",
                originalPrice: "39,000원",
                description: "로스 산토스를 배경으로 한 오픈 월드 액션 게임",
                image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop"
            },
            {
                id: 4,
                name: "Apex Legends",
                genre: "배틀로얄",
                price: "무료",
                originalPrice: null,
                description: "60명의 플레이어가 참여하는 무료 배틀로얄 게임",
                image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
            },
            {
                id: 5,
                name: "Elden Ring",
                genre: "액션 RPG",
                price: "49,000원",
                originalPrice: "69,000원",
                description: "프롬 소프트웨어의 최신 소울 시리즈 게임",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
            },
            {
                id: 6,
                name: "Dota 2",
                genre: "MOBA",
                price: "무료",
                originalPrice: null,
                description: "전략적 팀 플레이가 핵심인 MOBA 게임",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
            },
            {
                id: 7,
                name: "The Witcher 3",
                genre: "RPG",
                price: "9,900원",
                originalPrice: "39,000원",
                description: "게랄트의 마지막 모험을 그린 판타지 RPG",
                image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop"
            },
            {
                id: 8,
                name: "Rust",
                genre: "서바이벌",
                price: "31,000원",
                originalPrice: "37,000원",
                description: "하드코어 서바이벌 멀티플레이어 게임",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
            },
            {
                id: 9,
                name: "Dead by Daylight",
                genre: "공포",
                price: "12,000원",
                originalPrice: "20,000원",
                description: "4 vs 1 비대칭 멀티플레이어 공포 게임",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
            }
        ];

        let cart = [];

        // 페이지 로드 시 게임 목록 표시
        document.addEventListener('DOMContentLoaded', function() {
            displayGames();
            updateCartCount();
        });

        // 게임 목록 표시 함수
        function displayGames() {
            const gamesGrid = document.getElementById('games-grid');
            gamesGrid.innerHTML = '';

            games.forEach(game => {
                const gameCard = createGameCard(game);
                gamesGrid.appendChild(gameCard);
            });
        }

        // 게임 카드 생성 함수
        function createGameCard(game) {
            const card = document.createElement('div');
            card.className = 'game-card';
            
            const priceDisplay = game.originalPrice 
                ? `<span class="original-price">${game.originalPrice}</span>${game.price}`
                : game.price;

            card.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <span class="genre">${game.genre}</span>
                <p>${game.description}</p>
                <div class="price">${priceDisplay}</div>
                <button class="buy-btn" onclick="addToCart(${game.id})">
                    ${game.price === '무료' ? '다운로드' : '장바구니에 추가'}
                </button>
            `;

            return card;
        }

       function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        const existingItem = cart.find(item => item.id === gameId);
        if (existingItem) {
            alert('이미 장바구니에 있는 게임입니다!');
        } else {
            cart.push(game);
            updateCartCount();
            alert(`${game.name}이(가) 장바구니에 추가되었습니다!`);

            // ✅ GA4 이벤트 전송
            gtag('event', 'add_to_cart', {
                currency: 'KRW',
                value: parseInt(game.price.replace(/[^0-9]/g, '') || 0),
                items: [{
                    item_id: game.id,
                    item_name: game.name,
                    item_category: game.genre
                }]
            });

            console.log(`[GA4] 장바구니 이벤트 전송됨: ${game.name}`);
        }
    }
}


        // 장바구니 개수 업데이트 함수
        function updateCartCount() {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.length;
        }

        // 장바구니 클릭 이벤트
        document.querySelector('.cart').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('장바구니가 비어있습니다.');
            } else {
                let cartItems = '장바구니 내용:\n\n';
                cart.forEach(game => {
                    cartItems += `${game.name} - ${game.price}\n`;
                });
                alert(cartItems);
            }
        });

        // 부드러운 스크롤 효과
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#games') {
                    document.querySelector('.games-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else if (targetId === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });