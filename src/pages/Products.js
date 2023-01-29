import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import SortBar from "../components/SortBar";
import { Button } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowLeft, FaLongArrowAltLeft } from "react-icons/fa";
import '../style/products.css'


const cartFromSession = JSON.parse(sessionStorage.getItem('cartItems')) || []
const qtyFromSession = parseInt(sessionStorage.getItem('quantity')) || 0


function Products() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quantity, setQuantity] = useState(qtyFromSession)
    const [searchResults, setSearchResults] = useState('')
    const [sortKey, setSortKey] = useState('')
    const [cartItems, setCartItems] = useState(cartFromSession)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        sessionStorage.setItem('quantity', quantity)
    }, [quantity])

    useEffect(() => {
        fetch("http://localhost:3000/server/get_all_prod.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log('Error calling API')
                }
            )
    }, [])


    useEffect(() => {
        if (products.length > 0) {
            for (let index = 0; index < products.length; index++) {
                products[index].itemQuantity = 0
            }
        }
    }, [])

    const getFinalPrice = (item) => {
        return parseInt(parseFloat(item.price - (item.price * item.sale / 100)).toFixed(2))
    }


    //search handle
    const handleSearch = (searchTerm) => {
        // Perform search and set search results
        setSearchResults(searchTerm);
    };

    //sort handle

    const handleSort = (sortTerm) => {
        setSortKey(sortTerm)
    }

    const increaseSort = (a, b) => {
        if (getFinalPrice(a) < getFinalPrice(b))
            return -1
        if (getFinalPrice(a) > getFinalPrice(b))
            return 1
        return 0
    }

    const decreaseSort = (a, b) => {
        if (getFinalPrice(a) < getFinalPrice(b))
            return 1
        if (getFinalPrice(a) > getFinalPrice(b))
            return -1
        return 0
    }


    //Add item to cart or increase item's quantity

    const onAdd = (item) => {
        const exist = cartItems.find(x => x.name === item.name)
        if (exist) {
            setCartItems(cartItems.map(x => x.name === item.name ? {
                ...exist, itemQuantity: exist.itemQuantity + 1
            } : x))

            // if (item.itemQuantity === parseInt(item.detail.find(x => x.size === item.size).amount)) {
            //     setCartItems(cartItems.map(x => x.name === item.name ? {
            //         ...exist, itemQuantity: 1
            //     } : x))
            // }
        }
        else {
            setQuantity(quantity + 1)
            setCartItems([...cartItems, { ...item, itemQuantity: 1 }])
        }
    }

    //Decrease item's quantity
    const onDecrease = (item) => {
        const exist = cartItems.find(x => x.name === item.name)
        if (exist.itemQuantity === 1) {
            onRemove(exist)
        }
        else {
            setCartItems(cartItems.map(x => x.name === item.name ? {
                ...exist, itemQuantity: exist.itemQuantity - 1
            } : x))
        }
    }



    //Remove from cart

    const onRemove = (item) => {
        setQuantity(quantity - 1)
        const exist = cartItems.find(x => x.name === item.name)
        if (exist)
            setCartItems(cartItems.filter(x => x.name !== item.name))
    }

    //Set item's size

    const onSetSize = (item, size) => {
        const exist = cartItems.find(x => x.name === item.name)
        exist.size = size
        setCartItems(cartItems.map(x => x.name === item.name ? {
            ...exist, size: exist.size
        } : x))
    }


    return (
        <div className="product-page">
            <br />
            <Button variant="light" className="btn-back" title="Back to Home Page">
                <a href="/">
                    <FaLongArrowAltLeft></FaLongArrowAltLeft>
                </a>
            </Button>
            <Cart quantity={quantity} cartItems={cartItems}
                onRemove={onRemove} onAdd={onAdd} onDecrease={onDecrease}
                onSetSize={onSetSize} setCartItems={setCartItems}
            />

            <br />
            <SearchBar onSearch={handleSearch} />
            <SortBar onSelect={handleSort} />
            <div className="product-page-message">
                <h1>We
                    <span class="underlined underline-clip"> Sell</span>
                    <br />
                    Best <span class="underlined underline-mask">Shoes!</span>
                    <br />
                    <span class="underlined underline-overflow"></span></h1>
            </div>

            <br /><br /><br /><br />



            {
                (sortKey === '' &&
                    <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults}
                        cartItems={cartItems} setCartItems={setCartItems} />)
                ||
                (sortKey === 'default' &&
                    <ProductCard onAdd={onAdd} products={products}
                        prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />)
            }

            {
                (sortKey === 'increase' && products.sort((a, b) => increaseSort(a, b)) &&
                    <ProductCard onAdd={onAdd} products={products}
                        prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />)
                ||
                (sortKey === 'decrease' && products.sort((a, b) => decreaseSort(a, b)) &&
                    <ProductCard onAdd={onAdd} products={products}
                        prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />)
                ||
                (sortKey === 'adidas') &&
                <ProductCard onAdd={onAdd} products={products.filter(x => x.name.includes('Adidas'))}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                ||
                (sortKey === 'ducadi') &&
                <ProductCard onAdd={onAdd} products={products.filter(x => x.name.includes('Duca Di'))}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                ||
                (sortKey === 'kate') &&
                <ProductCard onAdd={onAdd} products={products.filter(x => x.name.includes('Kate'))}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                ||
                (sortKey === 'mlb') &&
                <ProductCard onAdd={onAdd} products={products.filter(x => x.name.includes('MLB'))}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                ||
                (sortKey === 'whoau') &&
                <ProductCard onAdd={onAdd} products={products.filter(x => x.name.includes('WHOAU'))}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
            }
        </div>
    )
}

export default Products