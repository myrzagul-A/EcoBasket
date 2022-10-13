const productsContainer = document.querySelector ('#products-container');
getProducts();
async function getProducts() {
    const response = await fetch ('./js/products.json');
    console.log(response);
    const productsArray = await response.json();
    console.log(productsArray);
    renderProducts(productsArray);
}



function renderProducts (itemsArray) {
    itemsArray.forEach(function(item) {
        const productHTML = `<div class="col-md-4">
        <div class="card mb-4" data-id="${item.id}">
            <img class="product-img" src="images/${item.imgSrc}" alt="carrot">
            <div class="card-body text-center">
                <h4 class="item-title">${item.title}</h4>
                <p><small items-discrp class="text-muted">${item.discrp}</small></p>

                <div class="details-wrapper">
                    <div class="items counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter>1</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${item.price}</div>
                    </div>
                </div>

                <button data-cart type="button" class="btn btn-block btn-outline-warning">+ add</button>

            </div>
        </div>
    </div>`;
    // console.log(productHTML);
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });

}