import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import SortBar from "../components/SortBar";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";
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
                    console.log(products)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log('Loi')
                }
            )
    }, [])


    // const products = [{
    //     name: 'Nike Super',
    //     price: 380,
    //     color: 'Red',
    //     size: '38',
    //     img: 'https://static.nike.com/a/images/t_default/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-rWtqPn.png'
    // },
    // {
    //     name: 'Nike Air',
    //     price: 200,
    //     color: 'Blue',
    //     size: '40',
    //     img: 'https://media.wired.co.uk/photos/63727049ab57b5ecdfc2fb42/16:9/w_2560%2Cc_limit/Nike-Swoosh-News-Gear.jpg'
    // },
    // {
    //     name: 'Addias',
    //     price: 300,
    //     color: 'Black',
    //     size: '39',
    //     img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/87cd0b80e0434c758b15ae9801598eb2_9366/Giay_Chay_Bo_adidas_4DFWD_2_Xam_GX9250_01_standard.jpg'
    // }
    // ]

    //add each item's quantity


    useEffect(() => {
        if (products.length > 0) {
            for (let index = 0; index < products.length; index++) {
                products[index].itemQuantity = 0
                products[index].size = ''
            }
        }
    }, [])


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
        if (parseInt(a.price) < parseInt(b.price))
            return -1
        if (parseInt(a.price) > parseInt(b.price))
            return 1
        return 0
    }

    const decreaseSort = (a, b) => {
        if (parseInt(a.price) < parseInt(b.price))
            return 1
        if (parseInt(a.price) > parseInt(b.price))
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




    // //Set item's color 

    // const onSetColor = (item, color) => {
    //     const exist = cartItems.find(x => x.name === item.name)
    //     exist.color = color
    //     setCartItems(cartItems.map(x => x.name === item.name ? {
    //         ...exist, color: exist.color
    //     } : x))
    // }

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
            <button><FaArrowAltCircleLeft></FaArrowAltCircleLeft></button>
            <Cart quantity={quantity} cartItems={cartItems}
                onRemove={onRemove} onAdd={onAdd} onDecrease={onDecrease}
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
                sortKey === '' &&
                <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults} />
                ||
                sortKey === 'default' &&
                <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults} />
            }

            {
                sortKey === 'increase' && products.sort((a, b) => increaseSort(a, b)) &&
                <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults} />
                ||
                sortKey === 'decrease' && products.sort((a, b) => decreaseSort(a, b)) &&
                <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults} />
            }
        </div>
    )
}

export default Products