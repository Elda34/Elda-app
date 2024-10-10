import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [category])

    return (
        <div className='container mx-auto px-4 my-6'>
            <h2 className='text-xl md:text-2xl font-semibold py-4'>{heading}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 md:gap-6 overflow-x-auto pb-4'>
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div className='w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow ' key={index}>
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <div className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse rounded-full bg-slate-200 h-6'></div>
                                    <div className='capitalize text-slate-500 animate-pulse rounded-full bg-slate-200 h-6'></div>
                                    <div className='flex gap-3'>
                                        <div className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 h-6 w-full'></div>
                                        <div className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 h-6 w-full'></div>
                                    </div>
                                    <div className='text-sm text-white px-3 rounded-full bg-slate-200 h-8 animate-pulse'></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link to={`/product/${product?._id}`} className='w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow ' onClick={scrollTop} key={product?._id}>
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
                                    <img src={product.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
