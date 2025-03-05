let eventBus = new Vue();

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
});

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name" required>
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review" required></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating" required>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>
                <label>Would you recommend this product?</label>
                <input type="radio" id="yes" value="yes" v-model="recommend">
                <label for="yes">Yes</label>
                <input type="radio" id="no" value="no" v-model="recommend">
                <label for="no">No</label>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (!this.recommend) this.errors.push("Recommendation required.");
            }
        }
    }
});

Vue.component('product-tabs', {
    template: `
        <div>
            <ul>
                <span 
                    class="tab"
                    :class="{ activeTab: selectedTab === tab }"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="selectedTab = tab"
                >
                    {{ tab }}
                </span>
            </ul>
            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p>Recommend: {{ review.recommend }}</p>
                    </li>
                </ul>
            </div>
            <div v-show="selectedTab === 'Make a Review'">
                <product-review></product-review>
            </div>
            <div v-show="selectedTab === 'Shipping'">
                <p>Shipping Cost: {{ shipping }}</p>
            </div>
            <div v-show="selectedTab === 'Details'">
                <product-details :details="details"></product-details>
            </div>
        </div>
    `,
    props: {
        reviews: {
            type: Array,
            required: false
        },
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        };
    }
});

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText" ref="productImage"/>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <product-details :details="details"></product-details>
                <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)"
                ></div>
            </div>
            <div class="cart">
                <p>Cart ({{ cart }})</p>
                <button
                    @click="flyToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>
                <button @click="removeFromCart">Remove from cart</button>
            </div>
            <product-tabs 
                :reviews="reviews" 
                :shipping="shipping" 
                :details="details"
            ></product-tabs>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            cart: 0,
            reviews: []
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
            this.flyFromCart();
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        flyToCart() {
            let img = this.$refs.productImage;
            let cart = document.querySelector(".cart");

            if (!img || !cart) return;

            let imgClone = img.cloneNode(true);
            let rect = img.getBoundingClientRect();
            imgClone.style.position = "absolute";
            imgClone.style.top = rect.top + "px";
            imgClone.style.left = rect.left + "px";
            imgClone.style.width = rect.width + "px";
            imgClone.style.transition = "all 1s ease-in-out";
            imgClone.style.zIndex = "1000";
            document.body.appendChild(imgClone);

            setTimeout(() => {
                let cartRect = cart.getBoundingClientRect();
                imgClone.style.top = cartRect.top + "px";
                imgClone.style.left = cartRect.left + "px";
                imgClone.style.width = "30px";
                imgClone.style.opacity = "0";
            }, 10);

            setTimeout(() => {
                document.body.removeChild(imgClone);
                this.addToCart();
            }, 1000);
        },
        flyFromCart() {
            let img = this.$refs.productImage;
            let cart = document.querySelector(".cart");

            if (!img || !cart) return;

            let imgClone = img.cloneNode(true);
            let cartRect = cart.getBoundingClientRect();
            imgClone.style.position = "absolute";
            imgClone.style.top = cartRect.top + "px";
            imgClone.style.left = cartRect.left + "px";
            imgClone.style.width = "30px";
            imgClone.style.transition = "all 1s ease-in-out";
            imgClone.style.zIndex = "1000";
            document.body.appendChild(imgClone);

            setTimeout(() => {
                let rect = img.getBoundingClientRect();
                imgClone.style.top = rect.top + "px";
                imgClone.style.left = rect.left + "px";
                imgClone.style.width = rect.width + "px";
                imgClone.style.opacity = "0";
            }, 10);

            setTimeout(() => {
                document.body.removeChild(imgClone);
            }, 1000);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity > 0;
        },
        shipping() {
            return this.premium ? "Free" : 2.99;
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            const index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }
});