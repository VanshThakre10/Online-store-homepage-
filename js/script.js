// Main script file for interaction

document.addEventListener('DOMContentLoaded', () => {
    console.log('E-commerce Script Loaded Successfully!');
    
    // ==============================
    // STEP 9: JAVASCRIPT INTERACTIONS
    // ==============================

    // 1. Cart Functionality
    const cartBadge = document.getElementById('cartBadge');
    
    // Select all Add to Cart buttons (using the generic class structure from HTML)
    const quickAddButtons = document.querySelectorAll('button:contains("Quick Add"), .fa-cart-shopping');
    
    // Fallback: specifically find buttons containing 'Quick Add'
    const buttons = Array.from(document.querySelectorAll('button')).filter(btn => btn.textContent.includes('Quick Add'));
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Increment cart count
            let currentCount = parseInt(cartBadge.textContent);
            cartBadge.textContent = currentCount + 1;
            
            // Visual feedback on the button
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
            btn.classList.add('bg-green-600', 'text-white');
            btn.classList.remove('bg-slate-900/90', 'hover:bg-primary');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-slate-900/90', 'hover:bg-primary');
            }, 2000);
        });
    });

    // 2. Category Filter Toggles
    const filterContainer = document.querySelector('.overflow-x-auto');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Reset all buttons to inactive state
                filterButtons.forEach(btn => {
                    btn.className = 'bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
                });
                // Set clicked button to active state
                button.className = 'bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md';
            });
        });
    }

    // 3. Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    const executeSearch = () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            alert(`Searching for: ${query}`);
            searchInput.value = ''; // clear input after search
        }
    };

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }

    // 4. Wishlist Heart Toggle
    const heartButtons = document.querySelectorAll('.fa-heart');
    heartButtons.forEach(heart => {
        const btn = heart.parentElement;
        if (btn.tagName === 'BUTTON' && !btn.classList.contains('bg-primary')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Toggle between regular and solid hearts
                if (heart.classList.contains('fa-regular')) {
                    heart.classList.replace('fa-regular', 'fa-solid');
                    heart.classList.add('text-red-500');
                } else {
                    heart.classList.replace('fa-solid', 'fa-regular');
                    heart.classList.remove('text-red-500');
                }
            });
        }
    });

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden button i.fa-bars')?.parentElement;
    const mobileSearch = document.querySelector('.md\\:hidden.pb-4');
    
    if (mobileMenuBtn && mobileSearch) {
        // Initially hide mobile search by default
        mobileSearch.classList.add('hidden');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileSearch.classList.toggle('hidden');
        });
    }
});
