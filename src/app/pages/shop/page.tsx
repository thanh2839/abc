import Header from '../../components/header'
import { Footer } from '../../components/Footer';
import { HeroSection } from './HeroSection';
import { AboutFeature } from '../../components/About us/AboutFeature';
import { BestSellingProduct } from '@/app/components/bestseller/productBestSeller';
const Shop = () => {
    return (
        <div>
            <Header></Header>
            <HeroSection></HeroSection>
            <BestSellingProduct></BestSellingProduct>
            <AboutFeature></AboutFeature>
            <Footer></Footer>
        </div>
    )
}

export default Shop;