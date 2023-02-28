import React, { useState, useEffect } from "react";
import Cart from "../components/ProductPage/Cart";
import SearchBar from "../components/ProductPage/SearchBar";
import ProductCard from "../components/ProductPage/ProductCard";
import SortBar from "../components/ProductPage/SortBar";
import Filter from "../components/ProductPage/Filter";
import { Button } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowLeft, FaLongArrowAltLeft } from "react-icons/fa";
import '../style/products.css'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';


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
    const [filters, setFilters] = useState([])
    const [prodOnFilter, setProdOnFilter] = useState([])

    function handleFilterChange(filters) {
        setFilters(filters)
        setProdOnFilter(products.filter(x => filters.some(y => x.name.includes(y))))
    }

    const options = ['Adidas', 'Duca Di', 'Kate', 'MLB', 'WHOAU'];

    // console.log(prodOnFilter)


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

    // useEffect(() => {

    // }, filters)

    console.log(prodOnFilter)

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

    const nameSort = (a, b) => {
        if (a.name < b.name)
            return -1
        if (a.name > b.name)
            return 1
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
                <Link to={'/'}>
                    <FaLongArrowAltLeft></FaLongArrowAltLeft>
                </Link>
            </Button>
            <Cart quantity={quantity} cartItems={cartItems}
                onRemove={onRemove} onAdd={onAdd} onDecrease={onDecrease}
                onSetSize={onSetSize} setCartItems={setCartItems}
            />


            <br />
            <SearchBar onSearch={handleSearch} />
            <SortBar onSelect={handleSort} />

            <Popup contentStyle={{ width: '24%', height: '24%' }}
                trigger={<Button variant="primary" title='Filter'
                    style={{ marginLeft: '400px', bottom: '45px', position: 'relative' }}
                >
                    Filter
                </Button>}
                position='bottom left'
            >
                <div>
                    <Filter options={options} onFilterChange={handleFilterChange} />
                </div>
            </Popup>

            <div className="product-page-message">
                <h1>We
                    <span class="underlined underline-clip"> Sell</span>
                    <br />
                    Best <span class="underlined underline-mask">Products!</span>
                    <br />
                    <span class="underlined underline-overflow"></span></h1>
            </div>

            <br /><br /><br /><br />

            {
                filters.length > 0 && sortKey === '' &&
                <ProductCard onAdd={onAdd} products={prodOnFilter}
                    prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
            }


            {
                (sortKey === '' && filters.length === 0 &&
                    <ProductCard onAdd={onAdd} products={products} prodOnSearch={searchResults}
                        cartItems={cartItems} setCartItems={setCartItems} onSetSize={onSetSize} />)
                ||
                (sortKey === 'default' && filters.length === 0 &&
                    <ProductCard onAdd={onAdd} products={products}
                        prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />)
                ||
                (sortKey === 'increase' &&
                    (
                        filters.length > 0 ?
                            prodOnFilter.sort((a, b) => increaseSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={prodOnFilter}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                            :
                            products.sort((a, b) => increaseSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={products}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                    )
                )
                ||
                (sortKey === 'decrease' &&
                    (
                        filters.length > 0 ?
                            prodOnFilter.sort((a, b) => decreaseSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={prodOnFilter}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                            :
                            products.sort((a, b) => decreaseSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={products}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                    )
                )
                ||
                (sortKey === 'name' &&
                    (
                        filters.length > 0 ?
                            prodOnFilter.sort((a, b) => nameSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={prodOnFilter}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                            :
                            products.sort((a, b) => nameSort(a, b)) &&
                            <ProductCard onAdd={onAdd} products={products}
                                prodOnSearch={searchResults} cartItems={cartItems} setCartItems={setCartItems} />
                    )
                )
            }
        </div>
    )
}

export default Products