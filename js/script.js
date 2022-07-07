if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var totalCount = document.getElementById("item-count");
var count = 0;
totalCount.innerHTML = count;

var cart = document.getElementById("myDiv");
var bgDiv = document.getElementById("content")
cart.style.display = "none";

// Function to increment count
// const handleIncrement = () => {
//     count++;
//     totalCount.innerHTML = count;
//   };

function displayCart() {

    if(cart.style.display !== "none"){
        cart.style.display = "none";
        bgDiv.style.opacity = null;
    } else{
        cart.style.display = "block";
        bgDiv.style.opacity = 0.2;
    }
}

// var addToCartBtn = document.getElementsByClassName("btn");
//     for(var i = 0; i<addToCartBtn.length; i++){
//         var btn = addToCartBtn[i];
//         btn.addEventListener('click', ready);
//         // btn.addEventListener('click', handleIncrement);
//     }

    function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }
    
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }
    
        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }
    
        // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        count--;
        totalCount.innerHTML = count;
        updateCartTotal()
    }

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
       
    }

    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('card-title')[0].innerText
        var price = shopItem.getElementsByClassName('card-text')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
        addItemToCart(title, price, imageSrc)
        updateCartTotal()
    }
    
    function addItemToCart(title, price, imageSrc) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

        count++;
        totalCount.innerHTML = count;

        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart')
                count--;
                totalCount.innerHTML = count;
                return
            } 
            
        }

        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }
    
    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('R', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + total
    }




