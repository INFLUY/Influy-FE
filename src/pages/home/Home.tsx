import { useAuthStore } from '@/store/authStore';

const Home = () => {
  const { memberId, sellerId, accessToken } = useAuthStore();
  console.log(memberId, sellerId, accessToken);
  return <>홈</>;
};

export default Home;
