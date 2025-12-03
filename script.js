// Появление при скролле
document.querySelectorAll('.fade-in').forEach((el, i)=>{
    el.style.animationDelay = i*0.15 + 's';
});

// Фильтр на швейной странице
function filterProducts(category) {
    const products = document.querySelectorAll('.products .product');
    products.forEach(p=>{
        if(category==='all') { p.style.display='block'; }
        else { p.style.display = p.classList.contains(category)?'block':'none'; }
    });
}

function filterFurniture(category) {
  const products = document.querySelectorAll('.products .product');
  products.forEach(p => {
    if(category === 'all') {
      p.style.display = 'block';
    } else {
      p.style.display = p.classList.contains(category) ? 'block' : 'none';
    }
  });
}
