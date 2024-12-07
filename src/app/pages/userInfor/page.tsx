import Header from '@/app/components/header';
import UserInfor from '../../components/user/userInfor'
import { Footer } from '@/app/components/Footer';

const userInfo = () => {
    return (
        <div>
            <Header></Header>
            <UserInfor></UserInfor>
            <Footer></Footer>
        </div>
    )
}

export default userInfo;