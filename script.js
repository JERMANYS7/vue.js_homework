// ข้อมูลหนังสือ
const books = [
    {
        id: 1,
        title: "แฮร์รี่ พอตเตอร์",
        author: "J.K. Rowling",
        price: 50,
        icon: "🔮",
        bgColor: "pastel-purple",
        category: "แฟนตาซี",
        rating: "⭐⭐⭐⭐⭐",
        description: "เวทมนตร์และการผจญภัย",
        keywords: ["เวทมนตร์", "มิตรภาพ", "ผจญภัย"]
    },
    {
        id: 2,
        title: "เจ้าชายน้อย",
        author: "Antoine de Saint-Exupéry",
        price: 35,
        icon: "🌟",
        bgColor: "pastel-yellow",
        category: "นิทาน",
        rating: "⭐⭐⭐⭐⭐",
        description: "การเดินทางค้นหาความหมาย",
        keywords: ["จินตนาการ", "ปรัชญา", "มิตรภาพ"]
    },
    {
        id: 3,
        title: "โดราเอมอน",
        author: "Fujiko F. Fujio",
        price: 25,
        icon: "🐱",
        bgColor: "pastel-blue",
        category: "การ์ตูน",
        rating: "⭐⭐⭐⭐",
        description: "ผจญภัยกับแมวหุ่นยนต์",
        keywords: ["ของวิเศษ", "มิตรภาพ", "สนุกสนาน"]
    },
    {
        id: 4,
        title: "นารูโตะ",
        author: "Masashi Kishimoto",
        price: 30,
        icon: "🌀",
        bgColor: "pastel-orange",
        category: "การ์ตูน",
        rating: "⭐⭐⭐⭐",
        description: "นินจาผู้ไม่ยอมแพ้",
        keywords: ["ต่อสู้", "มิตรภาพ", "พลัง"]
    },
    {
        id: 5,
        title: "ดาบพิฆาตอสูร",
        author: "Koyoharu Gotouge",
        price: 40,
        icon: "⚔️",
        bgColor: "pastel-green",
        category: "การ์ตูน",
        rating: "⭐⭐⭐⭐⭐",
        description: "การผจญภัยปราบอสูร",
        keywords: ["ต่อสู้", "พี่น้อง", "กล้าหาญ"]
    }
];

// ตะกร้าสินค้า
let cart = [];

// สร้างการ์ดหนังสือ
function createBookCard(book) {
    return `
        <div class="book-card ${book.bgColor} p-6">
            <div class="text-center mb-4">
                <span class="text-6xl">${book.icon}</span>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <h3 class="text-xl font-bold">${book.title}</h3>
                    <span class="category-tag bg-white">${book.category}</span>
                </div>
                <p class="text-gray-600">${book.author}</p>
                <p class="text-sm text-gray-500">${book.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${book.keywords.map(keyword => 
                        `<span class="bg-white/50 px-3 py-1 rounded-full text-xs">
                            ${keyword}
                        </span>`
                    ).join('')}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-pink-500">
                        ${book.price} บาท/วัน
                    </span>
                    <span>${book.rating}</span>
                </div>
                <button 
                    onclick="addToCart(${book.id})" 
                    class="cute-button w-full py-3 text-pink-600 bg-white hover:bg-pink-50"
                >
                    🛍️ เพิ่มในตะกร้า
                </button>
            </div>
        </div>
    `;
}

// เปิด/ปิดตะกร้า
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('translate-x-full');
}

// เพิ่มหนังสือในตะกร้า
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        cart.push({...book, cartId: Date.now()});
        updateCart();
        showNotification('เพิ่ม ' + book.title + ' ในตะกร้าแล้ว! 🎉');
    }
}

// ลบหนังสือออกจากตะกร้า
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCart();
    showNotification('นำออกจากตะกร้าแล้ว ❌');
}

// อัพเดทตะกร้า
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartSummary = document.getElementById('cartSummary');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <span class="text-4xl">🛒</span>
                <p class="mt-2">ตะกร้าว่างเปล่า</p>
            </div>
        `;
        cartSummary.innerHTML = '';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
            <span class="text-3xl">${item.icon}</span>
            <div class="flex-1">
                <h4 class="font-semibold">${item.title}</h4>
                <p class="text-sm text-pink-600">${item.price} บาท/วัน</p>
            </div>
            <button 
                onclick="removeFromCart(${item.cartId})"
                class="cute-button px-3 py-1 bg-red-100 text-red-500 hover:bg-red-200"
            >
                ❌
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartSummary.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between text-lg font-bold">
                <span>รวมทั้งหมด:</span>
                <span class="text-pink-500">${total} บาท/วัน</span>
            </div>
            <button 
                onclick="checkout()" 
                class="cute-button w-full py-3 bg-pink-400 text-white hover:bg-pink-500"
            >
                💖 ยืนยันการเช่า
            </button>
        </div>
    `;
}

// ชำระเงิน
function checkout() {
    if (cart.length > 0) {
        showNotification('ขอบคุณที่ใช้บริการ! 🎉');
        cart = [];
        updateCart();
        toggleCart();
    }
}

// แสดงการแจ้งเตือน
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-white text-pink-600 px-6 py-3 rounded-full shadow-lg border-2 border-pink-200 cart-animation';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Event Listeners
document.getElementById('cartBtn').addEventListener('click', toggleCart);
document.getElementById('closeCart').addEventListener('click', toggleCart);

// แสดงหนังสือเมื่อโหลดเพจ
document.getElementById('bookGrid').innerHTML = books.map(book => createBookCard(book)).join('');