import Header from '../../components/header'
import { Footer } from '../../components/Footer';
// import ProductsPage from './sellProduct';
import CartPage from './cartPage';
const sellProduct = () => {
    return (
        <div>
            <Header></Header>
            <main className="flex flex-col pb-32 bg-white max-md:pb-24">
                <header className="flex overflow-hidden flex-col justify-center items-start py-3.5 w-full text-2xl font-bold text-black bg-slate-300 max-md:max-w-full">
                    <div className="flex flex-col px-12 max-md:px-5">
                        <h1 className="gap-2.5 p-2.5">Giỏ hàng</h1>
                    </div>
                </header>
                <div className="px-20"> {/* Thêm padding trái phải 20px */}
                    <CartPage />
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default sellProduct;