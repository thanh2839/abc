import Header from '../../components/header'
import { Footer } from '../../components/Footer';
// import { HeroSection } from './HeroSection';
import { AboutFeature } from '../../components/About us/AboutFeature';
import { MainHero } from '@/app/components/heroSection/heroSection';
import { RecommentHybridSection } from '@/app/components/RecommentShop/RecommendHybridSection';
import { BestSellingProductComponents } from '@/app/components/BestSelling/BestSelling';
import { BrowseCategories } from '@/app/components/CategoryShopComponents/BrowseCategory';
import { TopNewProductComponents } from '@/app/components/TopNewProduct/topNewProduct';
const Shop = () => {
    return (
        <div>
            <Header></Header>
            <hr className="border-t border-gray-300 my-4" /> {/* Horizontal line */}
            <br></br>
            <MainHero></MainHero>
            <div className="h-[50px]"></div>
            {/* <div className="flex justify-center"> */}
                <RecommentHybridSection />
            <div className="h-[620px]">
                <BestSellingProductComponents />
            </div>
            

            <BrowseCategories></BrowseCategories>
            <TopNewProductComponents/>
            <AboutFeature></AboutFeature>

            <Footer></Footer>
        </div>
    )
}

export default Shop;